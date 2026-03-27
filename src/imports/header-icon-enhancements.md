This is a functional enhancement task, not just a UI design update.

The Globe (Language) icon and Notification Bell must be fully implemented with working logic and visible dropdown panels.

⚠️ Do NOT modify layout, spacing, header structure, typography, colors, grid, footer, or any page design.
Only add working dropdown functionality to existing icons.

🔹 1️⃣ Globe Icon – Multilingual Implementation (MANDATORY)
Current Problem:

Clicking the globe icon does nothing. No dropdown appears.

Required Fix:
A) Add Functional Dropdown Component

When globe icon is clicked:

Show overlay dropdown panel.

Must be anchored below the icon.

Must not shift layout.

Must close on outside click.

Must close on ESC key.

Must toggle on icon click.

B) Languages to Implement

Add working multilingual support for:

English (default)

Hindi (हिंदी)

Marathi (मराठी)

C) Required Technical Implementation
1. Integrate Proper i18n System

Depending on stack:

React / Next.js → use react-i18next or next-i18next

Plain JS → use JSON-based translation mapping

Backend-rendered → implement translation files per language

2. Create Translation Files

Example structure:

/locales/en.json
/locales/hi.json
/locales/mr.json

All UI text must be mapped:

Navbar labels

Buttons

Headings

Cards

Alerts

Footer

3. State Management

On language selection:

Update global language state

Re-render UI with selected translations

Store selected language in:

localStorage OR

cookies
So it persists on refresh.

4. Active Language Indicator

Inside dropdown:

Highlight selected language

Show checkmark next to active language

5. NO Layout Changes

Do not resize navbar.
Do not move icons.
Do not adjust spacing.

🔹 2️⃣ Notification Bell – Functional Alerts Panel
Current Problem:

Bell icon does not show alerts list.

Required Fix:
A) Add Dropdown Overlay Panel

When bell icon is clicked:

Show floating panel

Width: 320px (desktop)

Full width on mobile

Must not shift layout

Must close on outside click

Must close on ESC key

B) Add Notification Tabs (Working Filters)

Tabs required:

All

Sent

Received

Missed

Tabs must:

Filter notification list dynamically

Highlight active tab

Not change header height

C) Notification Data Handling

If backend exists:

Fetch notifications via API

Show loading state

Show empty state

If no backend yet:

Use structured dummy JSON data

Simulate states properly

D) Notification Structure

Each notification must show:

Title

Short description

Timestamp

Status (Unread indicator dot)

Missed alerts:

Must show warning indicator

E) Add "Mark All as Read"

Top-right inside dropdown.
Updates notification state.

🔹 3️⃣ Ensure Changes Are Actually Visible

After implementation:

Rebuild project

Clear build cache

Redeploy to production

Invalidate CDN cache (if using Cloudflare/Vercel/etc.)

Hard refresh browser

🔹 4️⃣ Acceptance Criteria (MANDATORY CHECKLIST)

Globe Icon:

Clicking shows dropdown

Selecting language updates entire UI

Language persists after refresh

No layout shift

Notification Bell:

Clicking shows panel

Tabs filter correctly

Mark all as read works

Panel closes properly

No layout shift

⚠️ STRICT RULE

Only add functionality to:

Globe icon

Notification bell

DO NOT:

Redesign header

Modify dashboard layout

Change footer

Adjust grid

Change spacing

Everything else must remain pixel-identical.