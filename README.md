# Gabriel Martinusso - Portfolio

A modern, interactive portfolio website featuring 3D graphics, smooth animations, and a CERN-inspired particle accelerator preloader.

## Tech Stack

### Core
- **React 19** - UI library
- **Vite 7** - Build tool and dev server

### 3D Graphics
- **Three.js** - 3D rendering engine
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **React Three Postprocessing** - Post-processing effects

### Animation
- **Framer Motion** - Declarative animations
- **GSAP** - High-performance timeline animations
- **Lenis** - Smooth scroll library

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Custom CSS** - Advanced effects (grain, scanlines, glassmorphism)

### Fonts
- **Syne** - Display headings
- **Space Grotesk** - Body text
- **JetBrains Mono** - Monospace/code text

## Features

- **CERN LHC Particle Accelerator Preloader** - 3D animated loading screen simulating particle collision
- **Interactive 3D Atom Scene** - Animated nucleus with orbiting electrons
- **Custom Cursor** - Magnetic cursor with hover effects
- **Glitch Text Effects** - Cyberpunk-style text animations
- **Magnetic Buttons** - Interactive buttons with magnetic hover
- **Smooth Scrolling** - Lenis-powered buttery smooth scroll
- **Noise/Grain Overlay** - Film grain texture effect
- **Gradient Orbs** - Ambient background elements
- **Responsive Design** - Mobile-first approach

## Inspirations

- **Awwwards Portfolios** - Award-winning portfolio designs and interactions
- **CERN / LHC** - Particle physics aesthetics, control room interfaces, scientific visualization

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── canvas/         # Three.js 3D scenes
│   ├── loading/        # Preloader components
│   ├── sections/       # Page sections (Hero, About, etc.)
│   └── ui/             # Reusable UI components
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```
