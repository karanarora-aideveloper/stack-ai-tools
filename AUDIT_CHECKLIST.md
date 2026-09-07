# Stack AI Tools — UI/UX Audit Checklist

**Status:** 🔴 Critical Issues Found  
**Last Updated:** September 3, 2026  
**Next Review:** After Phase 1 Implementation  

---

## 🔴 CRITICAL (Block Launch)

### Dark Mode & Theme
- [ ] Implement `prefers-color-scheme: dark` support
- [ ] Create light theme color tokens
- [ ] Create dark theme color tokens
- [ ] Test contrast ratios: Light mode & Dark mode
- [ ] Toggle dark/light mode in header or settings
- [ ] Audit all text for WCAG AA (4.5:1) compliance

### Navigation Simplification
- [ ] Reduce desktop nav to 5 items max
- [ ] Consolidate "Research" + "Claude Connectors" into submenu
- [ ] Make header sticky on scroll
- [ ] Add ⌘K keyboard shortcut for search
- [ ] Test navigation on mobile (375px, 768px, 1024px)

### Social Proof Metrics
- [ ] Display "222 AI Tools" count on homepage
- [ ] Display user count if available (e.g., "90M+ visitors")
- [ ] Show "Last updated" timestamp
- [ ] Add tool engagement metrics to cards:
  - ⏱ Time added (e.g., "37m ago")
  - 👁 View count
  - 💾 Bookmark/save count
  - ★ Rating + review count

### Tool Cards Enhancement
- [ ] Add metadata section (time, views, rating)
- [ ] Display author/creator avatar
- [ ] Show pricing tier (Free/Freemium/Paid)
- [ ] Add engagement footer with save count
- [ ] Improve visual hierarchy with better spacing

### Button & CTA Design
- [ ] Redesign primary button (new accent color)
- [ ] Add hover state with shadow/scale
- [ ] Add active state (pressed feedback)
- [ ] Add disabled state (grayed out + cursor-not-allowed)
- [ ] Ensure all CTAs are ≥44x44px (touch target)
- [ ] Test "Submit Tool" CTA visibility
- [ ] Add loading state to buttons (spinner)

---

## 🟡 HIGH (Must Fix)

### Color & Contrast
- [ ] Audit all text contrast ratios (4.5:1 minimum)
- [ ] Fix light purple background contrast issues
- [ ] Ensure colors pass WebAIM checker
- [ ] Define semantic color system (error, success, warning)
- [ ] Test on actual devices (different lighting)

### Typography System
- [ ] Define strict 8px scale: 12, 16, 20, 24, 32, 40, 48px
- [ ] Set line-height scale: 1.2, 1.3, 1.4, 1.5, 1.6
- [ ] Create heading weights: h1-h6 with consistent styling
- [ ] Ensure body text is always ≥16px on mobile
- [ ] Audit font family consistency (no random serif mix)

### Mobile Responsiveness
- [ ] Reduce bottom nav to 4 items max
- [ ] Test on iPhone 14, iPhone SE, Samsung Galaxy
- [ ] Ensure no horizontal scroll on mobile
- [ ] Test landscape orientation
- [ ] Audit safe area awareness (notch, home indicator)
- [ ] Check viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`

### Forms & Inputs
- [ ] Ensure all input labels are visible (not placeholder-only)
- [ ] Add input focus states (outline + shadow)
- [ ] Implement inline validation (on blur, not keystroke)
- [ ] Show clear error messages below fields
- [ ] Add helper text for complex inputs
- [ ] Ensure inputs are ≥44px tall on mobile

### Header & Navigation
- [ ] Make header sticky on scroll
- [ ] Implement search bar in sticky header
- [ ] Add logo clickthrough to homepage
- [ ] Test nav on mobile (hamburger menu if needed)
- [ ] Ensure back button works correctly
- [ ] Add breadcrumb on tool detail pages

---

## 🟢 MEDIUM (Should Fix)

### Spacing & Alignment
- [ ] Implement 8px/16px spacing system globally
- [ ] Audit padding/margin consistency
- [ ] Center content with max-width container
- [ ] Remove arbitrary spacing (e.g., `padding: 13px`)
- [ ] Use CSS Grid/Flexbox for alignment

### Icons & Visual Elements
- [ ] Ensure all icons are SVG (not PNG/emoji)
- [ ] Use single icon library (Lucide, Heroicons)
- [ ] Set consistent icon sizing
- [ ] Add alt text to meaningful icons
- [ ] Hide decorative icons from a11y tree

### Images & Media
- [ ] Convert to WebP/AVIF with fallbacks
- [ ] Implement lazy loading for below-fold images
- [ ] Add srcset for responsive images
- [ ] Ensure images have dimensions (prevent CLS)
- [ ] Compress images to <100KB

### Animation & Transitions
- [ ] Define transition tokens (150ms, 200ms, 300ms)
- [ ] Remove animations that don't convey meaning
- [ ] Respect `prefers-reduced-motion`
- [ ] Use transform/opacity only (not width/height)
- [ ] Test animation on low-end devices

### Loading States
- [ ] Add skeleton loaders for async content
- [ ] Show spinner for form submissions
- [ ] Display loading toast messages
- [ ] Implement success/error feedback
- [ ] Add retry buttons on failed loads

---

## ♿ ACCESSIBILITY (WCAG 2.1 AA)

### Keyboard Navigation
- [ ] Tab order matches visual order
- [ ] All interactive elements are keyboard-accessible
- [ ] Focus rings are visible (2-4px)
- [ ] Shift+Tab works for back navigation
- [ ] Form fields are navigable with Tab
- [ ] Add skip-to-main-content link

### Screen Reader
- [ ] All images have descriptive alt text
- [ ] Headings form logical hierarchy (h1→h6, no skips)
- [ ] Form labels properly associated with inputs (for attribute)
- [ ] Use aria-label for icon-only buttons
- [ ] Test with VoiceOver (Mac) or NVDA (Windows)

### Color & Contrast
- [ ] All text ≥4.5:1 contrast (WCAG AA)
- [ ] UI components ≥3:1 contrast
- [ ] Don't convey info by color alone (add icon/text)
- [ ] Test with color blindness simulator

### Focus & Selection
- [ ] Focus indicator visible on all interactive elements
- [ ] Focus outline ≥2px, contrasts with background
- [ ] Focus not hidden behind sticky elements
- [ ] Active/pressed states are distinct

---

## 📊 PERFORMANCE (Core Web Vitals)

### Metrics
- [ ] **LCP** (Largest Contentful Paint): <2.5s
- [ ] **FID** (First Input Delay): <100ms
- [ ] **CLS** (Cumulative Layout Shift): <0.1
- [ ] Lighthouse Score: ≥90 (Performance)

### Optimization
- [ ] Minify CSS/JS
- [ ] Preload critical fonts
- [ ] Lazy load non-critical images
- [ ] Code split by route
- [ ] Remove unused CSS
- [ ] Audit 3rd-party scripts (tracking, ads)

---

## 🧪 TESTING CHECKLIST

### Device Testing
- [ ] iPhone 14 Pro (375px)
- [ ] iPhone SE (375px)
- [ ] Samsung Galaxy S21 (360px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px+)
- [ ] Desktop 1440px
- [ ] Desktop 2560px (ultrawide)

### Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Orientations
- [ ] Portrait
- [ ] Landscape
- [ ] Foldable devices (if applicable)

### Connectivity
- [ ] 4G LTE
- [ ] 5G
- [ ] Slow 3G (throttle in DevTools)
- [ ] Offline fallback

---

## 📋 PAGE-BY-PAGE AUDIT

### Homepage
- [ ] Dark mode: ✅ / ❌
- [ ] Navigation: ✅ / ❌
- [ ] Social proof visible: ✅ / ❌
- [ ] Search prominent: ✅ / ❌
- [ ] CTA visible: ✅ / ❌
- [ ] Tool cards show metrics: ✅ / ❌
- [ ] Mobile optimized: ✅ / ❌

### Categories Page
- [ ] Loads quickly (<2.5s)
- [ ] Cards display consistently
- [ ] Filters work correctly
- [ ] Sorting works (popular, newest, rating)
- [ ] Pagination/infinite scroll works
- [ ] Mobile: stacked layout

### Tool Detail Page
- [ ] All metadata displays (pricing, rating, reviews)
- [ ] Screenshots/video embedded
- [ ] "Try Now" button prominent
- [ ] Related tools recommended
- [ ] Sticky header works
- [ ] Share buttons included
- [ ] Mobile: responsive layout

### Prompts Page
- [ ] Cards display with images
- [ ] Filter by AI model works
- [ ] Copy-to-clipboard works
- [ ] Favorite/bookmark works
- [ ] Preview shows correctly

### Submit Tool Page
- [ ] Form labels clear
- [ ] Required fields marked
- [ ] Validation works (inline errors)
- [ ] Submit button visible
- [ ] Success message displays
- [ ] Mobile: form is usable

---

## 🎨 DESIGN TOKENS VALIDATION

### Colors Defined
- [ ] Light mode: 12+ color tokens
- [ ] Dark mode: 12+ color tokens
- [ ] Enough contrast: All ✅
- [ ] Used consistently: ✅

### Typography Defined
- [ ] Font scale: 6-8 sizes
- [ ] Font weights: Light, Normal, Medium, Bold
- [ ] Line heights: 1.2-1.6
- [ ] Letter spacing: 0-0.5px

### Spacing Defined
- [ ] Scale: xs (4px) → 3xl (64px)
- [ ] Applied consistently
- [ ] No arbitrary values

### Shadows Defined
- [ ] Light shadow (sm)
- [ ] Medium shadow (md)
- [ ] Dark shadow (lg)
- [ ] Used for hierarchy

### Border Radius Defined
- [ ] Small (4px)
- [ ] Medium (8px)
- [ ] Large (12px)
- [ ] Full (9999px)

---

## 📈 SUCCESS METRICS (Post-Launch)

Set baseline, measure improvement:

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Bounce Rate | TBD | -5-10% | 30 days |
| Avg Session Duration | TBD | +20-30% | 30 days |
| CTA Click Rate | TBD | +25-40% | 30 days |
| Mobile Traffic Share | TBD | +15% | 60 days |
| Dark Mode Usage | TBD | 40%+ | 60 days |
| Lighthouse Score | TBD | 90+ | Ongoing |
| Accessibility Score | TBD | 95+ | Ongoing |

---

## 🚀 ROLLOUT PLAN

### Week 1-2: Phase 1 (Critical)
- Dark mode + color system
- Navigation restructure
- Social proof metrics
- Card redesign

### Week 3-4: Phase 2 (High Priority)
- Button design overhaul
- Sticky header + search
- Typography system
- Touch target audit

### Week 5-6: Phase 3 (Medium)
- Loading states
- Animation system
- Image optimization
- Accessibility fixes

### Week 7+: Phase 4 (Polish)
- A/B testing
- User feedback iteration
- Monitor metrics
- Continuous improvement

---

**Audit Prepared:** September 3, 2026  
**Auditor:** Claude Code (Expert UI/UX Review)  
**Status:** Ready for Implementation

