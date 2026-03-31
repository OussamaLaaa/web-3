# Cinematic Portfolio

A dark, minimal, and premium portfolio website built with React and TypeScript.

## Features

- **Hero Section**: Full-screen hero with elegant typography and scroll indicator
- **Featured Work Section**: Showcase of portfolio projects with clean grid layout
- **Contact Section**: Contact information with social links and email
- **Dark Theme**: Premium dark color scheme with subtle gradients
- **Responsive Design**: Mobile-friendly layout that adapts to all screen sizes
- **TypeScript**: Fully typed with TypeScript for better developer experience

## Tech Stack

- React 18
- TypeScript
- Vite (build tool)
- CSS Modules

## Getting Started

### Prerequisites

- Node.js 16+ and npm

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

## License

MIT
