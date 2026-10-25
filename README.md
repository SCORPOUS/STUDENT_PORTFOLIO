# R Kasinadh — Portfolio

A responsive, single-page portfolio built with React, Vite, Tailwind CSS, and Framer Motion. It is a static site; the contact form opens the visitor's email application and does not need a backend.

## Run locally

1. Install Node.js (version 20.19+ or 22.12+).
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the local URL printed by Vite.

Create a production build with `npm run build`; preview it locally with `npm run preview`.

## Edit content

Update the portfolio details in [`src/data.js`](./src/data.js): bio, education, skills, projects, credentials, achievement, email, and social links. Project links or certificate details that were not supplied are marked with `TODO`; replace those values when available.

Add your resume as `public/resume.pdf` so the hero's **Download Resume** link works. The profile card is an initials-based placeholder; replace it with a photo and suitable alternative text when you have one.

Colors, layout, responsive breakpoints, and light/dark themes are in [`src/index.css`](./src/index.css). The main page structure is in [`src/App.jsx`](./src/App.jsx).

## Deploy

### Netlify or Vercel

Import the project repository, use `npm run build` as the build command, and `dist` as the publish/output directory. No environment variables are required.

### GitHub Pages

Build the site with `npm run build` and publish the generated `dist` directory with a static-site GitHub Pages action or deployment workflow. If the site is hosted at a repository subpath rather than a custom domain, set Vite's `base` option in `vite.config.js` to `/<repository-name>/` before building.
