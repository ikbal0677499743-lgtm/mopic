-- Product configuration (single row — one config for photobook)
CREATE TABLE product_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Photobook',
  render_dpi INTEGER DEFAULT 300,
  render_format TEXT DEFAULT 'pdf',
  icc_profile TEXT DEFAULT 'sRGB',
  pages_per_slide INTEGER DEFAULT 2,
  auto_save_interval INTEGER DEFAULT 30,
  max_photo_size_mb INTEGER DEFAULT 25,
  allowed_formats TEXT[] DEFAULT ARRAY['jpg','jpeg','png','heic','webp'],
  photo_dpi_warning INTEGER DEFAULT 150,
  photo_dpi_error INTEGER DEFAULT 72,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workspace sizes (physical book dimensions)
CREATE TABLE workspace_sizes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  page_width DECIMAL(8,4) NOT NULL,
  page_height DECIMAL(8,4) NOT NULL,
  bleed DECIMAL(6,4) DEFAULT 0.1181,
  safe_area DECIMAL(6,4) DEFAULT 0.3937,
  spine_width DECIMAL(6,4) DEFAULT 0.2756,
  paper_thickness DECIMAL(8,6) DEFAULT 0.0047,
  is_active BOOLEAN DEFAULT true,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page configurations (min/max/initial pages)
CREATE TABLE page_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  pages_min INTEGER NOT NULL DEFAULT 20,
  pages_initial INTEGER NOT NULL DEFAULT 20,
  pages_max INTEGER NOT NULL DEFAULT 100,
  pages_multiplier INTEGER DEFAULT 4,
  price_per_extra_page DECIMAL(10,2) DEFAULT 1.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attributes (size, binding type, paper quality)
CREATE TABLE attributes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  affects_price BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attribute values (hardcover, softcover, glossPaper, etc.)
CREATE TABLE attribute_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attribute_id UUID REFERENCES attributes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  workspace_size_id UUID REFERENCES workspace_sizes(id),
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Theme categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Themes (each theme = a cover design)
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  thumbnail_url TEXT,
  preview_urls TEXT[],
  category_id UUID REFERENCES categories(id),
  tags TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Theme designs (the actual page layouts/elements for each theme)
CREATE TABLE theme_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  workspace_size_id UUID REFERENCES workspace_sizes(id),
  design_type TEXT NOT NULL CHECK (design_type IN ('cover', 'block')),
  design_data JSONB NOT NULL DEFAULT '{"pages":[]}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(theme_id, workspace_size_id, design_type)
);

-- Assets (cliparts, backgrounds, masks, frames)
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('clipart','background','mask','frame','font')),
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  font_family TEXT,
  is_active BOOLEAN DEFAULT true,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Layout templates (predefined page layouts)
CREATE TABLE layout_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  photo_count INTEGER NOT NULL,
  thumbnail_url TEXT,
  layout_data JSONB NOT NULL,
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Combinatorial pricing
CREATE TABLE prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  size_value_id UUID REFERENCES attribute_values(id),
  type_value_id UUID REFERENCES attribute_values(id),
  paper_value_id UUID REFERENCES attribute_values(id),
  base_price DECIMAL(10,2) NOT NULL,
  price_per_extra_page DECIMAL(10,2) DEFAULT 1.00,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT,
  theme_id UUID REFERENCES themes(id),
  workspace_size_id UUID REFERENCES workspace_sizes(id),
  page_config_id UUID REFERENCES page_configs(id),
  selected_attributes JSONB DEFAULT '{}',
  name TEXT DEFAULT 'My Travel Book',
  status TEXT DEFAULT 'draft',
  total_pages INTEGER DEFAULT 20,
  calculated_price DECIMAL(10,2),
  shopify_order_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project pages (the actual user content)
CREATE TABLE project_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  page_type TEXT NOT NULL CHECK (page_type IN ('cover_front','cover_back','guard','inner')),
  page_number INTEGER NOT NULL,
  spread_index INTEGER,
  background JSONB DEFAULT '{"type":"color","value":"#ffffff"}',
  elements JSONB NOT NULL DEFAULT '[]',
  layout_template_id UUID REFERENCES layout_templates(id),
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Uploaded photos per project
CREATE TABLE project_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  original_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  medium_url TEXT,
  original_width INTEGER,
  original_height INTEGER,
  file_size_bytes BIGINT,
  mime_type TEXT,
  original_filename TEXT,
  is_used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rendered PDF files
CREATE TABLE rendered_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  file_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  render_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default data
INSERT INTO workspace_sizes (name, display_name, page_width, page_height, position) VALUES
('A4Horizontal', '11.5" × 8.5" Horizontal', 11.8504, 8.4252, 0),
('A4Vertical', '8.5" × 11.5" Vertical', 8.4252, 11.8504, 1),
('Square12', '12" × 12" Square', 12.0, 12.0, 2);

INSERT INTO page_configs (name, pages_min, pages_initial, pages_max, pages_multiplier, price_per_extra_page) VALUES
('standard', 20, 20, 100, 4, 1.00),
('small', 6, 6, 10, 2, 1.50);

INSERT INTO attributes (name, display_name, position) VALUES
('size', 'Book Size', 0),
('type', 'Cover Type', 1),
('paper', 'Paper Quality', 2);

INSERT INTO attribute_values (attribute_id, name, display_name, is_default, position) VALUES
((SELECT id FROM attributes WHERE name='type'), 'hardcover', 'Hardcover', true, 0),
((SELECT id FROM attributes WHERE name='type'), 'softcover', 'Softcover', false, 1),
((SELECT id FROM attributes WHERE name='paper'), 'premiumLustre', 'Premium Lustre', true, 0),
((SELECT id FROM attributes WHERE name='paper'), 'deepMatte', 'Deep Matte', false, 1),
((SELECT id FROM attributes WHERE name='paper'), 'standardPaper', 'Standard', false, 2);

INSERT INTO categories (name, display_name, position) VALUES
('travel', 'Travel', 0),
('classic', 'Classic', 1),
('modern', 'Modern', 2),
('baby', 'Baby', 3),
('special', 'Special Moments', 4);
