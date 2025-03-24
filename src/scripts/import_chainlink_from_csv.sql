-- First, truncate the existing table to avoid duplicates
TRUNCATE TABLE public.chainlink_products;

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

-- Copy data from CSV file
-- Note: You'll need to adjust the path to match where you've uploaded the CSV in Supabase
COPY temp_chainlink_products FROM '/tmp/chainlink_products.csv' WITH (FORMAT csv, HEADER true);

-- Insert data from temporary table to the actual table
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
)
SELECT 
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    CASE WHEN supply_price = '' THEN 0 ELSE supply_price::DECIMAL END,
    CASE WHEN retail_price = '' THEN 0 ELSE retail_price::DECIMAL END
FROM temp_chainlink_products;

-- Drop the temporary table
DROP TABLE temp_chainlink_products;

-- Verify the count
SELECT COUNT(*) FROM public.chainlink_products;
