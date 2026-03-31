# Cinematic Portfolio

A dark, minimal, and premium portfolio website built with React and TypeScript.

## Features

- **Hero Section**: Full-screen hero with elegant typography and scroll indicator
  - Cinematic entrance animations for headline and subtitle
  - Continuous floating animation for scroll indicator
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
│   │   ├── Hero.tsx
│   │   ├── Hero.css
│   │   ├── FeaturedWork.tsx
│   │   ├── FeaturedWork.css
│   │   ├── Contact.tsx
│   │   └── Contact.css
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

### Hero Section
- **Entrance Timeline**: Coordinated sequence of title, subtitle, and scroll indicator
- **Timing**: Title appears first (1.2s), followed by subtitle (1s), then scroll indicator (0.8s)
- **Scroll Indicator**: Continuous floating animation with smooth easing
- **Easing**: Power3.out for smooth, premium feel

### Featured Work Section
- **ScrollTrigger**: Animations trigger when elements enter the viewport (85% from top)
- **Staggered Reveals**: Each work item animates in sequence with 150ms delay
- **Vertical Movement**: Items rise from 80px below with fade-in
- **Duration**: 1 second per item for smooth, elegant reveals

### Contact Section
- **ScrollTrigger**: Entire section animates when reaching 75% viewport
- **Cascading Timeline**: Title → Text → Email → Social links
- **Overlap**: Elements start animating before previous completes (-=0.4s to -=0.5s)
- **Unified Easing**: Power3.out across all elements for consistency

### Performance Considerations
- GSAP context cleanup on component unmount
- Optimized ScrollTrigger instances
- Minimal DOM manipulation
- Hardware-accelerated transforms (y, opacity)

## Future Enhancements

This project is structured to support future additions:
- React Three Fiber for 3D elements
- Advanced parallax effects
- Interactive cursor effects
- Page transitions
