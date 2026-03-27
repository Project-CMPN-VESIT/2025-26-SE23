
(Strictly Add Functionality – Do NOT Modify Anything Else)

This update applies to the existing website header functionality only.

⚠️ Do NOT change:

Layout

Spacing

Typography

Colors

Icons (visual style must remain same)

Page structure

Any existing section on any page

Footer

Components

Grid system

Only enhance the Globe icon (Language selector) and Notification Bell icon functionality without altering their visual placement or surrounding layout.

🔹 1️⃣ Globe Icon – Multilingual Feature Fix
Current Issue:

Clicking the globe icon does not display any language options.

Required Implementation:
A) On Click Behavior

When the Globe icon is clicked:

A dropdown panel must appear.

It should open directly below the globe icon.

It must not push or shift any layout content.

It should behave as an overlay (floating dropdown).

B) Language Dropdown Panel Design
Dropdown Style:

Use existing dropdown component styling.

Maintain same border radius, shadow, and padding as other dropdowns.

Width: 200–240px.

Vertical list layout.

Subtle hover state.

Languages to Include:

English

हिंदी (Hindi)

मराठी (Marathi)

Each option should include:

Language name in its native script.

Optional small checkmark for active language.

C) Selection Behavior

When a language is selected:

Entire website content should switch to selected language.

All navigation labels, headings, buttons, and content should reflect selected language.

The selection should persist (active state indicator in dropdown).

Active language should be visually highlighted.

⚠️ Important:
Do NOT redesign any page layout for translation.
Text resizing should auto-adjust within existing containers.
No structural change to any page.

D) Responsive Behavior

Desktop: Dropdown opens below icon.

Mobile: Dropdown opens as full-width popover aligned to header.

No layout shifting.

🔹 2️⃣ Notification Bell – Alerts Dropdown Enhancement
Current Issue:

Notification bell does not show detailed alerts.

Required Implementation:

When notification bell is clicked:

Show a dropdown panel (overlay).

Should open below bell icon.

Must not shift layout.

Must not affect header alignment.

Notification Panel Layout
Panel Width:

300–360px (desktop)

Full-width overlay on mobile

Structure:
Header Section (Inside Dropdown)

Top row:

Title: “Notifications”

Right side: “Mark all as read” (text button style)

Divider below header.

Tabs for Alert Categories

Directly below header, add 3 tab filters:

All

Sent

Received

Missed

Tabs should:

Be horizontally aligned.

Use subtle underline or active pill indicator.

Not change overall header height.

Match existing design language.

Notification List Section

Scrollable vertical list.

Each notification card should include:

Title (bold)

Short description (1–2 lines)

Timestamp (small, subtle text)

Status indicator (dot for unread)

For Missed alerts:

Slight highlight or red dot indicator.

Do NOT introduce new color system — use existing red from design system.

Empty State

If no notifications:

Centered icon + text: “No notifications available”

Maintain existing typography style.

Interaction Rules

Clicking outside closes dropdown.

Smooth fade/slide animation (150–200ms).

Dropdown must float above content (use overlay layer).

No content displacement.

Responsiveness
Desktop:

Dropdown anchored to icon.

Fixed width panel.

Tablet:

Same behavior, slight width adjustment if needed.

Mobile:

Full-width dropdown below header.

Tabs remain horizontally scrollable if needed.

⚠️ Strict Non-Modification Rule

Do NOT change header structure.

Do NOT reposition globe or bell icons.

Do NOT modify spacing of navbar.

Do NOT change typography scale.

Do NOT modify any page layout.

Do NOT adjust footer.

Do NOT introduce new colors outside design system.

Only add dropdown overlay functionality for:

Globe (Language Selector)

Notification Bell (Alerts Panel)

Everything else must remain exactly the same.