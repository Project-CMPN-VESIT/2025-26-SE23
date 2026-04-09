import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase } from '../../lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import {
  Wifi, WifiOff, Zap, Activity, RefreshCw,
  AlertTriangle, CheckCircle2, TrendingUp,
  BarChart3, Clock
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from 'recharts'

function formatTimestamp(ts: string) {
  if (!ts) return '—'
  try {
    return new Date(ts).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    })
  } catch { return ts }
}

export function Grid() {
  const { t } = useLanguage()
  const [gridData, setGridData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  /* 🔥 FETCH */
  const fetchData = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('grid_status')
        .select('*')
        .order('timestamp', { ascending: false })
      if (error) throw error
      setGridData(data || [])
    } catch (err: any) {
      console.error('Grid fetch error:', err.message)
      setGridData([])
    } finally {
      setLastUpdated(new Date())
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const latest = gridData[0] ?? null
  const isOnline = latest?.is_online ?? false
  const totalOutages = gridData.filter((g) => !g.is_online).length
  const uptime = gridData.length > 0
    ? Math.round((gridData.filter((g) => g.is_online).length / gridData.length) * 100)
    : 0

  const voltageChart = [...gridData]
    .slice(0, 10)
    .reverse()
    .map((g, i) => ({
      index: i + 1,
      voltage: g.voltage_volts ?? 0,
      freq: g.frequency_hz ?? 0,
    }))

  const summaryStats = [
    {
      label: t('grid.uptime'),
      value: `${uptime}%`,
      icon: TrendingUp,
      color: uptime >= 80 ? '#4CAF50' : uptime >= 50 ? '#F4A300' : '#D32F2F',
    },
    {
      label: t('grid.totalOutages'),
      value: totalOutages,
      icon: AlertTriangle,
      color: totalOutages === 0 ? '#4CAF50' : totalOutages <= 3 ? '#F4A300' : '#D32F2F',
    },
    {
      label: t('grid.totalRecords'),
      value: gridData.length,
      icon: BarChart3,
      color: '#6B8E6B',
    },
    {
      label: t('grid.onlineEvents'),
      value: gridData.filter((g) => g.is_online).length,
      icon: Wifi,
      color: '#4CAF50',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">

      {/* ── HEADER ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-amber-500" />
            {t('grid.title')}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{t('grid.realtimeDesc')}</p>
        </div>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground hidden sm:block">
              {t('common.updated')} {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <Button size="sm" variant="outline" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            {t('common.refresh')}
          </Button>
        </div>
      </div>

      {/* ── LIVE STATUS CARD ── */}
      <Card className={`border-l-4 ${isOnline ? 'border-l-green-500' : 'border-l-red-500'}`}>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4" />
            {t('grid.currentStatus')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">{t('common.loading')}</p>
          ) : latest ? (
            <div className="flex flex-wrap gap-4 items-center">
              {/* Status badge */}
              <div className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm ${
                isOnline
                  ? 'bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300'
              }`}>
                {isOnline
                  ? <><CheckCircle2 className="h-5 w-5" /> {t('grid.online')}</>
                  : <><AlertTriangle className="h-5 w-5" /> {t('grid.offline')}</>
                }
              </div>

              {/* Voltage */}
              <div className="bg-muted/40 rounded-lg px-4 py-3 flex-1 min-w-max">
                <p className="text-xs text-muted-foreground">{t('grid.voltage')}</p>
                <p className="text-xl font-bold">{latest.voltage_volts ?? '—'} <span className="text-sm font-normal">V</span></p>
              </div>

              {/* Frequency */}
              <div className="bg-muted/40 rounded-lg px-4 py-3 flex-1 min-w-max">
                <p className="text-xs text-muted-foreground">{t('grid.frequency')}</p>
                <p className="text-xl font-bold">{latest.frequency_hz ?? '—'} <span className="text-sm font-normal">Hz</span></p>
              </div>

              {/* Last seen */}
              <div className="bg-muted/40 rounded-lg px-4 py-3 flex-1 min-w-max">
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Last Record</p>
                <p className="text-sm font-semibold">{formatTimestamp(latest.timestamp)}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t('common.noData')}</p>
          )}
        </CardContent>
      </Card>

      {/* ── SUMMARY STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-5 pb-4">
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                  style={{ background: `${s.color}20` }}
                >
                  <Icon className="h-5 w-5" style={{ color: s.color }} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className="text-2xl font-bold" style={{ color: s.color }}>
                  {loading ? '—' : s.value}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ── VOLTAGE TREND CHART ── */}
      {voltageChart.length === 1 && (
        <Card>
          <CardContent className="py-6 text-center text-sm text-muted-foreground">
            Only 1 grid record found. Add more records to display the voltage trend chart.
          </CardContent>
        </Card>
      )}
      {voltageChart.length > 1 && (

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('grid.voltageTrend')}</CardTitle>
            <p className="text-xs text-muted-foreground">Last {voltageChart.length} records</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={voltageChart}>
                <defs>
                  <linearGradient id="voltGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="index" tick={{ fontSize: 11 }} />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} V`, 'Voltage']}
                />
                <ReferenceLine y={220} stroke="#4CAF50" strokeDasharray="4 2" label={{ value: '220V', fontSize: 10, fill: '#4CAF50' }} />
                <ReferenceLine y={240} stroke="#D32F2F" strokeDasharray="4 2" label={{ value: '240V', fontSize: 10, fill: '#D32F2F' }} />
                <Line
                  type="monotone"
                  dataKey="voltage"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* ── HISTORY TABLE ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{t('grid.history')}</CardTitle>
            <Badge variant="outline">{gridData.length} records</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-sm text-muted-foreground">{t('common.loading')}</div>
          ) : gridData.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">{t('grid.noRecords')}</div>
          ) : (
            <div className="space-y-2">
              {gridData.slice(0, 20).map((g, idx) => (
                <div
                  key={g.status_id ?? idx}
                  className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {g.is_online ? (
                      <Wifi className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <WifiOff className="h-4 w-4 text-red-500 flex-shrink-0" />
                    )}
                    <div>
                      <Badge className={g.is_online
                        ? 'bg-green-500 hover:bg-green-600 text-white text-xs'
                        : 'bg-red-500 hover:bg-red-600 text-white text-xs'
                      }>
                        {g.is_online ? t('grid.online') : t('grid.offline')}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 text-sm">
                    <div>
                      <span className="text-muted-foreground text-xs">{t('grid.voltage')}</span>
                      <p className="font-semibold">{g.voltage_volts ?? '—'} V</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">{t('grid.frequency')}</span>
                      <p className="font-semibold">{g.frequency_hz ?? '—'} Hz</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">{t('grid.timestamp')}</span>
                      <p className="font-semibold text-xs">{formatTimestamp(g.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
              {gridData.length > 20 && (
                <p className="text-xs text-center text-muted-foreground pt-2">
                  Showing 20 of {gridData.length} records
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}