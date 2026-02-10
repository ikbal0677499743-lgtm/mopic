-- V3 Mopic Photobook Database Schema
-- Based on complete Printbox audit with 14 corrections applied

-- ============================================================================
-- STORES (multi-store support — single store for MVP)
-- ============================================================================
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  currency TEXT NOT NULL DEFAULT 'USD',
  tax_name TEXT,
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PRODUCT CONFIG (single row — global settings)
-- ============================================================================
CREATE TABLE product_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Photobook',
  config_script TEXT DEFAULT 'PhotobookSmart',
  render_dpi INTEGER DEFAULT 300,
  render_format TEXT DEFAULT 'pdf',
  pdf_version TEXT DEFAULT '1.6',
  icc_profile TEXT DEFAULT 'sRGB',
  pages_per_slide INTEGER DEFAULT 2,
  auto_save_interval INTEGER DEFAULT 30,
  max_photo_size_mb INTEGER DEFAULT 25,
  allowed_formats TEXT[] DEFAULT ARRAY['jpg','jpeg','png','heic','webp'],
  photo_dpi_warning INTEGER DEFAULT 150,
  photo_dpi_error INTEGER DEFAULT 72,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- WORKSPACES (9 total: 6 cover + 3 block)
-- HC covers are LARGER than inner pages (wraps around)
-- HC has spine, SC has NO spine. HC has 0.3937" bleed, SC has 0.1181"
-- ============================================================================
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  workspace_type TEXT NOT NULL CHECK (workspace_type IN ('cover', 'block')),
  orientation TEXT NOT NULL CHECK (orientation IN ('horizontal', 'vertical', 'square')),
  binding_type TEXT CHECK (binding_type IN ('hardcover', 'softcover')),
  page_width DECIMAL(8,4) NOT NULL,
  page_height DECIMAL(8,4) NOT NULL,
  bleed DECIMAL(6,4) NOT NULL DEFAULT 0.1181,
  safe_zone DECIMAL(6,4) NOT NULL DEFAULT 0.1969,
  spine_width DECIMAL(6,4) NOT NULL DEFAULT 0.0000,
  snap_area DECIMAL(6,4) DEFAULT 0.1575,
  paper_thickness DECIMAL(8,6) DEFAULT 0.0047,
  has_crop_marks BOOLEAN DEFAULT true,
  has_end_paper BOOLEAN DEFAULT false,
  pdf_mode TEXT DEFAULT 'single_spread',
  is_active BOOLEAN DEFAULT true,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PAGE CONFIGS (2 configs: standard + square)
-- V3 FIX: pages_min = 24 (was 20 in V2)
-- ============================================================================
CREATE TABLE page_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  pages_min INTEGER NOT NULL DEFAULT 24,
  pages_initial INTEGER NOT NULL DEFAULT 24,
  pages_max INTEGER NOT NULL DEFAULT 100,
  pages_multiplier INTEGER DEFAULT 4,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page config pricing per store
CREATE TABLE page_config_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_config_id UUID REFERENCES page_configs(id) ON DELETE CASCADE,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  price_per_page_net DECIMAL(10,2) NOT NULL DEFAULT 1.00,
  price_per_page_gross DECIMAL(10,2) NOT NULL DEFAULT 1.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_config_id, store_id)
);

-- ============================================================================
-- ATTRIBUTES (4-attribute system: type(10) → size(20) → paper(30) → theme(40))
-- Theme is now an ATTRIBUTE, not a standalone table
-- ============================================================================
CREATE TABLE attributes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  display_name_de TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  price_mode TEXT NOT NULL CHECK (price_mode IN ('additive', 'combinatorial', 'page_additive', 'none')),
  priority DECIMAL(5,2) DEFAULT 10.00,
  alters_cover_workspace BOOLEAN DEFAULT false,
  alters_block_workspace BOOLEAN DEFAULT false,
  alters_pages_settings BOOLEAN DEFAULT false,
  alters_cover_theme BOOLEAN DEFAULT false,
  alters_block_theme BOOLEAN DEFAULT false,
  alters_product_images BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ATTRIBUTE VALUES with workspace/config links for SIZE, surcharges for PAPER
-- ============================================================================
CREATE TABLE attribute_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attribute_id UUID REFERENCES attributes(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  display_name TEXT NOT NULL,
  display_name_de TEXT,
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_default BOOLEAN DEFAULT false,
  cover_workspace_id UUID REFERENCES workspaces(id),
  block_workspace_id UUID REFERENCES workspaces(id),
  page_config_id UUID REFERENCES page_configs(id),
  page_surcharge_net DECIMAL(10,2) DEFAULT 0.00,
  page_surcharge_gross DECIMAL(10,2) DEFAULT 0.00,
  description_upselling TEXT,
  header_upselling TEXT,
  image_url TEXT,
  image_upselling_url TEXT,
  price_upselling TEXT,
  value_to_upsell TEXT,
  thumb_url TEXT,
  slide_image_url TEXT,
  slider_description TEXT,
  slider_icon_url TEXT,
  available_size TEXT,
  sidebar_display_name TEXT,
  sidebar_icon_active_url TEXT,
  sidebar_icon_inactive_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(attribute_id, key)
);

-- ============================================================================
-- ATTRIBUTE RULES (type→size cascade)
-- ============================================================================
CREATE TABLE attribute_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  store_id UUID REFERENCES stores(id),
  condition_attribute_id UUID REFERENCES attributes(id),
  condition_value_key TEXT NOT NULL,
  affected_attribute_id UUID REFERENCES attributes(id),
  allowed_value_keys TEXT[] NOT NULL,
  behavior TEXT DEFAULT 'allow',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ASSET TAGS (tagging system from Printbox audit)
-- ============================================================================
CREATE TABLE asset_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('clipart', 'background', 'mask', 'frame', 'font_family', 'layout', 'theme_photo')),
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(name, asset_type)
);

-- ============================================================================
-- ASSETS
-- ============================================================================
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('clipart', 'background', 'mask', 'frame', 'font', 'layout', 'theme_photo')),
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  font_family TEXT,
  is_active BOOLEAN DEFAULT true,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE asset_tag_assignments (
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES asset_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (asset_id, tag_id)
);

-- ============================================================================
-- LAYOUT TEMPLATES
-- ============================================================================
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

CREATE TABLE layout_tag_assignments (
  layout_id UUID REFERENCES layout_templates(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES asset_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (layout_id, tag_id)
);

-- ============================================================================
-- CATEGORIES (country-based)
-- ============================================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  display_name_de TEXT,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  seo_meta_title TEXT,
  seo_meta_description TEXT,
  image_urls TEXT[] DEFAULT '{}',
  parent_id UUID REFERENCES categories(id),
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE category_stores (
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  PRIMARY KEY (category_id, store_id)
);

-- ============================================================================
-- THEMES (managed as attribute values of "theme" attribute)
-- ============================================================================
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attribute_value_id UUID REFERENCES attribute_values(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  display_name_de TEXT,
  description TEXT,
  thumbnail_url TEXT,
  preview_urls TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE theme_asset_tags (
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES asset_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (theme_id, tag_id)
);

-- ============================================================================
-- THEME DESIGNS (page layout JSON per workspace, Printbox normalized 0-1 coordinates)
-- ============================================================================
CREATE TABLE theme_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES workspaces(id),
  design_type TEXT NOT NULL CHECK (design_type IN ('cover', 'block')),
  design_data JSONB NOT NULL DEFAULT '{"slides":[]}',
  version INTEGER DEFAULT 104,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(theme_id, workspace_id, design_type)
);

-- ============================================================================
-- PRODUCTS (theme + storefront metadata)
-- ============================================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  display_name_de TEXT,
  slug TEXT NOT NULL UNIQUE,
  theme_id UUID REFERENCES themes(id),
  short_description TEXT,
  long_description TEXT,
  visibility TEXT DEFAULT 'web_and_mobile' CHECK (visibility IN ('web_only', 'web_and_mobile')),
  is_active BOOLEAN DEFAULT true,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE product_categories (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

CREATE TABLE product_stores (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, store_id)
);

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE product_tags (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)
);

CREATE TABLE product_variant_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size_value_key TEXT,
  language TEXT DEFAULT 'en',
  image_urls TEXT[] NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PRICES (combinatorial: base price per SIZE)
-- ============================================================================
CREATE TABLE prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id),
  size_value_key TEXT NOT NULL,
  base_price_net DECIMAL(10,2) NOT NULL,
  base_price_gross DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(store_id, size_value_key)
);

CREATE TABLE paper_surcharges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id),
  paper_value_key TEXT NOT NULL,
  surcharge_per_page_net DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  surcharge_per_page_gross DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(store_id, paper_value_key)
);

-- ============================================================================
-- CUSTOMER PROJECTS
-- ============================================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT,
  store_id UUID REFERENCES stores(id),
  selected_type TEXT DEFAULT 'HC',
  selected_size TEXT DEFAULT 'HC_Square',
  selected_paper TEXT DEFAULT 'standardPaper',
  selected_theme TEXT,
  cover_workspace_id UUID REFERENCES workspaces(id),
  block_workspace_id UUID REFERENCES workspaces(id),
  page_config_id UUID REFERENCES page_configs(id),
  theme_id UUID REFERENCES themes(id),
  name TEXT DEFAULT 'My Photobook',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'ordered', 'rendering', 'rendered', 'failed')),
  total_pages INTEGER DEFAULT 24,
  calculated_price DECIMAL(10,2),
  shopify_order_id TEXT,
  shopify_cart_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PROJECT PAGES (cover_spread for full cover, inner for spreads)
-- ============================================================================
CREATE TABLE project_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  page_type TEXT NOT NULL CHECK (page_type IN ('cover_spread', 'inner')),
  page_number INTEGER NOT NULL,
  spread_index INTEGER,
  design_data JSONB NOT NULL DEFAULT '{"components":[],"background":{"primary":{"type":"color","value":"#ffffff"},"secondary":{"type":"color","value":"#ffffff"}}}',
  layout_template_id UUID REFERENCES layout_templates(id),
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE rendered_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  file_type TEXT NOT NULL CHECK (file_type IN ('cover_pdf', 'block_pdf', 'full_pdf')),
  file_url TEXT NOT NULL,
  render_status TEXT DEFAULT 'pending' CHECK (render_status IN ('pending', 'processing', 'completed', 'failed')),
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Insert default store
INSERT INTO stores (name, slug, currency, is_default, is_active) 
VALUES ('Default Store', 'default', 'USD', true, true);

-- Insert product config
INSERT INTO product_config (name, config_script, render_dpi, render_format, pdf_version, icc_profile, pages_per_slide, auto_save_interval, max_photo_size_mb, allowed_formats, photo_dpi_warning, photo_dpi_error)
VALUES ('Photobook', 'PhotobookSmart', 300, 'pdf', '1.6', 'sRGB', 2, 30, 25, ARRAY['jpg','jpeg','png','heic','webp'], 150, 72);

-- Insert 6 cover workspaces
INSERT INTO workspaces (name, display_name, workspace_type, orientation, binding_type, page_width, page_height, bleed, safe_zone, spine_width, paper_thickness, position) VALUES
  ('HC_horizontal_cover', 'Hardcover Horizontal Cover', 'cover', 'horizontal', 'hardcover', 12.5984, 8.6614, 0.3937, 0.1969, 0.3150, 0.0047, 1),
  ('HC_vertical_cover', 'Hardcover Vertical Cover', 'cover', 'vertical', 'hardcover', 8.6614, 12.5984, 0.3937, 0.1969, 0.3150, 0.0047, 2),
  ('HC_square_cover', 'Hardcover Square Cover', 'cover', 'square', 'hardcover', 12.5984, 12.5984, 0.3937, 0.1969, 0.3150, 0.0047, 3),
  ('SC_horizontal_cover', 'Softcover Horizontal Cover', 'cover', 'horizontal', 'softcover', 11.8110, 8.2677, 0.1181, 0.1969, 0.0000, 0.0047, 4),
  ('SC_vertical_cover', 'Softcover Vertical Cover', 'cover', 'vertical', 'softcover', 8.2677, 11.8110, 0.1181, 0.1969, 0.0000, 0.0047, 5),
  ('SC_square_cover', 'Softcover Square Cover', 'cover', 'square', 'softcover', 11.8110, 11.8110, 0.1181, 0.1969, 0.0000, 0.0047, 6);

-- Insert 3 block workspaces
INSERT INTO workspaces (name, display_name, workspace_type, orientation, binding_type, page_width, page_height, bleed, safe_zone, spine_width, paper_thickness, position) VALUES
  ('horizontal_block', 'Horizontal Block', 'block', 'horizontal', NULL, 11.8110, 8.2677, 0.1181, 0.1969, 0.0000, 0.0047, 7),
  ('vertical_block', 'Vertical Block', 'block', 'vertical', NULL, 8.2677, 11.8110, 0.1181, 0.1969, 0.0000, 0.0047, 8),
  ('square_block', 'Square Block', 'block', 'square', NULL, 11.8110, 11.8110, 0.1181, 0.1969, 0.0000, 0.0047, 9);

-- Insert page configs (V3: pages_min = 24)
INSERT INTO page_configs (name, pages_min, pages_initial, pages_max, pages_multiplier) VALUES
  ('standard_24-24-100', 24, 24, 100, 4),
  ('square_24-24-100', 24, 24, 100, 4);

-- Insert page config prices per store
INSERT INTO page_config_prices (page_config_id, store_id, price_per_page_net, price_per_page_gross)
SELECT pc.id, s.id, 1.00, 1.00
FROM page_configs pc, stores s
WHERE pc.name = 'standard_24-24-100' AND s.slug = 'default';

INSERT INTO page_config_prices (page_config_id, store_id, price_per_page_net, price_per_page_gross)
SELECT pc.id, s.id, 1.50, 1.50
FROM page_configs pc, stores s
WHERE pc.name = 'square_24-24-100' AND s.slug = 'default';

-- Insert 4 attributes (type@10, size@20, paper@30, theme@40)
INSERT INTO attributes (name, display_name, display_name_de, position, price_mode, priority, alters_cover_workspace, alters_block_workspace, alters_pages_settings) VALUES
  ('type', 'Type', 'Art', 10, 'none', 10.00, false, false, false),
  ('size', 'Size', 'Größe', 20, 'combinatorial', 20.00, true, true, true),
  ('paper', 'Paper', 'Papier', 30, 'page_additive', 30.00, false, false, false),
  ('theme', 'Theme', 'Thema', 40, 'none', 40.00, true, true, false);

-- Insert 2 TYPE values (HC default, SC)
INSERT INTO attribute_values (attribute_id, key, display_name, display_name_de, position, is_active, is_default)
SELECT id, 'HC', 'Hardcover', 'Hardcover', 1, true, true FROM attributes WHERE name = 'type';

INSERT INTO attribute_values (attribute_id, key, display_name, display_name_de, position, is_active, is_default)
SELECT id, 'SC', 'Softcover', 'Softcover', 2, true, false FROM attributes WHERE name = 'type';

-- Insert 6 SIZE values each linking to cover_workspace + block_workspace + page_config
INSERT INTO attribute_values (attribute_id, key, display_name, display_name_de, position, is_active, is_default, cover_workspace_id, block_workspace_id, page_config_id)
SELECT a.id, 'HC_Horizontal', 'Hardcover Horizontal', 'Hardcover Horizontal', 1, true, false,
  (SELECT id FROM workspaces WHERE name = 'HC_horizontal_cover'),
  (SELECT id FROM workspaces WHERE name = 'horizontal_block'),
  (SELECT id FROM page_configs WHERE name = 'standard_24-24-100')
FROM attributes a WHERE a.name = 'size';

INSERT INTO attribute_values (attribute_id, key, display_name, display_name_de, position, is_active, is_default, cover_workspace_id, block_workspace_id, page_config_id)
SELECT a.id, 'HC_Vertical', 'Hardcover Vertical', 'Hardcover Vertical', 2, true, false,
  (SELECT id FROM workspaces WHERE name = 'HC_vertical_cover'),
  (SELECT id FROM workspaces WHERE name = 'vertical_block'),
  (SELECT id FROM page_configs WHERE name = 'standard_24-24-100')
FROM attributes a WHERE a.name = 'size';

INSERT INTO attribute_values (attribute_id, key, display_name, display_name_de, position, is_active, is_default, cover_workspace_id, block_workspace_id, page_config_id)
SELECT a.id, 'HC_Square', 'Hardcover Square', 'Hardcover Square', 3, true, true,
  (SELECT id FROM workspaces WHERE name = 'HC_square_cover'),
  (SELECT id FROM workspaces WHERE name = 'square_block'),
  (SELECT id FROM page_configs WHERE name = 'square_24-24-100')
FROM attributes a WHERE a.name = 'size';

INSERT INTO attribute_values (attribute_id, key, display_name, display_name_de, position, is_active, is_default, cover_workspace_id, block_workspace_id, page_config_id)
SELECT a.id, 'SC_Horizontal', 'Softcover Horizontal', 'Softcover Horizontal', 4, true, false,
  (SELECT id FROM workspaces WHERE name = 'SC_horizontal_cover'),
  (SELECT id FROM workspaces WHERE name = 'horizontal_block'),
  (SELECT id FROM page_configs WHERE name = 'standard_24-24-100')
FROM attributes a WHERE a.name = 'size';

INSERT INTO attribute_values (attribute_id, key, display_name, display_name_de, position, is_active, is_default, cover_workspace_id, block_workspace_id, page_config_id)
SELECT a.id, 'SC_Vertical', 'Softcover Vertical', 'Softcover Vertical', 5, true, false,
  (SELECT id FROM workspaces WHERE name = 'SC_vertical_cover'),
  (SELECT id FROM workspaces WHERE name = 'vertical_block'),
  (SELECT id FROM page_configs WHERE name = 'standard_24-24-100')
FROM attributes a WHERE a.name = 'size';

INSERT INTO attribute_values (attribute_id, key, display_name, display_name_de, position, is_active, is_default, cover_workspace_id, block_workspace_id, page_config_id)
SELECT a.id, 'SC_Square', 'Softcover Square', 'Softcover Square', 6, true, false,
  (SELECT id FROM workspaces WHERE name = 'SC_square_cover'),
  (SELECT id FROM workspaces WHERE name = 'square_block'),
  (SELECT id FROM page_configs WHERE name = 'square_24-24-100')
FROM attributes a WHERE a.name = 'size';

-- Insert 3 PAPER values with surcharges (standardPaper@0.00, deepMatte@0.50, silk@0.75)
INSERT INTO attribute_values (attribute_id, key, display_name, display_name_de, position, is_active, is_default, page_surcharge_net, page_surcharge_gross)
SELECT id, 'standardPaper', 'Standard Glossy', 'Standard Glossy', 1, true, true, 0.00, 0.00 FROM attributes WHERE name = 'paper';

INSERT INTO attribute_values (attribute_id, key, display_name, display_name_de, position, is_active, is_default, page_surcharge_net, page_surcharge_gross)
SELECT id, 'deepMatte', 'Deep Matte', 'Deep Matte', 2, true, false, 0.50, 0.50 FROM attributes WHERE name = 'paper';

INSERT INTO attribute_values (attribute_id, key, display_name, display_name_de, position, is_active, is_default, page_surcharge_net, page_surcharge_gross)
SELECT id, 'silk', 'Silk', 'Silk', 3, true, false, 0.75, 0.75 FROM attributes WHERE name = 'paper';

-- Insert 2 attribute rules (HC→HC sizes, SC→SC sizes)
INSERT INTO attribute_rules (name, store_id, condition_attribute_id, condition_value_key, affected_attribute_id, allowed_value_keys, behavior, is_active)
SELECT 'HC_sizes_rule', s.id,
  (SELECT id FROM attributes WHERE name = 'type'),
  'HC',
  (SELECT id FROM attributes WHERE name = 'size'),
  ARRAY['HC_Horizontal', 'HC_Vertical', 'HC_Square'],
  'allow', true
FROM stores s WHERE s.slug = 'default';

INSERT INTO attribute_rules (name, store_id, condition_attribute_id, condition_value_key, affected_attribute_id, allowed_value_keys, behavior, is_active)
SELECT 'SC_sizes_rule', s.id,
  (SELECT id FROM attributes WHERE name = 'type'),
  'SC',
  (SELECT id FROM attributes WHERE name = 'size'),
  ARRAY['SC_Horizontal', 'SC_Vertical', 'SC_Square'],
  'allow', true
FROM stores s WHERE s.slug = 'default';

-- Insert 6 base prices per size per store
INSERT INTO prices (store_id, size_value_key, base_price_net, base_price_gross, currency)
SELECT s.id, 'HC_Horizontal', 30.00, 30.00, 'USD' FROM stores s WHERE s.slug = 'default';

INSERT INTO prices (store_id, size_value_key, base_price_net, base_price_gross, currency)
SELECT s.id, 'HC_Vertical', 32.00, 32.00, 'USD' FROM stores s WHERE s.slug = 'default';

INSERT INTO prices (store_id, size_value_key, base_price_net, base_price_gross, currency)
SELECT s.id, 'HC_Square', 35.00, 35.00, 'USD' FROM stores s WHERE s.slug = 'default';

INSERT INTO prices (store_id, size_value_key, base_price_net, base_price_gross, currency)
SELECT s.id, 'SC_Horizontal', 18.00, 18.00, 'USD' FROM stores s WHERE s.slug = 'default';

INSERT INTO prices (store_id, size_value_key, base_price_net, base_price_gross, currency)
SELECT s.id, 'SC_Vertical', 20.00, 20.00, 'USD' FROM stores s WHERE s.slug = 'default';

INSERT INTO prices (store_id, size_value_key, base_price_net, base_price_gross, currency)
SELECT s.id, 'SC_Square', 22.00, 22.00, 'USD' FROM stores s WHERE s.slug = 'default';

-- Insert 3 paper surcharges per store
INSERT INTO paper_surcharges (store_id, paper_value_key, surcharge_per_page_net, surcharge_per_page_gross, currency)
SELECT s.id, 'standardPaper', 0.00, 0.00, 'USD' FROM stores s WHERE s.slug = 'default';

INSERT INTO paper_surcharges (store_id, paper_value_key, surcharge_per_page_net, surcharge_per_page_gross, currency)
SELECT s.id, 'deepMatte', 0.50, 0.50, 'USD' FROM stores s WHERE s.slug = 'default';

INSERT INTO paper_surcharges (store_id, paper_value_key, surcharge_per_page_net, surcharge_per_page_gross, currency)
SELECT s.id, 'silk', 0.75, 0.75, 'USD' FROM stores s WHERE s.slug = 'default';

-- Insert product tags
INSERT INTO tags (name, position) VALUES
  ('Best Seller', 1),
  ('New Arrival', 2);

-- Insert 5 categories (morocco, france, japan, classic, modern)
INSERT INTO categories (name, display_name, display_name_de, slug, description, position, is_active) VALUES
  ('morocco', 'Morocco Collection', 'Marokko Kollektion', 'morocco', 'Beautiful Moroccan-inspired photobook designs', 1, true),
  ('france', 'France Collection', 'Frankreich Kollektion', 'france', 'Elegant French-inspired photobook designs', 2, true),
  ('japan', 'Japan Collection', 'Japan Kollektion', 'japan', 'Minimalist Japanese-inspired photobook designs', 3, true),
  ('classic', 'Classic Collection', 'Klassisch Kollektion', 'classic', 'Timeless classic photobook designs', 4, true),
  ('modern', 'Modern Collection', 'Modern Kollektion', 'modern', 'Contemporary modern photobook designs', 5, true);

-- Link categories to default store
INSERT INTO category_stores (category_id, store_id)
SELECT c.id, s.id
FROM categories c, stores s
WHERE s.slug = 'default';
