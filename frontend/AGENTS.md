# Sakhi Agrotech Frontend — Agent Rules

## Color Palette (mandatory)

Only the 8 Coolors palette colors may be used. No other hex values, Tailwind default color scales, or legacy tokens are permitted.

| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | `#fbf6ee` | Page background, text on dark surfaces |
| `sand` | `#efe5d2` | Secondary background, cards, alternating rows |
| `forest` | `#33482d` | Primary brand — nav, footer, headings, buttons |
| `olive` | `#66744a` | Hover states, success messages |
| `earth` | `#6a4531` | Error states, deep accents |
| `gold` | `#c8a15a` | CTA highlights, focus rings |
| `taupe` | `#bca689` | Muted text, borders |
| `charcoal` | `#2c2b28` | Body text, hero overlay |

### Rules

- Use Tailwind classes: `bg-forest`, `text-cream`, `border-taupe`, etc.
- Import `PALETTE` or `SEMANTIC` from `src/lib/colors.ts` for JS/TS inline styles (GSAP, etc.).
- Never use raw hex in components, `gray-*`, `green-*`, `red-*`, `white`, `black`, or `brand-*` classes.
- Run `npm run check:colors` before committing.

Source: [Coolors palette](https://coolors.co/fbf6ee-efe5d2-33482d-66744a-6a4531-c8a15a-bca689-2c2b28)

---

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
