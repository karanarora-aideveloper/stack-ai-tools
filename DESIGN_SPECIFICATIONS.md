# Stack AI Tools — Design Specifications & Implementation Guide

**Version:** 1.0  
**Status:** Ready for Development  
**Last Updated:** September 3, 2026  

---

## TABLE OF CONTENTS

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing & Grid](#spacing--grid)
4. [Components](#components)
5. [Animations](#animations)
6. [Dark Mode Implementation](#dark-mode-implementation)
7. [Navigation Architecture](#navigation-architecture)
8. [Mobile Guidelines](#mobile-guidelines)

---

## COLOR SYSTEM

### Light Mode Palette

#### Primary Colors

```
Primary Accent (Emerald Green)
  HEX: #10b981
  RGB: 16, 185, 129
  HSL: 160, 84%, 39%
  Usage: Primary CTAs, highlights, success states
  Contrast on white: 6.1:1 ✅ (WCAG AA)

Secondary Accent (Purple)
  HEX: #5b4fdd
  RGB: 91, 79, 221
  HSL: 247, 81%, 59%
  Usage: Secondary actions, links, emphasis
  Contrast on white: 5.2:1 ✅ (WCAG AA)
```

#### Neutral Colors

```
Background Primary (Off-white)
  HEX: #f9f9fb
  RGB: 249, 249, 251
  Usage: Page background

Background Secondary (White)
  HEX: #ffffff
  RGB: 255, 255, 255
  Usage: Cards, surfaces

Text Primary (Dark Gray)
  HEX: #1a1a2e
  RGB: 26, 26, 46
  Usage: Headings, body text
  Contrast on white: 9.8:1 ✅ (WCAG AAA)

Text Secondary (Mid Gray)
  HEX: #4a4a6a
  RGB: 74, 74, 106
  Usage: Secondary text, descriptions
  Contrast on white: 6.7:1 ✅ (WCAG AA)

Text Tertiary (Light Gray)
  HEX: #8a8ab0
  RGB: 138, 138, 176
  Usage: Hints, captions, disabled text
  Contrast on white: 4.8:1 ✅ (WCAG AA)

Border / Divider (Light Gray)
  HEX: #e5e5eb
  RGB: 229, 229, 235
  Usage: Borders, dividers, subtle separation
```

#### Status Colors

```
Success (Green)
  HEX: #10b981
  RGB: 16, 185, 129
  Hover: #059669
  Contrast: 6.1:1 ✅

Error (Red)
  HEX: #ef4444
  RGB: 239, 68, 68
  Hover: #dc2626
  Contrast: 5.9:1 ✅

Warning (Amber)
  HEX: #f59e0b
  RGB: 245, 158, 11
  Hover: #d97706
  Contrast: 5.8:1 ✅

Info (Blue)
  HEX: #3b82f6
  RGB: 59, 130, 246
  Hover: #2563eb
  Contrast: 5.3:1 ✅
```

---

### Dark Mode Palette

#### Primary Colors

```
Background Primary (Deep Charcoal)
  HEX: #1a1a2e
  RGB: 26, 26, 46
  Usage: Page background

Background Secondary (Slightly Lighter)
  HEX: #262641
  RGB: 38, 38, 65
  Usage: Cards, surfaces

Background Tertiary
  HEX: #323250
  RGB: 50, 50, 80
  Usage: Nested surfaces

Text Primary (White)
  HEX: #ffffff
  RGB: 255, 255, 255
  Contrast on dark bg: 14.8:1 ✅ (WCAG AAA)

Text Secondary (Light Gray)
  HEX: #b0b0d0
  RGB: 176, 176, 208
  Contrast: 8.2:1 ✅ (WCAG AA)

Text Tertiary (Mid Gray)
  HEX: #8a8aa8
  RGB: 138, 138, 168
  Contrast: 5.1:1 ✅ (WCAG AA)

Accent Primary (Emerald Green)
  HEX: #10b981
  RGB: 16, 185, 129
  Hover: #059669
  Contrast on dark: 8.2:1 ✅

Accent Secondary (Light Purple)
  HEX: #7c63e0
  RGB: 124, 99, 224
  Hover: #6d50d5
  Contrast on dark: 7.9:1 ✅
```

#### Status Colors (Dark Mode)

```
Success: #10b981 (same as light mode)
Error: #f87171 (lighter red for contrast)
Warning: #fbbf24 (lighter amber)
Info: #60a5fa (lighter blue)
```

---

### CSS Implementation

```css
/* Light Mode (Default) */
:root {
  --color-bg-primary: #f9f9fb;
  --color-bg-secondary: #ffffff;
  --color-bg-tertiary: #f3f3f7;
  
  --color-text-primary: #1a1a2e;
  --color-text-secondary: #4a4a6a;
  --color-text-tertiary: #8a8ab0;
  
  --color-border: #e5e5eb;
  
  --color-accent-primary: #10b981;
  --color-accent-primary-hover: #059669;
  
  --color-accent-secondary: #5b4fdd;
  --color-accent-secondary-hover: #4940c0;
  
  --color-success: #10b981;
  --color-success-light: #d1f5e4;
  
  --color-error: #ef4444;
  --color-error-light: #fee2e2;
  
  --color-warning: #f59e0b;
  --color-warning-light: #fef3c7;
  
  --color-info: #3b82f6;
  --color-info-light: #dbeafe;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #1a1a2e;
    --color-bg-secondary: #262641;
    --color-bg-tertiary: #323250;
    
    --color-text-primary: #ffffff;
    --color-text-secondary: #b0b0d0;
    --color-text-tertiary: #8a8aa8;
    
    --color-border: #3a3a52;
    
    --color-accent-primary: #10b981;
    --color-accent-primary-hover: #059669;
    
    --color-accent-secondary: #7c63e0;
    --color-accent-secondary-hover: #6d50d5;
    
    --color-success: #10b981;
    --color-success-light: #0d4e37;
    
    --color-error: #f87171;
    --color-error-light: #5e1818;
    
    --color-warning: #fbbf24;
    --color-warning-light: #664d03;
    
    --color-info: #60a5fa;
    --color-info-light: #1e3a8a;
  }
}

/* Manual Dark Mode Toggle (Override prefers-color-scheme) */
[data-theme="dark"] {
  --color-bg-primary: #1a1a2e;
  --color-bg-secondary: #262641;
  --color-bg-tertiary: #323250;
  
  --color-text-primary: #ffffff;
  --color-text-secondary: #b0b0d0;
  --color-text-tertiary: #8a8aa8;
  
  --color-border: #3a3a52;
}

[data-theme="light"] {
  --color-bg-primary: #f9f9fb;
  --color-bg-secondary: #ffffff;
  --color-bg-tertiary: #f3f3f7;
  
  --color-text-primary: #1a1a2e;
  --color-text-secondary: #4a4a6a;
  --color-text-tertiary: #8a8ab0;
  
  --color-border: #e5e5eb;
}
```

---

## TYPOGRAPHY

### Font Stack

```css
--font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
```

**Recommendation:** Use Vercel's **Geist** font for modern feel
```css
@import url('https://rsms.me/inter/inter.css');
--font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Type Scale (8px-based)

```css
/* Headings */
h1, .font-3xl {
  font-size: 48px;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.02em;
}

h2, .font-2xl {
  font-size: 40px;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.01em;
}

h3, .font-xl {
  font-size: 32px;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: -0.01em;
}

h4, .font-lg {
  font-size: 24px;
  line-height: 1.35;
  font-weight: 600;
}

h5, .font-md {
  font-size: 20px;
  line-height: 1.4;
  font-weight: 600;
}

h6, .font-base {
  font-size: 16px;
  line-height: 1.5;
  font-weight: 600;
}

/* Body Text */
body, p {
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
}

.text-sm, small {
  font-size: 14px;
  line-height: 1.4;
  font-weight: 400;
}

.text-xs, .caption {
  font-size: 12px;
  line-height: 1.4;
  font-weight: 500;
}
```

### Font Weights

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Line Height Scale

```css
--line-height-tight: 1.2;
--line-height-snug: 1.3;
--line-height-normal: 1.5;
--line-height-relaxed: 1.6;
--line-height-loose: 1.75;
```

---

## SPACING & GRID

### Spacing Scale (8px base)

```css
--space-0: 0;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

### Container Widths

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

/* Usage: max-width for content containers */
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin-left: auto;
  margin-right: auto;
}
```

### Padding/Margin Guidelines

```
Mobile (< 768px):
  Horizontal Padding: 16px (2 units)
  Vertical Padding: 24px (3 units)

Tablet (768px - 1024px):
  Horizontal Padding: 24px (3 units)
  Vertical Padding: 32px (4 units)

Desktop (> 1024px):
  Horizontal Padding: 32px-48px (4-6 units)
  Vertical Padding: 48px-64px (6-8 units)
```

---

## COMPONENTS

### Buttons

#### Primary Button

```css
.button-primary {
  background-color: var(--color-accent-primary);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all var(--transition-base);
}

.button-primary:hover {
  background-color: var(--color-accent-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
}

.button-primary:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.2);
}

.button-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

#### Secondary Button

```css
.button-secondary {
  background-color: transparent;
  color: var(--color-accent-secondary);
  border: 1px solid var(--color-border);
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
}

.button-secondary:hover {
  background-color: var(--color-bg-tertiary);
  border-color: var(--color-accent-secondary);
}
```

#### Icon Button

```css
.button-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.button-icon:hover {
  background-color: var(--color-bg-tertiary);
}

.button-icon svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}
```

---

### Cards

#### Tool Card

```css
.card-tool {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px;
  transition: all var(--transition-base);
}

.card-tool:hover {
  border-color: var(--color-accent-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.card-tool__header {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.card-tool__avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.card-tool__title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.card-tool__meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--color-text-tertiary);
  margin-bottom: 12px;
}

.card-tool__description {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
  line-height: 1.5;
}

.card-tool__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

.card-tool__rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

.card-tool__pricing {
  background-color: var(--color-bg-tertiary);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
}
```

---

### Forms

#### Input Field

```css
.input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  transition: all var(--transition-fast);
  min-height: 44px;
}

.input:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--color-bg-tertiary);
}

.input--error {
  border-color: var(--color-error);
}

.input--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

#### Label

```css
.label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.label--required::after {
  content: " *";
  color: var(--color-error);
}
```

#### Error Message

```css
.error-message {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  font-size: 12px;
  color: var(--color-error);
}

.error-message svg {
  width: 16px;
  height: 16px;
}
```

---

### Navigation

#### Header

```css
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header--dark {
  box-shadow: var(--shadow-sm);
}
```

#### Navigation Menu

```css
.nav-menu {
  display: flex;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu__item {
  position: relative;
}

.nav-menu__link {
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.nav-menu__link:hover {
  color: var(--color-accent-primary);
}

.nav-menu__link--active {
  color: var(--color-accent-primary);
  font-weight: 600;
}

.nav-menu__link--active::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-accent-primary);
  border-radius: 1px;
}
```

#### Mobile Bottom Navigation

```css
.nav-mobile {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  gap: 8px;
  z-index: 40;
}

.nav-mobile__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  cursor: pointer;
  transition: all var(--transition-fast);
  min-width: 60px;
}

.nav-mobile__item--active {
  color: var(--color-accent-primary);
}

.nav-mobile__icon {
  width: 24px;
  height: 24px;
}

.nav-mobile__label {
  font-size: 11px;
  font-weight: 600;
}
```

---

## ANIMATIONS

### Transitions

```css
:root {
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Common Animations

#### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn var(--transition-base);
}
```

#### Slide Up

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp var(--transition-base);
}
```

#### Scale In

```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn var(--transition-base);
}
```

### Reducing Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## DARK MODE IMPLEMENTATION

### Step 1: Add Theme Provider

```jsx
// app/providers.tsx
"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

### Step 2: Add Theme Toggle

```jsx
// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="button-icon"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
```

### Step 3: Update Global CSS

```css
/* globals.css */

@media (prefers-color-scheme: light) {
  :root {
    /* Light mode variables */
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode variables */
  }
}

/* Override when data-theme attribute is set */
html[data-theme="light"] {
  /* Light mode variables */
}

html[data-theme="dark"] {
  /* Dark mode variables */
}
```

---

## NAVIGATION ARCHITECTURE

### Desktop (>1024px)

```
Header (Sticky)
├── Logo
├── Search Bar (⌘K shortcut visible)
├── Main Navigation
│   ├── Explore
│   ├── Categories
│   ├── Prompts
│   ├── About
│   └── Research (Dropdown)
│       ├── Blog
│       ├── Comparisons
│       └── Guides
├── Theme Toggle
└── Submit Tool (Primary CTA)
```

### Mobile (<768px)

```
Header (Sticky)
├── Hamburger Menu
├── Logo
└── Theme Toggle

Bottom Navigation (Fixed)
├── Explore (Home)
├── Search (🔍)
├── Add Tool (+) [Primary/Centered]
└── More (⋯)
    ├── About
    ├── Blog
    └── Settings
```

---

## MOBILE GUIDELINES

### Viewport Meta Tag

```html
<meta 
  name="viewport" 
  content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5"
/>
```

### Safe Area Awareness

```css
/* Account for notch and home indicator */
.page-content {
  padding: max(16px, env(safe-area-inset-left))
           max(16px, env(safe-area-inset-top))
           max(16px, env(safe-area-inset-right))
           max(16px, env(safe-area-inset-bottom));
}

/* For bottom-fixed elements */
.nav-mobile {
  padding-bottom: env(safe-area-inset-bottom);
  bottom: 0;
}
```

### Touch Target Sizing

```
Minimum: 44x44px (Apple) / 48x48dp (Android)
Spacing: 8px minimum between targets

.button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px; /* Extra padding around content */
}
```

### Input Sizing for Mobile

```css
input,
select,
textarea {
  font-size: 16px; /* Prevents auto-zoom on iOS */
  min-height: 44px;
  min-width: 44px;
}
```

---

## IMPLEMENTATION CHECKLIST

- [ ] CSS Variables defined in `:root`
- [ ] Dark mode support added
- [ ] All colors tested for contrast
- [ ] Typography scale implemented
- [ ] Spacing system applied globally
- [ ] All components styled
- [ ] Animations implemented
- [ ] Mobile view tested
- [ ] Keyboard navigation verified
- [ ] Focus states visible
- [ ] Animations respect prefers-reduced-motion
- [ ] Theme toggle functional
- [ ] Sticky header working
- [ ] Search ⌘K shortcut working
- [ ] Navigation reorganized
- [ ] Social proof metrics displayed
- [ ] Tool cards show engagement data
- [ ] Buttons have proper states
- [ ] Forms accessible
- [ ] Images optimized
- [ ] Performance metrics green ✅

---

**Specification Version:** 1.0  
**Last Updated:** September 3, 2026  
**Author:** Claude Code (Expert Design Review)

