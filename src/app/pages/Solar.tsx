import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Sun, 
  CloudSun,
  CloudRain,
  Download,
  RefreshCw,
  Activity,
  TrendingUp
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart
} from 'recharts';

export function Solar() {
  const { t } = useLanguage();

  // Mock 24-hour solar data
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    label: `${i}:00`,
    generation: i >= 6 && i <= 18 
      ? Math.sin((i - 6) * Math.PI / 12) * (80 + Math.random() * 20) 
      : 0,
    isGoldenHour: i >= 11 && i <= 14
  }));

  // Mock 7-day forecast
  const forecastData = [
    { day: 'Mon', temp: 32, generation: 85, weather: 'sunny', icon: '☀️' },
    { day: 'Tue', temp: 31, generation: 88, weather: 'sunny', icon: '☀️' },
    { day: 'Wed', temp: 30, generation: 75, weather: 'partly-cloudy', icon: '⛅' },
    { day: 'Thu', temp: 28, generation: 60, weather: 'cloudy', icon: '☁️' },
    { day: 'Fri', temp: 29, generation: 70, weather: 'partly-cloudy', icon: '⛅' },
    { day: 'Sat', temp: 33, generation: 90, weather: 'sunny', icon: '☀️' },
    { day: 'Sun', temp: 33, generation: 92, weather: 'sunny', icon: '☀️' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">{t('solar.title')}</h1>
          <p className="text-muted-foreground">{t('solar.subtitle')}</p>
        </div>
        <Button className="bg-[#E6A817] hover:bg-[#d09815]" onClick={() => window.print()}>
          <Download className="mr-2 h-4 w-4" />
          {t('solar.downloadForecast')}
        </Button>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Panel Efficiency */}
        <Card className="border-l-4 border-l-[#E6A817]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#E6A817]" />
              {t('solar.panelEfficiency')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-[#E6A817]">92%</span>
                <TrendingUp className="h-5 w-5 text-[#4CAF50] mb-2" />
              </div>
              <p className="text-sm text-muted-foreground">{t('solar.optimalPerformance')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Data Source */}
        <Card className="border-l-4 border-l-[#6B8E6B]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CloudSun className="h-4 w-4 text-[#6B8E6B]" />
                {t('solar.dataSource')}
              </span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => window.location.reload()}>
                <RefreshCw className="h-3 w-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-[#6B8E6B]/10 text-[#6B8E6B]">
                {t('about.tags.api')}
              </Badge>
              <p className="text-xs text-muted-foreground">
                {t('solar.lastUpdated')}: 10 min ago
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Today's Generation */}
        <Card className="border-l-4 border-l-[#4CAF50]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Sun className="h-4 w-4 text-[#4CAF50]" />
              {t('solar.todaysGeneration')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-[#4CAF50]">6.8</span>
                <span className="text-lg text-muted-foreground mb-1">kWh</span>
              </div>
              <p className="text-sm text-muted-foreground">{t('solar.target')}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 24-Hour Solar Generation Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-[#E6A817]" />
            {t('solar.24hProfile')}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {t('solar.goldenHours')} {t('solar.goldenHoursDesc')}
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="colorGeneration" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E6A817" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#E6A817" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis 
                dataKey="label" 
                stroke="#757575"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="#757575"
                tick={{ fontSize: 12 }}
                label={{ value: 'Power (W)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px'
                }}
              />
              {/* Golden Hour bars - thin and elegant */}
              <Bar 
                dataKey={(entry) => entry.isGoldenHour ? 100 : 0}
                fill="#E6A817"
                fillOpacity={0.15}
                barSize={20}
              />
              <Area 
                type="monotone" 
                dataKey="generation" 
                stroke="#E6A817" 
                strokeWidth={2}
                fill="url(#colorGeneration)" 
              />
            </AreaChart>
          </ResponsiveContainer>
          
          {/* Golden Hour Indicator */}
          <div className="mt-4 p-3 bg-[#E6A817]/10 rounded-lg border border-[#E6A817]/30">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-[#E6A817]" />
              <div>
                <p className="font-semibold text-[#E6A817]">{t('solar.goldenHoursTime')}</p>
                <p className="text-sm text-muted-foreground">{t('solar.peakWindow')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudSun className="h-5 w-5 text-[#6B8E6B]" />
            {t('solar.forecast7day')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {forecastData.map((day, index) => (
              <Card 
                key={index} 
                className={`text-center ${index === 0 ? 'border-[#E6A817] border-2' : ''}`}
              >
                <CardContent className="pt-4 space-y-2">
                  <p className="font-semibold">{day.day}</p>
                  <div className="text-3xl">{day.icon}</div>
                  <p className="text-2xl font-bold text-[#E6A817]">{day.generation}%</p>
                  <p className="text-sm text-muted-foreground">{day.temp}°C</p>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      day.generation >= 85 ? 'bg-[#4CAF50]/10 text-[#4CAF50]' : 
                      day.generation >= 70 ? 'bg-[#F4A300]/10 text-[#F4A300]' : 
                      'bg-[#757575]/10 text-[#757575]'
                    }`}
                  >
                    {day.generation >= 85 ? t('solar.excellent') : day.generation >= 70 ? t('solar.good') : t('solar.fair')}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart View */}
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="day" stroke="#757575" />
                <YAxis stroke="#757575" />
                <Tooltip />
                <Bar dataKey="generation" fill="#E6A817" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('solar.panelDetails')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('solar.totalCapacity')}</span>
              <span className="font-semibold">10 kW</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('solar.panelType')}</span>
              <span className="font-semibold">Monocrystalline</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('solar.installDate')}</span>
              <span className="font-semibold">Jan 2025</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('solar.warranty')}</span>
              <span className="font-semibold">25 years</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('solar.monthlyPerformance')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('common.thisMonth')}</span>
              <span className="font-semibold text-[#4CAF50]">245 kWh</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('common.lastMonth')}</span>
              <span className="font-semibold">238 kWh</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('solar.avgDaily')}</span>
              <span className="font-semibold">8.2 kWh</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('solar.bestDay')}</span>
              <span className="font-semibold text-[#E6A817]">9.8 kWh</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}