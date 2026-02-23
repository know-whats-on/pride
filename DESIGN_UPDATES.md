# Pride, Presence & Power - Design System Updates

## Summary of Changes

### Visual Theme - Warm Pride Month (No Rainbow Washing)
✅ **Implemented**
- Subtle Pride Month badge in hero: "Pride Month • Human-centred leadership"
- Soft gradient accents used sparingly (hero bottom border, badge backgrounds)
- Warm color palette with executive + inclusive feel
- Premium glassy overlay on hero for readability
- No loud rainbow stripes or heavy Pride motifs

### Hero Section - Conversion-Driven
✅ **Implemented**
- **New Headline**: "Transforming leaders with [Pride. Power. Presence.]"
- **Rotating Words**: Auto-rotating coach names with color-coded accents
  - Pride (violet), Power (green), Presence (teal)
  - Smooth 200ms crossfade transition every 2 seconds
- **Background Image**: Unsplash hero image with dark gradient overlay
- **Subline**: Single sentence - "Choose a coach and get practical scripts, reflection prompts, and next-step actions."
- **Pride Badge**: Subtle chip-style badge at top

### Above-the-Fold CTAs - Ultra-Clear
✅ **Implemented**
Three compact coach cards with:
- **Presence Coach**: "Enhance your Presence" | Voice + Values, Scripts for real moments
- **Pride Coach**: "Lead with Pride" | Belonging + Boundaries, Reduce Pride Tax
- **Power Coach**: "Grow Your Influence" | Influence + Impact, Stakeholder map

Each card includes:
- Clear title + one-liner
- 2 micro-outcome chips
- Prominent "Start [Coach]" button
- Better tap targets (min 48px height)
- Active press states (scale animation)

### Navigation Updates
✅ **Implemented**
- **Secondary Nav**: Added jump links row in header (Coaches, How it works, Trust, FAQ)
- Smooth scroll-to-section behavior
- Mobile-optimized with horizontal scroll
- Ghost button styling for clean look

### Coach Cards - Scannable
✅ **Implemented**
Tightened expanded sections:
- "What it helps with": Max 3 bullets (enforced with `.slice(0, 3)`)
- "Best for": Max 3 bullets
- "Example prompts": Exactly 3
- Safety note remains verbatim

### Coach Route Pages - Quick Start
✅ **Implemented**
Improved coach pages with:
- **Primary CTA**: "Start chat" (full width, accent color)
- **Secondary CTAs**: "Copy system prompt" + "Show prompt" (side by side)
- Collapsible system prompt (clean toggle behavior)
- Skeleton loading state (800ms shimmer on mount)
- Toast notification: "Copied. Paste into your AI chat."
- Better tap targets and visual hierarchy

### Design System - Premium UX
✅ **Implemented**

**Colors:**
- 3 calm accent colors only (Presence=teal, Pride=violet, Power=green)
- Subtle Pride gradient tokens (`--pride-gradient-start/end`)
- Glass overlay tokens (`--glass-bg`, `--glass-border`)
- Pride badge tokens (`--pride-badge-bg`, `--pride-badge-text`)

**Interactions:**
- Active press states on all cards (scale 0.98)
- Touch targets: min 44×44px for accessibility
- Skeleton shimmer animation for loading states
- Smooth transitions (150-200ms)
- Toast feedback on copy actions

**Accessibility:**
- WCAG AA contrast maintained on hero overlay
- Clear tap targets with padding
- Keyboard-friendly navigation
- Semantic HTML structure

### Components Created/Updated

**New Components:**
1. `CompactCoachCard.tsx` - Above-the-fold CTAs
2. `RotatingWord.tsx` - Animated word rotation in hero
3. `OfflineBanner.tsx` - Offline mode detection + banner

**Updated Components:**
1. `Header.tsx` - Added secondary nav with jump links
2. `CoachCard.tsx` - Tightened expanded content (max 3 bullets)
3. `CoachPage.tsx` - Added Quick Start section, skeleton loading, better UX
4. `Landing.tsx` - Complete hero redesign, compact CTAs, Pride theme

**Style Updates:**
1. `theme.css` - Added Pride Month tokens, glass overlay, gradients
2. `index.css` - Added utility classes for tap targets, pressed states, shimmer

### Content Tone
✅ **Implemented**
- Executive, warm, inclusive, practical
- Less wordy on landing page
- Clear CTAs above the fold
- Detailed info in expanded sections

### PWA-Ready Patterns
✅ **Already Implemented**
- Offline banner component (shows when offline)
- System prompts readable offline
- Responsive design (mobile-first)
- Fast loading with skeleton states

---

## File Structure

```
/src/app/
├── components/
│   ├── CoachCard.tsx (updated - scannable expanded content)
│   ├── CompactCoachCard.tsx (new - above-the-fold CTAs)
│   ├── CoachPage.tsx (updated - Quick Start + skeleton loading)
│   ├── Header.tsx (updated - secondary nav)
│   ├── OfflineBanner.tsx (new - offline detection)
│   └── RotatingWord.tsx (new - animated words)
├── pages/
│   └── Landing.tsx (updated - new hero + CTAs)
└── /src/styles/
    ├── theme.css (updated - Pride tokens)
    └── index.css (updated - utility classes)
```

---

## Notes for Development Team

### Hero Image
- Current: Unsplash stock photo
- **Action Required**: Replace with licensed/branded image
- Subject: Empowered, happy employee in modern workplace
- Treatment: Slight blur or dark overlay for text contrast

### Motion Package
- Using `motion/react` (not framer-motion)
- Import: `import { motion } from "motion/react"`
- Already installed in package.json

### Accessibility
- All interactive elements have min 44×44px touch targets
- WCAG AA contrast maintained throughout
- Semantic HTML with proper ARIA labels

### Future Enhancements
- Consider adding haptic feedback (web vibration API) for button presses
- Add analytics tracking for coach selection
- Consider A/B testing different hero images
- Add service worker for true PWA offline support

---

## Design Tokens Reference

### Pride Month Palette
```css
--pride-gradient-start: rgba(168, 85, 247, 0.15); /* Violet */
--pride-gradient-end: rgba(8, 145, 178, 0.15);   /* Teal */
--pride-badge-bg: rgba(168, 85, 247, 0.1);
--pride-badge-text: #7e22ce;
```

### Coach Accents
```css
--accent-presence: #0891b2;      /* Cyan/Teal */
--accent-pride: #a855f7;         /* Violet */
--accent-power: #059669;         /* Green */
```

### Glass Overlay
```css
--glass-bg: rgba(255, 255, 255, 0.92);
--glass-border: rgba(255, 255, 255, 0.3);
```
