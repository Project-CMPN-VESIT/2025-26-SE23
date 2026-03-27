import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  Sun, 
  Droplets, 
  Zap, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  IndianRupee,
  Calendar
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router';
import VillagePic1 from '../../assets/VillagePic1.jpg';
import VillagePic2 from '../../assets/VillagePic2.jpg';

export function Dashboard() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const images = [VillagePic1, VillagePic2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Mock data
  const status: string = 'safe'; // safe, caution, stop
  const stats = {
    outages: 3,
    solarHours: 6.5,
    waterPumped: 4500,
    energySaved: 2340
  };

  const statusConfig = {
    safe: {
      color: 'bg-[#4CAF50]',
      text: t('dashboard.status.safe'),
      icon: Sun
    },
    caution: {
      color: 'bg-[#F4A300]',
      text: t('dashboard.status.caution'),
      icon: AlertTriangle
    },
    stop: {
      color: 'bg-[#D32F2F]',
      text: t('dashboard.status.stop'),
      icon: Zap
    }
  };

  const currentStatus = statusConfig[status as keyof typeof statusConfig];
  const StatusIcon = currentStatus.icon;

  const createSolarReportPayload = () => {
    const baseDate = new Date().toISOString().split('T')[0];
    return {
      reportType: 'solar',
      generatedOn: new Date().toISOString(),
      reportDate: baseDate,
      language: 'en',
      summary: 'Overview of solar generation performance, efficiency level of system, and key highlights of the day.',
      details: {
        totalEnergyGenerated: 125,
        peakGenerationTime: '11:30 AM - 2:30 PM',
        averageIrradiance: 780,
        systemEfficiency: 87
      }
    };
  };

  const downloadSolarReportPDF = () => {
    const payload = createSolarReportPayload();
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40;
    const contentWidth = 520;
    let offsetY = 40;

    const reportLines = [
      '🌞 SOLAR PERFORMANCE REPORT',
      '',
      'Village: Gadheshwar',
      `Date: ${payload.reportDate}`,
      '---',
      '1. Executive Summary',
      payload.summary,
      '---',
      '2. Energy Generation Summary',
      'Parameter | Value',
      'Total Energy Generated | 125 kWh',
      'Peak Generation Time | 11:30 AM - 2:30 PM',
      'Average Irradiance | 780 W/m²',
      'System Efficiency | 87%',
      '---',
      '3. Generation Trend (Graph Section)',
      '• Hourly solar generation',
      '• Peak vs low production comparison',
      '---',
      '4. Weather Impact Analysis',
      '• Cloud cover percentage',
      '• Temperature impact',
      '• Irradiance fluctuations',
      '---',
      '5. Golden Hours Identification',
      'Time Range | Output Level',
      '11:00–1:00 | High',
      '1:00–3:00 | Medium',
      '---',
      '6. Loss & Inefficiency Analysis',
      '• Energy lost due to weather',
      '• Idle solar capacity',
      '• System underutilization %',
      '---',
      '7. Recommendations',
      '• Optimize pump timing',
      '• Increase storage if surplus detected',
      '---',
      '8. Conclusion',
      'Overall solar system performance summary',
    ];

    doc.setFontSize(16);
    doc.text(reportLines[0], margin, offsetY);
    offsetY += 20;

    doc.setFontSize(11);

    for (let i = 1; i < reportLines.length; i += 1) {
      const line = reportLines[i];

      if (line === '---') {
        offsetY += 6;
        doc.setDrawColor(180);
        doc.setLineWidth(0.5);
        doc.line(margin, offsetY, margin + contentWidth, offsetY);
        offsetY += 12;
        continue;
      }

      const wrapped = doc.splitTextToSize(line, contentWidth);
      const availableHeight = 820 - offsetY;

      if (wrapped.length * 12 > availableHeight) {
        doc.addPage();
        offsetY = margin;
      }

      doc.text(wrapped, margin, offsetY);
      offsetY += wrapped.length * 12 + 6;
    }

    doc.save(`solar-report-${payload.reportDate}.pdf`);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Hero Status Section - Reduced size and structured */}
      <Card className="border-l-4" style={{ borderLeftColor: currentStatus.color.replace('bg-', '') }}>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Status Button - Reduced by 50% */}
            <div className="flex items-center gap-4">
              <div className={`${currentStatus.color} p-4 rounded-full`}>
                <StatusIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{currentStatus.text}</h3>
                <p className="text-sm text-muted-foreground">
                  {status === 'safe' && t('dashboard.statusSafe.desc')}
                  {status === 'caution' && t('dashboard.statusCaution.desc')}
                  {status === 'stop' && t('dashboard.statusStop.desc')}
                </p>
                <Badge variant="secondary" className="mt-2">
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="text-xs">{t('common.updatedAgo')}</span>
                </Badge>
              </div>
            </div>

            {/* Right: Status Legend */}
            <div className="border-l pl-6 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground mb-3">{t('dashboard.statusGuide')}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4CAF50]" />
                  <span className="text-sm">{t('dashboard.statusSafe')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F4A300]" />
                  <span className="text-sm">{t('dashboard.statusCareful')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#D32F2F]" />
                  <span className="text-sm">{t('dashboard.statusStop')}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('dashboard.outages')}</p>
                <p className="text-3xl font-bold text-[#D32F2F]">{stats.outages}</p>
              </div>
              <Zap className="h-8 w-8 text-[#D32F2F]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('dashboard.solarHours')}</p>
                <p className="text-3xl font-bold text-[#E6A817]">{stats.solarHours}</p>
              </div>
              <Sun className="h-8 w-8 text-[#E6A817]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('dashboard.waterPumped')}</p>
                <p className="text-3xl font-bold text-[#6B8E6B]">{stats.waterPumped}L</p>
              </div>
              <Droplets className="h-8 w-8 text-[#6B8E6B]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('dashboard.energySaved')}</p>
                <p className="text-3xl font-bold text-[#4CAF50]">₹{stats.energySaved}</p>
              </div>
              <IndianRupee className="h-8 w-8 text-[#4CAF50]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Village Image Banner */}
      <Card className="overflow-hidden">
        <div className="relative h-64 md:h-80 flex bg-black">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <ImageWithFallback
                src={src}
                alt={`Gadheshwar Village ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-4 left-4 text-white z-20">
            <h3 className="text-xl font-heading font-semibold drop-shadow-md">{t('dashboard.village')}</h3>
            <p className="text-sm text-white/90 drop-shadow-md">{t('dashboard.location')} · {new Date().toLocaleDateString(language === 'en' ? 'en-US' : language === 'hi' ? 'hi-IN' : 'mr-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </Card>

      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Solar Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sun className="h-5 w-5 text-[#E6A817]" />
              {t('dashboard.solarForecast')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('dashboard.peakGeneration')}</span>
                <span className="font-semibold">11:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t('dashboard.estimatedOutput')}</span>
                <span className="font-semibold">8.2 kWh</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t('dashboard.weather')}</span>
                <span className="font-semibold">{t('dashboard.sunny')}</span>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>{t('dashboard.generationConfidence')}</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Water Tank Fill */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Droplets className="h-5 w-5 text-[#6B8E6B]" />
              {t('dashboard.waterTank')}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#6B8E6B"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.68)}`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">68%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">6,800 / 10,000 {t('common.liters')}</p>
              <p className="text-xs text-[#6B8E6B] mt-1">{t('dashboard.targetEvening')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Next Golden Hour */}
        <Card className="bg-gradient-to-br from-[#E6A817]/10 to-[#F4A300]/10 border-[#E6A817]/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sun className="h-5 w-5 text-[#E6A817]" />
              {t('dashboard.goldenHour')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">{t('dashboard.startingIn')}</p>
              <p className="text-4xl font-bold text-[#E6A817]">2:45</p>
              <p className="text-sm text-muted-foreground mt-1">{t('common.hours')}</p>
            </div>
            <div className="border-t pt-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>{t('dashboard.timeWindow')}</span>
                <span className="font-semibold">11:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>{t('dashboard.recommendedAction')}</span>
                <span className="font-semibold text-[#6B8E6B]">{t('dashboard.pumpWater')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[#F4A300]" />
            {t('dashboard.recentAlerts')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: 'grid', message: t('dashboard.alert.grid'), time: t('dashboard.alert.1hour'), color: '#D32F2F' },
              { type: 'solar', message: t('dashboard.alert.solar'), time: t('dashboard.alert.2hours'), color: '#E6A817' },
              { type: 'water', message: t('dashboard.alert.water'), time: t('dashboard.alert.4hours'), color: '#6B8E6B' },
            ].map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: alert.color }} />
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button size="lg" className="w-full bg-[#6B8E6B] hover:bg-[#5a7a5a]" onClick={() => navigate('/pumping')}>
          <Droplets className="mr-2 h-5 w-5" />
          {t('dashboard.startPump')}
        </Button>
        <Button size="lg" className="w-full bg-[#E6A817] hover:bg-[#D49912] text-white border-none" onClick={() => navigate('/pumping')}>
          <Calendar className="mr-2 h-5 w-5" />
          {t('dashboard.todaySchedule')}
        </Button>
        <Button size="lg" variant="outline" className="w-full" onClick={downloadSolarReportPDF}>
          <TrendingUp className="mr-2 h-5 w-5" />
          {t('dashboard.downloadReport')}
        </Button>
      </div>
    </div>
  );
}