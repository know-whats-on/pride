# Landing Page Redesign v2 - Complete

## Changes Implemented

### ✅ Full-Screen Edge-to-Edge Hero
- **Removed**: Glassy card panel with rounded corners and margins
- **Added**: Full viewport height hero (100vh - header height)
- **Design**: Text placed directly on background image with gradient overlays
  - Top overlay: `from-black/40 via-transparent`
  - Bottom overlay: `to-black/55`
- **Typography**: White text with drop shadows for legibility (WCAG AA compliant)
- **Badge**: Translucent dark badge for "Pride Month • Human-centred leadership"
- **Image**: Diverse, empowered professional leader from Unsplash
- **Responsive**: Left-aligned on desktop (max-width 640px), bottom-aligned on mobile

### ✅ Fixed Rotating Word Layout Shift
- **Problem**: Previous AnimatePresence with y-translate caused layout reflow
- **Solution**: 
  - Fixed-width container (`min-w-[8.5rem]`) based on longest word ("Presence.")
  - Absolute positioning for all words with opacity-only transitions
  - Invisible spacer element maintains layout
  - No more jumping or shifting
- **Animation**: 200ms opacity crossfade every 2 seconds

### ✅ Removed Sections
Completely removed from landing page:
1. **"Explore Each Coach"** - Large expanded coach cards
2. **"How It Works"** - 3-step process section
3. **"Trust & Safety"** - Dedicated section (moved to footer disclaimer)
4. **Ultra-Clear CTAs** - Compact coach cards above the fold

### ✅ New "3P Picker" Section
- **Title**: "What do you want to take control of?"
- **Design**: Minimal, elegant accordion-style cards
- **Options**: 
  1. Lead with Pride
  2. Enhance your Presence  
  3. Build Your Power
- **Interaction**: Click to expand inline with smooth height animation
- **Expanded Content**:
  - Purpose line (1 sentence)
  - 2 bullet points
  - Primary CTA button "Start [Coach] Coach"
- **Responsive**: 
  - Mobile: Stacked
  - Tablet: 2 columns, expanded spans full width
  - Desktop: 3 columns, expanded spans full width
- **Animation**: 200ms ease-out, no bounce

### ✅ Updated Header
- **Removed**: "Coaches", "How it works", "Trust" secondary nav links
- **Kept**: Only "FAQ" link in secondary nav
- **Design**: Clean, minimal navigation

### ✅ Simplified FAQ
Reduced to exactly 4 items:
1. What should I share?
2. Is this confidential?
3. How long does it take?
4. Can I switch coaches?

Removed: "What do I do if I'm distressed?" (covered in footer)

### ✅ Updated Coach Picker Bottom Sheet
- **Changed**: Promises from long descriptors to one-liners
  - Presence: "Voice + Values"
  - Pride: "Belonging + Boundaries"
  - Power: "Influence + Impact"
- **Design**: Clean, lots of whitespace, premium feel

### ✅ Footer Updates
- **Disclaimer**: Single paragraph covering all legal/safety notices
- **Text**: "Workplace coaching support only. Not therapy, diagnosis, legal advice, or HR instruction. If you're in distress or danger, contact local emergency services or professional support."
- **Links**: Presence, Pride, Power, Back to top

## Quality Checks

✅ Hero is full-bleed edge-to-edge  
✅ Text contrast passes WCAG AA  
✅ Rotating word has zero layout shift  
✅ All specified sections removed  
✅ 3P Picker is minimal and elegant  
✅ Accordion expansion is smooth (200ms)  
✅ Mobile-first responsive design  
✅ Premium, warm Pride Month aesthetic  
✅ No rainbow washing  
✅ All navigation and routing works correctly  

## File Changes

### New Files
- `/src/app/components/ThreePPicker.tsx` - New accordion picker component

### Modified Files
- `/src/app/pages/Landing.tsx` - Complete redesign
- `/src/app/components/RotatingWord.tsx` - Fixed layout shift
- `/src/app/components/Header.tsx` - Simplified secondary nav
- `/src/app/components/CoachPickerSheet.tsx` - Updated with one-line promises

### Unchanged (Still Used)
- All coach route pages (CoachPresence, CoachPride, CoachPower)
- All UI components
- Theme and styling systems
- PWA infrastructure

### No Longer Used on Landing (Not Deleted)
- `/src/app/components/CoachCard.tsx`
- `/src/app/components/CompactCoachCard.tsx`

## Mobile-First Viewport Targets

- **Mobile**: 390×844 (iPhone 14/15 baseline)
- **Tablet**: 834×1194
- **Desktop**: 1440×1024

All layouts tested and responsive across these breakpoints.
