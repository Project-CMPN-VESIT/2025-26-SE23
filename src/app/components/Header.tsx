import { Link, useLocation } from 'react-router';
import {
  Bell,
  Moon,
  Sun,
  LayoutDashboard,
  Sun as SunIcon,
  Droplets,
  Zap,
  FileText,
  Info,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import logo from '../../assets/Logo.png';
import '../styles/language-switcher.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Notification {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  type: 'critical' | 'warning' | 'info';
  unread: boolean;
}

// ─── Notification card sub-component ─────────────────────────────────────────

function NotificationCard({
  notification,
  onClick,
}: {
  notification: Notification;
  onClick: (id: number) => void;
}) {
  const getDotColor = () => {
    switch (notification.type) {
      case 'critical':
        return 'bg-[#D32F2F]';
      case 'warning':
        return 'bg-[#F4A300]';
      case 'info':
        return 'bg-[#4CAF50]';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div
      className="px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors duration-150"
      onClick={() => onClick(notification.id)}
    >
      <div className="flex items-start gap-3">
        {/* Left status dot */}
        <div className="shrink-0 pt-1.5 w-2 flex justify-center">
          <span className={`block w-2 h-2 rounded-full ${getDotColor()}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm mb-0.5 ${
              notification.unread ? 'font-semibold' : 'font-normal text-muted-foreground'
            }`}
          >
            {notification.title}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
            {notification.description}
          </p>
          <p className="text-xs text-muted-foreground/70">{notification.timestamp}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Bell className="h-10 w-10 text-muted-foreground/40 mb-3" />
      <p className="text-sm text-muted-foreground">No notifications available</p>
    </div>
  );
}

// ─── Main Header ─────────────────────────────────────────────────────────────

export function Header() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const notificationsButtonRef = useRef<HTMLButtonElement>(null);

  // ── Notifications state ──────────────────────────────────────────────────
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Fetch real notifications from Supabase on mount
  useEffect(() => {
    async function loadNotifications() {
      const { data, error } = await supabase
        .from('notification')
        .select('notification_id, notification_type, title, message, is_read, sent_at')
        .order('sent_at', { ascending: false })
        .limit(10);

      if (error) {
        // Table may not exist yet — silently show empty bell, not fake data
        console.warn('Could not load notifications:', error.message);
        return;
      }

      const mapped: Notification[] = (data ?? []).map((row: any) => ({
        id: row.notification_id,
        title: row.title ?? 'Notification',
        description: row.message ?? '',
        timestamp: row.sent_at
          ? new Date(row.sent_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
          : '',
        type: (row.notification_type === 'critical'
          ? 'critical'
          : row.notification_type === 'warning'
          ? 'warning'
          : 'info') as Notification['type'],
        unread: !row.is_read,
      }));

      setNotifications(mapped);
    }
    loadNotifications();
  }, []);


  const handleMarkAllAsRead = () =>
    setNotifications((prev: Notification[]) => prev.map((n: Notification) => ({ ...n, unread: false })));

  const handleNotificationClick = (id: number) =>
    setNotifications((prev: Notification[]) =>
      prev.map((n: Notification) => (n.id === id ? { ...n, unread: false } : n))
    );

  const criticalAlerts = notifications.filter((n) => n.type === 'critical');
  const warnings = notifications.filter((n) => n.type === 'warning');
  const infoUpdates = notifications.filter((n) => n.type === 'info');

  const unreadCount = notifications.filter((n: Notification) => n.unread).length;

  // Handle click outside to close notifications dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node) &&
        notificationsButtonRef.current &&
        !notificationsButtonRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    }

    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isNotificationsOpen]);

  // Handle keyboard navigation for notifications
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsNotificationsOpen(false);
      }
    }

    if (isNotificationsOpen) {
      document.addEventListener('keydown', handleKeydown);
      return () => {
        document.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [isNotificationsOpen]);

  // ── Navigation items ─────────────────────────────────────────────────────
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: t('nav.dashboard') },
    { path: '/solar', icon: SunIcon, label: t('nav.solar') },
    { path: '/pumping', icon: Droplets, label: t('nav.pumping') },
    { path: '/grid', icon: Zap, label: t('nav.grid') },
    { path: '/reports', icon: FileText, label: t('nav.reports') },
    { path: '/about', icon: Info, label: t('nav.about') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* ── Left: Logo + Title ── */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Surya-Sanchay Logo" className="h-10 w-auto" />
          <div className="hidden md:flex flex-col">
            <span className="font-heading text-lg font-semibold leading-tight text-foreground">
              Surya-Sanchay
            </span>
            <span
              className="text-sm text-muted-foreground"
              style={{ fontFamily: 'var(--font-devanagari)' }}
            >
              सूर्य-संचय
            </span>
          </div>
        </div>

        {/* ── Center: Navigation (desktop) ── */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button variant={isActive ? 'default' : 'ghost'} size="sm" className="gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* ── Right: Actions ── */}
        <div className="flex items-center gap-1">

          {/* ──── Language Switcher ──────────────────────────────────── */}
          <LanguageSwitcher />

          {/* ──── Bell / Notifications ────────────────────────────────────── */}
          <div className="notifications-dropdown" ref={notificationsRef}>
            <button
              ref={notificationsButtonRef}
              className="relative p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              aria-label="Notifications"
              aria-expanded={isNotificationsOpen}
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D32F2F] text-[9px] font-bold text-white leading-none">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="notifications-menu">
                {/* Panel header */}
                <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-[#E6A817]/20 text-[#C56A3D] text-[10px] font-semibold">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs text-[#6B8E6B] hover:text-[#6B8E6B]/70 hover:bg-transparent"
                    onClick={handleMarkAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    Mark all as read
                  </Button>
                </div>

                {/* Notification sections */}
                <ScrollArea className="h-[360px]">
                  {/* Critical Alerts */}
                  {criticalAlerts.length > 0 && (
                    <div className="border-b">
                      <div className="px-4 py-2 bg-red-50 dark:bg-red-950/20">
                        <div className="flex items-center gap-2">
                          <span className="text-red-500">🔴</span>
                          <span className="text-sm font-semibold text-red-700 dark:text-red-300">Critical Alerts</span>
                        </div>
                      </div>
                      {criticalAlerts.map((notification) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                          onClick={handleNotificationClick}
                        />
                      ))}
                    </div>
                  )}

                  {/* Warnings */}
                  {warnings.length > 0 && (
                    <div className="border-b">
                      <div className="px-4 py-2 bg-yellow-50 dark:bg-yellow-950/20">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">🟡</span>
                          <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Warnings</span>
                        </div>
                      </div>
                      {warnings.map((notification) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                          onClick={handleNotificationClick}
                        />
                      ))}
                    </div>
                  )}

                  {/* Informational Updates */}
                  {infoUpdates.length > 0 && (
                    <div className="border-b">
                      <div className="px-4 py-2 bg-green-50 dark:bg-green-950/20">
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">🟢</span>
                          <span className="text-sm font-semibold text-green-700 dark:text-green-300">Informational Updates</span>
                        </div>
                      </div>
                      {infoUpdates.map((notification) => (
                        <NotificationCard
                          key={notification.id}
                          notification={notification}
                          onClick={handleNotificationClick}
                        />
                      ))}
                    </div>
                  )}

                  {/* View All Button */}
                  <div className="p-4">
                    <Button variant="outline" className="w-full" size="sm">
                      View All Notifications
                    </Button>
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>

          {/* ──── Dark Mode Toggle ────────────────────────────────────────── */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* ── Mobile Navigation ── */}
      <nav className="lg:hidden border-t px-4 py-2 overflow-x-auto">
        <div className="flex gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-1 text-xs whitespace-nowrap"
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
