# Product Management App

A modern, full-featured product management application built with Next.js, React, and TypeScript. This application provides a comprehensive solution for managing products, organizing workflows, and streamlining business operations.

## Features

- **Responsive Design** - Mobile-first approach with seamless experience across all devices
- **Modern UI Components** - Built with shadcn/ui for a polished, accessible interface
- **Dark Mode Support** - Full dark mode implementation with system preference detection

- **Type-Safe Development** - Complete TypeScript support for robust code quality
- **Performance Optimized** - Leveraging Next.js App Router for optimal performance
- **Accessible** - WCAG compliant components and semantic HTML throughout

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) - React framework for production
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - High-quality React components
- **Font**: [Geist](https://vercel.com/font) - Modern, clean typeface

## Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun package manager

## Getting Started

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd product-management-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application

## Project Structure

\`\`\`
product-management-app/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── globals.css         # Global styles and theme configuration
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── [custom-components] # Application-specific components
├── hooks/
│   ├── use-mobile.ts       # Mobile detection hook
│   └── use-toast.ts        # Toast notification hook
├── lib/
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
├── styles/                 # Additional stylesheets
├── next.config.mjs         # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
\`\`\`

## Customization

### Theme Configuration

The application uses CSS custom properties for theming. Modify the color scheme in `app/globals.css`:

\`\`\`css
:root {
  --primary: oklch(0.205 0 0);
  --secondary: oklch(0.97 0 0);
  --accent: oklch(0.97 0 0);
  /* ... more theme variables ... */
}
\`\`\`

### Adding New Components

To add new shadcn/ui components:

\`\`\`bash
npx shadcn@latest add [component-name]
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Configuration Files

- **next.config.mjs** - Next.js configuration
- **tsconfig.json** - TypeScript compiler options
- **postcss.config.mjs** - PostCSS configuration for Tailwind CSS
- **components.json** - shadcn/ui configuration

## Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Your app will be live in seconds

### Deploy to Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- AWS Amplify
- Netlify
- Railway
- Render
- DigitalOcean

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## Support

For support, please open an issue in the repository or contact the development team.

---
