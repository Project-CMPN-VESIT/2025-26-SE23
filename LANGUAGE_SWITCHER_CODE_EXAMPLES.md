# Language Switcher - Code Examples

This file shows how to use the LanguageSwitcher component in your React components across all 6 pages.

## Example 1: Using in Header Component

```jsx
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo and brand name */}
        <div className="flex items-center gap-3">
          {/* ... logo code ... */}
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* ... navigation code ... */}
        </nav>

        {/* Right side: Actions */}
        <div className="flex items-center gap-1">
          
          {/* Language Switcher - NEW */}
          <LanguageSwitcher />

          {/* Other buttons (notifications, theme, etc.) */}
          {/* ... other UI elements ... */}
        </div>
      </div>
    </header>
  );
}
```

## Example 2: Using the Language Hook in a Page Component

```jsx
import { useLanguage } from '../contexts/LanguageContext';

export function Dashboard() {
  const { language, t } = useLanguage();

  return (
    <div>
      {/* Page title - uses translation */}
      <h1>{t('dashboard.title')}</h1>

      {/* Language info display (optional) */}
      <p>Current Language: {language.toUpperCase()}</p>

      {/* Other content */}
      <section>
        <h2>{t('dashboard.status.safe')}</h2>
        <p>{t('dashboard.village')}, {t('dashboard.location')}</p>
      </section>
    </div>
  );
}
```

## Example 3: Listening to Language Changes 

```jsx
import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function MyComponent() {
  const { language, t } = useLanguage();

  useEffect(() => {
    // This runs whenever language changes
    console.log('Language changed to:', language);
    
    // You could trigger other actions here:
    // - Reload data from an API with new language
    // - Update document title
    // - Send analytics event
  }, [language]);

  return (
    <div>
      <h1>{t('nav.dashboard')}</h1>
      <p>Language: {language}</p>
    </div>
  );
}
```

## Example 4: Programmatically Change Language

```jsx
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageToggleButton() {
  const { language, setLanguage } = useLanguage();

  const handleToggleLanguage = () => {
    // Example: Toggle between English and Hindi
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
  };

  return (
    <button onClick={handleToggleLanguage}>
      Switch to {language === 'en' ? 'हिन्दी' : 'English'}
    </button>
  );
}
```

## Example 5: Complete Page with Translations

```jsx
import { useLanguage } from '../contexts/LanguageContext';

export function Solar() {
  const { t, language } = useLanguage();

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-8">{t('solar.title')}</h1>

      {/* Status info showing current language */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          Viewing in: {language.toUpperCase()}
        </p>
      </div>

      {/* Content sections using translations */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t('solar.panelEfficiency')}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t('solar.dataSource')}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t('solar.goldenHours')}
        </h2>
        <p>{t('solar.lastUpdated')}: 2 min ago</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          {t('solar.forecast7day')}
        </h2>
        <button className="btn btn-primary">
          {t('solar.downloadForecast')}
        </button>
      </section>
    </main>
  );
}
```

## Example 6: Translation Key Reference by Page

```javascript
/**
 * Navigation Keys: nav.*
 * - nav.dashboard   → "Dashboard" / "डैशबोर्ड" / "डॅशबोर्ड"
 * - nav.solar       → "Solar" / "सौर ऊर्जा" / "सौर ऊर्जा"
 * - nav.pumping     → "Pumping" / "जल पंपिंग" / "पाणी पंपिंग"
 * - nav.grid        → "Grid" / "विद्युत ग्रिड" / "वीज ग्रिड"
 * - nav.reports     → "Reports" / "रिपोर्ट" / "अहवाल"
 * - nav.about       → "About" / "परिचय" / "माहिती"
 *
 * Dashboard Keys: dashboard.*
 * - dashboard.title           → "Dashboard" / "डैशबोर्ड" / "डॅशबोर्ड"
 * - dashboard.status.safe     → "Solar Safe" / "सौर ऊर्जा सुरक्षित"
 * - dashboard.status.caution  → "Battery Caution" / "बैटरी सावधानी"
 * - dashboard.status.stop     → "Stop Load" / "भार रोकें"
 * - dashboard.village         → "Gadheshwar Village" / "गढेश्वर गांव"
 * - dashboard.location        → "Maharashtra" / "महाराष्ट्र"
 * 
 * And many more... See LanguageContext.tsx for the complete list.
 */
```

## Example 7: Conditional Rendering Based on Language

```jsx
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSpecificContent() {
  const { language } = useLanguage();

  return (
    <div>
      {language === 'en' && (
        <div>
          <h2>English-only content</h2>
          <p>This content only appears when English is selected.</p>
        </div>
      )}

      {language === 'hi' && (
        <div>
          <h2>हिंदी सामग्री</h2>
          <p>यह सामग्री केवल तब दिखाई देती है जब हिंदी चुना जाता है।</p>
        </div>
      )}

      {language === 'mr' && (
        <div>
          <h2>मराठी सामग्री</h2>
          <p>हे सामग्री केवळ तेव्हाच दिसते जेव्हा मराठी निवडली जाते.</p>
        </div>
      )}
    </div>
  );
}
```

## Example 8: localStorage Integration (Automatic)

```javascript
/**
 * Language persistence is AUTOMATIC. When a user selects a language:
 * 
 * 1. The selection is stored in localStorage under key: 'surya-sanchay-language'
 * 2. When the page reloads, LanguageContext reads from localStorage
 * 3. If no saved language found, defaults to 'en' (English)
 * 
 * You don't need to do anything - it's handled by LanguageContext!
 * 
 * Manual verification:
 */

function CheckStorageExample() {
  return (
    <>
      <button
        onClick={() => {
          const saved = localStorage.getItem('surya-sanchay-language');
          console.log('Saved language:', saved);
        }}
      >
        Check Saved Language
      </button>

      <button
        onClick={() => {
          localStorage.setItem('surya-sanchay-language', 'hi');
          window.location.reload(); // Will load Hindi on refresh
        }}
      >
        Force Hindi on Next Reload
      </button>

      <button
        onClick={() => {
          localStorage.removeItem('surya-sanchay-language');
          window.location.reload(); // Will load English (default)
        }}
      >
        Reset to English
      </button>
    </>
  );
}
```

## Summary: 3 Simple Steps to Implement

```
1. In Header.tsx, add:
   import { LanguageSwitcher } from './LanguageSwitcher';
   <LanguageSwitcher />

2. In any page/component, use:
   const { t, language, setLanguage } = useLanguage();
   <h1>{t('translation.key')}</h1>

3. That's it! Everything else is automatic:
   - Dropdown UI
   - Language switching
   - Translation application
   - localStorage persistence
   - Responsive design
```
