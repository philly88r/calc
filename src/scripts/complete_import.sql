-- Generated SQL for importing all chainlink products
-- Total products: 1051

-- First, truncate the existing table to avoid duplicates
TRUNCATE TABLE public.chainlink_products;

-- Begin transaction
BEGIN;

-- Batch 1 of 53 (products 1-20)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10001', 'Barb arm', 'Chain link accessories', 'Size', '1 5/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 7.15, 10.73),
    ('10002', 'Barb arm', 'Chain link accessories', 'Size', '1 7/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 7.07, 10.61),
    ('10003', 'Barb arm', 'Chain link accessories', 'Size', '2 3/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 7.53, 11.3),
    ('10004', 'Barb arm', 'Chain link accessories', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'Black', NULL, NULL, 14.12, 21.18),
    ('10005', 'Barb arm', 'Chain link accessories', 'Size', '4" x 1 5/8"', 'Coating', 'Black', NULL, NULL, 22.89, 34.34),
    ('10006', 'Barb arm', 'Chain link accessories', 'Size', '1 5/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 4.75, 7.13),
    ('10007', 'Barb arm', 'Chain link accessories', 'Size', '1 7/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 3.78, 6.05),
    ('10008', 'Barb arm', 'Chain link accessories', 'Size', '2 3/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 4.41, 7.52),
    ('10009', 'Barb arm', 'Chain link accessories', 'Size', '2 7/8" x 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 9.49, 14.24),
    ('10010', 'Barb arm', 'Chain link accessories', 'Size', '4" x 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 11.89, 17.84),
    ('10011', 'Barbed wire (roll)', 'Chain link accessories', 'Gauge', '12.5 gauge (low tensile)', 'Point', 'Slick line', NULL, NULL, 52.56, 105.0),
    ('10012', 'Barbed wire (roll)', 'Chain link accessories', 'Gauge', '15.5 gauge (high tensile)', 'Point', '2 point gaucho', NULL, NULL, 87.52, 116.4),
    ('10013', 'Barbed wire (roll)', 'Chain link accessories', 'Gauge', '12.5 gauge (low tensile)', 'Point', '4 point gaucho', NULL, NULL, 60.84, 76.05),
    ('10014', 'Barbed wire (roll)', 'Chain link accessories', 'Gauge', '15.5 gauge (high tensile)', 'Point', '4 point gaucho', NULL, NULL, 58.8, 77.62),
    ('10015', 'Barbed wire (roll)', 'Chain link accessories', 'Gauge', '12.5 gauge (low tensile)', 'Point', '2 point gaucho', NULL, NULL, 87.52, 113.78),
    ('10016', 'Brace band', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 0.78, 1.56),
    ('10017', 'Brace band', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 0.85, 1.7),
    ('10018', 'Brace band', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 0.93, 1.86),
    ('10019', 'Brace band', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 0.44, 0.88),
    ('10020', 'Brace band', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 0.66, 1.32);

-- Batch 2 of 53 (products 21-40)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10021', 'Brace band', 'Chain link accessories', 'Size', '4"', 'Coating', 'Black', NULL, NULL, 1.02, 2.04),
    ('10022', 'Brace band', 'Chain link accessories', 'Size', '4 1/2"', 'Coating', 'Black', NULL, NULL, 2.1, 4.2),
    ('10023', 'Brace band', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', 'Black', NULL, NULL, 3.99, 5.99),
    ('10024', 'Brace band', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 0.42, 0.84),
    ('10025', 'Brace band', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.35, 0.7),
    ('10026', 'Brace band', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 0.56, 1.12),
    ('10027', 'Brace band', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 0.45, 1.38),
    ('10028', 'Brace band', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 0.39, 0.86),
    ('10029', 'Brace band', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 0.57, 1.6),
    ('10030', 'Brace band', 'Chain link accessories', 'Size', '4 1/2"', 'Coating', ' galvanized', NULL, NULL, 1.25, 2.5),
    ('10031', 'Brace band', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', ' galvanized', NULL, NULL, 1.4, 3.5),
    ('10037', 'Cane bolt (Chain link)', 'Chain link accessories', 'Size', '36"', 'Coating', ' galvanized', NULL, NULL, 10.73, 16.0),
    ('10041', 'Cantilever latch', 'Chain link accessories', 'Size', '2 7/8"', NULL, NULL, NULL, NULL, 9.25, 18.5),
    ('10042', 'Cantilever latch', 'Chain link accessories', 'Size', '4"', NULL, NULL, NULL, NULL, 11.57, 23.14),
    ('10046', 'Cantilever roller - 4"', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 27.31, 85.0),
    ('10051', 'Collar', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 2.1, 4.2),
    ('10052', 'Collar', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 1.2, 4.9),
    ('10053', 'Collar', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 2.98, 5.96),
    ('10054', 'Collar', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.29, 2.58),
    ('10055', 'Collar', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.74, 1.15);

-- Batch 3 of 53 (products 41-60)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10056', 'Collar', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 1.42, 2.84),
    ('10061', 'Dome cap', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 0.42, 0.84),
    ('10062', 'Dome cap', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 0.58, 1.16),
    ('10063', 'Dome cap', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 3.11, 6.22),
    ('10064', 'Dome cap', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 0.93, 1.86),
    ('10065', 'Dome cap', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 1.23, 2.46),
    ('10066', 'Dome cap', 'Chain link accessories', 'Size', '4"', 'Coating', 'Black', NULL, NULL, 1.86, 3.72),
    ('10067', 'Dome cap', 'Chain link accessories', 'Size', '4 1/2"', 'Coating', 'Black', NULL, NULL, 5.0, 10.0),
    ('10068', 'Dome cap', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', 'Black', NULL, NULL, 11.5, 17.25),
    ('10069', 'Dome cap', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 0.73, 1.46),
    ('10070', 'Dome cap', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.4, 0.88),
    ('10071', 'Dome cap', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 0.81, 1.62),
    ('10072', 'Dome cap', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 0.58, 1.32),
    ('10073', 'Dome cap', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 0.88, 1.76),
    ('10074', 'Dome cap', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 1.35, 4.16),
    ('10075', 'Dome cap', 'Chain link accessories', 'Size', '4 1/2"', 'Coating', ' galvanized', NULL, NULL, 3.99, 7.98),
    ('10076', 'Dome cap', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', ' galvanized', NULL, NULL, 4.92, 12.3),
    ('10086', 'Fence sleeve / Pipe sleeve', 'Chain link accessories', 'Size', '1 3/8" × 6"', 'Coating', 'Black', NULL, NULL, 1.63, 3.26),
    ('10087', 'Fence sleeve / Pipe sleeve', 'Chain link accessories', 'Size', '1 5/8" × 6"', 'Coating', 'Black', NULL, NULL, 1.62, 3.24),
    ('10088', 'Fence sleeve / Pipe sleeve', 'Chain link accessories', 'Size', '1 3/8" × 6"', 'Coating', ' galvanized', NULL, NULL, 1.15, 2.3);

-- Batch 4 of 53 (products 61-80)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10089', 'Fence sleeve / Pipe sleeve', 'Chain link accessories', 'Size', '1 5/8" × 6"', 'Coating', ' galvanized', NULL, NULL, 1.26, 2.52),
    ('10091', 'Fence ties (100 ct)', 'Chain link accessories', 'Size', '8 1/4"', 'Coating', 'Aluminium/Steel coated black', NULL, NULL, 8.0, 16.0),
    ('10092', 'Fence ties (100 ct)', 'Chain link accessories', 'Size', '6 1/2"', 'Coating', 'Aluminium/Steel coated black', NULL, NULL, 9.0, 18.0),
    ('10093', 'Fence ties (100 ct)', 'Chain link accessories', 'Size', '8 1/4"', 'Coating', 'Aluminum/Steel', NULL, NULL, 10.0, 25.0),
    ('10094', 'Fence ties (100 ct)', 'Chain link accessories', 'Size', '6 1/2"', 'Coating', 'Aluminum/Steel', NULL, NULL, 7.0, 16.0),
    ('10096', 'Fork latch', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 1.5, 3.0),
    ('10097', 'Fork latch', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 1.5, 3.0),
    ('10098', 'Fork latch', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 1.42, 2.84),
    ('10099', 'Fork latch', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 1.7, 3.4),
    ('10100', 'Fork latch', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 1.6, 3.2),
    ('10101', 'Fork latch', 'Chain link accessories', 'Size', '4"', 'Coating', 'Black', NULL, NULL, 3.94, 7.88),
    ('10102', 'Fork latch', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.06, 2.12),
    ('10103', 'Fork latch', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 2.88, 4.37),
    ('10104', 'Fork latch', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 1.42, 2.84),
    ('10105', 'Fork latch', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.33, 2.66),
    ('10106', 'Fork latch', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 1.49, 2.98),
    ('10107', 'Fork latch', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 2.89, 5.78),
    ('10111', 'Hinge - 180 industrial hinge / industrial offset hinge (pressed steel)', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 14.73, 29.46),
    ('10112', 'Hinge - 180 industrial hinge / industrial offset hinge (pressed steel)', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 15.18, 30.36),
    ('10113', 'Hinge - 180 industrial hinge / industrial offset hinge (pressed steel)', 'Chain link accessories', 'Size', '4"', 'Coating', 'Black', NULL, NULL, 19.68, 39.36);

-- Batch 5 of 53 (products 81-100)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10114', 'Hinge - 180 industrial hinge / industrial offset hinge (pressed steel)', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 9.24, 18.48),
    ('10115', 'Hinge - 180 industrial hinge / industrial offset hinge (pressed steel)', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 10.48, 20.96),
    ('10116', 'Hinge - 180 industrial hinge / industrial offset hinge (pressed steel)', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 9.1, 18.2),
    ('10121', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 10.0, 20.0),
    ('10122', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 8.56, 17.36),
    ('10123', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '4"', 'Coating', 'Black', NULL, NULL, 29.94, 59.88),
    ('10124', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 7.8, 15.6),
    ('10125', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 7.15, 14.3),
    ('10126', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 7.05, 23.01),
    ('10127', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', 'Black', NULL, NULL, 0.0, 0.0),
    ('10128', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', ' galvanized', NULL, NULL, 14.76, 29.52),
    ('10131', 'Hinge - Female gate hinge', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 1.29, 2.58),
    ('10132', 'Hinge - Female gate hinge', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 0.83, 2.91),
    ('10133', 'Hinge - Female gate hinge', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 1.79, 3.58),
    ('10134', 'Hinge - Female gate hinge', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.11, 2.22),
    ('10135', 'Hinge - Female gate hinge', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.96, 1.92),
    ('10136', 'Hinge - Female gate hinge', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 1.48, 2.96),
    ('10141', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 2.65, 5.3),
    ('10142', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 1.83, 3.66),
    ('10143', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 3.23, 6.46);

-- Batch 6 of 53 (products 101-120)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10144', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 2.5, 5.0),
    ('10145', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.73, 3.46),
    ('10146', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 2.49, 4.98),
    ('10147', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 3.98, 7.96),
    ('10151', 'Hog/pig ring', 'Chain link accessories', 'Gauge', '9 gauge', 'Coating', 'Black', NULL, NULL, 2.82, 5.64),
    ('10152', 'Hog/pig ring', 'Chain link accessories', 'Gauge', '12 1/2 gauge', 'Coating', 'Black', NULL, NULL, 5.98, 11.96),
    ('10153', 'Hog/pig ring', 'Chain link accessories', 'Gauge', '9 gauge', 'Coating', ' galvanized', NULL, NULL, 1.75, 4.6),
    ('10154', 'Hog/pig ring', 'Chain link accessories', 'Gauge', '12 1/2 gauge', 'Coating', ' galvanized', NULL, NULL, 1.8, 3.6),
    ('10156', 'Industrial drop rod latch', 'Chain link accessories', 'Size', '1 5/8"', NULL, NULL, NULL, NULL, 3.78, 49.13),
    ('10157', 'Industrial drop rod latch', 'Chain link accessories', 'Size', '1 7/8"', NULL, NULL, NULL, NULL, 3.44, 52.13),
    ('10158', 'Industrial guide', 'Chain link accessories', 'Size', '1 5/8"', NULL, NULL, NULL, NULL, 3.24, 9.11),
    ('10159', 'Industrial guide', 'Chain link accessories', 'Size', '1 7/8"', NULL, NULL, NULL, NULL, 1.91, 5.25),
    ('10161', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 5/8" × 1 3/8"', 'Coating', 'Black', NULL, NULL, 0.82, 1.64),
    ('10162', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 5/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 1.25, 2.5),
    ('10163', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 7/8" × 1 3/8"', 'Coating', 'Black', NULL, NULL, 2.18, 4.36),
    ('10164', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 7/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 1.6, 2.94),
    ('10165', 'Loop cap / eye top', 'Chain link accessories', 'Size', '2 3/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 1.48, 2.96),
    ('10166', 'Loop cap / eye top', 'Chain link accessories', 'Size', '2 7/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 3.28, 6.56),
    ('10167', 'Loop cap / eye top', 'Chain link accessories', 'Size', '4" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 4.45, 8.9),
    ('10168', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 5/8" × 1 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.21, 2.42);

-- Batch 7 of 53 (products 121-140)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10169', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 5/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 1.13, 2.26),
    ('10170', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 7/8" × 1 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.25, 2.5),
    ('10171', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 7/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.86, 1.72),
    ('10172', 'Loop cap / eye top', 'Chain link accessories', 'Size', '2 3/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 1.28, 2.56),
    ('10173', 'Loop cap / eye top', 'Chain link accessories', 'Size', '2 7/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 2.6, 5.2),
    ('10174', 'Loop cap / eye top', 'Chain link accessories', 'Size', '4" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 4.26, 8.52),
    ('10191', 'Rail end', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 0.7, 1.4),
    ('10192', 'Rail end', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 0.78, 1.56),
    ('10193', 'Rail end', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.19, 2.38),
    ('10194', 'Rail end', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.76, 1.52),
    ('10201', 'Tension band', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 0.86, 1.72),
    ('10202', 'Tension band', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 0.43, 0.86),
    ('10203', 'Tension band', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 0.8, 1.6),
    ('10204', 'Tension band', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 0.58, 1.16),
    ('10205', 'Tension band', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 0.65, 1.3),
    ('10206', 'Tension band', 'Chain link accessories', 'Size', '4"', 'Coating', 'Black', NULL, NULL, 0.57, 1.65),
    ('10207', 'Tension band', 'Chain link accessories', 'Size', '4 1/2"', 'Coating', 'Black', NULL, NULL, 2.0, 4.0),
    ('10208', 'Tension band', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', 'Black', NULL, NULL, 3.99, 7.98),
    ('10209', 'Tension band', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 0.46, 0.92),
    ('10210', 'Tension band', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.3, 0.7);

-- Batch 8 of 53 (products 141-160)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10211', 'Tension band', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 0.43, 1.18),
    ('10212', 'Tension band', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 0.3, 1.16),
    ('10213', 'Tension band', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 0.57, 1.43),
    ('10214', 'Tension band', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 0.7, 1.4),
    ('10215', 'Tension band', 'Chain link accessories', 'Size', '4 1/2"', 'Coating', ' galvanized', NULL, NULL, 1.75, 3.5),
    ('10216', 'Tension band', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', ' galvanized', NULL, NULL, 1.54, 4.62),
    ('10221', 'Tension bar', 'Chain link accessories', 'Size', '4''', 'Coating', 'Black', NULL, NULL, 2.64, 5.28),
    ('10222', 'Tension bar', 'Chain link accessories', 'Size', '5''', 'Coating', 'Black', NULL, NULL, 3.1, 6.2),
    ('10223', 'Tension bar', 'Chain link accessories', 'Size', '6''', 'Coating', 'Black', NULL, NULL, 5.69, 11.38),
    ('10224', 'Tension bar', 'Chain link accessories', 'Size', '7''', 'Coating', 'Black', NULL, NULL, 7.83, 15.66),
    ('10225', 'Tension bar', 'Chain link accessories', 'Size', '8''', 'Coating', 'Black', NULL, NULL, 6.85, 16.9),
    ('10227', 'Tension bar', 'Chain link accessories', 'Size', '10''', 'Coating', 'Black', NULL, NULL, 0.0, 0.0),
    ('10229', 'Tension bar', 'Chain link accessories', 'Size', '12''', 'Coating', 'Black', NULL, NULL, 0.0, 0.0),
    ('10231', 'Tension bar', 'Chain link accessories', 'Size', '4''', 'Coating', ' galvanized', NULL, NULL, 2.47, 5.31),
    ('10232', 'Tension bar', 'Chain link accessories', 'Size', '5''', 'Coating', ' galvanized', NULL, NULL, 3.09, 7.59),
    ('10233', 'Tension bar', 'Chain link accessories', 'Size', '6''', 'Coating', ' galvanized', NULL, NULL, 2.7, 7.19),
    ('10234', 'Tension bar', 'Chain link accessories', 'Size', '7''', 'Coating', ' galvanized', NULL, NULL, 4.1, 8.68),
    ('10235', 'Tension bar', 'Chain link accessories', 'Size', '8''', 'Coating', ' galvanized', NULL, NULL, 4.59, 9.18),
    ('10237', 'Tension bar', 'Chain link accessories', 'Size', '10''', 'Coating', ' galvanized', NULL, NULL, 4.21, 12.18),
    ('10239', 'Tension bar', 'Chain link accessories', 'Size', '12''', 'Coating', ' galvanized', NULL, NULL, 6.58, 13.16);

-- Batch 9 of 53 (products 161-180)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10250', 'V-Track Per foot', 'Gates', NULL, NULL, NULL, NULL, NULL, NULL, 6.5, 8.78),
    ('10251', '4" V-Wheel w/ Sealed Bearing', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 31.41, 62.82),
    ('10252', '4" Wheel Box V-Groove', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 8.68, 17.36),
    ('10253', 'Gate Clip', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 0.3, 0.6),
    ('10256', 'Tension line (9 gauge)', 'Chain link accessories', 'Coating', 'Black', 'Length', '170'' (10 lbs)', NULL, NULL, 18.58, 37.16),
    ('10257', 'Tension line (9 gauge)', 'Chain link accessories', 'Coating', ' galvanized', 'Length', '170'' (10 lbs)', NULL, NULL, 13.6, 27.2),
    ('10258', 'Tension line (9 gauge)', 'Chain link accessories', 'Coating', 'Black', 'Length', '1700'' (100 lbs)', NULL, NULL, 142.0, 284.0),
    ('10259', 'Tension line (9 gauge)', 'Chain link accessories', 'Coating', ' galvanized', 'Length', '1700'' (100 lbs)', NULL, NULL, 0.0, 0.0),
    ('10261', 'Truss rod - 3/8" x 12''', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 4.82, 9.64),
    ('10262', 'Truss rod holders', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 1.06, 2.35),
    ('10263', 'Duckbill latches', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 5.62, 17.5),
    ('10264', 'Industrial swing latch', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 28.5, 42.75),
    ('10265', 'Flange', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 2.96, 18.95),
    ('10266', 'Swing gate wheel', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 8.11, 19.95),
    ('10267', 'Panic bar sets', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 429.57, 644.36),
    ('10268', 'Stymielock', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 150.0, 300.0),
    ('10281', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 3/8" x 1 3/8"', 'Coating', 'Black', 2.18, 4.36),
    ('10282', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 3/8" x 1 3/8"', 'Coating', 'Black', 1.86, 3.72),
    ('10283', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 3/8" x 1 3/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10284', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 5/8"  x 1 3/8"', 'Coating', 'Black', 2.52, 5.04);

-- Batch 10 of 53 (products 181-200)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10285', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 5/8"  x 1 3/8"', 'Coating', 'Black', 2.38, 4.76),
    ('10286', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 5/8"  x 1 3/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10287', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 7/8" x 1 3/8"', 'Coating', 'Black', 3.29, 6.58),
    ('10288', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 7/8" x 1 3/8"', 'Coating', 'Black', 2.65, 5.3),
    ('10289', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 7/8" x 1 3/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10290', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 5/8" x 1 5/8"', 'Coating', 'Black', 3.52, 7.04),
    ('10291', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 5/8" x 1 5/8"', 'Coating', 'Black', 2.61, 5.22),
    ('10292', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 5/8" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10293', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 7/8" x 1 5/8"', 'Coating', 'Black', 3.49, 6.98),
    ('10294', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 7/8" x 1 5/8"', 'Coating', 'Black', 2.68, 5.36),
    ('10295', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 7/8" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10296', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 7/8" x 1 7/8"', 'Coating', 'Black', 4.92, 9.84),
    ('10297', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 7/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10298', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 7/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10299', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 3/8" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10300', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 3/8" x 1 5/8"', 'Coating', 'Black', 2.99, 5.98),
    ('10301', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 3/8" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10302', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 3/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10303', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 3/8" x 1 7/8"', 'Coating', 'Black', 3.74, 7.48),
    ('10304', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 3/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0);

-- Batch 11 of 53 (products 201-220)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10305', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'Black', 4.58, 9.16),
    ('10306', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'Black', 4.04, 8.08),
    ('10307', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10308', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 7/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10309', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 7/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10310', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 7/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10311', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '4" x 1 5/8"', 'Coating', 'Black', 5.49, 10.98),
    ('10312', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '4" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10313', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '4" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10314', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '4" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10315', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '4" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10316', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '4" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('10317', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 3/8" x 1 3/8"', 'Coating', 'ped galvanized', 1.48, 2.96),
    ('10318', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 3/8" x 1 3/8"', 'Coating', 'ped galvanized', 1.25, 2.5),
    ('10319', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 3/8" x 1 3/8"', 'Coating', 'ped galvanized', 1.48, 2.96),
    ('10320', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 5/8"  x 1 3/8"', 'Coating', 'ped galvanized', 1.97, 3.94),
    ('10321', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 5/8"  x 1 3/8"', 'Coating', 'ped galvanized', 1.41, 2.82),
    ('10322', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 5/8"  x 1 3/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('10323', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 7/8" x 1 3/8"', 'Coating', 'ped galvanized', 1.71, 3.42),
    ('10324', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 7/8" x 1 3/8"', 'Coating', 'ped galvanized', 2.42, 4.84);

-- Batch 12 of 53 (products 221-240)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10325', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 7/8" x 1 3/8"', 'Coating', 'ped galvanized', 2.72, 5.44),
    ('10326', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 5/8" x 1 5/8"', 'Coating', 'ped galvanized', 1.7, 3.4),
    ('10327', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 5/8" x 1 5/8"', 'Coating', 'ped galvanized', 1.87, 3.74),
    ('10328', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 5/8" x 1 5/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('10329', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 7/8" x 1 5/8"', 'Coating', 'ped galvanized', 1.75, 3.5),
    ('10330', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 7/8" x 1 5/8"', 'Coating', 'ped galvanized', 1.92, 3.84),
    ('10331', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 7/8" x 1 5/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('10332', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 7/8" x 1 7/8"', 'Coating', 'ped galvanized', 4.13, 8.26),
    ('10333', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 7/8" x 1 7/8"', 'Coating', 'ped galvanized', 1.9, 3.8),
    ('10334', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 7/8" x 1 7/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('10335', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 3/8" x 1 5/8"', 'Coating', 'ped galvanized', 1.55, 4.88),
    ('10336', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 3/8" x 1 5/8"', 'Coating', 'ped galvanized', 2.24, 4.48),
    ('10337', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 3/8" x 1 5/8"', 'Coating', 'ped galvanized', 3.6, 7.2),
    ('10338', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 3/8" x 1 7/8"', 'Coating', 'ped galvanized', 3.79, 7.58),
    ('10339', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 3/8" x 1 7/8"', 'Coating', 'ped galvanized', 3.14, 6.28),
    ('10340', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 3/8" x 1 7/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('10341', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'ped galvanized', 1.76, 6.12),
    ('10342', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'ped galvanized', 2.4, 4.8),
    ('10343', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'ped galvanized', 3.88, 7.76),
    ('10344', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 7/8" x 1 7/8"', 'Coating', 'ped galvanized', 3.76, 7.52);

-- Batch 13 of 53 (products 241-260)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10345', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 7/8" x 1 7/8"', 'Coating', 'ped galvanized', 2.4, 4.8),
    ('10346', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 7/8" x 1 7/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('10347', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '4" x 1 5/8"', 'Coating', 'ped galvanized', 3.58, 7.16),
    ('10348', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '4" x 1 5/8"', 'Coating', 'ped galvanized', 4.12, 8.24),
    ('10349', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '4" x 1 5/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('10350', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '4" x 1 7/8"', 'Coating', 'ped galvanized', 5.25, 10.5),
    ('10351', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '4" x 1 7/8"', 'Coating', 'ped galvanized', 4.25, 8.5),
    ('10352', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '4" x 1 7/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('10361', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '9 gauge', 'Dimension', '1 5/8"', NULL, NULL, 20.09, 30.14),
    ('10362', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '11 gauge', 'Dimension', '1 5/8"', NULL, NULL, 14.2, 21.3),
    ('10363', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '9 gauge', 'Dimension', '2"', NULL, NULL, 21.45, 32.18),
    ('10364', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '11 gauge', 'Dimension', '2"', NULL, NULL, 14.86, 22.29),
    ('10365', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '9 gauge', 'Dimension', '2 3/8"', NULL, NULL, 23.48, 0.0),
    ('10366', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '11 gauge', 'Dimension', '2 3/8"', NULL, NULL, 19.54, 29.31),
    ('10367', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '9 gauge', 'Dimension', '3"', NULL, NULL, 26.87, 40.31),
    ('10368', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '9 gauge', 'Dimension', '4"', NULL, NULL, 24.32, 36.48),
    ('10381', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'tan', 'Size', '4', NULL, NULL, 51.0, 84.15),
    ('10382', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'green', 'Size', '4', NULL, NULL, 33.0, 54.45),
    ('10383', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'black', 'Size', '4', NULL, NULL, 33.0, 54.45),
    ('10384', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'tan', 'Size', '5', NULL, NULL, 0.0, 0.0);

-- Batch 14 of 53 (products 261-280)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10385', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'green', 'Size', '5', NULL, NULL, 43.0, 70.95),
    ('10386', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'black', 'Size', '5', NULL, NULL, 36.0, 59.4),
    ('10387', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'tan', 'Size', '6', NULL, NULL, 58.0, 95.7),
    ('10388', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'green', 'Size', '6', NULL, NULL, 54.0, 89.1),
    ('10389', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'black', 'Size', '6', NULL, NULL, 39.0, 64.35),
    ('10390', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'tan', 'Size', '7', NULL, NULL, 0.0, 0.0),
    ('10391', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'green', 'Size', '7', NULL, NULL, 0.0, 0.0),
    ('10392', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'black', 'Size', '7', NULL, NULL, 0.0, 0.0),
    ('10393', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'tan', 'Size', '8', NULL, NULL, 0.0, 0.0),
    ('10394', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'green', 'Size', '8', NULL, NULL, 61.0, 100.65),
    ('10395', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'black', 'Size', '8', NULL, NULL, 100.66, 140.92),
    ('10401', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Green', 'Height', '4''', NULL, NULL, 37.0, 61.05),
    ('10402', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Black', 'Height', '4''', NULL, NULL, 37.0, 61.05),
    ('10403', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Tan', 'Height', '4''', NULL, NULL, 37.0, 61.05),
    ('10404', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Green', 'Height', '5''', NULL, NULL, 44.0, 72.6),
    ('10405', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Black', 'Height', '5''', NULL, NULL, 44.0, 72.6),
    ('10406', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Tan', 'Height', '5''', NULL, NULL, 44.0, 72.6),
    ('10407', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Green', 'Height', '6''', NULL, NULL, 57.0, 94.05),
    ('10408', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Black', 'Height', '6''', NULL, NULL, 57.0, 94.05),
    ('10409', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Tan', 'Height', '6''', NULL, NULL, 57.0, 94.05);

-- Batch 15 of 53 (products 281-300)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('10410', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Green', 'Height', '8''', NULL, NULL, 75.0, 123.75),
    ('10411', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Black', 'Height', '8''', NULL, NULL, 76.0, 125.4),
    ('10412', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Tan', 'Height', '8''', NULL, NULL, 77.0, 127.05),
    ('11001', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '4''', 'Gauge', 'Residential 9 gauge finish', NULL, NULL, 50.5, 96.8),
    ('11002', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '5''', 'Gauge', 'Residential 9 gauge finish', NULL, NULL, 106.0, 153.0),
    ('11003', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '6''', 'Gauge', 'Residential 9 gauge finish', NULL, NULL, 130.0, 169.01),
    ('11004', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '7''', 'Gauge', 'Residential 9 gauge finish', NULL, NULL, 0.0, 0.0),
    ('11005', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '8''', 'Gauge', 'Residential 9 gauge finish', NULL, NULL, 172.0, 258.0),
    ('11006', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '4''', 'Gauge', 'Commercial 8 gauge finish', NULL, NULL, 105.0, 160.0),
    ('11007', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '5''', 'Gauge', 'Commercial 8 gauge finish', NULL, NULL, 312.5, 406.25),
    ('11008', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '6''', 'Gauge', 'Commercial 8 gauge finish', NULL, NULL, 167.0, 308.95),
    ('11009', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '7''', 'Gauge', 'Commercial 8 gauge finish', NULL, NULL, 229.04, 309.2),
    ('11010', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '8''', 'Gauge', 'Commercial 8 gauge finish', NULL, NULL, 160.01, 315.0),
    ('11501', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '4'' KK Residential 11.5 gauge', NULL, NULL, NULL, NULL, 89.0, 120.15),
    ('11502', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '5'' KK Residential 11.5 gauge', NULL, NULL, NULL, NULL, 57.1, 154.0),
    ('11503', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '6'' KK Residential 11.5 gauge', NULL, NULL, NULL, NULL, 64.06, 180.0),
    ('11504', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '4'' KK Commercial 9 gauge', NULL, NULL, NULL, NULL, 119.5, 163.15),
    ('11505', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '5'' KK Commercial 9 gauge', NULL, NULL, NULL, NULL, 177.5, 230.75),
    ('11506', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '6'' KT Commercial 9 gauge', NULL, NULL, NULL, NULL, 98.54, 220.0),
    ('11507', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '7'' KT Commercial 9 gauge', NULL, NULL, NULL, NULL, 140.3, 273.35);

-- Batch 16 of 53 (products 301-320)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('11508', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '8'' KT Commercial 9 gauge', NULL, NULL, NULL, NULL, 245.0, 346.99),
    ('11509', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '10'' KT Commercial 9 gauge', NULL, NULL, NULL, NULL, 169.83, 440.0),
    ('11510', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '12'' KT Commercial 9 gauge', NULL, NULL, NULL, NULL, 208.58, 513.0),
    ('11511', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '14'' KT Commercial 9 gauge', NULL, NULL, NULL, NULL, 246.86, 918.75),
    ('11759', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'White', 'Height', '4''', NULL, NULL, 42.91, 62.22),
    ('11760', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'White', 'Height', '5''', NULL, NULL, 53.62, 77.75),
    ('11761', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'White', 'Height', '6''', NULL, NULL, 0.0, 0.0),
    ('11762', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'White', 'Height', '8''', NULL, NULL, 0.0, 0.0),
    ('12001', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 3/8"', 'Length', '1''', NULL, NULL, 1.5, 1.95),
    ('12002', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '1''', NULL, NULL, 1.92, 2.5),
    ('12003', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '1''', NULL, NULL, 2.27, 2.95),
    ('12004', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 2.61, 3.39),
    ('12005', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '6''', NULL, NULL, 5.85, 10.81),
    ('12006', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '6''', NULL, NULL, 6.48, 11.99),
    ('12007', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 7.58, 14.02),
    ('12008', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '7''', NULL, NULL, 13.43, 17.46),
    ('12009', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '7''', NULL, NULL, 13.93, 18.11),
    ('12010', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 8.84, 16.35),
    ('12011', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '8''', NULL, NULL, 13.44, 17.47),
    ('12012', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '8''', NULL, NULL, 15.92, 20.7);

-- Batch 17 of 53 (products 321-340)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('12013', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 20.48, 26.62),
    ('12014', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 3/8"', 'Length', '21''', NULL, NULL, 22.26, 28.94),
    ('12015', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '21''', NULL, NULL, 40.19, 52.25),
    ('12016', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '22''', NULL, NULL, 34.54, 44.91),
    ('12017', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 3/8"', 'Length', '20''', NULL, NULL, 10.73, 19.86),
    ('12018', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '20''', NULL, NULL, 20.0, 37.0),
    ('12019', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('12020', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('12201', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '1''', NULL, NULL, 2.26, 2.94),
    ('12202', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '1''', NULL, NULL, 2.63, 3.42),
    ('12203', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 2.78, 3.61),
    ('12204', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '6''', NULL, NULL, 13.5, 17.55),
    ('12205', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '6''', NULL, NULL, 8.06, 14.91),
    ('12206', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 16.2, 21.06),
    ('12207', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '7''', NULL, NULL, 7.99, 14.77),
    ('12208', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '7''', NULL, NULL, 9.39, 16.9),
    ('12209', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 19.46, 25.3),
    ('12210', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '8''', NULL, NULL, 9.12, 16.87),
    ('12211', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '8''', NULL, NULL, 10.76, 19.91),
    ('12212', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 13.24, 24.49);

-- Batch 18 of 53 (products 341-360)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('12213', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '10'' 6"', NULL, NULL, 0.0, 0.0),
    ('12214', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '10'' 6"', NULL, NULL, 14.71, 27.2),
    ('12215', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '10'' 6"', NULL, NULL, 0.0, 0.0),
    ('12216', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '21''', NULL, NULL, 33.81, 43.95),
    ('12217', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '21''', NULL, NULL, 55.23, 71.8),
    ('12218', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '21''', NULL, NULL, 58.38, 75.89),
    ('12219', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '24''', NULL, NULL, 46.8, 60.84),
    ('12220', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '24''', NULL, NULL, 57.36, 74.57),
    ('12221', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '24''', NULL, NULL, 68.88, 89.55),
    ('12222', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '20''', NULL, NULL, 23.66, 43.78),
    ('12223', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('12224', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('12401', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '1''', NULL, NULL, 3.48, 4.52),
    ('12402', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '1''', NULL, NULL, 4.06, 5.28),
    ('12403', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 4.64, 6.03),
    ('12404', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '1''', NULL, NULL, 7.19, 9.35),
    ('12405', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '1''', NULL, NULL, 14.93, 19.41),
    ('12406', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '6''', NULL, NULL, 30.0, 51.87),
    ('12407', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '6''', NULL, NULL, 24.36, 31.67),
    ('12408', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 27.3, 35.49);

-- Batch 19 of 53 (products 361-380)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('12409', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '6''', NULL, NULL, 43.14, 56.08),
    ('12410', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '6''', NULL, NULL, 89.58, 116.45),
    ('12411', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '7''', NULL, NULL, 24.29, 31.58),
    ('12412', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '7''', NULL, NULL, 28.42, 36.95),
    ('12413', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 31.85, 41.41),
    ('12414', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '7''', NULL, NULL, 50.33, 65.43),
    ('12415', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '7''', NULL, NULL, 104.51, 135.86),
    ('12416', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '8''', NULL, NULL, 27.76, 36.09),
    ('12417', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '8''', NULL, NULL, 20.19, 30.51),
    ('12418', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 19.71, 39.41),
    ('12419', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '8''', NULL, NULL, 33.46, 60.33),
    ('12420', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '8''', NULL, NULL, 46.56, 93.13),
    ('12421', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('12422', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('12423', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('12424', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('12425', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('12426', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '10'' 6"', NULL, NULL, 34.7, 45.11),
    ('12427', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '10'' 6"', NULL, NULL, 27.43, 39.77),
    ('12428', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '10'' 6"', NULL, NULL, 42.08, 55.55);

-- Batch 20 of 53 (products 381-400)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('12429', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '10'' 6"', NULL, NULL, 57.64, 89.49),
    ('12430', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '10'' 6"', NULL, NULL, 156.77, 203.8),
    ('12431', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '12''', NULL, NULL, 0.0, 0.0),
    ('12432', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '12''', NULL, NULL, 0.0, 0.0),
    ('12433', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '12''', NULL, NULL, 35.62, 72.44),
    ('12434', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '12''', NULL, NULL, 50.19, 90.5),
    ('12435', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '12''', NULL, NULL, 69.85, 139.69),
    ('12436', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '21''', NULL, NULL, 42.63, 57.55),
    ('12437', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '21''', NULL, NULL, 85.26, 110.84),
    ('12438', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '21''', NULL, NULL, 95.55, 124.22),
    ('12439', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '21''', NULL, NULL, 150.99, 196.29),
    ('12440', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '21''', NULL, NULL, 313.53, 407.59),
    ('12441', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '24''', NULL, NULL, 83.52, 108.58),
    ('12442', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '24''', NULL, NULL, 60.48, 126.67),
    ('12443', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '24''', NULL, NULL, 95.04, 144.87),
    ('12444', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '24''', NULL, NULL, 123.6, 203.94),
    ('12445', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '24''', NULL, NULL, 284.4, 398.16),
    ('12446', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '20''', NULL, NULL, 27.04, 54.09),
    ('12447', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('12448', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '20''', NULL, NULL, 48.59, 97.19);

-- Batch 21 of 53 (products 401-420)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('12449', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('12450', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('13001', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 3/8"', 'Length', '1''', NULL, NULL, 1.0, 1.3),
    ('13002', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '1''', NULL, NULL, 1.5, 1.95),
    ('13003', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '1''', NULL, NULL, 1.74, 2.26),
    ('13004', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 1.94, 2.52),
    ('13005', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '6''', NULL, NULL, 5.11, 9.49),
    ('13006', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '6''', NULL, NULL, 5.99, 10.49),
    ('13007', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 7.1, 13.13),
    ('13008', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '7''', NULL, NULL, 10.5, 13.65),
    ('13009', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '7''', NULL, NULL, 12.25, 15.93),
    ('13010', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 8.28, 13.65),
    ('13011', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '8''', NULL, NULL, 7.9, 10.27),
    ('13012', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '8''', NULL, NULL, 11.6, 15.08),
    ('13013', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 15.52, 20.18),
    ('13014', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 3/8"', 'Length', '21''', NULL, NULL, 19.74, 25.66),
    ('13015', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '21''', NULL, NULL, 29.92, 38.9),
    ('13016', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '22''', NULL, NULL, 23.32, 32.65),
    ('13017', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 3/8"', 'Length', '20''', NULL, NULL, 11.66, 21.57),
    ('13018', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '20''', NULL, NULL, 15.76, 29.16);

-- Batch 22 of 53 (products 421-440)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('13019', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('13020', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('13201', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '1''', NULL, NULL, 1.91, 2.48),
    ('13202', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '1''', NULL, NULL, 1.97, 2.56),
    ('13203', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 2.61, 3.39),
    ('13204', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '6''', NULL, NULL, 10.56, 13.73),
    ('13205', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '6''', NULL, NULL, 11.82, 15.37),
    ('13206', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 15.65, 20.35),
    ('13207', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '7''', NULL, NULL, 7.14, 13.21),
    ('13208', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '7''', NULL, NULL, 7.71, 14.26),
    ('13209', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 18.26, 23.74),
    ('13210', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '8''', NULL, NULL, 8.01, 14.82),
    ('13211', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '8''', NULL, NULL, 8.65, 16.01),
    ('13212', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 14.41, 23.06),
    ('13213', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '10''6"', NULL, NULL, 18.48, 24.02),
    ('13214', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '10''6"', NULL, NULL, 11.5, 21.28),
    ('13215', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '10''6"', NULL, NULL, 18.31, 25.63),
    ('13216', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '21''', NULL, NULL, 25.83, 45.79),
    ('13217', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '21''', NULL, NULL, 38.43, 49.96),
    ('13218', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '21''', NULL, NULL, 48.51, 63.06);

-- Batch 23 of 53 (products 441-460)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('13219', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '24''', NULL, NULL, 45.84, 59.59),
    ('13220', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '24''', NULL, NULL, 47.37, 61.58),
    ('13221', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '24''', NULL, NULL, 52.02, 67.63),
    ('13222', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '20''', NULL, NULL, 20.14, 33.23),
    ('13223', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('13224', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('13401', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '1''', NULL, NULL, 1.74, 2.26),
    ('13402', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '6''', NULL, NULL, 10.44, 13.57),
    ('13403', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '7''', NULL, NULL, 12.18, 15.83),
    ('13404', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '8''', NULL, NULL, 13.92, 18.1),
    ('13405', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '10'' 6"', NULL, NULL, 18.27, 23.75),
    ('13406', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '21''', NULL, NULL, 43.68, 56.78),
    ('13407', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '24''', NULL, NULL, 41.76, 54.29),
    ('13408', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '12''', NULL, NULL, 20.88, 27.14),
    ('13409', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '9''', NULL, NULL, 15.66, 20.36),
    ('13410', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '20''', NULL, NULL, 26.08, 43.33),
    ('13411', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '1''', NULL, NULL, 2.52, 5.04),
    ('13412', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '6''', NULL, NULL, 10.62, 19.66),
    ('13413', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '7''', NULL, NULL, 17.64, 22.93),
    ('13414', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '8''', NULL, NULL, 13.17, 24.54);

-- Batch 24 of 53 (products 461-480)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('13415', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '10'' 6"', NULL, NULL, 18.09, 31.66),
    ('13416', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '21''', NULL, NULL, 52.92, 68.8),
    ('13417', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '24''', NULL, NULL, 60.48, 78.62),
    ('13418', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '12''', NULL, NULL, 30.24, 39.31),
    ('13419', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '9''', NULL, NULL, 17.66, 22.95),
    ('13420', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('13421', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 0.0, 0.0),
    ('13422', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 14.5, 24.76),
    ('13423', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 15.61, 28.88),
    ('13424', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 23.0, 34.5),
    ('13425', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '10'' 6"', NULL, NULL, 32.07, 49.88),
    ('13426', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '21''', NULL, NULL, 64.05, 86.47),
    ('13427', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '24''', NULL, NULL, 80.16, 108.22),
    ('13428', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '12''', NULL, NULL, 39.42, 55.19),
    ('13429', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '9''', NULL, NULL, 27.13, 44.76),
    ('13430', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '20''', NULL, NULL, 42.86, 79.29),
    ('13431', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '14''', NULL, NULL, 31.01, 49.38),
    ('13432', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '16''', NULL, NULL, 35.37, 56.28),
    ('13433', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '1''', NULL, NULL, 0.0, 0.0),
    ('13434', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '6''', NULL, NULL, 22.47, 31.5);

-- Batch 25 of 53 (products 481-500)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('13435', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '7''', NULL, NULL, 0.0, 0.0),
    ('13436', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '8''', NULL, NULL, 0.0, 0.0),
    ('13437', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '10'' 6"', NULL, NULL, 37.48, 69.33),
    ('13438', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '21''', NULL, NULL, 0.0, 0.0),
    ('13439', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '24''', NULL, NULL, 0.0, 0.0),
    ('13440', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '12''', NULL, NULL, 47.88, 64.64),
    ('13441', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '9''', NULL, NULL, 30.68, 56.76),
    ('13442', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('13443', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '14''', NULL, NULL, 48.83, 73.5),
    ('13444', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '16''', NULL, NULL, 56.03, 84.0),
    ('13445', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '18''', NULL, NULL, 64.87, 94.32),
    ('13446', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '1''', NULL, NULL, 0.0, 0.0),
    ('13447', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '6''', NULL, NULL, 37.81, 45.0),
    ('13448', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '7''', NULL, NULL, 0.0, 0.0),
    ('13449', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '8''', NULL, NULL, 0.0, 0.0),
    ('13450', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '10'' 6"', NULL, NULL, 66.87, 123.7),
    ('13451', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '21''', NULL, NULL, 0.0, 0.0),
    ('13452', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '24''', NULL, NULL, 0.0, 0.0),
    ('13453', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '12''', NULL, NULL, 67.72, 88.04),
    ('13454', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '9''', NULL, NULL, 54.37, 67.5);

-- Batch 26 of 53 (products 501-520)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('13455', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('13456', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '11''', NULL, NULL, 66.4, 81.59),
    ('13457', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '14''', NULL, NULL, 82.96, 103.96),
    ('13458', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '16''', NULL, NULL, 100.81, 118.81),
    ('13459', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '6 5/8"', 'Length', '24''', NULL, NULL, 422.64, 570.56),
    ('13460', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '6 5/8"', 'Length', '12''', NULL, NULL, 211.32, 285.28),
    ('13601', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 4.55, 5.92),
    ('13602', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 27.3, 35.49),
    ('13603', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 31.85, 41.41),
    ('13604', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 22.8, 31.92),
    ('13605', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('13606', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '10'' 6"', NULL, NULL, 29.93, 41.9),
    ('13607', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '12''', NULL, NULL, 34.2, 44.46),
    ('13608', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '21''', NULL, NULL, 65.52, 85.18),
    ('13609', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '24''', NULL, NULL, 80.64, 104.83),
    ('13610', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '1''', NULL, NULL, 6.0, 7.8),
    ('13611', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '6''', NULL, NULL, 31.5, 40.95),
    ('13612', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '7''', NULL, NULL, 36.75, 47.78),
    ('13613', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '8''', NULL, NULL, 40.0, 52.0),
    ('13614', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '9''', NULL, NULL, 0.0, 0.0);

-- Batch 27 of 53 (products 521-540)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('13615', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '10'' 6"', NULL, NULL, 49.88, 69.83),
    ('13616', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '12''', NULL, NULL, 60.0, 78.0),
    ('13617', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '21''', NULL, NULL, 110.25, 143.33),
    ('13618', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '24''', NULL, NULL, 138.96, 180.65),
    ('13619', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '1''', NULL, NULL, 11.1, 14.43),
    ('13620', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '6''', NULL, NULL, 63.12, 82.06),
    ('13621', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '7''', NULL, NULL, 73.64, 95.73),
    ('13622', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '8''', NULL, NULL, 84.16, 109.41),
    ('13623', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('13624', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '10'' 6"', NULL, NULL, 63.0, 88.2),
    ('13625', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '12''', NULL, NULL, 72.0, 93.6),
    ('13626', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '21''', NULL, NULL, 220.92, 287.2),
    ('13627', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '24''', NULL, NULL, 193.44, 251.49),
    ('15001', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '4', NULL, NULL, 189.0, 245.7),
    ('15002', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '4', NULL, NULL, 216.0, 280.8),
    ('15003', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '4', NULL, NULL, 243.0, 315.9),
    ('15004', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '5', NULL, NULL, 236.25, 307.13),
    ('15005', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '5', NULL, NULL, 270.0, 351.0),
    ('15006', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '5', NULL, NULL, 303.75, 394.88),
    ('15007', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '6', NULL, NULL, 283.5, 368.55);

-- Batch 28 of 53 (products 541-560)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15008', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '6', NULL, NULL, 324.0, 421.2),
    ('15009', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '6', NULL, NULL, 364.5, 473.85),
    ('15010', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '8', NULL, NULL, 378.0, 491.4),
    ('15011', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '8', NULL, NULL, 432.0, 561.6),
    ('15012', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '8', NULL, NULL, 486.0, 631.8),
    ('15013', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '10', NULL, NULL, 472.5, 614.25),
    ('15014', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '10', NULL, NULL, 540.0, 702.0),
    ('15015', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '10', NULL, NULL, 607.5, 789.75),
    ('15016', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '12', NULL, NULL, 567.0, 737.1),
    ('15017', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '12', NULL, NULL, 648.0, 842.4),
    ('15018', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '12', NULL, NULL, 729.0, 947.7),
    ('15019', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '16', NULL, NULL, 756.0, 982.8),
    ('15020', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '16', NULL, NULL, 864.0, 1123.2),
    ('15021', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '16', NULL, NULL, 972.0, 1263.6),
    ('15051', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '4', NULL, NULL, 210.0, 273.0),
    ('15052', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '4', NULL, NULL, 240.0, 312.0),
    ('15053', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '4', NULL, NULL, 270.0, 351.0),
    ('15054', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '5', NULL, NULL, 262.5, 341.25),
    ('15055', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '5', NULL, NULL, 300.0, 390.0),
    ('15056', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '5', NULL, NULL, 337.5, 438.75);

-- Batch 29 of 53 (products 561-580)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15057', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '6', NULL, NULL, 315.0, 409.5),
    ('15058', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '6', NULL, NULL, 360.0, 468.0),
    ('15059', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '6', NULL, NULL, 405.0, 526.5),
    ('15060', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '8', NULL, NULL, 420.0, 546.0),
    ('15061', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '8', NULL, NULL, 480.0, 624.0),
    ('15062', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '8', NULL, NULL, 540.0, 702.0),
    ('15063', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '10', NULL, NULL, 525.0, 682.5),
    ('15064', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '10', NULL, NULL, 600.0, 780.0),
    ('15065', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '10', NULL, NULL, 675.0, 877.5),
    ('15066', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '12', NULL, NULL, 630.0, 819.0),
    ('15067', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '12', NULL, NULL, 720.0, 936.0),
    ('15068', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '12', NULL, NULL, 810.0, 1053.0),
    ('15069', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '16', NULL, NULL, 840.0, 1092.0),
    ('15070', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '16', NULL, NULL, 960.0, 1248.0),
    ('15071', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '16', NULL, NULL, 1080.0, 1404.0),
    ('15101', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '4''', NULL, NULL, 201.6, 262.08),
    ('15102', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '5''', NULL, NULL, 252.0, 327.6),
    ('15103', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '6''', NULL, NULL, 302.4, 393.12),
    ('15104', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '8''', NULL, NULL, 403.2, 524.16),
    ('15105', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '10''', NULL, NULL, 504.0, 655.2);

-- Batch 30 of 53 (products 581-600)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15106', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '12''', NULL, NULL, 604.8, 786.24),
    ('15107', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '16''', NULL, NULL, 806.4, 1048.32),
    ('15108', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '4''', NULL, NULL, 230.4, 299.52),
    ('15109', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '5''', NULL, NULL, 288.0, 374.4),
    ('15110', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '6''', NULL, NULL, 345.6, 449.28),
    ('15111', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '8''', NULL, NULL, 460.8, 599.04),
    ('15112', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '10''', NULL, NULL, 576.0, 748.8),
    ('15113', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '12''', NULL, NULL, 691.2, 898.56),
    ('15114', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '16''', NULL, NULL, 921.6, 1198.08),
    ('15115', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '4''', NULL, NULL, 259.2, 336.96),
    ('15116', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '5''', NULL, NULL, 324.0, 421.2),
    ('15117', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '6''', NULL, NULL, 388.8, 505.44),
    ('15118', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '8''', NULL, NULL, 518.4, 673.92),
    ('15119', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '10''', NULL, NULL, 648.0, 842.4),
    ('15120', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '12''', NULL, NULL, 777.6, 1010.88),
    ('15121', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '16''', NULL, NULL, 1036.8, 1347.84),
    ('15122', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '4''', NULL, NULL, 336.0, 436.8),
    ('15123', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '5''', NULL, NULL, 420.0, 546.0),
    ('15124', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '6''', NULL, NULL, 504.0, 655.2),
    ('15125', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '8''', NULL, NULL, 672.0, 873.6);

-- Batch 31 of 53 (products 601-620)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15126', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '10''', NULL, NULL, 840.0, 1092.0),
    ('15127', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '12''', NULL, NULL, 1008.0, 1310.4),
    ('15128', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '16''', NULL, NULL, 1344.0, 1747.2),
    ('15151', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '4', NULL, NULL, 224.0, 291.2),
    ('15152', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '4', NULL, NULL, 256.0, 332.8),
    ('15153', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '4', NULL, NULL, 288.0, 374.4),
    ('15154', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '5', NULL, NULL, 280.0, 364.0),
    ('15155', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '5', NULL, NULL, 320.0, 416.0),
    ('15156', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '5', NULL, NULL, 360.0, 468.0),
    ('15157', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '6', NULL, NULL, 336.0, 436.8),
    ('15158', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '6', NULL, NULL, 384.0, 499.2),
    ('15159', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '6', NULL, NULL, 432.0, 561.6),
    ('15160', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '8', NULL, NULL, 448.0, 582.4),
    ('15161', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '8', NULL, NULL, 512.0, 665.6),
    ('15162', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '8', NULL, NULL, 576.0, 748.8),
    ('15163', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '10', NULL, NULL, 560.0, 728.0),
    ('15164', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '10', NULL, NULL, 640.0, 832.0),
    ('15165', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '10', NULL, NULL, 720.0, 936.0),
    ('15166', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '12', NULL, NULL, 672.0, 873.6),
    ('15167', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '12', NULL, NULL, 768.0, 998.4);

-- Batch 32 of 53 (products 621-640)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15168', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '12', NULL, NULL, 864.0, 1123.2),
    ('15169', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '16', NULL, NULL, 896.0, 1164.8),
    ('15170', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '16', NULL, NULL, 1024.0, 1331.2),
    ('15171', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '16', NULL, NULL, 1152.0, 1497.6),
    ('15172', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '25', NULL, NULL, 0.0, 0.0),
    ('15173', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '30', NULL, NULL, 0.0, 0.0),
    ('15174', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '25', NULL, NULL, 1600.0, 2392.0),
    ('15175', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '30', NULL, NULL, 2048.0, 3061.76),
    ('15176', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '25', NULL, NULL, 1800.0, 2392.0),
    ('15177', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '30', NULL, NULL, 0.0, 0.0),
    ('15201', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '8', NULL, NULL, 378.0, 491.4),
    ('15202', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '8', NULL, NULL, 432.0, 561.6),
    ('15203', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '8', NULL, NULL, 486.0, 631.8),
    ('15204', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '10', NULL, NULL, 472.5, 614.25),
    ('15205', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '10', NULL, NULL, 540.0, 702.0),
    ('15206', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '10', NULL, NULL, 607.5, 789.75),
    ('15207', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '12', NULL, NULL, 529.2, 687.96),
    ('15208', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '12', NULL, NULL, 604.8, 786.24),
    ('15209', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '12', NULL, NULL, 680.4, 884.52),
    ('15210', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '14', NULL, NULL, 617.4, 802.62);

-- Batch 33 of 53 (products 641-660)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15211', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '14', NULL, NULL, 705.6, 917.28),
    ('15212', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '14', NULL, NULL, 793.8, 1031.94),
    ('15213', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '16', NULL, NULL, 705.6, 917.28),
    ('15214', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '16', NULL, NULL, 806.4, 1048.32),
    ('15215', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '16', NULL, NULL, 907.2, 1179.36),
    ('15216', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '20', NULL, NULL, 882.0, 1146.6),
    ('15217', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '20', NULL, NULL, 1008.0, 1310.4),
    ('15218', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '20', NULL, NULL, 1134.0, 1474.2),
    ('15219', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '22', NULL, NULL, 970.2, 1261.26),
    ('15220', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '22', NULL, NULL, 1108.8, 1441.44),
    ('15221', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '22', NULL, NULL, 1247.4, 1621.62),
    ('15222', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '24', NULL, NULL, 1058.4, 1375.92),
    ('15223', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '24', NULL, NULL, 1209.6, 1572.48),
    ('15224', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '24', NULL, NULL, 1360.8, 1769.04),
    ('15225', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '26', NULL, NULL, 1146.6, 1490.58),
    ('15226', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '26', NULL, NULL, 1310.4, 1703.52),
    ('15227', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '26', NULL, NULL, 1474.2, 1916.46),
    ('15228', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '28', NULL, NULL, 1234.8, 1605.24),
    ('15229', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '28', NULL, NULL, 1411.2, 1834.56),
    ('15230', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '28', NULL, NULL, 1587.6, 2063.88);

-- Batch 34 of 53 (products 661-680)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15231', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '30', NULL, NULL, 1323.0, 1719.9),
    ('15232', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '30', NULL, NULL, 1512.0, 1965.6),
    ('15233', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '30', NULL, NULL, 1701.0, 2211.3),
    ('15234', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '32', NULL, NULL, 1411.2, 1834.56),
    ('15235', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '32', NULL, NULL, 1612.8, 2096.64),
    ('15236', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '32', NULL, NULL, 1814.4, 2358.72),
    ('15251', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '8', NULL, NULL, 420.0, 546.0),
    ('15252', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '8', NULL, NULL, 480.0, 624.0),
    ('15253', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '8', NULL, NULL, 540.0, 702.0),
    ('15254', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '10', NULL, NULL, 525.0, 682.5),
    ('15255', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '10', NULL, NULL, 600.0, 780.0),
    ('15256', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '10', NULL, NULL, 675.0, 877.5),
    ('15257', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '12', NULL, NULL, 588.0, 764.4),
    ('15258', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '12', NULL, NULL, 672.0, 873.6),
    ('15259', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '12', NULL, NULL, 756.0, 982.8),
    ('15260', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '14', NULL, NULL, 686.0, 891.8),
    ('15261', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '14', NULL, NULL, 784.0, 1019.2),
    ('15262', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '14', NULL, NULL, 882.0, 1146.6),
    ('15263', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '16', NULL, NULL, 784.0, 1019.2),
    ('15264', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '16', NULL, NULL, 896.0, 1164.8);

-- Batch 35 of 53 (products 681-700)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15265', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '16', NULL, NULL, 1008.0, 1310.4),
    ('15266', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '20', NULL, NULL, 980.0, 1274.0),
    ('15267', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '20', NULL, NULL, 1120.0, 1456.0),
    ('15268', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '20', NULL, NULL, 1260.0, 1638.0),
    ('15269', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '22', NULL, NULL, 1078.0, 1401.4),
    ('15270', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '22', NULL, NULL, 1232.0, 1601.6),
    ('15271', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '22', NULL, NULL, 1386.0, 1801.8),
    ('15272', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '24', NULL, NULL, 1176.0, 1528.8),
    ('15273', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '24', NULL, NULL, 1344.0, 1747.2),
    ('15274', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '24', NULL, NULL, 1512.0, 1965.6),
    ('15275', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '26', NULL, NULL, 1274.0, 1656.2),
    ('15276', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '26', NULL, NULL, 1456.0, 1892.8),
    ('15277', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '26', NULL, NULL, 1638.0, 2129.4),
    ('15278', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '28', NULL, NULL, 1372.0, 1783.6),
    ('15279', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '28', NULL, NULL, 1568.0, 2038.4),
    ('15280', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '28', NULL, NULL, 1764.0, 2293.2),
    ('15281', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '30', NULL, NULL, 1470.0, 1911.0),
    ('15282', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '30', NULL, NULL, 1680.0, 2184.0),
    ('15283', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '30', NULL, NULL, 1890.0, 2457.0),
    ('15284', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '32', NULL, NULL, 1568.0, 2038.4);

-- Batch 36 of 53 (products 701-720)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15285', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '32', NULL, NULL, 1792.0, 2329.6),
    ('15286', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '32', NULL, NULL, 2016.0, 2620.8),
    ('15301', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '8''', NULL, NULL, 403.2, 524.16),
    ('15302', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '10''', NULL, NULL, 504.0, 655.2),
    ('15303', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '12''', NULL, NULL, 604.8, 786.24),
    ('15304', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '14''', NULL, NULL, 705.6, 917.28),
    ('15305', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '16''', NULL, NULL, 806.4, 1048.32),
    ('15306', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '20''', NULL, NULL, 1008.0, 1310.4),
    ('15307', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '22''', NULL, NULL, 1108.8, 1441.44),
    ('15308', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '24''', NULL, NULL, 1209.6, 1572.48),
    ('15309', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '26''', NULL, NULL, 1310.4, 1703.52),
    ('15310', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '28''', NULL, NULL, 1411.2, 1834.56),
    ('15311', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '30''', NULL, NULL, 1512.0, 1965.6),
    ('15312', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '32''', NULL, NULL, 1612.8, 2096.64),
    ('15313', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '8''', NULL, NULL, 460.8, 599.04),
    ('15314', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '10''', NULL, NULL, 576.0, 748.8),
    ('15315', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '12''', NULL, NULL, 691.2, 898.56),
    ('15316', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '14''', NULL, NULL, 806.4, 1048.32),
    ('15317', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '16''', NULL, NULL, 921.6, 1198.08),
    ('15318', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '20''', NULL, NULL, 1152.0, 1497.6);

-- Batch 37 of 53 (products 721-740)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15319', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '22''', NULL, NULL, 1267.2, 1647.36),
    ('15320', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '24''', NULL, NULL, 1382.4, 1797.12),
    ('15321', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '26''', NULL, NULL, 1497.6, 1946.88),
    ('15322', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '28''', NULL, NULL, 1612.8, 2096.64),
    ('15323', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '30''', NULL, NULL, 1728.0, 2246.4),
    ('15324', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '32''', NULL, NULL, 1843.2, 2396.16),
    ('15325', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '8''', NULL, NULL, 518.4, 673.92),
    ('15326', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '10''', NULL, NULL, 648.0, 842.4),
    ('15327', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '12''', NULL, NULL, 777.6, 1010.88),
    ('15328', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '14''', NULL, NULL, 907.2, 1179.36),
    ('15329', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '16''', NULL, NULL, 1036.8, 1347.84),
    ('15330', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '20''', NULL, NULL, 1296.0, 1684.8),
    ('15331', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '22''', NULL, NULL, 1425.6, 1853.28),
    ('15332', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '24''', NULL, NULL, 1555.2, 2021.76),
    ('15333', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '26''', NULL, NULL, 1684.8, 2190.24),
    ('15334', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '28''', NULL, NULL, 1814.4, 2358.72),
    ('15335', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '30''', NULL, NULL, 1944.0, 2527.2),
    ('15336', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '32''', NULL, NULL, 2073.6, 2695.68),
    ('15337', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '8''', NULL, NULL, 672.0, 873.6),
    ('15338', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '10''', NULL, NULL, 840.0, 1092.0);

-- Batch 38 of 53 (products 741-760)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15339', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '12''', NULL, NULL, 1008.0, 1310.4),
    ('15340', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '14''', NULL, NULL, 1176.0, 1528.8),
    ('15341', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '16''', NULL, NULL, 1344.0, 1747.2),
    ('15342', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '20''', NULL, NULL, 1680.0, 2184.0),
    ('15343', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '22''', NULL, NULL, 1848.0, 2402.4),
    ('15344', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '24''', NULL, NULL, 2016.0, 2620.8),
    ('15345', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '8''', NULL, NULL, 806.4, 1048.32),
    ('15346', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '10''', NULL, NULL, 1008.0, 1310.4),
    ('15347', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '12''', NULL, NULL, 1209.6, 1572.48),
    ('15348', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '14''', NULL, NULL, 1411.2, 1834.56),
    ('15349', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '16''', NULL, NULL, 1612.0, 2095.6),
    ('15350', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '20''', NULL, NULL, 2016.0, 2620.8),
    ('15351', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '22''', NULL, NULL, 2217.6, 2882.88),
    ('15352', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '24''', NULL, NULL, 2419.2, 3144.96),
    ('15353', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '8''', NULL, NULL, 940.8, 1223.04),
    ('15354', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '10''', NULL, NULL, 1176.0, 1528.8),
    ('15355', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '12''', NULL, NULL, 1411.2, 1834.56),
    ('15356', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '14''', NULL, NULL, 1646.4, 2140.32),
    ('15357', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '16''', NULL, NULL, 1881.6, 2446.08),
    ('15358', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '20''', NULL, NULL, 2352.0, 3057.6);

-- Batch 39 of 53 (products 761-780)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15359', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '22''', NULL, NULL, 2587.2, 3363.36),
    ('15360', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '24''', NULL, NULL, 2822.4, 3669.12),
    ('15401', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '8', NULL, NULL, 448.0, 582.4),
    ('15402', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '10', NULL, NULL, 560.0, 728.0),
    ('15403', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '12', NULL, NULL, 672.0, 873.6),
    ('15404', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '14', NULL, NULL, 784.0, 1019.2),
    ('15405', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '16', NULL, NULL, 896.0, 1164.8),
    ('15406', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '20', NULL, NULL, 1120.0, 1456.0),
    ('15407', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '22', NULL, NULL, 1232.0, 1601.6),
    ('15408', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '24', NULL, NULL, 1344.0, 1747.2),
    ('15409', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '26', NULL, NULL, 1456.0, 1892.8),
    ('15410', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '28', NULL, NULL, 1568.0, 2038.4),
    ('15411', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '30', NULL, NULL, 1680.0, 2184.0),
    ('15412', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '32', NULL, NULL, 1792.0, 2329.6),
    ('15413', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '8', NULL, NULL, 512.0, 665.6),
    ('15414', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '10', NULL, NULL, 640.0, 832.0),
    ('15415', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '12', NULL, NULL, 768.0, 998.4),
    ('15416', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '14', NULL, NULL, 896.0, 1164.8),
    ('15417', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '16', NULL, NULL, 1024.0, 1331.2),
    ('15418', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '20', NULL, NULL, 1280.0, 1664.0);

-- Batch 40 of 53 (products 781-800)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15419', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '22', NULL, NULL, 1408.0, 1830.4),
    ('15420', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '24', NULL, NULL, 1536.0, 1996.8),
    ('15421', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '26', NULL, NULL, 1664.0, 2163.2),
    ('15422', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '28', NULL, NULL, 1792.0, 2329.6),
    ('15423', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '30', NULL, NULL, 1920.0, 2496.0),
    ('15424', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '32', NULL, NULL, 2048.0, 2662.4),
    ('15425', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '8', NULL, NULL, 576.0, 748.8),
    ('15426', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '10', NULL, NULL, 720.0, 936.0),
    ('15427', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '12', NULL, NULL, 864.0, 1123.2),
    ('15428', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '14', NULL, NULL, 1008.0, 1310.4),
    ('15429', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '16', NULL, NULL, 1152.0, 1497.6),
    ('15430', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '20', NULL, NULL, 1440.0, 1872.0),
    ('15431', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '22', NULL, NULL, 1584.0, 2059.2),
    ('15432', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '24', NULL, NULL, 1728.0, 2246.4),
    ('15433', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '26', NULL, NULL, 1872.0, 2433.6),
    ('15434', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '28', NULL, NULL, 2016.0, 2620.8),
    ('15435', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '30', NULL, NULL, 2160.0, 2808.0),
    ('15436', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '32', NULL, NULL, 2304.0, 2995.2),
    ('15501', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '4', NULL, NULL, 29.86, 89.58),
    ('15502', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '4', NULL, NULL, 35.35, 106.06);

-- Batch 41 of 53 (products 801-820)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15503', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '4', NULL, NULL, 41.48, 124.44),
    ('15504', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '5', NULL, NULL, 35.35, 106.06),
    ('15505', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '5', NULL, NULL, 45.36, 136.06),
    ('15506', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '5', NULL, NULL, 53.24, 159.73),
    ('15507', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '6', NULL, NULL, 42.75, 128.25),
    ('15508', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '6', NULL, NULL, 53.39, 160.15),
    ('15509', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '6', NULL, NULL, 64.96, 194.88),
    ('15510', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 248.0, 322.4),
    ('15511', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 310.0, 403.0),
    ('15512', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 372.0, 483.6),
    ('15513', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 310.0, 403.0),
    ('15514', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 387.5, 503.75),
    ('15515', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 465.0, 604.5),
    ('15516', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '16', NULL, NULL, 744.0, 967.2),
    ('15551', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '4', NULL, NULL, 132.0, 171.6),
    ('15552', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '4', NULL, NULL, 165.0, 214.5),
    ('15553', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '4', NULL, NULL, 198.0, 257.4),
    ('15554', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '5', NULL, NULL, 165.0, 214.5),
    ('15555', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '5', NULL, NULL, 206.25, 268.13),
    ('15556', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '5', NULL, NULL, 247.5, 321.75);

-- Batch 42 of 53 (products 821-840)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15557', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '6', NULL, NULL, 198.0, 257.4),
    ('15558', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '6', NULL, NULL, 247.5, 321.75),
    ('15559', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '6', NULL, NULL, 297.0, 386.1),
    ('15560', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '7', NULL, NULL, 231.0, 300.3),
    ('15561', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '7', NULL, NULL, 288.75, 375.38),
    ('15562', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '7', NULL, NULL, 346.5, 450.45),
    ('15563', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 264.0, 343.2),
    ('15564', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 330.0, 429.0),
    ('15565', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 396.0, 514.8),
    ('15566', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 330.0, 429.0),
    ('15567', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 412.5, 536.25),
    ('15568', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 495.0, 643.5),
    ('15601', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '4', NULL, NULL, 35.37, 106.1),
    ('15602', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '4', NULL, NULL, 38.04, 114.13),
    ('15603', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '4', NULL, NULL, 42.95, 128.86),
    ('15604', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '5', NULL, NULL, 39.43, 118.28),
    ('15605', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '5', NULL, NULL, 43.66, 130.98),
    ('15606', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '5', NULL, NULL, 46.35, 139.05),
    ('15607', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '6', NULL, NULL, 43.36, 130.08),
    ('15608', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '6', NULL, NULL, 46.6, 139.81);

-- Batch 43 of 53 (products 841-860)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15609', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '6', NULL, NULL, 52.63, 157.88),
    ('15610', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 224.0, 291.2),
    ('15611', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 280.0, 364.0),
    ('15612', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 336.0, 436.8),
    ('15613', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 280.0, 364.0),
    ('15614', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 350.0, 455.0),
    ('15615', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 420.0, 546.0),
    ('15651', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '4', NULL, NULL, 120.0, 156.0),
    ('15652', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '4', NULL, NULL, 150.0, 195.0),
    ('15653', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '4', NULL, NULL, 180.0, 234.0),
    ('15654', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '5', NULL, NULL, 150.0, 195.0),
    ('15655', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '5', NULL, NULL, 187.5, 243.75),
    ('15656', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '5', NULL, NULL, 225.0, 292.5),
    ('15657', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '6', NULL, NULL, 180.0, 234.0),
    ('15658', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '6', NULL, NULL, 225.0, 292.5),
    ('15659', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '6', NULL, NULL, 270.0, 351.0),
    ('15660', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '7', NULL, NULL, 210.0, 273.0),
    ('15661', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '7', NULL, NULL, 262.5, 341.25),
    ('15662', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '7', NULL, NULL, 315.0, 409.5),
    ('15663', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 240.0, 312.0);

-- Batch 44 of 53 (products 861-880)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15664', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 300.0, 390.0),
    ('15665', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 360.0, 468.0),
    ('15666', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 300.0, 390.0),
    ('15667', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 375.0, 487.5),
    ('15668', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 450.0, 585.0),
    ('15701', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 59.72, 179.16),
    ('15702', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 70.71, 212.12),
    ('15703', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 82.96, 248.89),
    ('15704', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 70.71, 212.12),
    ('15705', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 90.71, 272.13),
    ('15706', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 106.48, 319.45),
    ('15707', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '12', NULL, NULL, 85.5, 256.49),
    ('15708', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '12', NULL, NULL, 106.77, 320.3),
    ('15709', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '12', NULL, NULL, 129.92, 389.77),
    ('15710', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '14', NULL, NULL, 434.0, 564.2),
    ('15711', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '14', NULL, NULL, 542.5, 705.25),
    ('15712', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '14', NULL, NULL, 651.0, 846.3),
    ('15713', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '16', NULL, NULL, 496.0, 644.8),
    ('15714', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '16', NULL, NULL, 620.0, 806.0),
    ('15715', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '16', NULL, NULL, 744.0, 967.2);

-- Batch 45 of 53 (products 881-900)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15716', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '20', NULL, NULL, 620.0, 806.0),
    ('15717', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '20', NULL, NULL, 775.0, 1007.5),
    ('15718', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '20', NULL, NULL, 930.0, 1209.0),
    ('15719', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '24', NULL, NULL, 744.0, 967.2),
    ('15720', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '24', NULL, NULL, 930.0, 1209.0),
    ('15721', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '24', NULL, NULL, 1116.0, 1450.8),
    ('15722', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '8', 'Width', '12', NULL, NULL, 744.0, 967.2),
    ('15751', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 264.0, 343.2),
    ('15752', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 330.0, 429.0),
    ('15753', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 396.0, 514.8),
    ('15754', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 330.0, 429.0),
    ('15755', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 412.5, 536.25),
    ('15756', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 495.0, 643.5),
    ('15757', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '12', NULL, NULL, 396.0, 514.8),
    ('15758', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '12', NULL, NULL, 495.0, 643.5),
    ('15759', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '12', NULL, NULL, 594.0, 772.2),
    ('15760', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '14', NULL, NULL, 462.0, 600.6),
    ('15761', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '14', NULL, NULL, 577.5, 750.75),
    ('15762', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '14', NULL, NULL, 693.0, 900.9),
    ('15763', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '16', NULL, NULL, 528.0, 686.4);

-- Batch 46 of 53 (products 901-920)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15764', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '16', NULL, NULL, 660.0, 858.0),
    ('15765', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '16', NULL, NULL, 792.0, 1029.6),
    ('15766', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '20', NULL, NULL, 660.0, 858.0),
    ('15767', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '20', NULL, NULL, 825.0, 1072.5),
    ('15768', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '20', NULL, NULL, 990.0, 1287.0),
    ('15769', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '24', NULL, NULL, 792.0, 1029.6),
    ('15770', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '24', NULL, NULL, 990.0, 1287.0),
    ('15771', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '24', NULL, NULL, 1188.0, 1544.4),
    ('15801', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 70.74, 212.21),
    ('15802', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 76.09, 228.26),
    ('15803', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 85.9, 257.71),
    ('15804', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 78.85, 236.56),
    ('15805', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 87.32, 261.96),
    ('15806', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 92.7, 278.1),
    ('15807', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '12', NULL, NULL, 86.72, 260.16),
    ('15808', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '12', NULL, NULL, 93.2, 279.61),
    ('15809', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '12', NULL, NULL, 105.26, 315.77),
    ('15810', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '14', NULL, NULL, 392.0, 509.6),
    ('15811', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '14', NULL, NULL, 490.0, 637.0),
    ('15812', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '14', NULL, NULL, 588.0, 764.4);

-- Batch 47 of 53 (products 921-940)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15813', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '16', NULL, NULL, 448.0, 582.4),
    ('15814', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '16', NULL, NULL, 560.0, 728.0),
    ('15815', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '16', NULL, NULL, 672.0, 873.6),
    ('15816', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '20', NULL, NULL, 560.0, 728.0),
    ('15817', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '20', NULL, NULL, 700.0, 910.0),
    ('15818', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '20', NULL, NULL, 840.0, 1092.0),
    ('15819', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '24', NULL, NULL, 672.0, 873.6),
    ('15820', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '24', NULL, NULL, 840.0, 1092.0),
    ('15821', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '24', NULL, NULL, 1008.0, 1310.4),
    ('15851', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 240.0, 312.0),
    ('15852', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 300.0, 390.0),
    ('15853', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 360.0, 468.0),
    ('15854', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 300.0, 390.0),
    ('15855', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 375.0, 487.5),
    ('15856', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 450.0, 585.0),
    ('15857', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '12', NULL, NULL, 360.0, 468.0),
    ('15858', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '12', NULL, NULL, 450.0, 585.0),
    ('15859', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '12', NULL, NULL, 540.0, 702.0),
    ('15860', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '14', NULL, NULL, 420.0, 546.0),
    ('15861', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '14', NULL, NULL, 525.0, 682.5);

-- Batch 48 of 53 (products 941-960)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('15862', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '14', NULL, NULL, 630.0, 819.0),
    ('15863', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '16', NULL, NULL, 480.0, 624.0),
    ('15864', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '16', NULL, NULL, 600.0, 780.0),
    ('15865', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '16', NULL, NULL, 720.0, 936.0),
    ('15866', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '20', NULL, NULL, 600.0, 780.0),
    ('15867', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '20', NULL, NULL, 750.0, 975.0),
    ('15868', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '20', NULL, NULL, 900.0, 1170.0),
    ('15869', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '24', NULL, NULL, 720.0, 936.0),
    ('15870', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '24', NULL, NULL, 900.0, 1170.0),
    ('15871', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '24', NULL, NULL, 1080.0, 1404.0),
    ('16001', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '6''W', NULL, NULL, 288.0, 374.4),
    ('16002', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '8''W', NULL, NULL, 384.0, 499.2),
    ('16003', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '10''W', NULL, NULL, 480.0, 624.0),
    ('16004', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '12''W', NULL, NULL, 576.0, 748.8),
    ('16005', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '14''W', NULL, NULL, 672.0, 873.6),
    ('16006', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '16''W', NULL, NULL, 768.0, 998.4),
    ('16007', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '18''W', NULL, NULL, 864.0, 1123.2),
    ('16008', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '20''W', NULL, NULL, 960.0, 1248.0),
    ('16009', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '22''W', NULL, NULL, 1056.0, 1372.8),
    ('16010', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '24''W', NULL, NULL, 1152.0, 1497.6);

-- Batch 49 of 53 (products 961-980)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('16011', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '26''W', NULL, NULL, 1248.0, 1622.4),
    ('16012', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '28''W', NULL, NULL, 1344.0, 1747.2),
    ('16013', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '30''W', NULL, NULL, 1440.0, 1872.0),
    ('16014', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '32''W', NULL, NULL, 1536.0, 1996.8),
    ('16015', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '34''W', NULL, NULL, 1632.0, 2121.6),
    ('16016', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '36''W', NULL, NULL, 1728.0, 2246.4),
    ('16017', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '38''W', NULL, NULL, 1824.0, 2371.2),
    ('16018', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '6''W', NULL, NULL, 360.0, 468.0),
    ('16019', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '8''W', NULL, NULL, 480.0, 624.0),
    ('16020', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '10''W', NULL, NULL, 600.0, 780.0),
    ('16021', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '12''W', NULL, NULL, 720.0, 936.0),
    ('16022', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '14''W', NULL, NULL, 840.0, 1092.0),
    ('16023', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '16''W', NULL, NULL, 960.0, 1248.0),
    ('16024', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '18''W', NULL, NULL, 1080.0, 1404.0),
    ('16025', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '20''W', NULL, NULL, 1200.0, 1560.0),
    ('16026', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '22''W', NULL, NULL, 1320.0, 1716.0),
    ('16027', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '24''W', NULL, NULL, 1440.0, 1872.0),
    ('16028', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '26''W', NULL, NULL, 1560.0, 2028.0),
    ('16029', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '28''W', NULL, NULL, 1680.0, 2184.0),
    ('16030', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '30''W', NULL, NULL, 1800.0, 2340.0);

-- Batch 50 of 53 (products 981-1000)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('16031', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '32''W', NULL, NULL, 1920.0, 2496.0),
    ('16032', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '34''W', NULL, NULL, 2040.0, 2652.0),
    ('16033', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '36''W', NULL, NULL, 2160.0, 2808.0),
    ('16034', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '38''W', NULL, NULL, 2280.0, 2964.0),
    ('16035', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '6''W', NULL, NULL, 432.0, 561.6),
    ('16036', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '8''W', NULL, NULL, 576.0, 748.8),
    ('16037', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '10''W', NULL, NULL, 720.0, 936.0),
    ('16038', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '12''W', NULL, NULL, 864.0, 1123.2),
    ('16039', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '14''W', NULL, NULL, 1008.0, 1310.4),
    ('16040', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '16''W', NULL, NULL, 1152.0, 1497.6),
    ('16041', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '18''W', NULL, NULL, 1296.0, 1684.8),
    ('16042', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '20''W', NULL, NULL, 1440.0, 1872.0),
    ('16043', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '22''W', NULL, NULL, 1584.0, 2059.2),
    ('16044', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '24''W', NULL, NULL, 1728.0, 2246.4),
    ('16045', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '26''W', NULL, NULL, 1872.0, 2433.6),
    ('16046', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '28''W', NULL, NULL, 2016.0, 2620.8),
    ('16047', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '30''W', NULL, NULL, 2160.0, 2808.0),
    ('16048', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '32''W', NULL, NULL, 2304.0, 2995.2),
    ('16049', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '34''W', NULL, NULL, 2448.0, 3182.4),
    ('16050', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '36''W', NULL, NULL, 2592.0, 3369.6);

-- Batch 51 of 53 (products 1001-1020)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('16051', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '38''W', NULL, NULL, 2736.0, 3556.8),
    ('16052', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '6''W', NULL, NULL, 504.0, 655.2),
    ('16053', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '8''W', NULL, NULL, 672.0, 873.6),
    ('16054', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '10''W', NULL, NULL, 840.0, 1092.0),
    ('16055', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '12''W', NULL, NULL, 1008.0, 1310.4),
    ('16056', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '14''W', NULL, NULL, 1176.0, 1528.8),
    ('16057', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '16''W', NULL, NULL, 1344.0, 1747.2),
    ('16058', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '18''W', NULL, NULL, 1512.0, 1965.6),
    ('16059', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '20''W', NULL, NULL, 1680.0, 2184.0),
    ('16060', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '22''W', NULL, NULL, 1848.0, 2402.4),
    ('16061', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '24''W', NULL, NULL, 2016.0, 2620.8),
    ('16062', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '26''W', NULL, NULL, 2184.0, 2839.2),
    ('16063', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '28''W', NULL, NULL, 2352.0, 3057.6),
    ('16064', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '30''W', NULL, NULL, 2520.0, 3276.0),
    ('16065', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '32''W', NULL, NULL, 2688.0, 3494.4),
    ('16066', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '34''W', NULL, NULL, 2856.0, 3712.8),
    ('16067', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '36''W', NULL, NULL, 3024.0, 3931.2),
    ('16068', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '38''W', NULL, NULL, 3192.0, 4149.6),
    ('16069', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '6''W', NULL, NULL, 576.0, 748.8),
    ('16070', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '8''W', NULL, NULL, 768.0, 998.4);

-- Batch 52 of 53 (products 1021-1040)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('16071', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '10''W', NULL, NULL, 960.0, 1248.0),
    ('16072', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '12''W', NULL, NULL, 1152.0, 1497.6),
    ('16073', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '14''W', NULL, NULL, 1344.0, 1747.2),
    ('16074', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '16''W', NULL, NULL, 1536.0, 1996.8),
    ('16075', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '18''W', NULL, NULL, 1728.0, 2246.4),
    ('16076', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '20''W', NULL, NULL, 1920.0, 2496.0),
    ('16077', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '22''W', NULL, NULL, 2112.0, 2745.6),
    ('16078', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '24''W', NULL, NULL, 2304.0, 2995.2),
    ('16079', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '26''W', NULL, NULL, 2496.0, 3244.8),
    ('16080', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '28''W', NULL, NULL, 2688.0, 3494.4),
    ('16081', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '30''W', NULL, NULL, 2880.0, 3744.0),
    ('16082', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '32''W', NULL, NULL, 3072.0, 3993.6),
    ('16083', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '34''W', NULL, NULL, 3264.0, 4243.2),
    ('16084', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '36''W', NULL, NULL, 3456.0, 4492.8),
    ('16085', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '38''W', NULL, NULL, 3648.0, 4742.4),
    ('16086', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '6''W', NULL, NULL, 720.0, 936.0),
    ('16087', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '8''W', NULL, NULL, 960.0, 1248.0),
    ('16088', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '10''W', NULL, NULL, 1200.0, 1560.0),
    ('16089', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '12''W', NULL, NULL, 1440.0, 1872.0),
    ('16090', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '14''W', NULL, NULL, 1680.0, 2184.0);

-- Batch 53 of 53 (products 1041-1051)
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('16091', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '16''W', NULL, NULL, 1920.0, 2496.0),
    ('16092', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '18''W', NULL, NULL, 2160.0, 2808.0),
    ('16093', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '20''W', NULL, NULL, 2400.0, 3120.0),
    ('16094', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '22''W', NULL, NULL, 2640.0, 3432.0),
    ('16095', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '24''W', NULL, NULL, 2880.0, 3744.0),
    ('30001', 'Concrete bags', 'Building material', 'Colour', 'Red', 'Weight', '50 pound', NULL, NULL, 6.05, 8.76),
    ('30004', 'Concrete bags', 'Building material', 'Colour', 'Yellow', 'Weight', '60 pound', NULL, NULL, 4.06, 6.09),
    ('30006', 'Concrete bags', 'Building material', 'Colour', 'Yellow', 'Weight', '80 pound', NULL, NULL, 5.3, 6.63),
    ('40112', 'nuts and bolts', 'Fasteners', 'Size', '5/16" x 1  1/4"', 'Quantity', 'Box', 'Coating', 'Black', 3.99, 13.0),
    ('40122', 'nuts and bolts', 'Fasteners', 'Size', '5/16" x 1  1/4"', 'Quantity', 'Box', 'Coating', ' galvanized', 4.88, 8.0),
    ('40512', 'Wedge Anchor galvanized', 'Fasteners', 'Size', '1/2" x 3 3/4"', 'Quantity', '25', NULL, NULL, 5.01, 23.98);

-- Commit the transaction
COMMIT;

-- Verify the count
SELECT COUNT(*) FROM public.chainlink_products;
