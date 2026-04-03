import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Sun, Droplets, Zap, Wifi, WifiOff, RefreshCw,
  TrendingUp, ChevronRight, MapPin, Activity
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabaseClient';

import VillagePic1 from '../../assets/VillagePic1.jpg';
import VillagePic2 from '../../assets/VillagePic2.jpg';

export function Dashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const images = [VillagePic1, VillagePic2];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [solar, setSolar] = useState<any[]>([]);
  const [pumping, setPumping] = useState<any[]>([]);
  const [grid, setGrid] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  /* 🔁 IMAGE ROTATION */
  useEffect(() => {
    const iv = setInterval(() => {
      setCurrentImageIndex((p) => (p + 1) % images.length);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  /* 🔥 FETCH */
  const fetchData = async () => {
    setLoading(true);
    try {
      const [s, p, g] = await Promise.all([
        supabase.from('solar_panel').select('*'),
        supabase.from('pumping_session').select('*'),
        supabase.from('grid_status').select('*').order('timestamp', { ascending: false }),
      ]);
      if (s.error) throw s.error;
      if (p.error) throw p.error;
      if (g.error) throw g.error;
      setSolar(s.data || []);
      setPumping(p.data || []);
      setGrid(g.data || []);
    } catch (err: any) {
      console.error('Dashboard fetch error:', err.message);
      setSolar([]); setPumping([]); setGrid([]);
    } finally {
      setLastUpdated(new Date());
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  /* ── DERIVED DATA ── */
  const isOnline = grid.length > 0 ? grid[0].is_online : true;
  const voltage = grid.length > 0 ? grid[0].voltage_volts : null;
  const freq = grid.length > 0 ? grid[0].frequency_hz : null;

  const stats = {
    outages: grid.filter((g) => g.is_online === false).length,
    panels: solar.filter((s) => s.is_active).length,
    waterPumped: pumping.reduce((sum, s) => sum + (s.water_pumped_litres || 0), 0),
    energySaved: (pumping.reduce((sum, s) => sum + (s.energy_consumed_kwh || 0), 0) * 10).toFixed(0),
  };

  /* 📄 PDF */
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Surya-Sanchay Solar Report', 20, 20);
    doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, 20, 30);
    doc.text(`Water Pumped: ${stats.waterPumped} L`, 20, 50);
    doc.text(`Energy Savings: ₹${stats.energySaved}`, 20, 60);
    doc.text(`Active Panels: ${stats.panels}`, 20, 70);
    doc.text(`Grid Outages: ${stats.outages}`, 20, 80);
    doc.save('surya-sanchay-report.pdf');
  };

  const statCards = [
    {
      label: t('dashboard.outages'),
      value: stats.outages,
      icon: isOnline ? Wifi : WifiOff,
      color: isOnline ? '#4CAF50' : '#D32F2F',
      bg: isOnline ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20',
      suffix: '',
    },
    {
      label: t('dashboard.activePanels'),
      value: stats.panels,
      icon: Sun,
      color: '#E6A817',
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      suffix: '',
    },
    {
      label: t('dashboard.waterPumped'),
      value: stats.waterPumped.toLocaleString(),
      suffix: ' L',
      icon: Droplets,
      color: '#6B8E6B',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      label: t('dashboard.moneySaved'),
      value: `₹${Number(stats.energySaved).toLocaleString()}`,
      suffix: '',
      icon: TrendingUp,
      color: '#4CAF50',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    },
  ];

  const quickActions = [
    {
      label: t('dashboard.action.pumping'),
      desc: t('dashboard.action.pumpingDesc'),
      icon: Droplets,
      path: '/pumping',
      color: '#6B8E6B',
    },
    {
      label: t('dashboard.action.grid'),
      desc: t('dashboard.action.gridDesc'),
      icon: Zap,
      path: '/grid',
      color: '#E6A817',
    },
    {
      label: t('dashboard.downloadReport'),
      desc: t('dashboard.action.reportDesc'),
      icon: TrendingUp,
      path: null,
      color: '#4CAF50',
      onClick: downloadPDF,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">

      {/* ── HEADER ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-6 w-6 text-amber-500" />
            {t('dashboard.title')}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{t('dashboard.subtitle')}</p>
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

      {/* ── VILLAGE IMAGE CAROUSEL ── */}
      <div className="relative overflow-hidden rounded-xl h-48 sm:h-64 shadow-md">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Gadheshwar village ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="font-semibold text-lg">{t('dashboard.village')}</p>
          <p className="text-sm text-white/80 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {t('dashboard.location')}
          </p>
        </div>
        {/* Slide dots */}
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── GRID STATUS BANNER ── */}
      <Card className={`border-l-4 ${isOnline ? 'border-l-green-500' : 'border-l-red-500'}`}>
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm ${
              isOnline
                ? 'bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300'
            }`}>
              {isOnline
                ? <><Wifi className="h-4 w-4" /> {t('grid.online')}</>
                : <><WifiOff className="h-4 w-4" /> {t('grid.offline')}</>
              }
            </div>
            {voltage !== null && (
              <div className="flex items-center gap-1 text-sm">
                <span className="text-muted-foreground">{t('grid.voltage')}:</span>
                <span className="font-semibold">{voltage} V</span>
              </div>
            )}
            {freq !== null && (
              <div className="flex items-center gap-1 text-sm">
                <span className="text-muted-foreground">{t('grid.frequency')}:</span>
                <span className="font-semibold">{freq} Hz</span>
              </div>
            )}
            {loading && (
              <span className="text-sm text-muted-foreground italic">
                {t('common.loading')}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.label}
              className="relative overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-5 pb-4">
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -mr-6 -mt-6 opacity-10 ${s.bg}`}
                  style={{ background: s.color }} />
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                  style={{ background: `${s.color}20` }}
                >
                  <Icon className="h-5 w-5" style={{ color: s.color }} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className="text-2xl font-bold" style={{ color: s.color }}>
                  {loading ? '—' : `${s.value}${s.suffix || ''}`}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div>
        <h2 className="text-base font-semibold mb-3">{t('dashboard.quickActions')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.label}
                className="cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5 group"
                onClick={action.onClick ?? (() => navigate(action.path!))}
              >
                <CardContent className="py-4 flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${action.color}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: action.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{action.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{action.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

    </div>
  );
}