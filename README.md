# Bounty Wizard

A modern, production-ready 3-step form wizard for creating bounties with comprehensive validation, state management, and a professional SaaS-level UI.

## Project Overview

Bounty Wizard is a full-featured Next.js application that guides users through a structured 3-step process to create impactful bounties. The app includes:

- **Step 1: Basic Details** - Bounty title, description, type, impact focus, and mode (digital/physical)
- **Step 2: Rewards & Timeline** - Reward configuration, timeline, impact certificates, and SDG selection
- **Step 3: Backer Information** - Optional backer details and terms acceptance
- **Confirmation Page** - Automatic redirect after submission
- **Results Page** - Full JSON payload display with copy/download functionality

## Key Features

**Form Validation** - All required fields block progression with clear error messages
**State Management** - React Context with localStorage persistence
**Form Reset** - Complete state reset when creating new bounties
**Mobile Responsive** - Fully responsive from 320px to desktop
**Dark/Light Mode** - Theme toggle with next-themes integration
**Modern UI** - Premium SaaS-style design inspired by Vercel/v0.dev
**Accessible** - ARIA attributes, semantic HTML, screen reader support
**Production Ready** - Clean, modular code structure with reusable components

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN UI
- **State Management**: React Context + useReducer
- **Theme**: next-themes
- **Icons**: lucide-react
- **Fonts**: Geist (Google Fonts)

## Code Structure

```
├── 📁 app
│   ├── 📁 (wized)
│   │   ├── 📁 confirmation
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 create
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 results
│   │   │   └── 📄 page.tsx
│   │   └── 📄 layout.tsx
│   ├── 📄 favicon.ico
│   ├── 🎨 globals.css
│   ├── 📄 layout.tsx
│   └── 📄 page.tsx
├── 📁 components
│   ├── 📁 Navigation
│   │   ├── 📄 Mob-sidebar.tsx
│   │   └── 📄 wizard-sidebar.tsx
│   ├── 📁 Steps
│   │   ├── 📄 Step1BasicDetails.tsx
│   │   ├── 📄 Step2RewardsTimeline.tsx
│   │   └── 📄 Step3BackerInfo.tsx
│   ├── 📁 Theme
│   │   ├── 📄 Theme-toggle.tsx
│   │   └── 📄 ThemeProvider.tsx
│   ├── 📁 ui
│   │   ├── 📁 skiper-ui
│   │   │   └── 📄 skiper26.tsx
│   │   ├── 📄 accordion.tsx
│   │   ├── 📄 alert-dialog.tsx
│   │   ├── 📄 alert.tsx
│   │   ├── 📄 aspect-ratio.tsx
│   │   ├── 📄 avatar.tsx
│   │   ├── 📄 badge.tsx
│   │   ├── 📄 breadcrumb.tsx
│   │   ├── 📄 button-group.tsx
│   │   ├── 📄 button.tsx
│   │   ├── 📄 calendar.tsx
│   │   ├── 📄 card.tsx
│   │   ├── 📄 carousel.tsx
│   │   ├── 📄 chart.tsx
│   │   ├── 📄 checkbox.tsx
│   │   ├── 📄 collapsible.tsx
│   │   ├── 📄 command.tsx
│   │   ├── 📄 context-menu.tsx
│   │   ├── 📄 dialog.tsx
│   │   ├── 📄 dotted-glow-background.tsx
│   │   ├── 📄 drawer.tsx
│   │   ├── 📄 dropdown-menu.tsx
│   │   ├── 📄 empty.tsx
│   │   ├── 📄 field.tsx
│   │   ├── 📄 form.tsx
│   │   ├── 📄 hover-card.tsx
│   │   ├── 📄 input-group.tsx
│   │   ├── 📄 input-otp.tsx
│   │   ├── 📄 input.tsx
│   │   ├── 📄 item.tsx
│   │   ├── 📄 kbd.tsx
│   │   ├── 📄 label.tsx
│   │   ├── 📄 menubar.tsx
│   │   ├── 📄 navigation-menu.tsx
│   │   ├── 📄 pagination.tsx
│   │   ├── 📄 popover.tsx
│   │   ├── 📄 progress.tsx
│   │   ├── 📄 radio-group.tsx
│   │   ├── 📄 resizable.tsx
│   │   ├── 📄 scroll-area.tsx
│   │   ├── 📄 select.tsx
│   │   ├── 📄 separator.tsx
│   │   ├── 📄 sheet.tsx
│   │   ├── 📄 skeleton.tsx
│   │   ├── 📄 slider.tsx
│   │   ├── 📄 sonner.tsx
│   │   ├── 📄 spinner.tsx
│   │   ├── 📄 switch.tsx
│   │   ├── 📄 table.tsx
│   │   ├── 📄 tabs.tsx
│   │   ├── 📄 textarea.tsx
│   │   ├── 📄 toggle-group.tsx
│   │   ├── 📄 toggle.tsx
│   │   └── 📄 tooltip.tsx
│   └── 📄 StarBorder.jsx
├── 📁 hooks
│   ├── 📄 use-mobile.ts
│   └── 📄 useBounty.tsx
├── 📁 lib
│   ├── 📄 schemas.ts
│   ├── 📄 utils.ts
│   └── 📄 validation.ts
├── 📁 public
│   ├── 🖼️ file.svg
│   ├── 🖼️ globe.svg
│   ├── 🖼️ next.svg
│   ├── 🖼️ vercel.svg
│   └── 🖼️ window.svg
├── 📁 store
│   ├── 📄 ThemeProvider.tsx
│   └── 📄 Wizardstore.tsx
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ components.json
├── 📄 eslint.config.mjs
├── 📄 next.config.ts
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 postcss.config.mjs
└── ⚙️ tsconfig.json

## Validation Rules

### Step 1: Basic Details

- **Title**: Required, max 40 characters
- **Description**: Required
- **Bounty Type**: Required (Content, Design, Development, Marketing, Other)
- **Impact Core**: Required (Water, Earth, Social, Energy)
- **Location**: Required only if mode is Physical

### Step 2: Rewards & Timeline

- **Amount**: Required, must be > 0
- **Winners**: Required, must be > 0
- **Expiration Date**: Required, must be future date
- **Impact Brief**: Required only if Impact Certificate is enabled

### Step 3: Backer Information

- **Terms & Conditions**: Required checkbox
- **Backer Name**: Required only if backer is enabled
- **Backer Logo URL**: Required only if backer is enabled, must be valid URL

## Setup & Run Instructions

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

\`\`\`bash

# Clone the repository

git clone <repo-url>
cd bounty-wizard

# Install dependencies

npm install

# Run development server

npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build & Deployment

### Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com/):




## Features Explained

### Form Validation

- Real-time validation with instant feedback
- Disabled Next button when form is invalid
- Clear error messages above fields
- Alert box at top of form showing all errors

### State Management

- Form data persists in localStorage
- Complete reset functionality clears all stored data
- Automatic redirect back to Step 1 on reset
- No stale values after navigation

### Mobile Responsiveness

- Fully responsive from 320px width
- Sidebar becomes collapsible on mobile
- Touch-friendly input fields
- Optimized button sizing
- Proper padding and spacing on all screen sizes

### Modern UI

- Deep dark mode with rich blacks
- Subtle borders and smooth transitions
- Premium button interactions
- Consistent spacing using Tailwind scale + ShadCn-Ui

## Assumptions & Limitations

1. **localStorage Usage** - Form persists to browser localStorage, not server-side database

2. **No Authentication** - Form is publicly accessible without auth

3. **Data Export** - Only JSON download available, no API integration

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Performance

- Optimized with Next.js Image and lazy loading
- Efficient form re-renders with useReducer
- Smooth animations and transitions
```
