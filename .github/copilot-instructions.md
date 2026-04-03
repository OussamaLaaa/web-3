# Copilot Instructions

## Project summary
This project is a personal portfolio website for a UI/UX Designer.
The website should feel cinematic, premium, dark, editorial, and immersive.
It is inspired by the feeling of interactive creative sites, but it must remain original and personal.

## Core concept
The homepage is treated like a journey through a designer’s creative workspace.
The experience should feel like entering a world, not just browsing normal sections.

## Approved homepage structure
1. Hero / Identity
2. Selected Work
3. Recommendations
4. CTA / Contact

## Technical stack
- React
- TypeScript
- Vite
- GSAP / ScrollTrigger
- Future integration: React Three Fiber (not yet)

## Design direction
- Dark premium editorial aesthetic
- Cinematic pacing and transitions
- Layered visual depth
- Smooth, intentional motion
- Avoid generic portfolio layouts
- Avoid flashy effects

## Important implementation rules
- Keep text readable and accessible as DOM when possible
- Prioritize performance and responsiveness
- Avoid heavy fullscreen blur filters
- Avoid unnecessary complexity
- Prefer modular components and reusable section primitives
- Do not introduce full 3D unless explicitly requested
- When modifying a section, preserve the existing cinematic structure unless explicitly told to redesign it

## Motion principles
- Motion should feel premium, calm, cinematic, and deliberate
- Avoid excessive bouncing, spinning, or game-like motion
- Use GSAP ScrollTrigger for pinned and scrubbed sequences only when the scope clearly requires it
- Prefer subtle spatial movement over basic fade-ins

## Workflow expectations
- Always keep tasks well-scoped
- Prefer changing one section or one feature at a time
- Explain clearly what files were changed and why
- Verify build success before finalizing
