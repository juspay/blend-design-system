This is the Blend Design System documentation site, built with [Next.js](https://nextjs.org) and [Fumadocs](https://fumadocs.dev).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:3000/docs](http://localhost:3000/docs) to view the documentation.

## Structure

```
app/docs/                 Fumadocs docs layout and dynamic document route
app/api/search/           Search API route
content/docs/             MDX documentation and navigation metadata
components/mdx.tsx        Shared MDX component registry
lib/source.ts             Typed Fumadocs content source
source.config.ts          Fumadocs MDX configuration
```

Add pages under `content/docs`. Update the nearest `meta.json` to control navigation order and labels.
