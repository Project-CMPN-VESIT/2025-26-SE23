import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { supabase } from '../../lib/supabaseClient'
import { jsPDF } from 'jspdf'
import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import {
  FileText, Download, Sun, Droplets, Zap,
  CheckCircle2, Loader2, FileBarChart, Info
} from 'lucide-react'

type ReportType = 'solar' | 'pumping' | 'grid' | 'combined'
type Language = 'en' | 'hi' | 'mr'

interface ReportItem {
  id: ReportType
  title: string
  description: string
  icon: any
  color: string
  bg: string
  borderColor: string
  table: string
}

// ── Locale helpers ──────────────────────────────────────────────────────────
function getLocale(lang: Language): string {
  return lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN'
}

export function formatNumber(value: number, lang: Language, opts?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(getLocale(lang), opts).format(value)
}

export function formatDate(date: Date, lang: Language): string {
  return new Intl.DateTimeFormat(getLocale(lang), {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(date)
}

// ── Static report definitions ────────────────────────────────────────────────
const reportDefs = [
  {
    id: 'solar' as ReportType,
    icon: Sun,
    color: '#E6A817',
    bg: 'bg-amber-50 dark:bg-amber-950/20',
    borderColor: 'border-amber-300 dark:border-amber-700',
    table: 'solar_panel',
  },
  {
    id: 'pumping' as ReportType,
    icon: Droplets,
    color: '#0ea5e9',
    bg: 'bg-sky-50 dark:bg-sky-950/20',
    borderColor: 'border-sky-300 dark:border-sky-700',
    table: 'pumping_session',
  },
  {
    id: 'grid' as ReportType,
    icon: Zap,
    color: '#6366f1',
    bg: 'bg-indigo-50 dark:bg-indigo-950/20',
    borderColor: 'border-indigo-300 dark:border-indigo-700',
    table: 'grid_status',
  },
  {
    id: 'combined' as ReportType,
    icon: FileBarChart,
    color: '#16a34a',
    bg: 'bg-green-50 dark:bg-green-950/20',
    borderColor: 'border-green-300 dark:border-green-700',
    table: '',
  },
]

// ── Hex → RGB helper ─────────────────────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

// ── PDF generation ───────────────────────────────────────────────────────────
async function generatePDF(report: ReportItem, lang: Language) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 14
  const contentW = pageW - margin * 2
  const now = new Date()
  const locale = getLocale(lang)
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(now)

  const [cr, cg, cb] = hexToRgb(report.color)
  let pageNum = 1

  // ── helpers ──────────────────────────────────────────────────────────────
  const drawFooter = () => {
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, pageH - 12, pageW - margin, pageH - 12)
    doc.text('Gadheshwar Gram Panchayat · Surya-Sanchay', margin, pageH - 7)
    doc.text(`Page ${pageNum}`, pageW - margin, pageH - 7, { align: 'right' })
    doc.setTextColor(0, 0, 0)
    pageNum++
  }

  const addPageIfNeeded = (y: number, neededSpace = 20): number => {
    if (y + neededSpace > pageH - 20) {
      drawFooter()
      doc.addPage()
      return 20
    }
    return y
  }

  // ── Cover block ──────────────────────────────────────────────────────────
  // Gradient-style header bar (solid colour + lighter strip)
  doc.setFillColor(cr, cg, cb)
  doc.rect(0, 0, pageW, 42, 'F')
  doc.setFillColor(Math.min(cr + 40, 255), Math.min(cg + 40, 255), Math.min(cb + 40, 255))
  doc.rect(0, 36, pageW, 6, 'F')

  // Project name
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('SURYA-SANCHAY', margin, 13)

  // Report title
  doc.setFontSize(20)
  doc.text(report.title.toUpperCase(), margin, 30)

  // Reset text colour
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'normal')

  // Generated on line
  doc.setFontSize(9)
  doc.setTextColor(80, 80, 80)
  doc.text(`Generated: ${formattedDate}`, margin, 52)
  doc.setTextColor(0, 0, 0)

  // Thin colour accent line under date
  doc.setDrawColor(cr, cg, cb)
  doc.setLineWidth(0.5)
  doc.line(margin, 55, pageW - margin, 55)

  let y = 65

  // ── Section renderer ─────────────────────────────────────────────────────
  const addSection = async (table: string, label: string, sectionColor: [number, number, number]) => {
    const { data, error } = await supabase.from(table).select('*')
    if (error) {
      console.error(`Error fetching ${table}:`, error.message)
      return
    }
    if (!data || data.length === 0) return

    const rows = data as Record<string, unknown>[]
    const columns = Object.keys(rows[0])

    // ── Section header bar ────────────────────────────────────────────────
    y = addPageIfNeeded(y, 30)
    doc.setFillColor(...sectionColor)
    doc.roundedRect(margin, y, contentW, 9, 2, 2, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text(label, margin + 3, y + 6.2)
    doc.setTextColor(0, 0, 0)
    doc.setFont('helvetica', 'normal')
    y += 13

    // ── Column widths ──────────────────────────────────────────────────────
    const colCount = columns.length
    const maxCols = Math.min(colCount, 6)      // cap columns shown
    const shownCols = columns.slice(0, maxCols)
    const colW = contentW / maxCols

    // ── Table header row ───────────────────────────────────────────────────
    y = addPageIfNeeded(y, 12)
    doc.setFillColor(240, 240, 240)
    doc.rect(margin, y, contentW, 7, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    shownCols.forEach((col, i) => {
      const label = col.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      doc.text(label, margin + i * colW + 2, y + 5, { maxWidth: colW - 3 })
    })
    doc.setFont('helvetica', 'normal')

    // ── Table border lines ─────────────────────────────────────────────────
    doc.setDrawColor(200, 200, 200)
    doc.setLineWidth(0.1)
    // outer border of header
    doc.rect(margin, y, contentW, 7)

    y += 7

    // ── Data rows ──────────────────────────────────────────────────────────
    const maxRows = Math.min(rows.length, 50)
    for (let ri = 0; ri < maxRows; ri++) {
      y = addPageIfNeeded(y, 8)
      const rowH = 6.5
      if (ri % 2 === 0) {
        doc.setFillColor(250, 250, 252)
        doc.rect(margin, y, contentW, rowH, 'F')
      }
      doc.setFontSize(7.5)
      doc.setTextColor(30, 30, 30)
      shownCols.forEach((col, ci) => {
        const raw = rows[ri][col]
        let val = raw === null || raw === undefined ? '—' : String(raw)
        // Locale-format numbers
        const num = Number(raw)
        if (!isNaN(num) && val !== '' && val !== '—') {
          val = new Intl.NumberFormat(locale).format(num)
        }
        doc.text(val, margin + ci * colW + 2, y + 4.5, { maxWidth: colW - 3 })
      })
      // row separator
      doc.setDrawColor(220, 220, 220)
      doc.line(margin, y + rowH, margin + contentW, y + rowH)
      y += rowH
    }

    // Outer border of whole table body
    doc.setDrawColor(180, 180, 180)
    doc.setLineWidth(0.2)
    doc.rect(margin, y - maxRows * 6.5, contentW, maxRows * 6.5)

    // ── Summary stats ──────────────────────────────────────────────────────
    y += 4
    y = addPageIfNeeded(y, 16)

    // count numeric columns for summary
    const numericCols = shownCols.filter(col => {
      const sample = rows.find(r => r[col] !== null && r[col] !== undefined)
      return sample && !isNaN(Number(sample[col]))
    })

    const summaryParts: string[] = [`Total rows: ${new Intl.NumberFormat(locale).format(rows.length)}`]
    numericCols.slice(0, 3).forEach(col => {
      const vals = rows.map(r => Number(r[col])).filter(v => !isNaN(v))
      if (vals.length) {
        const avg = vals.reduce((a, b) => a + b, 0) / vals.length
        const colLabel = col.replace(/_/g, ' ')
        summaryParts.push(`Avg ${colLabel}: ${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(avg)}`)
      }
    })

    const [sr, sg, sb] = sectionColor
    doc.setFillColor(Math.min(sr + 60, 255), Math.min(sg + 60, 255), Math.min(sb + 60, 255))
    doc.roundedRect(margin, y, contentW, 9, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(40, 40, 40)
    doc.text(summaryParts.join('   ·   '), margin + 3, y + 6)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)
    y += 16
  }

  // ── Dispatch per report type ──────────────────────────────────────────────
  if (report.id === 'combined') {
    await addSection('solar_panel', 'Solar Panels', hexToRgb('#E6A817'))
    await addSection('pumping_session', 'Pumping Sessions', hexToRgb('#0ea5e9'))
    await addSection('grid_status', 'Grid Status', hexToRgb('#6366f1'))
  } else {
    await addSection(report.table, report.title, [cr, cg, cb])
  }

  // Final footer
  drawFooter()

  doc.save(`surya-sanchay-${report.id}-report.pdf`)
}

// ── Component ────────────────────────────────────────────────────────────────
export function Reports() {
  const { t, language } = useLanguage()

  const [generating, setGenerating] = useState<ReportType | null>(null)
  const [done, setDone] = useState<ReportType[]>([])

  const reports: ReportItem[] = reportDefs.map((r) => ({
    ...r,
    title: t(`reports.cat.${r.id}.title`),
    description: t(`reports.cat.${r.id}.desc`),
  }))

  const handleGenerate = async (report: ReportItem) => {
    setGenerating(report.id)
    try {
      await generatePDF(report, language as Parameters<typeof generatePDF>[1])
      setDone((prev) => [...prev, report.id])
      setTimeout(() => {
        setDone((prev) => prev.filter((d) => d !== report.id))
      }, 3000)
    } catch (err: any) {
      console.error('PDF generation error:', err.message)
    } finally {
      setGenerating(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">

      {/* ── HEADER ── */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6 text-indigo-500" />
          {t('reports.title')}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">{t('reports.subtitle')}</p>
      </div>

      {/* ── LIVE DATA NOTICE ── */}
      <Card className="border-l-4 border-l-blue-400">
        <CardContent className="py-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">{t('reports.liveDataTitle')}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('reports.liveDataDesc')}</p>
          </div>
        </CardContent>
      </Card>

      {/* ── REPORT CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((report) => {
          const Icon = report.icon
          const isLoading = generating === report.id
          const isDone = done.includes(report.id)
          const isDisabled = generating !== null && !isLoading

          return (
            <Card
              key={report.id}
              className={`overflow-hidden border transition-all hover:shadow-md ${report.borderColor}`}
            >
              {/* Color accent header */}
              <div className={`h-2 w-full`} style={{ background: report.color }} />

              <CardContent className="p-5">
                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${report.color}20` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: report.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base">{report.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {report.description}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {report.id === 'combined' ? (
                    <>
                      <Badge variant="outline" className="text-xs">Solar</Badge>
                      <Badge variant="outline" className="text-xs">Pumping</Badge>
                      <Badge variant="outline" className="text-xs">Grid</Badge>
                      <Badge variant="outline" className="text-xs">{t('reports.allInOne')}</Badge>
                    </>
                  ) : (
                    <>
                      <Badge variant="outline" className="text-xs">PDF</Badge>
                      <Badge variant="outline" className="text-xs">{t('common.live')}</Badge>
                      <Badge variant="outline" className="text-xs capitalize">{report.id}</Badge>
                    </>
                  )}
                </div>

                {/* Download Button */}
                <Button
                  className="w-full gap-2 font-medium"
                  style={!isDone && !isLoading && !isDisabled ? {
                    background: report.color,
                    borderColor: report.color,
                    color: '#fff',
                  } : undefined}
                  variant={isDisabled ? 'outline' : isDone ? 'outline' : 'default'}
                  onClick={() => handleGenerate(report)}
                  disabled={isLoading || isDisabled}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t('reports.generating')}
                    </>
                  ) : isDone ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {t('reports.downloaded')}
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      {t('reports.download')}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ── FOOTER NOTE ── */}
      <p className="text-xs text-center text-muted-foreground pb-2">
        {t('reports.footer')}
      </p>

    </div>
  )
}