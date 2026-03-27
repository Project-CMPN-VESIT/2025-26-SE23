import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { 
  Zap, 
  WifiOff,
  Wifi,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Clock,
  Activity,
  Calendar
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Grid() {
  const { t } = useLanguage();
  const [alertEnabled, setAlertEnabled] = useState(true);

  // Mock data
  const gridStatus = {
    isOnline: true,
    voltage: 235,
    frequency: 50.1,
    uptime: 98.5
  };

  const voltageQuality = {
    current: 235,
    min: 220,
    max: 240,
    optimal: true
  };

  const upcomingOutages = [
    { date: 'Tomorrow', time: '2:00 PM - 4:00 PM', duration: '2 hours', reason: 'Scheduled Maintenance', area: 'Gadheshwar' },
    { date: 'Feb 24', time: '10:00 AM - 12:00 PM', duration: '2 hours', reason: 'Line Repair', area: 'Gadheshwar & Nearby' },
    { date: 'Feb 27', time: '3:00 PM - 5:00 PM', duration: '2 hours', reason: 'Transformer Upgrade', area: 'District Wide' },
  ];

  const monthlyReliability = [
    { month: 'Aug', uptime: 94, outages: 8 },
    { month: 'Sep', uptime: 96, outages: 6 },
    { month: 'Oct', uptime: 95, outages: 7 },
    { month: 'Nov', uptime: 97, outages: 4 },
    { month: 'Dec', uptime: 98, outages: 3 },
    { month: 'Jan', uptime: 97.5, outages: 4 },
    { month: 'Feb', uptime: 98.5, outages: 3 },
  ];

  const outageLog = [
    { date: 'Feb 19, 2026', time: '3:15 PM', duration: '1h 45m', reason: 'Unplanned Outage', voltage: 'N/A' },
    { date: 'Feb 15, 2026', time: '11:00 AM', duration: '2h 00m', reason: 'Maintenance', voltage: 'N/A' },
    { date: 'Feb 12, 2026', time: '4:30 PM', duration: '45m', reason: 'Equipment Fault', voltage: 'N/A' },
    { date: 'Feb 8, 2026', time: '1:00 PM', duration: '3h 15m', reason: 'Storm Damage', voltage: 'N/A' },
    { date: 'Feb 3, 2026', time: '9:00 AM', duration: '1h 30m', reason: 'Scheduled Work', voltage: 'N/A' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">{t('grid.title')}</h1>
        <p className="text-muted-foreground">{t('grid.subtitle')}</p>
      </div>

      {/* Live Grid Status */}
      <Card className={`border-l-4 ${gridStatus.isOnline ? 'border-l-[#4CAF50]' : 'border-l-[#D32F2F]'}`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {gridStatus.isOnline ? (
                <Wifi className="h-5 w-5 text-[#4CAF50]" />
              ) : (
                <WifiOff className="h-5 w-5 text-[#D32F2F]" />
              )}
              {t('grid.liveStatus')}
            </span>
            <Badge className={gridStatus.isOnline ? 'bg-[#4CAF50]' : 'bg-[#D32F2F]'}>
              {gridStatus.isOnline ? t('grid.online') : t('grid.offline')}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('grid.voltage')}</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{gridStatus.voltage}</span>
                <span className="text-lg text-muted-foreground mb-1">V</span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <Activity className="h-3 w-3 text-[#4CAF50]" />
                <span className="text-xs text-[#4CAF50]">{t('grid.stable')}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('grid.frequency')}</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{gridStatus.frequency}</span>
                <span className="text-lg text-muted-foreground mb-1">Hz</span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <Activity className="h-3 w-3 text-[#4CAF50]" />
                <span className="text-xs text-[#4CAF50]">{t('grid.normal')}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('grid.monthlyUptime')}</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-[#4CAF50]">{gridStatus.uptime}</span>
                <span className="text-lg text-muted-foreground mb-1">%</span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-[#4CAF50]" />
                <span className="text-xs text-[#4CAF50]">+1.2% {t('grid.vsLastMonth')}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('grid.outagesThisMonth')}</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-[#E6A817]">3</span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-[#4CAF50]" />
                <span className="text-xs text-[#4CAF50]">-1 {t('grid.vsLastMonth')}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voltage Quality Indicator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#E6A817]" />
            {t('grid.voltageQuality')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t('grid.currentVoltage')}</p>
              <p className="text-4xl font-bold">{voltageQuality.current}V</p>
            </div>
            <Badge className="bg-[#4CAF50]">{t('grid.optimalRange')}</Badge>
          </div>

          {/* Voltage Range Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('grid.min')}: {voltageQuality.min}V</span>
              <span className="text-muted-foreground">{t('grid.max')}: {voltageQuality.max}V</span>
            </div>
            <div className="relative h-8 bg-muted rounded-full overflow-hidden">
              {/* Optimal range band */}
              <div 
                className="absolute h-full bg-[#4CAF50]/20"
                style={{ 
                  left: '20%', 
                  width: '60%' 
                }}
              />
              {/* Current position marker */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#E6A817] rounded-full shadow-lg"
                style={{ 
                  left: `${((voltageQuality.current - 200) / 50) * 100}%` 
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>200V</span>
              <span className="text-[#4CAF50]">{t('grid.optimal')}: 220-240V</span>
              <span>250V</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Outages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[#F4A300]" />
            {t('grid.upcomingOutages')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingOutages.map((outage, index) => (
            <Card key={index} className="border-l-4 border-l-[#F4A300]">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#F4A300]" />
                      <span className="font-semibold">{outage.date}</span>
                      <Badge variant="secondary">{outage.duration}</Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{outage.time}</span>
                      </div>
                      <p className="text-muted-foreground">{t('grid.reason')}: {outage.reason}</p>
                      <p className="text-muted-foreground">{t('grid.area')}: {outage.area}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Alert Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg mt-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="alert-toggle" className="cursor-pointer">
                {t('grid.alertMe')}
              </Label>
            </div>
            <Switch 
              id="alert-toggle"
              checked={alertEnabled}
              onCheckedChange={setAlertEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Monthly Reliability Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#6B8E6B]" />
            {t('grid.monthlyReliability')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyReliability}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="month" stroke="#757575" />
              <YAxis stroke="#757575" domain={[90, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="uptime" fill="#4CAF50" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Card>
              <CardContent className="pt-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">{t('grid.averageUptime')}</p>
                <p className="text-3xl font-bold text-[#4CAF50]">96.8%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">{t('grid.totalOutages')}</p>
                <p className="text-3xl font-bold text-[#E6A817]">39</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Outage Log Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#757575]" />
            {t('grid.outageLog')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('grid.date')}</TableHead>
                  <TableHead>{t('grid.time')}</TableHead>
                  <TableHead>{t('grid.duration')}</TableHead>
                  <TableHead>{t('grid.reason')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {outageLog.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{log.date}</TableCell>
                    <TableCell>{log.time}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{log.duration}</Badge>
                    </TableCell>
                    <TableCell>{log.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
