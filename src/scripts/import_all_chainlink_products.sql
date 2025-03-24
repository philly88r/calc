-- First, truncate the existing table to avoid duplicates
TRUNCATE TABLE public.chainlink_products;

-- Begin transaction
BEGIN;

-- Create a temporary table to hold the CSV data
CREATE TEMP TABLE temp_chainlink_products (
    id UUID,
    sku VARCHAR(255),
    name VARCHAR(255),
    product_category VARCHAR(255),
    variant_option_one_name VARCHAR(255),
    variant_option_one_value VARCHAR(255),
    variant_option_two_name VARCHAR(255),
    variant_option_two_value VARCHAR(255),
    variant_option_three_name VARCHAR(255),
    variant_option_three_value VARCHAR(255),
    supply_price DECIMAL,
    retail_price DECIMAL
);

-- Import data from CSV file
-- NOTE: You'll need to adjust the path to match where you've uploaded the CSV in Supabase
-- If you're using the Supabase UI, you can upload the CSV and then use this command
-- COPY temp_chainlink_products FROM '/tmp/chainlink_products.csv' WITH (FORMAT csv, HEADER true);

-- Since we can't directly import from a CSV, let's insert the data manually
-- Here are the first few rows as examples, you can continue with the rest of the data

-- Insert products for chain link mesh (Black Residential)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    supply_price, retail_price
) VALUES 
('11001', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '4''', 'Gauge', 'Residential 9 gauge', 94.5, 173.25),
('11002', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '5''', 'Gauge', 'Residential 9 gauge', 118.13, 216.58),
('11003', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '6''', 'Gauge', 'Residential 9 gauge', 141.75, 259.88),
('11004', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '7''', 'Gauge', 'Residential 9 gauge', 165.38, 303.19),
('11005', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '8''', 'Gauge', 'Residential 9 gauge', 189, 346.5);

-- Insert products for chain link mesh (Black Commercial)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    supply_price, retail_price
) VALUES 
('11006', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '4''', 'Gauge', 'Commercial 8 gauge finish', 133.6, 245.00),
('11007', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '5''', 'Gauge', 'Commercial 8 gauge finish', 150.3, 275.55),
('11008', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '6''', 'Gauge', 'Commercial 8 gauge finish', 167, 308.95),
('11009', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '7''', 'Gauge', 'Commercial 8 gauge finish', 229.04, 309.20),
('11010', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '8''', 'Gauge', 'Commercial 8 gauge finish', 160.01, 315.00);

-- Insert products for chain link mesh (Galvanized Residential)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    supply_price, retail_price
) VALUES 
('11501', 'Mesh - galvanized (50'' roll)', 'Chain link mesh', 'Height', '4'' KK Residential 11.5 gauge', 89, 120.15),
('11502', 'Mesh - galvanized (50'' roll)', 'Chain link mesh', 'Height', '5'' KK Residential 11.5 gauge', 57.1, 154.00),
('11503', 'Mesh - galvanized (50'' roll)', 'Chain link mesh', 'Height', '6'' KK Residential 11.5 gauge', 68.52, 184.80);

-- Insert products for chain link mesh (Galvanized Commercial)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    supply_price, retail_price
) VALUES 
('11504', 'Mesh - galvanized (50'' roll)', 'Chain link mesh', 'Height', '4''', 'Gauge', 'Commercial 9 gauge', 82.5, 151.25),
('11505', 'Mesh - galvanized (50'' roll)', 'Chain link mesh', 'Height', '5''', 'Gauge', 'Commercial 9 gauge', 103.13, 189.06),
('11506', 'Mesh - galvanized (50'' roll)', 'Chain link mesh', 'Height', '6''', 'Gauge', 'Commercial 9 gauge', 123.75, 226.88),
('11507', 'Mesh - galvanized (50'' roll)', 'Chain link mesh', 'Height', '7''', 'Gauge', 'Commercial 9 gauge', 144.38, 264.69),
('11508', 'Mesh - galvanized (50'' roll)', 'Chain link mesh', 'Height', '8''', 'Gauge', 'Commercial 9 gauge', 165, 302.50),
('11509', 'Mesh - galvanized (50'' roll)', 'Chain link mesh', 'Height', '10''', 'Gauge', 'Commercial 9 gauge', 206.25, 378.13),
('11510', 'Mesh - galvanized (50'' roll)', 'Chain link mesh', 'Height', '12''', 'Gauge', 'Commercial 9 gauge', 247.5, 453.75),
('11511', 'Mesh - galvanized (50'' roll)', 'Chain link mesh', 'Height', '14''', 'Gauge', 'Commercial 9 gauge', 288.75, 529.38);

-- Insert Barb arm products
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    supply_price, retail_price
) VALUES 
('10001', 'Barb arm', 'Chain link accessories', 'Size', '1 5/8" × 1 5/8"', 'Coating', 'Black', 7.15, 10.73),
('10002', 'Barb arm', 'Chain link accessories', 'Size', '1 7/8" × 1 5/8"', 'Coating', 'Black', 7.07, 10.61),
('10003', 'Barb arm', 'Chain link accessories', 'Size', '2 3/8" × 1 5/8"', 'Coating', 'Black', 7.53, 11.30),
('10004', 'Barb arm', 'Chain link accessories', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'Black', 14.12, 21.18),
('10005', 'Barb arm', 'Chain link accessories', 'Size', '4" x 1 5/8"', 'Coating', 'Black', 22.89, 34.34),
('10006', 'Barb arm', 'Chain link accessories', 'Size', '1 5/8" × 1 5/8"', 'Coating', 'galvanized', 4.75, 7.13),
('10007', 'Barb arm', 'Chain link accessories', 'Size', '1 7/8" × 1 5/8"', 'Coating', 'galvanized', 4.75, 7.13),
('10008', 'Barb arm', 'Chain link accessories', 'Size', '2 3/8" × 1 5/8"', 'Coating', 'galvanized', 5.02, 7.53),
('10009', 'Barb arm', 'Chain link accessories', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'galvanized', 9.41, 14.12),
('10010', 'Barb arm', 'Chain link accessories', 'Size', '4" x 1 5/8"', 'Coating', 'galvanized', 15.26, 22.89);

-- Insert Collar products
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    supply_price, retail_price
) VALUES 
('10051', 'Collar', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', 1.94, 3.88),
('10052', 'Collar', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', 1.11, 1.73),
('10053', 'Collar', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', 2.98, 5.96),
('10054', 'Collar', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'galvanized', 1.29, 2.58),
('10055', 'Collar', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'galvanized', 0.74, 1.15),
('10056', 'Collar', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'galvanized', 1.42, 2.84);

-- Insert Dome cap products
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    supply_price, retail_price
) VALUES 
('10061', 'Dome cap', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', 0.42, 0.84),
('10062', 'Dome cap', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', 0.42, 0.84),
('10063', 'Dome cap', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', 0.42, 0.84),
('10064', 'Dome cap', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', 0.56, 1.12),
('10065', 'Dome cap', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', 0.56, 1.12),
('10066', 'Dome cap', 'Chain link accessories', 'Size', '4"', 'Coating', 'Black', 1.68, 3.36),
('10067', 'Dome cap', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'galvanized', 0.28, 0.56),
('10068', 'Dome cap', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'galvanized', 0.28, 0.56),
('10069', 'Dome cap', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'galvanized', 0.28, 0.56),
('10070', 'Dome cap', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'galvanized', 0.37, 0.74),
('10071', 'Dome cap', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'galvanized', 0.37, 0.74),
('10072', 'Dome cap', 'Chain link accessories', 'Size', '4"', 'Coating', 'galvanized', 1.12, 2.24);

-- Insert Post - Black Sch 20 products
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    supply_price, retail_price
) VALUES 
('12201', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '1''', 2.5, 3.25),
('12202', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '1''', 2.63, 3.42),
('12203', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', 2.78, 3.61),
('12204', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '6''', 13.5, 17.55),
('12205', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '6''', 8.06, 14.91),
('12206', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', 16.2, 21.06);

-- Add more INSERT statements for the remaining products from your CSV file
-- You can continue adding batches of products in groups of 10-20 per INSERT statement

-- Commit the transaction
COMMIT;

-- Verify the count
SELECT COUNT(*) FROM public.chainlink_products;
