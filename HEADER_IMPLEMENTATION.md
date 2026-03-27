# Header.tsx - Implementation Reference

This file shows exactly what changes you need to make to Header.tsx

## Current State (What's There Now)

Your current Header.tsx has a language selector around line 231 that looks like this:

```jsx
{/* ──── Globe / Language Selector ──────────────────────────────── */}
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      size="icon"
      aria-label="Select language"
      className="relative"
    >
      <Globe className="h-5 w-5" />
      {/* Small language badge */}
      <span className="absolute bottom-0.5 right-0.5 text-[8px] font-bold leading-none text-[#E6A817] uppercase">
        {language}
      </span>
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="end"
    sideOffset={8}
    className="w-[220px] max-sm:w-[calc(100vw-2rem)] p-1 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-150"
  >
    <div className="px-2 py-1.5 mb-1 border-b">
      <p className="text-xs text-muted-foreground">Select Language / भाषा चुनें</p>
    </div>

    {languages.map((lang) => {
      const isActive = language === lang.code;
      return (
        <DropdownMenuItem
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`flex items-center justify-between gap-2 px-3 py-2.5 cursor-pointer rounded-md transition-colors duration-100 ${
            isActive
              ? 'bg-[#E6A817]/10 text-[#C56A3D] font-medium'
              : 'hover:bg-muted'
          }`}
        >
          <div className="flex flex-col leading-tight">
            <span className="text-sm">{lang.native}</span>
            {lang.native !== lang.label && (
              <span className="text-xs text-muted-foreground">{lang.label}</span>
            )}
          </div>
          {isActive && <Check className="h-4 w-4 text-[#6B8E6B] shrink-0" />}
        </DropdownMenuItem>
      );
    })}
  </DropdownMenuContent>
</DropdownMenu>
```

## What You Need to Do

### 1. Add Import at Top of File

Find the imports section at the top of Header.tsx and add:

```jsx
import { LanguageSwitcher } from './LanguageSwitcher';
```

**Example** (add to existing imports):
```jsx
// Existing imports
import { Link, useLocation } from 'react-router';
import { Globe, Bell, Moon, Sun, ... } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { DropdownMenu, ... } from './ui/dropdown-menu';
import { Tabs, ... } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { useState } from 'react';
import logo from '../../assets/Logo.png';
import { LanguageSwitcher } from './LanguageSwitcher';  // ← ADD THIS LINE
```

### 2. Replace the Language Dropdown

Find the old DropdownMenu for language selector (around line 231) and **REPLACE** the entire block:

```jsx
// ❌ OLD CODE - DELETE
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      {/* ... all the old code ... */}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    {/* ... all the old content ... */}
  </DropdownMenuContent>
</DropdownMenu>

// ✅ NEW CODE - USE THIS
<LanguageSwitcher />
```

That's it! Just one line replaces everything.

## What Stays the Same

You don't need to change:
- ✅ `useLanguage()` hook usage
- ✅ `language` state variable
- ✅ `setLanguage()` function
- ✅ Any other part of the Header component
- ✅ Notification dropdown
- ✅ Navigation elements
- ✅ Theme switcher
- ✅ Any other functionality

## Complete Header.tsx Structure

Here's the structure of Header.tsx showing where the change goes:

```jsx
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';  // ← NEW IMPORT
import { ... } from 'lucide-react';
import { ... } from './ui/*';

export function Header() {
  const [notificationTab, setNotificationTab] = useState('all');
  const [notifications, setNotifications] = useState([...]);
  const { t, language } = useLanguage();  // Keep this as is

  // ... rest of component logic ...

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          {/* ... logo code ... */}
        </div>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* ... navigation code ... */}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          
          {/* ✨ LANGUAGE SWITCHER - NEW */}
          <LanguageSwitcher />

          {/* Notifications Bell */}
          <DropdownMenu>
            {/* ... notification code ... */}
          </DropdownMenu>

          {/* Theme Switcher */}
          {/* ... theme code ... */}
        </div>
      </div>
    </header>
  );
}
```

## Before & After Comparison

### Before
```
Header
├── Logo
├── Navigation
└── Actions
    ├── [OLD LANGUAGE DROPDOWN - 20+ lines of code]
    ├── [Notifications]
    └── [Theme]
```

### After
```
Header
├── Logo
├── Navigation
└── Actions
    ├── <LanguageSwitcher />  ← 1 line (clean!)
    ├── [Notifications]
    └── [Theme]
```

## Visual Result

What users will see:

**Before** (old dropdown):
```
Header: [Logo] [Nav]     [🌐 EN] [🔔] [☀️]
```

**After** (new dropdown):
```
Header: [Logo] [Nav]     [🌐 EN▾] [🔔] [☀️]
                           ↓ (click)
                         ┌────────┐
                         │ 🇬🇧 EN ✓
                         │ 🇮🇳 HI
                         │ 🇮🇳 MR
                         └────────┘
```

## Verification

After making changes, run:

```bash
npm run build
```

Expected output:
```
✓ 2336 modules transformed.
✓ built in 7.43s
```

No errors = successful integration! ✅

## Testing After Integration

1. **Dropdown appears**: Click globe icon, dropdown shows
2. **Selection works**: Click a language, it selects
3. **Translation updates**: Content changes language
4. **Persistence works**: Refresh page, language remembered
5. **Cross-page**: Navigate to different page, language persists

All working? 🎉 You're done!

---

## Additional Changes (Optional)

If you want to use the `LanguageSwitcher` in other places:

### Example: Using in Footer

```jsx
// In Footer.tsx
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer() {
  return (
    <footer>
      <div className="flex items-center gap-4">
        <p>© 2024 Surya-Sanchay</p>
        <LanguageSwitcher />  {/* Add here too if desired */}
      </div>
    </footer>
  );
}
```

### Example: Using in Sidebar

```jsx
// In Sidebar.tsx
import { LanguageSwitcher } from './LanguageSwitcher';

export function Sidebar() {
  return (
    <aside>
      {/* ... sidebar content ... */}
      <LanguageSwitcher />
    </aside>
  );
}
```

The component is fully reusable!

---

## Summary

- **Change 1**: Add import at top
- **Change 2**: Replace old dropdown with `<LanguageSwitcher />`
- **Result**: Professional multi-language switcher that works globally

That's it! No other changes needed. The component handles everything else. 🚀
