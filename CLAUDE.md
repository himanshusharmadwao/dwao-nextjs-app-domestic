# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
- `npm run dev` - Start development server with Turbopack (faster than standard webpack)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

### Bundle Analysis
- `ANALYZE=true npm run build` - Generate bundle analysis report

## Architecture Overview

### Framework & Stack
- **Next.js 15.2.0** with App Router architecture
- **React 19.1.0** with modern features
- **Tailwind CSS 4.0.9** for styling
- **Strapi headless CMS** for content management
- **Axios** for API communication

### Key Directory Structure
```
/app/                    # App Router pages (Next.js 13+ structure)
├── [dynamic-routes]/    # Dynamic routing for content types
├── layout.jsx          # Root layout with Header/Footer
└── page.jsx            # Homepage

/components/             # Organized by feature and hierarchy
├── layout/             # Header, Footer components
├── common/             # Reusable components across pages
├── ui/                 # Base UI components (Card, Button, etc.)
├── home/               # Homepage-specific components
├── [feature]/          # Feature-specific components
└── StructuredData/     # SEO structured data components

/libs/apis/             # API layer
├── baseApi.js          # Axios configuration and interceptors
├── data/               # API functions organized by content type
└── utils.js            # API utility functions

/services/              # Service-specific page components
└── [service-name]/     # Each service has its own directory
    ├── components/     # Service-specific components
    ├── data/          # Service data
    └── index.jsx      # Main service page component

/data/                  # Static JSON data files
```

### Content Management Integration
- **Strapi CMS Backend**: All dynamic content managed through Strapi
- **Preview Mode**: Draft content preview functionality implemented
- **Dynamic Routing**: 
  - `/blog/[slug]` - Blog posts
  - `/case-studies/[industry]/[slug]` - Case studies by industry
  - `/service/[slug]` - Individual services
  - `/partners/[slug]` - Partner pages
- **ISR (Incremental Static Regeneration)**: Used for content updates

### API Layer Patterns
- **baseApi.js**: Centralized Axios configuration with interceptors
- **Content APIs**: Organized by content type in `/libs/apis/data/`
- **Error Handling**: Centralized error handling in API layer
- **Caching**: Strapi-based caching with revalidation strategies

### SEO Implementation
- **Dynamic Metadata**: Generated per page using Next.js metadata API
- **Structured Data**: Implemented in `/components/StructuredData/`
- **OpenGraph**: Social media optimization for all pages
- **Canonical URLs**: Proper URL canonicalization

### Performance Optimizations
- **Bundle Analysis**: Integrated with `@next/bundle-analyzer`
- **Code Splitting**: Custom webpack configuration in `next.config.mjs`
- **Image Optimization**: Next.js Image component with Strapi/Cloudinary integration
- **Static Generation**: Timeout set to 120 seconds for large content builds

### Path Aliases
- `@/*` maps to project root (configured in `jsconfig.json`)
- Use `@/components/`, `@/libs/`, `@/data/` for imports

### Important Configuration
- **next.config.mjs**: Contains image domains, webpack optimizations, and bundle analyzer
- **postcss.config.mjs**: Tailwind CSS configuration
- **eslint.config.mjs**: ESLint with Next.js core web vitals rules

### Development Notes
- Use Turbopack for faster development builds (`npm run dev`)
- **IMPORTANT: Always run `npm run build` locally before pushing to ensure no build errors**
- Always run `npm run lint` before committing
- Preview mode is available for draft content testing
- Bundle analysis should be run periodically to monitor performance (`ANALYZE=true npm run build`)
- Required devDependency: `critters` package for CSS optimization

### Business Context
DWAO is a digital marketing and analytics company. The website serves as both a marketing tool and knowledge base, featuring:
- Marketing automation services
- Google DV360 management
- Case studies by industry
- Client testimonials and reviews
- Partnership programs

Content is managed through Strapi CMS with dynamic routing for all major content types.