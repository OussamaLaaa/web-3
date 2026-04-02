# Cinematic Portfolio

A dark, minimal, and premium portfolio website built with React and TypeScript, featuring an immersive cinematic scrollytelling experience.

## Features

### Phase 1: Cinematic Scrollytelling Experience

The portfolio now features a journey-based narrative experience inspired by cinematic storytelling:

**Scene 0: Threshold / Door**
- Atmospheric entrance with layered depth
- Pinned ScrollTrigger timeline with scrub-based progression
- Door opening animation revealing light beam
- Cinematic "Enter" title with designed fade sequence
- Mobile optimized with reduced parallax
- Accessibility: prefers-reduced-motion fallback

**Scene 1: Entering the Studio (Hero)**
- Transformed Hero section into cinematic world entrance
- Pinned ScrollTrigger with extended duration (200% on desktop, 100% on mobile)
- Layered atmospheric backgrounds with depth and particles
- Multi-phase progression:
  - Atmosphere zoom and reveal
  - Parallax depth layers
  - Identity reveal with designed scale entrance
  - Title and subtitle cinematic animations
  - Camera push forward effect (zoom + fade)
- Feels like camera movement through a space
- Mobile optimized with shorter pin duration
- Accessibility: simplified elegant version for reduced motion

**Gateway Transition: Hero → Featured Work**
- Monitor/work wall component as portal to projects
- Transform takeover approach - monitor expands to fill screen
- Scrub-based progressive reveal
- Multi-phase animation:
  - Monitor frame emergence with 3D rotation
  - Screen activation with grid and glow
  - "Selected Work" label reveal
  - Monitor expansion (scale 3x on desktop, 2.5x on mobile)
  - Frame and label fade away
  - Smooth transition into work section
- Mobile optimized with adjusted scale and positioning
- Accessibility: simple fade-in for reduced motion

**Shared Infrastructure**
- Motion utilities for consistent behavior (`src/utils/motionUtils.ts`)
- Automatic mobile detection and adaptation
- Automatic reduced motion preference detection
- Performance optimized: no heavy blur filters or shaders
- Clean modular architecture ready for React Three Fiber integration

### Original Features

- **Featured Work Section**: Showcase of portfolio projects with clean grid layout
  - Scroll-triggered reveal animations for each project
  - Staggered timing for smooth, sequential reveals
- **Contact Section**: Contact information with social links and email
  - Subtle entrance animations for all elements
  - Smooth section pacing and timing
- **Dark Theme**: Premium dark color scheme with subtle gradients
- **Responsive Design**: Mobile-friendly layout that adapts to all screen sizes
- **TypeScript**: Fully typed with TypeScript for better developer experience
- **GSAP Animations**: Premium, minimal, and smooth cinematic motion layer
  - ScrollTrigger for scroll-based reveals
  - Smooth timelines with optimal easing curves

## Tech Stack

- React 18
- TypeScript
- Vite (build tool)
- GSAP 3 (GreenSock Animation Platform)
  - ScrollTrigger plugin for scroll-based animations
- Co-located CSS files (per-component `.css` files)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/OussamaLaaa/web-3.git
cd web-3
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
web-3/
├── src/
│   ├── components/
│   │   ├── DoorScene.tsx          # Scene 0: Threshold entrance
│   │   ├── DoorScene.css
│   │   ├── Hero.tsx               # Scene 1: Cinematic studio entrance
│   │   ├── Hero.css
│   │   ├── WorkGateway.tsx        # Gateway transition to work
│   │   ├── WorkGateway.css
│   │   ├── FeaturedWork.tsx       # Work showcase
│   │   ├── FeaturedWork.css
│   │   ├── Contact.tsx
│   │   └── Contact.css
│   ├── utils/
│   │   └── motionUtils.ts         # Motion utilities (mobile, reduced motion)
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Customization

### Update Portfolio Content

Edit the `works` array in `src/components/FeaturedWork.tsx` to add your own projects:

```typescript
const works: WorkItem[] = [
  {
    id: 1,
    title: 'Your Project Title',
    category: 'Project Category',
    year: '2024',
  },
  // Add more projects...
]
```

### Update Contact Information

Edit `src/components/Contact.tsx` to update your email and social links.

### Customize Styling

All styling is in dedicated CSS files for each component. Modify the color scheme, typography, and spacing to match your brand.

## Animation Details

The cinematic motion layer is implemented using GSAP with the following features:

### Scene 0: Door/Threshold (DoorScene.tsx)
- **Pinned ScrollTrigger**: Scene pins for 150% on desktop, 100% on mobile
- **Scrub-based**: All animations tied to scroll position (scrub: 1)
- **Multi-phase progression**:
  - Phase 1 (0-25%): Atmosphere reveal with scale and fade
  - Phase 2 (10-35%): "Enter" title fade in with vertical movement
  - Phase 3 (40-70%): Door panels slide open (x: ±100%)
  - Phase 4 (50-80%): Light beam reveal through opening
  - Phase 5 (75-100%): Title fade out
  - Phase 6 (85-100%): Atmosphere transition
- **Layered atmosphere**: 3 gradient layers for depth
- **Easing**: power2/power3 for smooth, premium feel
- **Mobile**: Reduced parallax intensity (30% of desktop)
- **Accessibility**: Simple fade-in for prefers-reduced-motion

### Scene 1: Studio Entrance (Hero.tsx)
- **Pinned ScrollTrigger**: Scene pins for 200% on desktop, 100% on mobile
- **Scrub-based**: All animations tied to scroll (scrub: 1)
- **Multi-phase cinematic progression**:
  - Phase 1 (0-30%): Atmosphere zoom from 1.3 to 1.0 scale
  - Phase 2 (0-40%): Depth layers parallax (y: 100px → 0, y: 60px → 0)
  - Phase 3 (20-60%): Identity container scale reveal + title rise
  - Phase 4 (40-70%): Subtitle entrance with vertical movement
  - Phase 5 (70-100%): Camera push forward (atmosphere scale 1.8, all content fades/moves up)
- **Layered backgrounds**: Atmosphere gradient + particle effects + 2 depth layers
- **Parallax**: Multiple layers at different speeds create camera movement feeling
- **Easing**: power2/power3 curves for cinematic acceleration
- **Mobile**: Shorter pin (100%), reduced parallax (30%)
- **Accessibility**: Simple staggered fade for prefers-reduced-motion

### Gateway Transition (WorkGateway.tsx)
- **Transform Takeover Approach**: Monitor starts small, expands to fill screen
- **Dual ScrollTrigger timelines**:
  - Timeline 1 (entrance): Trigger when gateway enters viewport
  - Timeline 2 (expansion): Trigger when gateway reaches center, expands monitor
- **Entrance sequence**:
  - Monitor frame 3D emergence (rotationX: 45° → 0°)
  - Screen activation with grid pattern
  - Glow effect reveal
  - "Selected Work" label fade in
- **Transform takeover sequence**:
  - Monitor scales 3x (desktop) or 2.5x (mobile)
  - Monitor moves up (y: -150px desktop, -100px mobile)
  - Frame and label fade away
  - Background darkens to pure black
  - Creates seamless portal into work section
- **Easing**: power2.inOut for smooth expansion
- **Mobile**: Adjusted scale/position, 95vw monitor width
- **Accessibility**: Simple fade-in, no transformation

### Featured Work Section (FeaturedWork.tsx)
- **ScrollTrigger**: Animations trigger when elements enter viewport (85% from top)
- **Staggered Reveals**: Each work item animates in sequence with 150ms delay
- **Vertical Movement**: Items rise from 80px below with fade-in
- **Duration**: 1 second per item for smooth, elegant reveals

### Contact Section (Contact.tsx)
- **ScrollTrigger**: Entire section animates when reaching 75% viewport
- **Cascading Timeline**: Title → Text → Email → Social links
- **Overlap**: Elements start animating before previous completes (-=0.4s to -=0.5s)
- **Unified Easing**: Power3.out across all elements for consistency

### Performance Considerations
- GSAP context cleanup on component unmount
- Optimized ScrollTrigger instances
- Minimal DOM manipulation
- Hardware-accelerated transforms (y, opacity, scale)
- No heavy blur filters (only light blur: 2px on light beam)
- Automatic mobile detection and reduced motion support
- will-change hints for optimized rendering

### Motion Utilities (motionUtils.ts)
- `prefersReducedMotion()`: Detects user motion preference
- `isMobile()`: Detects viewport < 768px
- `getParallaxIntensity()`: Returns 0 for reduced motion, 0.3x for mobile, 1x for desktop
- Ensures consistent behavior across all scenes

## Future Enhancements

This project is structured to support Phase 2+ additions:

### Architecture Ready for React Three Fiber
- Modular component structure allows easy integration of R3F canvases
- Scene-based organization (Scene 0, Scene 1, Gateway) maps to 3D scenes
- Motion utilities provide consistent behavior between 2D and 3D
- Transform takeover pattern works with `<Canvas>` overlays
- ScrollTrigger integration already tested with pinned scenes

### Suggested Phase 2 Features
- 3D workspace environment with Three.js/R3F
- Interactive desk objects (monitor, keyboard, plants)
- Realistic lighting and shadows
- Camera movements through 3D space
- Featured work appearing as 3D screens/frames
- Parallax depth with real 3D geometry

### Suggested Phase 3+ Features
- Interactive cursor effects
- Page transitions if routing added
- More cinematic scenes (e.g., coffee break, night mode)
- Sound design integration
- Advanced shader materials
- Physics-based interactions

### Technical Notes for Future Integration
- Keep 2D cinematic layers as fallback
- Use progressive enhancement for 3D features
- Maintain mobile and reduced-motion support
- Consider lazy loading R3F for performance
- Keep DOM text readable, use 3D for atmosphere/decoration only
