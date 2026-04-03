import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { supabase } from '../../lib/supabaseClient'
import { jsPDF } from 'jspdf'
import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import {
  FileText, Download, Sun, Droplets, Zap,
  CheckCircle2, Loader2, TrendingUp, FileBarChart,
  Info, AlertCircle
} from 'lucide-react'

type ReportType = 'solar' | 'pumping' | 'grid' | 'combined'

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

/* 🔥 PDF GENERATION */
async function generatePDF(report: ReportItem) {
  const doc = new jsPDF()
  const now = new Date().toLocaleString('en-IN')

  doc.setFontSize(18)
  doc.text(`Surya-Sanchay — ${report.title}`, 14, 20)
  doc.setFontSize(10)
  doc.text(`Generated: ${now}`, 14, 28)

  let y = 40

  const addSection = async (table: string, label: string) => {
    try {
      const { data, error } = await supabase.from(table).select('*')
      if (error) throw error
      if (!data || data.length === 0) return

      doc.setFontSize(13)
      doc.text(label, 14, y)
      y += 8

      doc.setFontSize(9)
      data.forEach((row: any) => {
        const line = Object.entries(row)
          .map(([k, v]) => `${k}: ${v}`)
          .join(' | ')
        const wrapped = doc.splitTextToSize(line, 180)
        doc.text(wrapped, 14, y)
        y += wrapped.length * 5 + 3
        if (y > 270) { doc.addPage(); y = 20 }
      })
      y += 6
    } catch (err: any) {
      console.error(`Error fetching ${table}:`, err.message)
    }
  }

  if (report.id === 'combined') {
    await addSection('solar_panel', 'Solar Panels')
    await addSection('pumping_session', 'Pumping Sessions')
    await addSection('grid_status', 'Grid Status')
  } else {
    await addSection(report.table, report.title)
  }

  doc.save(`surya-sanchay-${report.id}-report.pdf`)
}

/* ─── COMPONENT ─── */
export function Reports() {
  const { t } = useLanguage()

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
      await generatePDF(report)
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
                      <Badge variant="outline" className="text-xs">Live Data</Badge>
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