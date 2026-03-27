I have a Smart Solar Management UI with a persistent header that appears 
across all pages: Dashboard, Solar, Pumping, Grid, Reports, and About.

The header contains a Globe icon (language selector) and a Notification 
Bell icon on the right side. Both icons are currently non-functional. 
DO NOT change any visual design, layout, spacing, colors, typography, 
icons, or page structure.

ONLY add the following overlay/dropdown functionality:

---

GLOBE ICON – Language Selector Dropdown:
- On click, show a floating dropdown overlay directly below the globe icon
- Dropdown width: 200–240px, vertical list layout
- Do NOT shift or push any layout content
- Include these 3 language options:
  • English
  • हिंदी (Hindi)
  • मराठी (Marathi)
- Show a checkmark next to the currently active language
- Clicking a language switches all page content (nav labels, headings, 
  buttons, body text) to that language across all 6 pages
- Active language is visually highlighted
- On mobile: dropdown becomes full-width popover aligned to header

---

NOTIFICATION BELL – Alerts Dropdown Panel:
- On click, show a floating dropdown overlay directly below the bell icon
- Panel width: 300–360px on desktop, full-width on mobile
- Do NOT shift or push any layout content

Panel structure:
1. Header row: "Notifications" title (left) + "Mark all as read" 
   text button (right)
2. Horizontal tab filters below header: All | Sent | Received | Missed
   - Tabs use subtle underline or active pill indicator
3. Scrollable notification list. Each card includes:
   - Bold title
   - 1–2 line description
   - Small timestamp
   - Unread dot indicator
4. Missed alerts: use existing red from the design system for dot indicator
5. Empty state: centered icon + "No notifications available" text

---

BEHAVIOR FOR BOTH DROPDOWNS (apply to all 6 pages):
- Clicking outside closes the dropdown
- Smooth fade or slide animation (150–200ms)
- Dropdowns float above all page content (overlay layer)
- No content displacement on any page
- Header alignment and structure must remain completely unchanged
- Apply identical behavior across: Dashboard, Solar, Pumping, Grid, 
  Reports, and About pages
