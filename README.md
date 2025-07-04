# Next.js Modern Auth App

A modern authentication app built with Next.js, Tailwind CSS, shadcn/ui, and Framer Motion. Inspired by Aceternity UI for a beautiful, professional user experience.

## Features

- Modern, responsive authentication pages (signup & login)

- Accessible, animated UI using shadcn/ui and Framer Motion
- Tailwind CSS for rapid, utility-first styling
- Clean, professional design inspired by Aceternity UI
- Easy to customize and extend

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Aceternity UI](https://ui.aceternity.com/) (design inspiration)

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   # If you haven't already, add shadcn/ui components:
   npx shadcn add card input button
   ```

2. **Run the development server:**
   ```sh
   npm run dev
   ```

3. **Open your app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

- **Illustrations:** Replace the SVG/image in `public/` for your own branding.
- **UI Components:** Use more shadcn/ui or Aceternity UI patterns for additional pages.
- **Styling:** Tweak Tailwind classes for your brand colors and style.

## Folder Structure

- `src/app/signup/page.tsx` – Signup page
- `src/app/login/page.tsx` – Login page
- `src/components/ui/` – shadcn/ui components
- `public/` – Static assets (SVGs, images)

## License

MIT

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
