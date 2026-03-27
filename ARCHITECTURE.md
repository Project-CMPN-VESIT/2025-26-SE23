# 🏗️ Language Switcher - Architecture & Flow Diagram

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          React Application                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  LanguageProvider (LanguageContext.tsx)                      │  │
│  │                                                              │  │
│  │  • Manages: language state ('en'|'hi'|'mr')                 │  │
│  │  • Provides: setLanguage(lang) function                     │  │
│  │  • Provides: t(key) translation function                    │  │
│  │  • Persists: localStorage ('surya-sanchay-language')        │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│           ▲                          ▲                             │
│           │                          │                             │
│           │                     Wraps App                          │
│           │                          │                             │
│  ┌────────┴──────────────────────────┴────────────┐                │
│  │                                                 │                │
│  │     All Components Can Use useLanguage() Hook   │                │
│  │                                                 │                │
│  └────────┬──────────────────────────┬────────────┘                │
│           │                          │                             │
│    ┌──────▼──────┐            ┌──────▼──────────┐                 │
│    │ Header.tsx   │            │  Page Components │                 │
│    │              │            │  (Dashboard,     │                 │
│    │ ┌─────────┐  │            │   Solar, etc)    │                 │
│    │ │Language │  │            │                  │                 │
│    │ │Switcher │  │            │  Use t()         │                 │
│    │ └─────────┘  │            │  for all text    │                 │
│    │              │            │                  │                 │
│    └──────────────┘            └──────────────────┘                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## User Interaction Flow

```
USER INTERFACE
┌──────────────────────────────────────┐
│  Header                              │
│  [Logo] [Nav]  [🌐 EN ▾] [🔔] [☀️]  │
│                  ▲                   │
│                  └─ GlobeIcon        │
│                     (Click)          │
└──────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  LanguageSwitcher Component       │
│  (isOpen = true)                  │
│                                   │
│  ┌────────────────────────────┐  │
│  │ Dropdown (animated)        │  │
│  │                            │  │
│  │ 🇬🇧 English (EN) ✓        │  │
│  │ 🇮🇳 हिन्दी (HI)          │  │
│  │ 🇮🇳 मराठी (MR)           │  │
│  │                            │  │
│  │ (Click on हिन्दी)         │  │
│  └────────────────────────────┘  │
│         │                         │
│         ▼                         │
│  onClick: handleLanguageSelect   │
│  (code = 'hi')                   │
└──────────────────────────────────┘
         │
         ▼
┌───────────────────────────────────────┐
│  LanguageContext.setLanguage('hi')    │
│                                       │
│  1. Update state: language = 'hi'     │
│  2. Save to localStorage:             │
│     localStorage.setItem(             │
│       'surya-sanchay-language',       │
│       'hi'                            │
│     )                                 │
└───────────────────────────────────────┘
         │
         ▼
┌───────────────────────────────────────┐
│  Re-render All Connected Components   │
│                                       │
│  • Header receives new `language`    │
│  • All Pages receive new `language`  │
│  • All call t(key) with new lang     │
└───────────────────────────────────────┘
         │
         ▼
┌───────────────────────────────────────┐
│  Translation Function t(key)          │
│                                       │
│  translations['hi']['nav.dashboard']  │
│  = 'डैशबोर्ड'                         │
│                                       │
│  All text updates to Hindi!           │
└───────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  User Sees Hindi Content         │
│  Header & Globe badge update     │
│  Dropdown closes automatically   │
└──────────────────────────────────┘
```

## Data Flow Diagram

```
                    LanguageContext
                    ┌──────────────────────┐
                    │ language: 'hi'       │
                    │ translations: {…}    │
                    │ t(key) function      │
                    └──────────────────────┘
                           │
               ┌───────────┼───────────┬────────────┐
               │           │           │            │
               ▼           ▼           ▼            ▼
           Header      Dashboard     Solar      Pumping
           
           ─────────────────────────────────────────
           
           Header.tsx:
           • Uses useLanguage()
           • Renders <LanguageSwitcher />
           • Receives language changes
           
           ─────────────────────────────────────────
           
           Dashboard.tsx:
           • Uses useLanguage()
           • Calls t('dashboard.title')
           • Displays: 'डैशबोर्ड'
           
           ─────────────────────────────────────────
           
           Solar.tsx:
           • Uses useLanguage()
           • Calls t('solar.panelEfficiency')
           • Displays: 'पैनल दक्षता'
           
           ─────────────────────────────────────────
           
           Plus: Grid, Reports, About pages
           All follow same pattern
```

## localStorage Persistence Flow

```
┌─────────────────────────────────────────────┐
│  User Selects Language (e.g., Hindi)        │
└─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│  LanguageContext.setLanguage('hi')          │
│  • Updates React state                      │
│  • Calls localStorage.setItem()             │
│                                             │
│  localStorage['surya-sanchay-language']='hi'│
└─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│  Component Re-renders                       │
│  All text translates to Hindi               │
└─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│  User Closes Browser / Refreshes Page      │
└─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│  Page Reloads                               │
│  LanguageProvider initializes               │
│                                             │
│  const savedLang =                          │
│    localStorage.getItem(                    │
│      'surya-sanchay-language'               │
│    )                                        │
│  // Returns: 'hi'                           │
└─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│  Initialize language = 'hi'                 │
│  Provider mounts with Hindi as default      │
└─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│  Page Loads in Hindi!                       │
│  ✅ User's language preference remembered  │
└─────────────────────────────────────────────┘
```

## Component Dependency Graph

```
                    LanguageProvider
                            │
                ┌───────────┼───────────┐
                │           │           │
                ▼           ▼           ▼
              App         Layout     HomePage
                │           │           │
        ┌───────┼───────┐   │     ┌─────┼─────┐
        │       │       │   │     │     │     │
        ▼       ▼       ▼   ▼     ▼     ▼     ▼
      Header  Sidebar  Main  6Pages  Comp1 Comp2
        │                     │
        │                     ├─ Dashboard
        │                     ├─ Solar
        │                     ├─ Pumping
        │                     ├─ Grid
        │                     ├─ Reports
        │                     └─ About
        │
        ▼
   LanguageSwitcher
   
   All Components Can:
   • Import { useLanguage }
   • Call useLanguage()
   • Access: language, setLanguage, t()
```

## File Structure & Dependencies

```
src/
│
├── main.tsx
│   └─ imports LanguageProvider
│      └─ wraps <App />
│
├── app/
│   │
│   ├── App.tsx
│   │   └─ renders <Header />, <Main />, <Footer />
│   │
│   ├── contexts/
│   │   └─ LanguageContext.tsx ◄─ ★ CENTRAL HUB ★
│   │      • Translation data
│   │      • Language state
│   │      • localStorage logic
│   │
│   ├── components/
│   │   ├─ Header.tsx
│   │   │  └─ imports useLanguage
│   │   │     └─ renders <LanguageSwitcher />
│   │   │
│   │   ├─ LanguageSwitcher.tsx ◄─ NEW COMPONENT
│   │   │  • Dropdown UI
│   │   │  • Language selection
│   │   │  • useLanguage hook
│   │   │
│   │   ├─ Footer.tsx
│   │   │  └─ uses useLanguage (optional)
│   │   │
│   │   └─ [other components]
│   │      └─ all can use useLanguage()
│   │
│   ├── styles/
│   │   └─ language-switcher.css ◄─ NEW STYLES
│   │      • Dropdown styling
│   │      • Responsive design
│   │      • Animations
│   │
│   └── pages/
│       ├─ Dashboard.tsx
│       │  └─ const { t } = useLanguage()
│       │     └─ <h1>{t('dashboard.title')}</h1>
│       │
│       ├─ Solar.tsx
│       │  └─ const { t } = useLanguage()
│       │
│       ├─ Pumping.tsx
│       │  └─ const { t } = useLanguage()
│       │
│       ├─ Grid.tsx
│       │  └─ const { t } = useLanguage()
│       │
│       ├─ Reports.tsx
│       │  └─ const { t } = useLanguage()
│       │
│       └─ About.tsx
│          └─ const { t } = useLanguage()
│
└── localStorage
    └─ 'surya-sanchay-language': 'en'|'hi'|'mr'
```

## State Management Diagram

```
┌──────────────────────────────────────────────────┐
│  LanguageContext Internal State                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  state:    language = 'en' | 'hi' | 'mr'        │
│  storage:  localStorage['surya-sanchay-lang']   │
│  data:     translations[language][key]          │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │ translations = {                          │  │
│  │   en: {                                   │  │
│  │     'nav.dashboard': 'Dashboard',         │  │
│  │     'nav.solar': 'Solar',                 │  │
│  │     ...                                   │  │
│  │   },                                      │  │
│  │   hi: {                                   │  │
│  │     'nav.dashboard': 'डैशबोर्ड',          │  │
│  │     'nav.solar': 'सौर ऊर्जा',            │  │
│  │     ...                                   │  │
│  │   },                                      │  │
│  │   mr: {                                   │  │
│  │     'nav.dashboard': 'डॅशबोर्ड',          │  │
│  │     'nav.solar': 'सौर ऊर्जा',            │  │
│  │     ...                                   │  │
│  │   }                                       │  │
│  │ }                                         │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  Functions:                                      │
│  • setLanguage(lang) → updates state + storage  │
│  • t(key) → returns translations[lang][key]     │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Responsive Design Breakpoints

```
DESKTOP (> 640px)
┌──────────────────────────────────────────┐
│ Header: [Logo] [Nav]  [🌐EN▾] [🔔] [☀️] │
└──────────────────────────────────────────┘
         Drop-down appears
         to the RIGHT ───┐
                        │
                    ┌───▼─────────┐
                    │ 🇬🇧 EN ✓   │
                    │ 🇮🇳 HI     │
                    │ 🇮🇳 MR     │
                    └─────────────┘
                    
MOBILE (< 640px)
┌─────────────────────────────────────┐
│ [🌐EN▾] [🔔] [☀️]                  │
└─────────────────────────────────────┘
         Click globe ───┐
                        │
         Appears as     │
         full-width     │
         pop-over       │
                        │
         ┌──────────────────────┐
         │ 🇬🇧 English (EN) ✓  │
         │ 🇮🇳 हिन्दी (HI)     │
         │ 🇮🇳 मराठी (MR)      │
         └──────────────────────┘
```

## Event Flow in LanguageSwitcher Component

```
Component Mount
       │
       ▼
┌──────────────────┐
│ isOpen = false   │
│ dropdownRef = {} │
│ buttonRef = {}   │
└──────────────────┘
       │
       ▼
User Clicks Globe Button
       │
       ▼
onClick Handler Fires
│
├─ toggleOpen: isOpen = true
│
└─ Render Dropdown
    │
    ├─ useEffect (isOpen) runs
    │  │
    │  └─ addEventListener('mousedown', handleClickOutside)
    │     │
    │     └─ Listens for clicks outside
    │        │
    │        └─ If outside → isOpen = false
    │           │
    │           └─ Component re-renders
    │              │
    │              └─ Dropdown disappears
    │                 │
    │                 └─ removeEventListener
    │
    └─ useEffect (isOpen) runs
       │
       └─ addEventListener('keydown', handleKeydown)
          │
          └─ Escape key → isOpen = false

User Selects Language
       │
       ▼
onClick: handleLanguageSelect('hi')
       │
       ├─ setLanguage('hi') → LanguageContext updates
       │
       ├─ isOpen = false → Dropdown closes
       │
       └─ Component Re-renders with new language
```

## Translation Lookup Process

```
Component calls: <h1>{t('dashboard.title')}</h1>

       │
       ▼
t('dashboard.title') function called
       │
       ├─ Get current language: 'hi'
       │
       ├─ Look up translations object:
       │  translations['hi']['dashboard.title']
       │
       ├─ Found: 'डैशबोर्ड'
       │
       └─ Return: 'डैशबोर्ड'
       
       Result: <h1>डैशबोर्ड</h1>
```

---

## Summary

The language switcher works through:

1. **Central State Management** - LanguageContext
2. **React Hooks** - useLanguage() in all components
3. **Translation Data** - 100+ keys, 3 languages
4. **Persistence Layer** - localStorage automatically saves/restores
5. **UI Component** - LanguageSwitcher dropdown
6. **Styling** - language-switcher.css with responsive design

All components are loosely coupled and can be updated independently!
