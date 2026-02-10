# Mopic - Custom Photobook Editor

A modern, full-stack custom photobook editor built with Next.js 14, TypeScript, and Tailwind CSS. This application allows users to create beautiful custom photobooks with an intuitive drag-and-drop interface.

## 🚀 Features

- **Smart Wizard**: Quick start mode with theme selection or manual step-by-step configuration
- **Full-Screen Editor**: Professional photobook editor with multi-page support
- **Rich Editing Tools**: Photos, templates, layouts, backgrounds, and clipart panels
- **State Management**: Zustand stores for editor state, projects, history (undo/redo), and UI
- **Photo Upload**: Drag-and-drop photo uploads with DPI validation
- **Live Preview**: Real-time preview of your photobook
- **Order Summary**: Review and add to Shopify cart
- **API Routes**: RESTful API for projects, photos, themes, and rendering
- **Database Schema**: Complete PostgreSQL schema with Supabase

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Canvas**: Fabric.js 6
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **E-commerce**: Shopify Storefront API
- **File Upload**: react-dropzone
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PDF Generation**: pdf-lib
- **Image Processing**: sharp

## �� Installation

1. Clone the repository:
```bash
git clone https://github.com/ikbal0677499743-lgtm/mopic.git
cd mopic
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_SHOPIFY_STORE_URL=your-shopify-store-url
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-token
NEXT_PUBLIC_SHOPIFY_VARIANT_ID=your-product-variant-id

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Set up the database:
- Create a new Supabase project
- Run the schema in `supabase/schema.sql`

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
mopic/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── wizard/              # Smart wizard
│   ├── editor/              # Full-screen editor
│   ├── preview/             # Book preview
│   ├── summary/             # Order summary
│   └── api/                 # API routes
│       ├── projects/        # Project CRUD
│       ├── photos/          # Photo upload
│       ├── themes/          # Theme listing
│       ├── assets/          # Assets (cliparts, etc.)
│       ├── render/          # PDF generation
│       └── shopify/         # Shopify integration
├── components/              # React components
│   ├── editor/             # Editor components
│   ├── wizard/             # Wizard components
│   ├── summary/            # Summary components
│   └── ui/                 # Shared UI components
├── lib/                    # Core libraries
│   ├── types/              # TypeScript types
│   ├── store/              # Zustand stores
│   ├── supabase/           # Supabase client
│   ├── shopify/            # Shopify helpers
│   ├── fabric/             # Fabric.js utilities
│   ├── pdf/                # PDF generation
│   └── utils/              # Utility functions
├── supabase/               # Database schema
└── public/                 # Static assets
```

## 🎨 Design System

- **Typography**: DM Sans (body), Playfair Display (headings)
- **Colors**: 
  - Primary: Black (#000000)
  - Accent: Pink (#E91E63)
  - Background: Light Gray (#F9FAFB)
  - Editor Workspace: Dark (#1a1a2e)
- **Components**: Rounded corners, subtle shadows, smooth transitions

## 🔌 API Routes

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get project by ID
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Photos
- `POST /api/photos/upload` - Upload photo with thumbnail generation

### Themes
- `GET /api/themes` - List available themes

### Assets
- `GET /api/assets` - List cliparts, backgrounds, etc.

### Rendering
- `POST /api/render` - Generate PDF

### Shopify
- `POST /api/shopify/cart` - Add item to cart

## 🗄️ Database Schema

The complete PostgreSQL schema is in `supabase/schema.sql` and includes:

- `product_config` - Product configuration
- `workspace_sizes` - Book dimensions
- `page_configs` - Page settings
- `attributes` & `attribute_values` - Product attributes
- `categories` & `themes` - Theme catalog
- `theme_designs` - Theme layouts
- `assets` - Cliparts, backgrounds
- `layout_templates` - Page layout presets
- `prices` - Combinatorial pricing
- `projects` - Customer projects
- `project_pages` - Project pages with elements
- `project_photos` - Uploaded photos
- `rendered_files` - Generated PDFs

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Build for production:
```bash
npm run build
npm start
```

## 📝 Development

### Run development server:
```bash
npm run dev
```

### Build:
```bash
npm run build
```

### Lint:
```bash
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- Supabase for the backend
- Shopify for e-commerce integration
