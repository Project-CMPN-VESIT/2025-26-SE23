import { useEffect, useRef, useState, useCallback } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase } from '../../lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import {
  Droplets, Zap, Clock, RefreshCw, Timer,
  TrendingUp, BarChart3, Leaf, AlertTriangle,
  Play, Square, ToggleLeft, ToggleRight,
  CheckCircle2, Loader2, ShieldAlert, Info
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'

/* ─── helpers ─── */
function formatTime(ts: string | null) {
  if (!ts) return '—'
  try {
    return new Date(ts).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    })
  } catch { return ts }
}

function durationMins(start: string, end: string) {
  if (!start || !end) return null
  const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000)
  if (mins < 60) return `${mins} min`
  return `${Math.floor(mins / 60)}h ${mins % 60}m`
}

function fmtElapsed(secs: number) {
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/* ─── COMPONENT ─── */
export function Pumping() {
  const { t } = useLanguage()

  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const [overrideEnabled, setOverrideEnabled] = useState(false)
  const [pumpRunning, setPumpRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [startedAt, setStartedAt] = useState<Date | null>(null)
  const [targetWater, setTargetWater] = useState('')
  const [targetDuration, setTargetDuration] = useState('')
  const [overrideStatus, setOverrideStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [overrideMsg, setOverrideMsg] = useState('')

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // Ref tracks the real startedAt time to avoid stale closures in handleStop
  const startedAtRef = useRef<Date | null>(null)

  /* ── FETCH DATA ── */
  const fetchData = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('pumping_session')
        .select('*')
        .order('start_time', { ascending: false })
      if (error) throw error
      console.log('✅ Pumping — pumping_session:', data)
      setSessions(data || [])

    } catch (err: any) {
      console.error('Fetch error:', err.message)
      setSessions([])
    } finally {
      setLastUpdated(new Date())
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  /* ── TIMER ── */
  useEffect(() => {
    if (pumpRunning) {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [pumpRunning])


  /* START */
  const handleStart = () => {
    const now = new Date()
    setElapsed(0)
    setStartedAt(now)
    startedAtRef.current = now
    setPumpRunning(true)
    setOverrideStatus('idle')
    setOverrideMsg('')
  }

  /* ── STOP + SAVE ── */
  const handleStop = useCallback(async (autoStopped = false) => {
    setPumpRunning(false)
    if (timerRef.current) clearInterval(timerRef.current)

    const endTime = new Date()
    // Use the ref so we always get the real start time, not a stale closure value
    const startTime = startedAtRef.current ?? endTime
    const durationH = elapsed / 3600
    const PUMP_KW = 1.5
    const FLOW_LPM = 100
    const estimatedKwh = parseFloat((PUMP_KW * durationH).toFixed(3))
    const estimatedL = targetWater
      ? parseFloat(targetWater)
      : parseFloat((FLOW_LPM * (elapsed / 60)).toFixed(1))

    setOverrideStatus('saving')
    try {
      const { error } = await supabase.from('pumping_session').insert({
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        water_pumped_litres: estimatedL,
        energy_consumed_kwh: estimatedKwh,
        session_type: 'manual',
        status: 'completed',
      })
      if (error) throw error
      setOverrideStatus('success')
      setOverrideMsg(
        `Session saved! ${estimatedL} L pumped in ${fmtElapsed(elapsed)}.` +
        (autoStopped ? ' (Auto-stopped)' : '')
      )
      setElapsed(0)
      setTargetWater('')
      setTargetDuration('')
      fetchData()
    } catch (err: any) {
      console.error('Insert error:', err.message)
      setOverrideStatus('error')
      setOverrideMsg('Could not save session: ' + err.message)
    }
  }, [elapsed, targetWater, targetDuration])

  /* AUTO STOP — placed after handleStop so the reference is always defined */
  useEffect(() => {
    if (pumpRunning && targetDuration && elapsed >= Number(targetDuration) * 60) {
      handleStop(true)
    }
  }, [elapsed, pumpRunning, targetDuration, handleStop])

  /* ── SUMMARY ── */
  const totalWater = sessions.reduce((s, r) => s + (r.water_pumped_litres || 0), 0)
  const totalEnergy = sessions.reduce((s, r) => s + (r.energy_consumed_kwh || 0), 0)
  const efficiency = totalEnergy > 0 ? (totalWater / totalEnergy).toFixed(1) : 0

  const chartData = [...sessions].slice(0, 7).reverse().map((s, i) => ({
    session: `S${i + 1}`,
    water: s.water_pumped_litres ?? 0,
    energy: s.energy_consumed_kwh ?? 0,
  }))

  const liveWater = targetWater
    ? `${targetWater} L`
    : `~${(100 * (elapsed / 60)).toFixed(0)} L`

  const liveKwh = (1.5 * elapsed / 3600).toFixed(3)

  /* ─── UI ─── */
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">

      {/* ── HEADER ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Droplets className="h-6 w-6 text-sky-500" />
            {t('pumping.title')}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{t('pumping.subtitle')}</p>
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

      {/* ── OVERVIEW STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: t('pumping.totalSessions'),
            value: loading ? '—' : sessions.length,
            icon: BarChart3,
            color: '#6B8E6B',
          },
          {
            label: t('dashboard.waterPumped'),
            value: loading ? '—' : `${totalWater.toLocaleString()} L`,
            icon: Droplets,
            color: '#0ea5e9',
          },
          {
            label: t('pumping.energyUsed'),
            value: loading ? '—' : `${totalEnergy.toFixed(2)} kWh`,
            icon: Zap,
            color: '#E6A817',
          },
          {
            label: t('pumping.efficiency'),
            value: loading ? '—' : `${efficiency} L/kWh`,
            icon: Leaf,
            color: '#4CAF50',
          },
        ].map((s) => {
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
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ── BAR CHART ── */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('pumping.recentSessions')} (last 7)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="session" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any, name: string) => [
                    name === 'water' ? `${val} L` : `${val} kWh`,
                    name === 'water' ? 'Water' : 'Energy',
                  ]}
                />
                <Bar dataKey="water" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="water" />
                <Bar dataKey="energy" fill="#E6A817" radius={[4, 4, 0, 0]} name="energy" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* ── MANUAL OVERRIDE ── */}
      <Card className={`border-l-4 ${overrideEnabled ? 'border-l-orange-400' : 'border-l-muted'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldAlert className={`h-5 w-5 ${overrideEnabled ? 'text-orange-500' : 'text-muted-foreground'}`} />
              {t('pumping.override.title')}
              {overrideEnabled && (
                <Badge className="bg-orange-500 text-white text-xs">{t('pumping.override.active')}</Badge>
              )}
            </CardTitle>
            <button
              className="flex items-center gap-2 text-sm font-medium"
              onClick={() => {
                if (pumpRunning) return
                setOverrideEnabled((v) => !v)
                setOverrideStatus('idle')
                setOverrideMsg('')
              }}
            >
              {overrideEnabled
                ? <ToggleRight className="h-6 w-6 text-orange-500" />
                : <ToggleLeft className="h-6 w-6 text-muted-foreground" />
              }
              <span className={overrideEnabled ? 'text-orange-600' : 'text-muted-foreground'}>
                {overrideEnabled ? t('pumping.override.on') : t('pumping.override.off')}
              </span>
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {!overrideEnabled ? (
            <div className="p-4 bg-muted/30 rounded-xl text-sm text-muted-foreground flex items-start gap-3">
              <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{t('pumping.override.disabled')}</p>
                <p className="mt-1">{t('pumping.override.disabledDesc')}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Warning */}
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800 dark:text-amber-300">{t('pumping.override.warning')}</p>
                  <p className="text-amber-700 dark:text-amber-400 mt-1">{t('pumping.override.warningText')}</p>
                </div>
              </div>

              {/* Live timer when running */}
              {pumpRunning && (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-green-800 dark:text-green-300 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      {t('pumping.override.pumpRunning')}
                    </span>
                    <span className="font-mono text-lg font-bold text-green-700 dark:text-green-400">
                      {fmtElapsed(elapsed)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white dark:bg-card/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">{t('pumping.override.estWater')}</p>
                      <p className="font-semibold text-blue-600">{liveWater}</p>
                    </div>
                    <div className="bg-white dark:bg-card/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">{t('pumping.override.estEnergy')}</p>
                      <p className="font-semibold text-amber-600">{liveKwh} kWh</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Target inputs */}
              {!pumpRunning && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1">
                      {t('pumping.override.targetWaterLabel')}
                    </label>
                    <input
                      type="number"
                      value={targetWater}
                      onChange={(e) => setTargetWater(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{t('pumping.override.targetWaterHint')}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1">
                      {t('pumping.override.durationLabel')}
                    </label>
                    <input
                      type="number"
                      value={targetDuration}
                      onChange={(e) => setTargetDuration(e.target.value)}
                      placeholder="e.g. 30"
                      className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{t('pumping.override.durationHint')}</p>
                  </div>
                </div>
              )}

              {/* Success / Error message */}
              {overrideMsg && (
                <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
                  overrideStatus === 'success'
                    ? 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300'
                    : 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300'
                }`}>
                  {overrideStatus === 'success'
                    ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    : <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  }
                  {overrideMsg}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!pumpRunning ? (
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                    onClick={handleStart}
                  >
                    <Play className="h-4 w-4" />
                    {t('pumping.override.startNow')}
                  </Button>
                ) : (
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white gap-2"
                    onClick={() => handleStop(false)}
                    disabled={overrideStatus === 'saving'}
                  >
                    {overrideStatus === 'saving'
                      ? <><Loader2 className="h-4 w-4 animate-spin" /> {t('pumping.override.saving')}</>
                      : <><Square className="h-4 w-4" /> {t('pumping.override.stopSave')}</>
                    }
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* ── SESSION LIST ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{t('pumping.recentSessions')}</CardTitle>
            <Badge variant="outline">{sessions.length} {t('pumping.total')}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-sm text-muted-foreground">{t('common.loading')}</div>
          ) : sessions.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">{t('pumping.noSessions')}</div>
          ) : (
            <div className="space-y-3">
              {sessions.slice(0, 15).map((s, idx) => (
                <div
                  key={s.session_id ?? idx}
                  className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ background: '#0ea5e920', color: '#0ea5e9' }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`text-xs ${
                            s.status === 'completed'
                              ? 'bg-green-500 hover:bg-green-600 text-white'
                              : s.status === 'active'
                              ? 'bg-blue-500 hover:bg-blue-600 text-white'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {s.status || 'completed'}
                        </Badge>
                        {s.session_type === 'manual' && (
                          <Badge variant="outline" className="text-xs">manual</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(s.start_time)}
                        {s.end_time && ` — ${durationMins(s.start_time, s.end_time) || ''}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">{t('pumping.water')}</p>
                      <p className="font-semibold text-sky-600">{s.water_pumped_litres ?? '—'} L</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t('pumping.energy')}</p>
                      <p className="font-semibold text-amber-600">{s.energy_consumed_kwh ?? '—'} kWh</p>
                    </div>
                  </div>
                </div>
              ))}
              {sessions.length > 15 && (
                <p className="text-xs text-center text-muted-foreground pt-2">
                  Showing 15 of {sessions.length} sessions
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}