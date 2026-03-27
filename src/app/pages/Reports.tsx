import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { 
  FileText,
  Download,
  MessageCircle,
  Calendar,
  FileBarChart,
  BarChart3,
  FileWarning,
  ClipboardCheck
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

type ReportType = 'solar' | 'pumping' | 'grid' | 'compliance';

export function Reports() {
  const { t } = useLanguage();
  const [reportType, setReportType] = useState<ReportType>('solar');
  const [dateRange, setDateRange] = useState('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState<ReportType>('solar');
  const [selectedReportDate, setSelectedReportDate] = useState('');
  const [selectedReportLanguage, setSelectedReportLanguage] = useState<'en' | 'hi' | 'mr'>('en');

  const createReportPayload = (type: ReportType, date: string, language: 'en' | 'hi' | 'mr') => {
    const baseDate = date || new Date().toISOString().split('T')[0];
    const base = {
      reportType: type,
      generatedOn: new Date().toISOString(),
      reportDate: baseDate,
      language,
      summary: `Detailed ${type} report for ${baseDate} in ${language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Marathi'}`,
      details: {} as Record<string, string | number>,
    };

    if (type === 'solar') {
      base.details = {
        totalSolarHours: 190,
        totalGeneration_kWh: 2340,
        peakPower_w: 920,
        avgSystemEfficiency_pct: 88,
        availability_pct: 95,
        reliabilityScore: 93,
        potentialSavingsINR: 1250,
        consumptionKWh: 1820,
      };
    } else if (type === 'pumping') {
      base.details = {
        waterPumped_l: 4500,
        pumpRuntime_h: 22,
        energyConsumption_kWh: 320,
        scheduleCompliance_pct: 97,
        maintenanceEvents: 1,
      };
    } else if (type === 'grid') {
      base.details = {
        outages: 2,
        voltageStability_pct: 94,
        avgVoltage_V: 233,
        frequencyHz: 49.9,
        reliabilityScore: 89,
      };
    } else {
      base.details = {
        sdg7: 'On track',
        sdg8: 'Stable',
        complianceScore_pct: 92,
        actionItems: 'increase battery reserves',
      };
    }

    return base;
  };

  const downloadReportFile = (payload: Record<string, unknown>) => {
    const fileName = `${payload.reportType || 'report'}-${payload.reportDate || 'now'}-${payload.language || 'en'}.json`;
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerateDialog = () => {
    setSelectedReportType(reportType);
    setSelectedReportDate(new Date().toISOString().split('T')[0]);
    setSelectedReportLanguage('en');
    setIsGenerateDialogOpen(true);
  };

  const downloadReportAsPDF = (payload: ReturnType<typeof createReportPayload>) => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40;
    const contentWidth = 520;
    let offsetY = 40;

    let reportLines: string[] = [];

    if (payload.reportType === 'solar') {
      reportLines = [
        '🌞 SOLAR PERFORMANCE REPORT',
        '',
        'Village: Gadheshwar',
        `Date: ${payload.reportDate}`,
        '---',
        '1. Executive Summary',
        '• Overview of solar generation performance',
        '• Efficiency level of system',
        '• Key highlights of the day',
        '---',
        '2. Energy Generation Summary',
        'Parameter              | Value',
        'Total Energy Generated | ' + (payload.details?.totalGeneration_kWh || 'XX') + ' kWh',
        'Peak Generation Time   | ' + (payload.details?.peakPower_w || 'XX:XX'),
        'Average Irradiance     | ' + (payload.details?.avgSystemEfficiency_pct || 'XX') + ' W/m²',
        'System Efficiency      | ' + (payload.details?.availability_pct || 'XX') + '%',
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
        '1:00–3:00  | Medium',
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
        '• Overall solar system performance summary',
      ];
    } else if (payload.reportType === 'pumping') {
      reportLines = [
        '💧 WATER PUMPING REPORT',
        '',
        'Village: Gadheshwar',
        `Date: ${payload.reportDate}`,
        '---',
        '1. Executive Summary',
        '• Water supply performance overview',
        '• Pumping efficiency status',
        '---',
        '2. Pumping Activity Summary',
        'Parameter          | Value',
        'Total Pump Runtime | ' + (payload.details?.pumpRuntime_h || 'XX') + ' hrs',
        'Water Pumped       | ' + (payload.details?.waterPumped_l || 'XX') + ' Liters',
        'Tank Level (Start) | XX%',
        'Tank Level (End)   | XX%',
        '---',
        '3. Pump Schedule Compliance',
        'Time Slot | Planned | Actual | Status',
        '11:00 AM  | Yes     | Yes    | ✅',
        '2:00 PM   | Yes     | No     | ❌',
        '---',
        '4. Solar Alignment Analysis',
        '• % pumping done during peak solar hours',
        '• Grid dependency (if any)',
        '---',
        '5. Water Availability Analysis',
        '• Supply consistency',
        '• Shortage incidents',
        '---',
        '6. Issues Detected',
        '• Pump delays',
        '• Insufficient solar availability',
        '---',
        '7. Recommendations',
        '• Adjust pump timing to Golden Hours',
        '• Improve storage management',
        '---',
        '8. Conclusion',
        '• Effectiveness of water supply system',
      ];
    } else if (payload.reportType === 'grid') {
      reportLines = [
        '⚡ GRID RELIABILITY REPORT',
        '',
        'Village: Gadheshwar',
        `Date: ${payload.reportDate}`,
        '---',
        '1. Executive Summary',
        '• Overview of grid performance',
        '• Impact on village utilities',
        '---',
        '2. Outage Summary',
        'Parameter             | Value',
        'Total Outage Duration | ' + (payload.details?.outages || 'XX') + ' hrs',
        'Number of Outages     | ' + (payload.details?.outages || 'XX'),
        'Longest Outage        | XX mins',
        '---',
        '3. Outage Event Log',
        'Time    | Duration | Type',
        '9:00 AM | 30 min   | Power Cut',
        '4:30 PM | 1 hr     | Voltage Failure',
        '---',
        '4. Voltage Analysis',
        '• Stable vs unstable periods',
        '• Fluctuation frequency',
        '---',
        '5. Impact Assessment',
        '• Water pumping disruptions',
        '• Street light failures',
        '---',
        '6. Dependency Analysis',
        '• % reliance on grid vs solar',
        '---',
        '7. Evidence for Authorities',
        '• Repeated outage patterns',
        '• Voltage irregularity proof',
        '---',
        '8. Recommendations',
        '• Report recurring issues',
        '• Increase solar dependency',
        '---',
        '9. Conclusion',
        '• Overall grid reliability status',
      ];
    } else if (payload.reportType === 'compliance') {
      reportLines = [
        '📊 COMPLIANCE REPORT',
        '',
        'Village: Gadheshwar',
        `Date: ${payload.reportDate}`,
        '---',
        '1. Executive Summary',
        '• Compliance with energy policies',
        '• Sustainability performance',
        '---',
        '2. Renewable Energy Usage',
        'Parameter          | Value',
        'Solar Contribution | ' + (payload.details?.sdg7 || 'XX') + '%',
        'Grid Contribution  | XX%',
        '---',
        '3. SDG Goal Tracking',
        'Goal           | Status',
        'Clean Energy   | ✅ Achieved',
        'Water Access   | ⚠️ Improving',
        'Sustainability | ✅ On Track',
        '---',
        '4. Government Scheme Alignment',
        '• Solar adoption compliance',
        '• Rural electrification standards',
        '---',
        '5. Resource Utilization Efficiency',
        '• Energy wastage %',
        '• Water efficiency %',
        '---',
        '6. Environmental Impact',
        '• Carbon reduction estimate',
        '• Diesel/pollution avoided',
        '---',
        '7. Audit Logs',
        '• System activity logs',
        '• Data integrity checks',
        '---',
        '8. Recommendations',
        '• Improve weak compliance areas',
        '• Expand renewable usage',
        '---',
        '9. Conclusion',
        '• Overall compliance status',
      ];
    }

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

    doc.save(`${payload.reportType}-report-${payload.reportDate}.pdf`);
  };

  const handleGenerateAndDownload = () => {
    const payload = createReportPayload(selectedReportType, selectedReportDate, selectedReportLanguage);
    downloadReportAsPDF(payload);
    setIsGenerateDialogOpen(false);
  };

  const downloadCurrentReportAsPDF = () => {
    const reportDate = dateRange === 'custom' && startDate ? startDate : new Date().toISOString().split('T')[0];
    const payload = createReportPayload(reportType, reportDate, selectedReportLanguage || 'en');
    downloadReportAsPDF(payload);
  };

  const openGenerateDialogForType = (type: ReportType) => {
    setSelectedReportType(type);
    setSelectedReportDate(new Date().toISOString().split('T')[0]);
    setSelectedReportLanguage('en');
    setIsGenerateDialogOpen(true);
  };

  const handleDownloadFromHistory = (row: { date: string; type: string; period: string }) => {
    const normalizedType = (row.type.toLowerCase().includes('solar') ? 'solar' : row.type.toLowerCase().includes('water') ? 'pumping' : row.type.toLowerCase().includes('grid') ? 'grid' : 'compliance') as ReportType;
    const payload = createReportPayload(normalizedType, row.date, 'en');
    downloadReportAsPDF(payload);
  };

  const reportCategories = [
    {
      id: 'solar',
      icon: FileBarChart,
      title: t('reports.cat.solar.title'),
      description: t('reports.cat.solar.desc'),
      color: 'text-[#E6A817]',
      bgColor: 'bg-[#E6A817]/10'
    },
    {
      id: 'pumping',
      icon: BarChart3,
      title: t('reports.cat.pumping.title'),
      description: t('reports.cat.pumping.desc'),
      color: 'text-[#6B8E6B]',
      bgColor: 'bg-[#6B8E6B]/10'
    },
    {
      id: 'grid',
      icon: FileWarning,
      title: t('reports.cat.grid.title'),
      description: t('reports.cat.grid.desc'),
      color: 'text-[#D32F2F]',
      bgColor: 'bg-[#D32F2F]/10'
    },
    {
      id: 'compliance',
      icon: ClipboardCheck,
      title: t('reports.cat.compliance.title'),
      description: t('reports.cat.compliance.desc'),
      color: 'text-[#4CAF50]',
      bgColor: 'bg-[#4CAF50]/10'
    },
  ];

  const reportHistory = [
    { date: 'Feb 20, 2026', type: 'Solar Performance', period: 'Weekly', size: '2.4 MB', status: 'Generated' },
    { date: 'Feb 15, 2026', type: 'Water Pumping', period: 'Weekly', size: '1.8 MB', status: 'Generated' },
    { date: 'Feb 10, 2026', type: 'Grid Reliability', period: 'Monthly', size: '3.2 MB', status: 'Generated' },
    { date: 'Feb 5, 2026', type: 'Compliance', period: 'Monthly', size: '2.1 MB', status: 'Generated' },
    { date: 'Feb 1, 2026', type: 'Comprehensive', period: 'Monthly', size: '5.5 MB', status: 'Generated' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">{t('reports.title')}</h1>
        <p className="text-muted-foreground">{t('reports.subtitle')}</p>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${category.bgColor}`}>
                    <Icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openGenerateDialogForType(category.id as ReportType)}
                    >
                      <Download className="mr-2 h-3 w-3" />
                      Generate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filter Section */}
      <div>
        <h2 className="text-2xl font-heading font-bold mb-4">{t('reports.filterTitle')}</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date Range Filter */}
              <div className="space-y-2">
                <Label className="text-sm">{t('reports.dateRange')}</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="bg-card/60 backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">{t('common.weekly')}</SelectItem>
                    <SelectItem value="monthly">{t('common.monthly')}</SelectItem>
                    <SelectItem value="quarterly">{t('common.quarterly')}</SelectItem>
                    <SelectItem value="yearly">{t('common.yearly')}</SelectItem>
                    <SelectItem value="custom">{t('common.custom')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Report Type Filter */}
              <div className="space-y-2">
                <Label className="text-sm">{t('reports.reportType')}</Label>
                <Select value={reportType} onValueChange={(value) => setReportType(value as ReportType)}>
                  <SelectTrigger className="bg-card/60 backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solar">{t('reports.cat.solar.title')}</SelectItem>
                    <SelectItem value="pumping">{t('reports.cat.pumping.title')}</SelectItem>
                    <SelectItem value="grid">{t('reports.cat.grid.title')}</SelectItem>
                    <SelectItem value="compliance">{t('reports.cat.compliance.title')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Button */}
              <div className="space-y-2">
                <Label className="text-sm opacity-0">{t('common.action')}</Label>
                <Button
                  className="w-full bg-[#E6A817] hover:bg-[#d09815]"
                  onClick={() => {
                    setSelectedReportType(reportType as ReportType);
                    setSelectedReportDate(new Date().toISOString().split('T')[0]);
                    setSelectedReportLanguage('en');
                    setIsGenerateDialogOpen(true);
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {t('reports.generate')}
                </Button>
              </div>
            </div>

            {/* Custom Date Range Pickers */}
            {dateRange === 'custom' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-sm">{t('common.startDate')}</Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">{t('common.endDate')}</Label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 50-50 Split: Report Preview & Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Report Preview (50%) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#E6A817]" />
              {t('reports.previewTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Report Title and Date Range */}
              <div className="pb-4 border-b">
                <h3 className="font-semibold text-lg mb-1">
                  {reportType === 'solar' && t('reports.cat.solar.title')}
                  {reportType === 'pumping' && t('reports.cat.pumping.title')}
                  {reportType === 'grid' && t('reports.cat.grid.title')}
                  {reportType === 'compliance' && t('reports.cat.compliance.title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('reports.period')} {dateRange === 'weekly' && t('reports.period.weekly')}
                  {dateRange === 'monthly' && t('reports.period.monthly')}
                  {dateRange === 'quarterly' && t('reports.period.quarterly')}
                  {dateRange === 'yearly' && t('reports.period.yearly')}
                  {dateRange === 'custom' && t('reports.period.custom')}
                </p>
              </div>

              {/* Key Summary Metrics */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">{t('reports.keyMetrics')}</h4>
                
                {reportType === 'solar' && (
                  <>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.gen')}</span>
                      <span className="font-semibold text-[#E6A817]">2,340 kWh</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.peak')}</span>
                      <span className="font-semibold">920 W</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.eff')}</span>
                      <span className="font-semibold text-[#4CAF50]">92%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.golden')}</span>
                      <span className="font-semibold">168 hrs</span>
                    </div>
                  </>
                )}

                {reportType === 'pumping' && (
                  <>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.water')}</span>
                      <span className="font-semibold text-[#6B8E6B]">450,000 L</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.sessions')}</span>
                      <span className="font-semibold">84</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.energy')}</span>
                      <span className="font-semibold">1,800 kWh</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.compliance')}</span>
                      <span className="font-semibold text-[#4CAF50]">96%</span>
                    </div>
                  </>
                )}

                {reportType === 'grid' && (
                  <>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.uptime')}</span>
                      <span className="font-semibold text-[#4CAF50]">98.5%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.outages')}</span>
                      <span className="font-semibold text-[#D32F2F]">12</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.avgVolt')}</span>
                      <span className="font-semibold">235 V</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.downtime')}</span>
                      <span className="font-semibold">18.5 hrs</span>
                    </div>
                  </>
                )}

                {reportType === 'compliance' && (
                  <>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.sdg7')}</span>
                      <span className="font-semibold text-[#4CAF50]">94%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.sdg8')}</span>
                      <span className="font-semibold text-[#4CAF50]">89%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.kusum')}</span>
                      <span className="font-semibold text-[#4CAF50]">100%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('reports.metric.savings')}</span>
                      <span className="font-semibold text-[#E6A817]">₹18,720</span>
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  size="sm"
                  className="flex-1 bg-[#D32F2F] hover:bg-[#b71c1c]"
                  onClick={downloadCurrentReportAsPDF}
                >
                  <Download className="mr-2 h-3 w-3" />
                  {t('reports.download')}
                </Button>
                <Button size="sm" className="flex-1 bg-[#25D366] hover:bg-[#20ba5a]" onClick={() => window.open('https://api.whatsapp.com/send?text=Check%20out%20this%20Surya-Sanchay%20report', '_blank')}>
                  <MessageCircle className="mr-2 h-3 w-3" />
                  {t('reports.shareWhatsApp')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right: Graphical Representation (50%) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#6B8E6B]" />
              {t('reports.graphTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px]">
              {reportType === 'solar' && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { day: 'Mon', generation: 85 },
                    { day: 'Tue', generation: 88 },
                    { day: 'Wed', generation: 75 },
                    { day: 'Thu', generation: 82 },
                    { day: 'Fri', generation: 90 },
                    { day: 'Sat', generation: 92 },
                    { day: 'Sun', generation: 87 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="generation" fill="#E6A817" name="Generation (%)" />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {reportType === 'pumping' && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { day: 'Mon', water: 15000, energy: 60 },
                    { day: 'Tue', water: 16200, energy: 65 },
                    { day: 'Wed', water: 14800, energy: 58 },
                    { day: 'Thu', water: 15500, energy: 62 },
                    { day: 'Fri', water: 17000, energy: 68 },
                    { day: 'Sat', water: 16800, energy: 67 },
                    { day: 'Sun', water: 15700, energy: 63 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="water" stroke="#6B8E6B" name="Water (L)" />
                    <Line yAxisId="right" type="monotone" dataKey="energy" stroke="#E6A817" name="Energy (kWh)" />
                  </LineChart>
                </ResponsiveContainer>
              )}

              {reportType === 'grid' && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { month: 'Aug', uptime: 94, outages: 8 },
                    { month: 'Sep', uptime: 96, outages: 6 },
                    { month: 'Oct', uptime: 95, outages: 7 },
                    { month: 'Nov', uptime: 97, outages: 4 },
                    { month: 'Dec', uptime: 98, outages: 3 },
                    { month: 'Jan', uptime: 97.5, outages: 4 },
                    { month: 'Feb', uptime: 98.5, outages: 3 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="uptime" fill="#4CAF50" name="Uptime (%)" />
                    <Bar yAxisId="right" dataKey="outages" fill="#D32F2F" name="Outages" />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {reportType === 'compliance' && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'SDG 7', value: 94 },
                        { name: 'SDG 8', value: 89 },
                        { name: 'PM-KUSUM', value: 100 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#E6A817" />
                      <Cell fill="#6B8E6B" />
                      <Cell fill="#4CAF50" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#757575]" />
            {t('reports.history')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('reports.col.date')}</TableHead>
                  <TableHead>{t('reports.col.type')}</TableHead>
                  <TableHead>{t('reports.col.period')}</TableHead>
                  <TableHead>{t('reports.col.size')}</TableHead>
                  <TableHead>{t('reports.col.status')}</TableHead>
                  <TableHead className="text-right">{t('reports.col.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportHistory.map((report, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{report.date}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>{report.size}</TableCell>
                    <TableCell>
                      <Badge className="bg-[#4CAF50]">{report.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownloadFromHistory(report)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => window.open('https://api.whatsapp.com/send?text=Check%20out%20this%20Surya-Sanchay%20report', '_blank')}>
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#E6A817]" />
              {t('reports.generate')} Report
            </DialogTitle>
            <DialogDescription>
              Select a date and language to generate and download the detailed report.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="report-date">Report Date</Label>
              <Input
                id="report-date"
                type="date"
                value={selectedReportDate}
                onChange={(event) => setSelectedReportDate(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-language">Language</Label>
              <Select
                value={selectedReportLanguage}
                onValueChange={(value) => setSelectedReportLanguage(value as 'en' | 'hi' | 'mr')}
              >
                <SelectTrigger id="report-language" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="mr">मराठी</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select
                value={selectedReportType}
                onValueChange={(value) => setSelectedReportType(value as ReportType)}
              >
                <SelectTrigger id="report-type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solar">Solar Performance</SelectItem>
                  <SelectItem value="pumping">Water Pumping</SelectItem>
                  <SelectItem value="grid">Grid Reliability</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateAndDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}