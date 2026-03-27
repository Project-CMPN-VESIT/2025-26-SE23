import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { 
  Droplets, 
  Power,
  PowerOff,
  Sun,
  Zap,
  AlertTriangle,
  Clock,
  Download,
  Activity,
  CheckCircle2
} from 'lucide-react';

export function Pumping() {
  const { t } = useLanguage();
  const [showOverrideDialog, setShowOverrideDialog] = useState(false);
  
  // Mock data
  const pumpStatus = {
    isRunning: true,
    currentVoltage: 235,
    solarGeneration: 850,
    waterFlow: 45,
    duration: '00:35:12'
  };

  const schedule = [
    { time: '11:00 AM', duration: '2 hrs', status: 'completed', solarPower: 920, waterTarget: 3000 },
    { time: '02:30 PM', duration: '1.5 hrs', status: 'active', solarPower: 850, waterTarget: 2000 },
    { time: '05:00 PM', duration: '1 hr', status: 'scheduled', solarPower: 450, waterTarget: 1000 },
  ];

  const voltageHistory = [
    { time: '8 AM', voltage: 220, solar: 200 },
    { time: '9 AM', voltage: 225, solar: 450 },
    { time: '10 AM', voltage: 230, solar: 680 },
    { time: '11 AM', voltage: 235, solar: 850 },
    { time: '12 PM', voltage: 238, solar: 920 },
    { time: '1 PM', voltage: 236, solar: 880 },
    { time: '2 PM', voltage: 235, solar: 850 },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">{t('pumping.title')}</h1>
          <p className="text-muted-foreground">{t('pumping.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowOverrideDialog(true)}
          >
            <Power className="mr-2 h-4 w-4" />
            {t('pumping.manualOverride')}
          </Button>
          <Button className="bg-[#6B8E6B] hover:bg-[#5a7a5a]" onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" />
            {t('pumping.downloadSchedule')}
          </Button>
        </div>
      </div>

      {/* Live Pump Status */}
      <Card className={`border-l-4 ${pumpStatus.isRunning ? 'border-l-[#4CAF50]' : 'border-l-[#757575]'}`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {pumpStatus.isRunning ? (
                <Power className="h-5 w-5 text-[#4CAF50]" />
              ) : (
                <PowerOff className="h-5 w-5 text-[#757575]" />
              )}
              {t('pumping.liveStatus')}
            </span>
            <Badge className={pumpStatus.isRunning ? 'bg-[#4CAF50]' : 'bg-[#757575]'}>
              {pumpStatus.isRunning ? t('pumping.running') : t('pumping.stopped')}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('pumping.currentVoltage')}</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{pumpStatus.currentVoltage}</span>
                <span className="text-lg text-muted-foreground mb-1">V</span>
              </div>
              {pumpStatus.isRunning && (
                <div className="mt-2 flex items-center gap-1">
                  <Activity className="h-3 w-3 text-[#4CAF50] animate-pulse" />
                  <span className="text-xs text-[#4CAF50]">{t('pumping.optimal')}</span>
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('pumping.solarGeneration')}</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-[#E6A817]">{pumpStatus.solarGeneration}</span>
                <span className="text-lg text-muted-foreground mb-1">W</span>
              </div>
              <div className="mt-2">
                <Sun className="h-4 w-4 text-[#E6A817]" />
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('pumping.waterFlow')}</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-[#6B8E6B]">{pumpStatus.waterFlow}</span>
                <span className="text-lg text-muted-foreground mb-1">L/min</span>
              </div>
              <div className="mt-2">
                <Droplets className="h-4 w-4 text-[#6B8E6B]" />
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">{t('pumping.runningDuration')}</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{pumpStatus.duration}</span>
              </div>
              <div className="mt-2">
                <Clock className="h-4 w-4 text-[#757575]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voltage & Solar Correlation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#E6A817]" />
            {t('pumping.voltageSolar')}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{t('pumping.correlationDesc')}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {voltageHistory.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.time}</span>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground">{t('pumping.voltage')}: {item.voltage}V</span>
                    <span className="text-[#E6A817]">{t('pumping.solar')}: {item.solar}W</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Progress 
                      value={(item.voltage / 240) * 100} 
                      className="h-2"
                    />
                  </div>
                  <div className="flex-1">
                    <Progress 
                      value={(item.solar / 1000) * 100} 
                      className="h-2 [&>div]:bg-[#E6A817]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#6B8E6B]" />
            {t('pumping.schedule')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedule.map((item, index) => (
              <Card 
                key={index}
                className={`${
                  item.status === 'active' 
                    ? 'border-[#4CAF50] border-2 bg-[#4CAF50]/5' 
                    : item.status === 'completed'
                    ? 'border-[#757575]/30'
                    : ''
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-full ${
                          item.status === 'completed' ? 'bg-[#4CAF50]/10' :
                          item.status === 'active' ? 'bg-[#4CAF50]/20' :
                          'bg-[#E6A817]/10'
                        }`}>
                          {item.status === 'completed' ? (
                            <CheckCircle2 className="h-5 w-5 text-[#4CAF50]" />
                          ) : item.status === 'active' ? (
                            <Power className="h-5 w-5 text-[#4CAF50] animate-pulse" />
                          ) : (
                            <Clock className="h-5 w-5 text-[#E6A817]" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{item.time}</p>
                          <p className="text-sm text-muted-foreground">{t('pumping.duration')}: {item.duration}</p>
                        </div>
                        <Badge className={
                          item.status === 'completed' ? 'bg-[#4CAF50]' :
                          item.status === 'active' ? 'bg-[#4CAF50] animate-pulse' :
                          'bg-[#E6A817]'
                        }>
                          {item.status === 'completed' ? t('pumping.status.completed') : item.status === 'active' ? t('pumping.status.active') : t('pumping.status.scheduled')}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pl-12">
                        <div>
                          <p className="text-xs text-muted-foreground">{t('pumping.solarPower')}</p>
                          <p className="font-semibold text-[#E6A817]">{item.solarPower}W</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{t('pumping.waterTarget')}</p>
                          <p className="font-semibold text-[#6B8E6B]">{item.waterTarget}L</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Manual Override Dialog */}
      <Dialog open={showOverrideDialog} onOpenChange={setShowOverrideDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#F4A300]" />
              {t('pumping.override.title')}
            </DialogTitle>
            <DialogDescription>
              {t('pumping.override.desc')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Card className="bg-[#F4A300]/10 border-[#F4A300]/30">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-[#F4A300] mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">{t('pumping.override.important')}</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>{t('pumping.override.rule1')}</li>
                      <li>{t('pumping.override.rule2')}</li>
                      <li>{t('pumping.override.rule3')}</li>
                      <li>{t('pumping.override.rule4')}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <p className="text-sm font-medium">{t('pumping.override.currentCond')}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">{t('pumping.solarGeneration')}</p>
                  <p className="font-semibold text-[#E6A817]">850W</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">{t('pumping.currentVoltage')}</p>
                  <p className="font-semibold text-[#4CAF50]">235V</p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOverrideDialog(false)}>
              {t('pumping.override.cancel')}
            </Button>
            <Button 
              className={pumpStatus.isRunning ? 'bg-[#D32F2F] hover:bg-[#b71c1c]' : 'bg-[#4CAF50] hover:bg-[#45a049]'}
              onClick={() => setShowOverrideDialog(false)}
            >
              {pumpStatus.isRunning ? (
                <>
                  <PowerOff className="mr-2 h-4 w-4" />
                  {t('pumping.override.stop')}
                </>
              ) : (
                <>
                  <Power className="mr-2 h-4 w-4" />
                  {t('pumping.override.start')}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
