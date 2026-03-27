# Language Switcher Implementation Guide

## Overview

Your website now has a complete multi-language switcher solution with the following components:

### Files Created:
1. **LanguageSwitcher.tsx** - React component for the language dropdown
2. **language-switcher.css** - Styling for the dropdown
3. **LanguageContext.tsx** - Already updated with localStorage persistence

---

## Architecture

### How It Works:

1. **LanguageContext**: Manages the selected language state and provides:
   - `language`: Current language code ('en' | 'hi' | 'mr')
   - `setLanguage()`: Function to change language
   - `t()`: Translation function for text keys

2. **LanguageSwitcher Component**: 
   - Renders a globe icon with language code badge
   - Shows a dropdown menu with 3 language options
   - Handles click-outside to close
   - Supports keyboard navigation (Escape to close)
   - Aria labels for accessibility

3. **localStorage Integration**:
   - Automatically saves selected language in localStorage
   - Key: `surya-sanchay-language`
   - On page reload, the saved language is restored
   - Works across all 6 pages (Dashboard, Solar, Pumping, Grid, Reports, About)

4. **Translation System**:
   - All text keys are defined in LanguageContext.tsx
   - Use the `t()` function to translate any key
   - Translations available for: English (en), Hindi (hi), Marathi (mr)

---

## Implementation Steps

### Step 1: Replace the Language Selector in Header.tsx

The Header already has a language selector. You can replace it with the new LanguageSwitcher component:

**Current Implementation** (in Header.tsx, around line 231):
```jsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <Globe className="h-5 w-5" />
      <span>{language}</span>
    </Button>
  </DropdownMenuTrigger>
  {/* ... language menu content ... */}
</DropdownMenu>
```

**New Implementation**:
```jsx
import { LanguageSwitcher } from './LanguageSwitcher';

// In the Header render, replace the language dropdown with:
<LanguageSwitcher />
```

### Step 2: Verify Translation Keys

All navigation items and content use translation keys. For example:

```jsx
// Using the translation function
const { t, language } = useLanguage();

<h1>{t('dashboard.title')}</h1>
<nav>
  <Link to="/">{t('nav.dashboard')}</Link>
  <Link to="/solar">{t('nav.solar')}</Link>
  <Link to="/pumping">{t('nav.pumping')}</Link>
  <Link to="/grid">{t('nav.grid')}</Link>
  <Link to="/reports">{t('nav.reports')}</Link>
  <Link to="/about">{t('nav.about')}</Link>
</nav>
```

### Step 3: Ensure All Pages are Wrapped with LanguageProvider

Check your `main.tsx` or root layout to ensure the LanguageProvider wraps the entire app:

```jsx
import { LanguageProvider } from './app/contexts/LanguageContext';

ReactDOM.render(
  <LanguageProvider>
    <App />
  </LanguageProvider>,
  document.getElementById('root')
);
```

### Step 4: No Additional Setup Needed

The CSS is automatically imported by the LanguageSwitcher component, and localStorage persistence is handled by the LanguageContext.

---

## Features

### 1. Dropdown Menu
- Clean, modern design with rounded corners
- Subtle shadow and hover effects
- Smooth fade-in animation
- Right-aligned positioning below the globe icon

### 2. Language Options Display
- Flag emoji (🇬🇧 🇮🇳 🇮🇳)
- Native language name (English, हिन्दी, मराठी)
- Language code (EN, HI, MR)
- Checkmark (✓) to indicate active language

### 3. Accessibility
- ARIA labels for screen readers
- Keyboard navigation (Escape key to close)
- Focus management
- Proper semantic HTML with `role="menu"` and `role="menuitem"`

### 4. Responsive Design
- Desktop: Dropdown appears aligned to globe icon
- Mobile: Dropdown becomes full-width with padding
- Works on all screen sizes

### 5. Dark Mode Support
- Automatically adapts to dark/light theme
- Respects CSS custom properties (--card, --border, --foreground, etc.)

### 6. Performance Motion
- Respects `prefers-reduced-motion` for accessibility
- Smooth animations (150ms duration)
- Efficient event handling with cleanup

---

## Language Configuration

### Supported Languages:
```javascript
{
  code: 'en',      // Language code
  label: 'EN',     // Display label in header
  nativeLabel: 'English',  // Full language name
  flag: '🇬🇧'      // Flag emoji
}
```

### Adding New Languages:

To add a new language:

1. **Update LanguageContext.tsx**:
```jsx
type Language = 'en' | 'hi' | 'mr' | 'new_lang'; // Add new code

const translations: Record<Language, Record<string, string>> = {
  // ... existing translations ...
  new_lang: {
    'nav.dashboard': 'Translation here',
    // ... all other keys ...
  },
};
```

2. **Update LanguageSwitcher.tsx**:
```jsx
const LANGUAGE_OPTIONS: LanguageOption[] = [
  // ... existing options ...
  {
    code: 'new_lang',
    label: 'XX',
    nativeLabel: 'Language Name',
    flag: '🌍',
  },
];
```

---

## Translation Keys Reference

All available translation keys are organized by page/feature:

- **Navigation**: `nav.*` (dashboard, solar, pumping, grid, reports, about)
- **Dashboard**: `dashboard.*`
- **Solar**: `solar.*`
- **Pumping**: `pumping.*`
- **Grid**: `grid.*`
- **Reports**: `reports.*`
- **About**: `about.*`
- **Common**: `common.*` (units, time, etc.)

See LanguageContext.tsx for the complete list.

---

## Styling Customization

All styling is in `src/app/styles/language-switcher.css`. Key CSS variables you can customize:

```css
--border         /* Dropdown border color */
--foreground     /* Text color */
--muted          /* Hover background */
--accent         /* Active language highlight */
--card           /* Dropdown background */
```

### Common Customizations:

**Change Dropdown Width**:
```css
.lang-dropdown {
  min-width: 240px; /* Change from 200px */
}
```

**Change Animation Speed**:
```css
.lang-dropdown,
.lang-option {
  animation: slideDown 200ms ease-out; /* Change from 150ms */
}
```

**Change Checkmark Color**:
```css
.lang-checkmark {
  color: hsl(var(--accent)); /* Update color */
}
```

---

## localStorage Details

### Storage Key:
```
surya-sanchay-language
```

### Sample Saved Value:
```
localStorage.getItem('surya-sanchay-language') // Returns: 'hi'
```

### Manual Testing:
```javascript
// Set language to Hindi
localStorage.setItem('surya-sanchay-language', 'hi');

// Get current language
localStorage.getItem('surya-sanchay-language'); // 'hi'

// Clear language (resets to English on next load)
localStorage.removeItem('surya-sanchay-language');
```

---

## Browser Compatibility

- All modern browsers (Chrome, Firefox, Safari, Edge)
- React 18+
- CSS Grid/Flexbox support required
- localStorage API required

---

## Troubleshooting

### Issue: Language doesn't persist across pages
**Solution**: Ensure all pages are wrapped with `<LanguageProvider>` in your root layout.

### Issue: Dropdown doesn't appear
**Solution**: 
1. Verify CSS is imported (it's auto-imported by component)
2. Check browser dev tools for z-index conflicts
3. Ensure component is properly placed in layout

### Issue: Translations not showing
**Solution**:
1. Verify the translation key exists in LanguageContext.tsx
2. Use the `t()` function from `useLanguage()` hook
3. Check console for errors

### Issue: localStorage changes not reflected
**Solution**: Clear browser cache/storage and reload

---

## Accessibility Features

✓ ARIA labels and roles  
✓ Keyboard navigation  
✓ Focus management  
✓ High contrast support  
✓ Reduced motion support  
✓ Screen reader friendly  

---

## Performance Notes

- Component uses React hooks for state management
- Event listeners are cleaned up on unmount
- CSS animations use GPU acceleration
- No external dependencies beyond React and lucide-react

---

## Next Steps

1. ✅ Import LanguageSwitcher in Header.tsx
2. ✅ Replace existing language dropdown (optional, current one works too)
3. ✅ Test on all 6 pages
4. ✅ Test localStorage persistence (refresh page, language persists)
5. ✅ Test responsive design (desktop, tablet, mobile)
6. ✅ Test keyboard navigation (Tab, Escape keys)

---

## Support & Questions

For additional languages or customizations, refer to the comments in:
- `LanguageSwitcher.tsx` - Component logic
- `language-switcher.css` - Styling details
- `LanguageContext.tsx` - Translation setup

