import { useLanguage } from '../contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import {
  Download,
  MapPin,
  RefreshCw,
  CloudSun,
  Thermometer,
  Sun,
  Zap,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react'

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
  ReferenceArea,
} from 'recharts'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import {
  getCurrentLocation,
  fetchSolarWeatherData,
  getCityName,
  generateFallbackHourlyData,
  type HourlyWeatherData,
} from '../../lib/weatherService'

type LocationState = 'idle' | 'requesting' | 'granted' | 'denied' | 'error'

export function Solar() {
  const { t } = useLanguage()

  // 🔥 DB STATES
  const [solarData, setSolarData] = useState<any[]>([])
  const [dbLoading, setDbLoading] = useState(true)

  // 🌤 WEATHER STATES
  type LocationState = 'idle' | 'requesting' | 'granted' | 'denied' | 'error'

  interface WeatherDisplay {
    city: string
    temperature: number
    cloudcover: number
  }

  const [locationState, setLocationState] = useState<LocationState>('idle')
  const [hourlyData, setHourlyData] = useState<HourlyWeatherData[]>([])
  const [weatherInfo, setWeatherInfo] = useState<WeatherDisplay | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // 🔥 FETCH SOLAR PANELS
  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from('solar_panel')
          .select('*')
        if (error) throw error
        setSolarData(data || [])
      } catch (err: any) {
        console.error('Supabase error:', err.message)
        setSolarData([])
      } finally {
        setDbLoading(false)
      }
    }
    load()
  }, [])

  // 🌤 FETCH WEATHER
  useEffect(() => {
    fetchWeatherData()
  }, [])

  async function fetchWeatherData() {
    setWeatherLoading(true)
    setLocationState('requesting')
    try {
      const { lat, lon } = await getCurrentLocation()
      setLocationState('granted')
      const [{ hourlyData: hd, weatherInfo: wi }, city] = await Promise.all([
        fetchSolarWeatherData(lat, lon),
        getCityName(lat, lon),
      ])
      setHourlyData(hd)
      setWeatherInfo({
        city,
        temperature: wi.temperature ?? 0,
        cloudcover: wi.cloudcover ?? 0,
      })
      setLastUpdated(new Date())
    } catch (err: any) {
      console.error('Weather error:', err)
      const state = err?.code === 1 ? 'denied' : 'error'
      setLocationState(state)
      // Use fallback data so the chart is never empty
      setHourlyData(generateFallbackHourlyData())
    } finally {
      setWeatherLoading(false)
    }
  }

  const activePanels = solarData.filter((p) => p.is_active).length
  const totalCapacity = solarData.reduce((sum, p) => sum + (p.total_capacity_kw || 0), 0)

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">

      {/* ── HEADER ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sun className="h-6 w-6 text-amber-500" />
            {t('solar.title')}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{t('solar.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground hidden sm:block">
              {t('solar.lastUpdated')}: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <Button size="sm" variant="outline" onClick={fetchWeatherData} disabled={weatherLoading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${weatherLoading ? 'animate-spin' : ''}`} />
            {t('common.refresh')}
          </Button>
          <Button size="sm" variant="outline" onClick={() => window.print()}>
            <Download className="h-4 w-4 mr-1" />
            {t('solar.downloadForecast')}
          </Button>
        </div>
      </div>

      {/* ── SUMMARY STATS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: t('solar.activePanels'),
            value: dbLoading ? '—' : activePanels,
            sub: `of ${solarData.length} total`,
            color: '#E6A817',
            icon: Sun,
          },
          {
            label: t('solar.totalCapacity'),
            value: dbLoading ? '—' : `${totalCapacity.toFixed(1)} kW`,
            sub: t('solar.panelDetails'),
            color: '#6B8E6B',
            icon: Zap,
          },
          {
            label: t('solar.temperature'),
            value: weatherInfo ? `${weatherInfo.temperature}°C` : '—',
            sub: weatherInfo?.city || (locationState === 'requesting' ? 'Locating…' : 'Not available'),
            color: '#C56A3D',
            icon: Thermometer,
          },
          {
            label: t('solar.cloudCover'),
            value: weatherInfo ? `${weatherInfo.cloudcover}%` : '—',
            sub: weatherInfo ? (weatherInfo.cloudcover < 30 ? t('solar.excellent') : weatherInfo.cloudcover < 60 ? t('solar.good') : t('solar.fair')) : '—',
            color: '#4CAF50',
            icon: CloudSun,
          },
        ].map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.label} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-5 pb-4">
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                  style={{ background: `${item.color}20` }}
                >
                  <Icon className="h-5 w-5" style={{ color: item.color }} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ── WEATHER LOCATION CARD ── */}
      {weatherInfo && (
        <Card className="border-l-4 border-l-amber-400">
          <CardContent className="py-4">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-amber-500" />
                <span className="font-medium">{weatherInfo.city}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <span>{weatherInfo.temperature}°C</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CloudSun className="h-4 w-4 text-sky-500" />
                <span>{weatherInfo.cloudcover}% {t('solar.weather.cloudy').toLowerCase()}</span>
              </div>
              <Badge
                variant="outline"
                className={weatherInfo.cloudcover < 30
                  ? 'border-green-400 text-green-600'
                  : weatherInfo.cloudcover < 60
                  ? 'border-amber-400 text-amber-600'
                  : 'border-gray-400 text-gray-600'
                }
              >
                {weatherInfo.cloudcover < 30 ? `☀️ ${t('solar.excellent')}` : weatherInfo.cloudcover < 60 ? `⛅ ${t('solar.good')}` : `☁️ ${t('solar.fair')}`}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {locationState === 'denied' && (
        <Card className="border-l-4 border-l-yellow-400">
          <CardContent className="py-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Location access denied</p>
              <p className="text-xs text-muted-foreground">Weather data requires location permission. Please enable it in your browser settings.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── 24H SOLAR CHART ── */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <CardTitle className="text-base">{t('solar.24hProfile')}</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t('solar.goldenHoursDesc')}
                {(locationState === 'denied' || locationState === 'error') && (
                  <span className="ml-2 text-amber-500">(Estimated — location unavailable)</span>
                )}
              </p>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ background: '#22c55e' }} />
                Low (0–25)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ background: '#E6A817' }} />
                Medium (25–50)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ background: '#f97316' }} />
                High (50–75)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ background: '#ef4444' }} />
                Peak (75–100)
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {hourlyData.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground text-sm">
              {weatherLoading ? t('common.loading') : t('common.noData')}
            </div>
          ) : (
            <div className="flex gap-3">
              {/* ── Range labels on the side ── */}
              <div className="flex flex-col justify-between text-right pr-2 py-1" style={{ minWidth: '72px', height: '300px' }}>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold" style={{ color: '#ef4444' }}>Peak</span>
                  <span className="text-[9px] text-muted-foreground">75 – 100</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold" style={{ color: '#f97316' }}>High</span>
                  <span className="text-[9px] text-muted-foreground">50 – 75</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold" style={{ color: '#E6A817' }}>Medium</span>
                  <span className="text-[9px] text-muted-foreground">25 – 50</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold" style={{ color: '#22c55e' }}>Low</span>
                  <span className="text-[9px] text-muted-foreground">0 – 25</span>
                </div>
              </div>

              {/* ── Chart ── */}
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={hourlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <defs>
                      {/* Multi-stop gradient: green (low) → amber (medium) → orange (high) → red (peak) */}
                      <linearGradient id="solarGradColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#ef4444" stopOpacity={0.85} />
                        <stop offset="25%"  stopColor="#f97316" stopOpacity={0.75} />
                        <stop offset="50%"  stopColor="#E6A817" stopOpacity={0.65} />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity={0.30} />
                      </linearGradient>
                      {/* Stroke gradient */}
                      <linearGradient id="solarStroke" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#ef4444" />
                        <stop offset="30%"  stopColor="#f97316" />
                        <stop offset="60%"  stopColor="#E6A817" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                    </defs>

                    {/* ── Coloured background bands ── */}
                    <ReferenceArea y1={75} y2={100} fill="#ef444415" strokeOpacity={0} />
                    <ReferenceArea y1={50} y2={75}  fill="#f9731615" strokeOpacity={0} />
                    <ReferenceArea y1={25} y2={50}  fill="#E6A81715" strokeOpacity={0} />
                    <ReferenceArea y1={0}  y2={25}  fill="#22c55e15" strokeOpacity={0} />

                    <CartesianGrid strokeDasharray="3 3"
                      stroke="#00000015" vertical={false} />

                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: '#00000020' }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      tickCount={5}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: '10px',
                        fontSize: '12px',
                        border: '1px solid #E6A81740',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                      formatter={(val: any) => {
                        const v = Number(val)
                        const zone = v >= 75 ? '🔴 Peak' : v >= 50 ? '🟠 High' : v >= 25 ? '🟡 Medium' : '🟢 Low'
                        return [`${v} kWh  ${zone}`, 'Generation']
                      }}
                      labelFormatter={(label) => `⏰ ${label}`}
                    />

                    {/* ── Zone reference lines ── */}
                    <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="4 3" strokeWidth={1}
                      label={{ value: '75', position: 'right', fill: '#ef4444', fontSize: 9 }} />
                    <ReferenceLine y={50} stroke="#f97316" strokeDasharray="4 3" strokeWidth={1}
                      label={{ value: '50', position: 'right', fill: '#f97316', fontSize: 9 }} />
                    <ReferenceLine y={25} stroke="#E6A817" strokeDasharray="4 3" strokeWidth={1}
                      label={{ value: '25', position: 'right', fill: '#E6A817', fontSize: 9 }} />

                    <Area
                      type="monotone"
                      dataKey="generation"
                      stroke="url(#solarStroke)"
                      strokeWidth={2.5}
                      fill="url(#solarGradColor)"
                      dot={false}
                      activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── SOLAR PANELS TABLE ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{t('solar.panelDetails')}</CardTitle>
            <Badge variant="outline">{solarData.length} panels</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {dbLoading ? (
            <div className="py-8 text-center text-sm text-muted-foreground">{t('common.loading')}</div>
          ) : solarData.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">{t('common.noData')}</div>
          ) : (
            <div className="space-y-3">
              {solarData.map((panel, idx) => (
                <div
                  key={panel.panel_id}
                  className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{ background: '#E6A81720', color: '#E6A817' }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">Panel #{panel.panel_id}</p>
                      <p className="text-xs text-muted-foreground">
                        {t('solar.installDate')}: {panel.installation_date || '—'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground text-xs">{t('solar.totalCapacity')}</span>
                      <p className="font-semibold">{panel.total_capacity_kw ?? '—'} kW</p>
                    </div>
                    <div>
                      {panel.is_active ? (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Active
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1">
                          <XCircle className="h-3 w-3" /> Inactive
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}