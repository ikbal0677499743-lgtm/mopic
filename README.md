# Mopic V3 Photobook Editor

A professional photobook editor built with Next.js 14, TypeScript, and Tailwind CSS. Based on a complete Printbox data model audit with production-grade types, database schema, pricing, and attribute cascade system.

## ✓ Verification Checklist

All requirements from the problem statement have been implemented:

- ✅ npm run dev compiles with zero errors
- ✅ npm run build compiles with zero errors
- ✅ All routes exist (/wizard, /editor, /preview, /summary)
- ✅ All V3 types compile without errors
- ✅ Database schema SQL file complete with 25+ tables and seed data
- ✅ 9 workspaces with correct dimensions
- ✅ 4 attributes with correct positions and price modes
- ✅ SIZE values correctly link to cover + block workspaces
- ✅ 2 attribute rules (HC→HC_sizes, SC→SC_sizes)
- ✅ Prices with correct base amounts per size
- ✅ Paper surcharges (0.00 / 0.50 / 0.75)
- ✅ Page configs use 24 min/initial (NOT 20)
- ✅ Price calculator matches examples: HC_Square+Glossy+24p=$35, HC_Square+Silk+40p=$89, SC_Horizontal+Matte+60p=$86
- ✅ Editor canvas correctly switches workspace on cover vs inner spread
- ✅ HC cover shows spine, SC cover does not
- ✅ Sidebar tabs toggle open/close correctly
- ✅ Zoom controls work (50-200%)
- ✅ Page thumbnail strip shows all spreads

## Pricing Formula

```
TOTAL = base_price(size) + (paper_per_page_surcharge × total_pages) + (page_price × extra_pages_above_24)
```

### Examples (All Tests Pass ✓)
- **HC_Square + Glossy + 24p** = $35 + ($0×24) + ($1.50×0) = **$35.00** ✓
- **HC_Square + Silk + 40p** = $35 + ($0.75×40) + ($1.50×16) = **$89.00** ✓
- **SC_Horizontal + Matte + 60p** = $20 + ($0.50×60) + ($1.00×36) = **$86.00** ✓

## Getting Started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Tech Stack
- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Zustand (state management)
- Fabric.js 6 (canvas)
- Supabase (database + storage)
- Lucide React (icons)

## Key Features
- 9 workspaces (6 cover + 3 block) with exact Printbox dimensions
- 4-attribute cascade system (type → size → paper → theme)
- Combinatorial pricing with per-page surcharges
- Printbox-compatible Design JSON format
- 25+ database tables with proper relations
- Pages min = 24 (V3 spec)

## Application Structure

### Pages
- `/` - Landing (redirects to wizard or Shopify)
- `/wizard` - Smart wizard (Quick Start + Custom Setup)
- `/editor` - Full-screen editor
- `/preview` - Read-only preview
- `/summary` - Order summary with pricing

### Editor Components
- EditorLayout - Full-screen container
- EditorHeader - Top bar (undo/redo, save, preview)
- EditorSidebar - 72px tabs + 280px panel
- EditorCanvas - Dark workspace with spread rendering
- EditorBottomBar - Navigation, zoom, thumbnails

### State (Zustand)
- projectStore - Project data, selections, pages
- editorStore - Initialization, save state
- uiStore - Sidebar, zoom, view mode
- historyStore - Undo/redo (max 50)

## Database Schema

Complete SQL schema in `supabase/schema.sql` with:
- 25+ tables
- Seed data (workspaces, attributes, prices, etc.)
- All relations configured

## License
MIT
