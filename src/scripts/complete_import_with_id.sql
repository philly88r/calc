-- Generated SQL for importing all chainlink products
-- Total products: 1051

-- First, truncate the existing table to avoid duplicates
TRUNCATE TABLE public.chainlink_products;

-- Begin transaction
BEGIN;

-- Batch 1 of 53 (products 1-20)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('efc86779-49e2-4f94-b1b3-77053880e192', '10001', 'Barb arm', 'Chain link accessories', 'Size', '1 5/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 7.15, 10.73),
    ('6ceb38f9-ae0a-4384-aed1-4360803427c2', '10002', 'Barb arm', 'Chain link accessories', 'Size', '1 7/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 7.07, 10.61),
    ('b585680d-eb7a-45c9-a2a0-381850fcf0ed', '10003', 'Barb arm', 'Chain link accessories', 'Size', '2 3/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 7.53, 11.3),
    ('66a763eb-64fe-4f7c-9fb2-c20f43821bd6', '10004', 'Barb arm', 'Chain link accessories', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'Black', NULL, NULL, 14.12, 21.18),
    ('706ff2dd-e4ad-4616-9173-e07b9af52c96', '10005', 'Barb arm', 'Chain link accessories', 'Size', '4" x 1 5/8"', 'Coating', 'Black', NULL, NULL, 22.89, 34.34),
    ('b6b5ceb4-b78b-405a-a6b2-be0c2a41de35', '10006', 'Barb arm', 'Chain link accessories', 'Size', '1 5/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 4.75, 7.13),
    ('fd50d167-b045-41b0-8dcd-f6f98265daa4', '10007', 'Barb arm', 'Chain link accessories', 'Size', '1 7/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 3.78, 6.05),
    ('49a12f20-c0bd-4d00-ae89-3bc8d7622ea7', '10008', 'Barb arm', 'Chain link accessories', 'Size', '2 3/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 4.41, 7.52),
    ('9e36c950-01ec-4170-ad06-7a7ec68658e8', '10009', 'Barb arm', 'Chain link accessories', 'Size', '2 7/8" x 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 9.49, 14.24),
    ('29b2d0f2-8b51-4b47-b966-8b81ddf74ca9', '10010', 'Barb arm', 'Chain link accessories', 'Size', '4" x 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 11.89, 17.84),
    ('df59a1d1-b67d-49f5-8697-12f9c60abe0d', '10011', 'Barbed wire (roll)', 'Chain link accessories', 'Gauge', '12.5 gauge (low tensile)', 'Point', 'Slick line', NULL, NULL, 52.56, 105.0),
    ('63c91c80-49fa-4443-ad08-b43914578614', '10012', 'Barbed wire (roll)', 'Chain link accessories', 'Gauge', '15.5 gauge (high tensile)', 'Point', '2 point gaucho', NULL, NULL, 87.52, 116.4),
    ('3934ed35-7176-476d-8232-df5bd425eb3c', '10013', 'Barbed wire (roll)', 'Chain link accessories', 'Gauge', '12.5 gauge (low tensile)', 'Point', '4 point gaucho', NULL, NULL, 60.84, 76.05),
    ('3efe758f-770b-411e-9742-97e79cbed233', '10014', 'Barbed wire (roll)', 'Chain link accessories', 'Gauge', '15.5 gauge (high tensile)', 'Point', '4 point gaucho', NULL, NULL, 58.8, 77.62),
    ('ad19c75a-fd9f-48f8-8511-cc7502daa4c3', '10015', 'Barbed wire (roll)', 'Chain link accessories', 'Gauge', '12.5 gauge (low tensile)', 'Point', '2 point gaucho', NULL, NULL, 87.52, 113.78),
    ('635460a7-c78a-46ad-9715-61bed62524ac', '10016', 'Brace band', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 0.78, 1.56),
    ('667a7d52-a777-47a7-89b3-924d66f3c723', '10017', 'Brace band', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 0.85, 1.7),
    ('be6aa48e-e69e-4f4e-b3ec-2e5762b72340', '10018', 'Brace band', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 0.93, 1.86),
    ('c3592f4c-2573-4c6d-9292-a5c03513e55d', '10019', 'Brace band', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 0.44, 0.88),
    ('6bdb8ec9-2866-41e9-9645-1c1942abbff2', '10020', 'Brace band', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 0.66, 1.32);

-- Batch 2 of 53 (products 21-40)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('0b0210f4-0444-4a38-b404-dd98b7969e2e', '10021', 'Brace band', 'Chain link accessories', 'Size', '4"', 'Coating', 'Black', NULL, NULL, 1.02, 2.04),
    ('e1844bbe-90dc-46ab-bcb8-c01618177577', '10022', 'Brace band', 'Chain link accessories', 'Size', '4 1/2"', 'Coating', 'Black', NULL, NULL, 2.1, 4.2),
    ('8f522d37-d0a8-401d-8c73-17125cf57dca', '10023', 'Brace band', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', 'Black', NULL, NULL, 3.99, 5.99),
    ('0294e1f8-3458-4f0e-8850-22abc213a309', '10024', 'Brace band', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 0.42, 0.84),
    ('1dff4ce2-1ca5-4526-b141-b2eed0835fe8', '10025', 'Brace band', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.35, 0.7),
    ('977ca05c-58e5-46e1-a32e-deb8f159987e', '10026', 'Brace band', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 0.56, 1.12),
    ('35f2d225-ccd8-4af8-99ef-d63dc1042648', '10027', 'Brace band', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 0.45, 1.38),
    ('5954e824-3b08-434f-9274-97205ba5240f', '10028', 'Brace band', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 0.39, 0.86),
    ('83ac4afe-ae0c-45b1-9de3-5981592a6535', '10029', 'Brace band', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 0.57, 1.6),
    ('38565475-4f1b-43bf-9f6f-285241af4625', '10030', 'Brace band', 'Chain link accessories', 'Size', '4 1/2"', 'Coating', ' galvanized', NULL, NULL, 1.25, 2.5),
    ('ded8e90d-3c09-4979-a870-ef7365e158f7', '10031', 'Brace band', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', ' galvanized', NULL, NULL, 1.4, 3.5),
    ('3a39f427-270b-425d-a10a-dc9a9799d6ae', '10037', 'Cane bolt (Chain link)', 'Chain link accessories', 'Size', '36"', 'Coating', ' galvanized', NULL, NULL, 10.73, 16.0),
    ('ba17da65-022f-4383-a4fe-104efbc82ef6', '10041', 'Cantilever latch', 'Chain link accessories', 'Size', '2 7/8"', NULL, NULL, NULL, NULL, 9.25, 18.5),
    ('261cd739-7652-4e8f-ab99-4b47b4e8c100', '10042', 'Cantilever latch', 'Chain link accessories', 'Size', '4"', NULL, NULL, NULL, NULL, 11.57, 23.14),
    ('6d1fae3d-96e0-4945-ba4c-793d160595f6', '10046', 'Cantilever roller - 4"', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 27.31, 85.0),
    ('1015cd24-aa1b-47c3-b811-73c708cfad75', '10051', 'Collar', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 2.1, 4.2),
    ('9368322b-186f-420d-a0a8-558e56a7c951', '10052', 'Collar', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 1.2, 4.9),
    ('5bd6d4f6-089a-46d0-a60d-215e765c33b6', '10053', 'Collar', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 2.98, 5.96),
    ('aef7cf98-d7cd-4e72-b87a-33710571356f', '10054', 'Collar', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.29, 2.58),
    ('552cb101-29a8-4def-a505-55a08dfc4352', '10055', 'Collar', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.74, 1.15);

-- Batch 3 of 53 (products 41-60)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('3cb209ec-4b8d-4940-8f0b-d23f86e83f20', '10056', 'Collar', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 1.42, 2.84),
    ('2389febd-cfbc-4427-aa64-24e62433ecc8', '10061', 'Dome cap', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 0.42, 0.84),
    ('5663553d-4775-4fda-9e3f-8cb7cdaa2f3a', '10062', 'Dome cap', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 0.58, 1.16),
    ('ac199bb3-7a73-4bc2-932f-1d47373e418e', '10063', 'Dome cap', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 3.11, 6.22),
    ('56b9a84b-ce2c-4f23-9994-d3f3e282c5b7', '10064', 'Dome cap', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 0.93, 1.86),
    ('ba976b6a-780a-45ef-8e67-d22723786e9f', '10065', 'Dome cap', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 1.23, 2.46),
    ('aaec786a-12d0-4c4e-8879-3e829af32b25', '10066', 'Dome cap', 'Chain link accessories', 'Size', '4"', 'Coating', 'Black', NULL, NULL, 1.86, 3.72),
    ('9cbd5273-58cc-42ef-8b29-b76fd1421b00', '10067', 'Dome cap', 'Chain link accessories', 'Size', '4 1/2"', 'Coating', 'Black', NULL, NULL, 5.0, 10.0),
    ('fc7cbd22-cf6b-411a-bbce-05f55a8a63bb', '10068', 'Dome cap', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', 'Black', NULL, NULL, 11.5, 17.25),
    ('55e99a6e-8f86-4111-bfd5-275278d5a6a3', '10069', 'Dome cap', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 0.73, 1.46),
    ('617cbeba-2a4d-46a1-b3cf-daea3db0ac5c', '10070', 'Dome cap', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.4, 0.88),
    ('6e059328-2144-4176-8397-92880edd2a85', '10071', 'Dome cap', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 0.81, 1.62),
    ('624fd923-fd50-4748-b6bf-ed2aadd2a24a', '10072', 'Dome cap', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 0.58, 1.32),
    ('89975b1c-0c98-4f55-8672-2ce51cdea51b', '10073', 'Dome cap', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 0.88, 1.76),
    ('1e4209eb-5e8c-45e4-af62-663828aa8525', '10074', 'Dome cap', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 1.35, 4.16),
    ('6f777bc4-a676-415a-af60-62c0066b6f19', '10075', 'Dome cap', 'Chain link accessories', 'Size', '4 1/2"', 'Coating', ' galvanized', NULL, NULL, 3.99, 7.98),
    ('4883b641-af72-44f3-83c1-841cef15d7d1', '10076', 'Dome cap', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', ' galvanized', NULL, NULL, 4.92, 12.3),
    ('bb51edb6-d39c-476f-b432-2593f1085497', '10086', 'Fence sleeve / Pipe sleeve', 'Chain link accessories', 'Size', '1 3/8" × 6"', 'Coating', 'Black', NULL, NULL, 1.63, 3.26),
    ('7a878ab4-e07b-4210-b537-eb61f61fca0f', '10087', 'Fence sleeve / Pipe sleeve', 'Chain link accessories', 'Size', '1 5/8" × 6"', 'Coating', 'Black', NULL, NULL, 1.62, 3.24),
    ('271c6203-e67b-42e6-bd20-07656d744f28', '10088', 'Fence sleeve / Pipe sleeve', 'Chain link accessories', 'Size', '1 3/8" × 6"', 'Coating', ' galvanized', NULL, NULL, 1.15, 2.3);

-- Batch 4 of 53 (products 61-80)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('ecbd9f5b-503c-4968-8ba1-3b6e4bd5c9b8', '10089', 'Fence sleeve / Pipe sleeve', 'Chain link accessories', 'Size', '1 5/8" × 6"', 'Coating', ' galvanized', NULL, NULL, 1.26, 2.52),
    ('b4cdb1b8-8522-4d77-9eba-aff610b2549b', '10091', 'Fence ties (100 ct)', 'Chain link accessories', 'Size', '8 1/4"', 'Coating', 'Aluminium/Steel coated black', NULL, NULL, 8.0, 16.0),
    ('6929892e-29d5-4b2d-88b7-60408eb6a98a', '10092', 'Fence ties (100 ct)', 'Chain link accessories', 'Size', '6 1/2"', 'Coating', 'Aluminium/Steel coated black', NULL, NULL, 9.0, 18.0),
    ('333aeaea-5331-4901-aeab-070a8a09c9ef', '10093', 'Fence ties (100 ct)', 'Chain link accessories', 'Size', '8 1/4"', 'Coating', 'Aluminum/Steel', NULL, NULL, 10.0, 25.0),
    ('8a051104-b686-4713-9546-50e55e4a6cf6', '10094', 'Fence ties (100 ct)', 'Chain link accessories', 'Size', '6 1/2"', 'Coating', 'Aluminum/Steel', NULL, NULL, 7.0, 16.0),
    ('9b284eb9-6bae-4157-81f8-f6bd6a2c4270', '10096', 'Fork latch', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 1.5, 3.0),
    ('18b4cad2-ed8b-4ec8-a977-4dd8e0ab46c8', '10097', 'Fork latch', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 1.5, 3.0),
    ('74179241-1f41-4c2e-927e-049bb9ac29bd', '10098', 'Fork latch', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 1.42, 2.84),
    ('8ba60805-6695-4237-8417-bf4b4c593c10', '10099', 'Fork latch', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 1.7, 3.4),
    ('be755a70-00c1-485c-8478-1bb9b806cd9f', '10100', 'Fork latch', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 1.6, 3.2),
    ('439a6882-d105-4f8f-a4af-f2d7950fd57e', '10101', 'Fork latch', 'Chain link accessories', 'Size', '4"', 'Coating', 'Black', NULL, NULL, 3.94, 7.88),
    ('e56a2972-32ff-4990-bc93-783290b8c2a5', '10102', 'Fork latch', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.06, 2.12),
    ('676356a8-bcd6-489b-aaef-ce7b0b9f8d39', '10103', 'Fork latch', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 2.88, 4.37),
    ('17e0b856-fde4-4cb6-8826-a25dd4c21ad2', '10104', 'Fork latch', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 1.42, 2.84),
    ('2dfc59d5-fa5c-411d-8285-baad7723f526', '10105', 'Fork latch', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.33, 2.66),
    ('60b10613-1512-4faf-8f32-010bb39ae4fc', '10106', 'Fork latch', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 1.49, 2.98),
    ('49efb7ed-8938-428c-9e63-c4349c222e63', '10107', 'Fork latch', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 2.89, 5.78),
    ('1586b5de-c024-4237-8449-79f31a934abe', '10111', 'Hinge - 180 industrial hinge / industrial offset hinge (pressed steel)', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 14.73, 29.46),
    ('942b9808-c47a-47f9-8771-6a5db357558c', '10112', 'Hinge - 180 industrial hinge / industrial offset hinge (pressed steel)', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 15.18, 30.36),
    ('4786e236-104e-4bec-8de3-8df13835eb2c', '10113', 'Hinge - 180 industrial hinge / industrial offset hinge (pressed steel)', 'Chain link accessories', 'Size', '4"', 'Coating', 'Black', NULL, NULL, 19.68, 39.36);

-- Batch 5 of 53 (products 81-100)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('989e4287-b87f-4e0f-aff2-675cd213dd84', '10114', 'Hinge - 180 industrial hinge / industrial offset hinge (pressed steel)', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 9.24, 18.48),
    ('dfd9d799-a8d9-4a5c-be4e-54dfdcd1c826', '10115', 'Hinge - 180 industrial hinge / industrial offset hinge (pressed steel)', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 10.48, 20.96),
    ('32179bb6-e85a-4130-aeb1-d7caab001164', '10116', 'Hinge - 180 industrial hinge / industrial offset hinge (pressed steel)', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 9.1, 18.2),
    ('7db4f35d-7b8c-4a9a-85c4-ab0a9077f0ad', '10121', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 10.0, 20.0),
    ('64962b12-c85a-4b9e-8750-ec500e7525c6', '10122', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 8.56, 17.36),
    ('e81e5c65-61f8-475d-926b-58abb0eb452e', '10123', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '4"', 'Coating', 'Black', NULL, NULL, 29.94, 59.88),
    ('4b1ce57a-f563-4a4d-a254-c52098de5ea3', '10124', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 7.8, 15.6),
    ('864f4401-a9eb-4c97-8cef-03033ca27c51', '10125', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 7.15, 14.3),
    ('e81070f7-5f6c-4cf5-b64b-801ca017d98e', '10126', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 7.05, 23.01),
    ('3269d36f-dd14-41e1-8c1c-fedbb419c79d', '10127', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', 'Black', NULL, NULL, 0.0, 0.0),
    ('3ac5a073-9f6d-4127-8c8a-e453900e1c8c', '10128', 'Hinge - Bulldog hinge', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', ' galvanized', NULL, NULL, 14.76, 29.52),
    ('e9365006-6a96-4164-a74c-9a29ab2d553d', '10131', 'Hinge - Female gate hinge', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 1.29, 2.58),
    ('fce8ace2-c257-4957-a5fb-9af0e278268a', '10132', 'Hinge - Female gate hinge', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 0.83, 2.91),
    ('aede4d00-f41b-4945-98b6-dafaef4bdb8c', '10133', 'Hinge - Female gate hinge', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 1.79, 3.58),
    ('cf7f96ef-be1d-49a4-8736-69fa7ee68a41', '10134', 'Hinge - Female gate hinge', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.11, 2.22),
    ('9c0ad40c-b2e8-434a-a5ef-0f5466a61cae', '10135', 'Hinge - Female gate hinge', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.96, 1.92),
    ('ee599d13-f500-486f-9e2c-c259cdce7985', '10136', 'Hinge - Female gate hinge', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 1.48, 2.96),
    ('05875d3f-07e6-43e6-ba57-651147f9fc60', '10141', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 2.65, 5.3),
    ('d0b49577-60b3-4872-8f1b-110db60b8225', '10142', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 1.83, 3.66),
    ('fd23f411-a679-41aa-9223-bc93c2e0da2d', '10143', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 3.23, 6.46);

-- Batch 6 of 53 (products 101-120)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('5cca41f7-cc90-4340-8070-f9988e11e7d4', '10144', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 2.5, 5.0),
    ('8479e1a9-25c7-4695-b213-91941a9c2751', '10145', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.73, 3.46),
    ('797a94b3-2732-4063-b11a-8b439279b1fc', '10146', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 2.49, 4.98),
    ('897b1dd2-1040-4630-acd2-7ad191fb0823', '10147', 'Hinge - Male gate hinge', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 3.98, 7.96),
    ('780ef815-af41-456f-816e-1d74439726b2', '10151', 'Hog/pig ring', 'Chain link accessories', 'Gauge', '9 gauge', 'Coating', 'Black', NULL, NULL, 2.82, 5.64),
    ('a9cd5829-6a68-40a5-bed7-0855c5573dec', '10152', 'Hog/pig ring', 'Chain link accessories', 'Gauge', '12 1/2 gauge', 'Coating', 'Black', NULL, NULL, 5.98, 11.96),
    ('b7bf438d-6e29-4fb8-853a-8b131f299fe5', '10153', 'Hog/pig ring', 'Chain link accessories', 'Gauge', '9 gauge', 'Coating', ' galvanized', NULL, NULL, 1.75, 4.6),
    ('29e5da83-e018-4a70-b7ad-ced77773a634', '10154', 'Hog/pig ring', 'Chain link accessories', 'Gauge', '12 1/2 gauge', 'Coating', ' galvanized', NULL, NULL, 1.8, 3.6),
    ('3afa8a56-0c39-4326-9968-312bc7b45456', '10156', 'Industrial drop rod latch', 'Chain link accessories', 'Size', '1 5/8"', NULL, NULL, NULL, NULL, 3.78, 49.13),
    ('b0281822-bfa1-4571-8215-fb19694b1595', '10157', 'Industrial drop rod latch', 'Chain link accessories', 'Size', '1 7/8"', NULL, NULL, NULL, NULL, 3.44, 52.13),
    ('a9dba916-9665-4c40-8e2c-812256de09d9', '10158', 'Industrial guide', 'Chain link accessories', 'Size', '1 5/8"', NULL, NULL, NULL, NULL, 3.24, 9.11),
    ('c877a0d1-958a-4c83-bf48-9696352d777a', '10159', 'Industrial guide', 'Chain link accessories', 'Size', '1 7/8"', NULL, NULL, NULL, NULL, 1.91, 5.25),
    ('79e77692-3602-46a5-a021-97567f8d0a21', '10161', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 5/8" × 1 3/8"', 'Coating', 'Black', NULL, NULL, 0.82, 1.64),
    ('d802f923-9ee4-4176-ba19-7117b1189c22', '10162', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 5/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 1.25, 2.5),
    ('46e6acc0-85cc-4391-a428-6f4d9f452fea', '10163', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 7/8" × 1 3/8"', 'Coating', 'Black', NULL, NULL, 2.18, 4.36),
    ('9b9622fd-d41e-41af-a84c-71fd6dde38b4', '10164', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 7/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 1.6, 2.94),
    ('b9bcd10d-0ac7-4ab4-90d9-53efa34a4045', '10165', 'Loop cap / eye top', 'Chain link accessories', 'Size', '2 3/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 1.48, 2.96),
    ('6c1fae10-448d-4add-8da3-c3278d60ff95', '10166', 'Loop cap / eye top', 'Chain link accessories', 'Size', '2 7/8" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 3.28, 6.56),
    ('46955b99-cbea-4cb3-a229-495a4b464284', '10167', 'Loop cap / eye top', 'Chain link accessories', 'Size', '4" × 1 5/8"', 'Coating', 'Black', NULL, NULL, 4.45, 8.9),
    ('00cc2430-e52b-48ba-91be-86164e7988c5', '10168', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 5/8" × 1 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.21, 2.42);

-- Batch 7 of 53 (products 121-140)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('0c516c54-61e8-4689-bf33-194104a950a1', '10169', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 5/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 1.13, 2.26),
    ('93fe6bdc-1253-46e2-89f3-79d56ed70810', '10170', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 7/8" × 1 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.25, 2.5),
    ('fe1042d4-c49a-44d9-83e2-0079fd0e3499', '10171', 'Loop cap / eye top', 'Chain link accessories', 'Size', '1 7/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.86, 1.72),
    ('cf0e1fe5-06cc-44db-b06f-b3ffdf5834d8', '10172', 'Loop cap / eye top', 'Chain link accessories', 'Size', '2 3/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 1.28, 2.56),
    ('52eee469-e20d-4acd-b480-44f351c90c9a', '10173', 'Loop cap / eye top', 'Chain link accessories', 'Size', '2 7/8" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 2.6, 5.2),
    ('a66dddf0-7636-4073-88ce-4ea3632adb16', '10174', 'Loop cap / eye top', 'Chain link accessories', 'Size', '4" × 1 5/8"', 'Coating', ' galvanized', NULL, NULL, 4.26, 8.52),
    ('00bf3ead-35e8-4365-8402-5a73998d18f2', '10191', 'Rail end', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 0.7, 1.4),
    ('a93757b7-0545-40f5-881e-b79381cf45e8', '10192', 'Rail end', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 0.78, 1.56),
    ('92b227d9-9ddf-4fa6-85d9-50fbe9f81d8f', '10193', 'Rail end', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 1.19, 2.38),
    ('dc9f044b-cabb-4b1d-941b-7fff7f415983', '10194', 'Rail end', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.76, 1.52),
    ('cea0010c-9fe2-45f1-93b0-96eeb1ae8a72', '10201', 'Tension band', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', 'Black', NULL, NULL, 0.86, 1.72),
    ('83937a2c-f106-4902-9c73-d67e87590ea3', '10202', 'Tension band', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', 'Black', NULL, NULL, 0.43, 0.86),
    ('5e8f6bed-fb98-432e-9157-51e04e66ac74', '10203', 'Tension band', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', 'Black', NULL, NULL, 0.8, 1.6),
    ('e4435c84-d59f-4ec3-b34a-0afcc5526f06', '10204', 'Tension band', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', 'Black', NULL, NULL, 0.58, 1.16),
    ('5a1f0a1e-5a82-4cfb-8cb3-48f20de38995', '10205', 'Tension band', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', 'Black', NULL, NULL, 0.65, 1.3),
    ('6d4212d6-a732-4d49-94bb-b827e0785ede', '10206', 'Tension band', 'Chain link accessories', 'Size', '4"', 'Coating', 'Black', NULL, NULL, 0.57, 1.65),
    ('6017709e-58a0-420a-9627-8d793591ed3b', '10207', 'Tension band', 'Chain link accessories', 'Size', '4 1/2"', 'Coating', 'Black', NULL, NULL, 2.0, 4.0),
    ('9db387d6-2f5d-49bd-8f6b-592f91ff4f4b', '10208', 'Tension band', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', 'Black', NULL, NULL, 3.99, 7.98),
    ('265c91cc-8038-43cb-9f2e-ab3826f54aa2', '10209', 'Tension band', 'Chain link accessories', 'Size', '1 3/8"', 'Coating', ' galvanized', NULL, NULL, 0.46, 0.92),
    ('c3388df6-7c8e-41e1-9cb6-cfe77c0342ae', '10210', 'Tension band', 'Chain link accessories', 'Size', '1 5/8"', 'Coating', ' galvanized', NULL, NULL, 0.3, 0.7);

-- Batch 8 of 53 (products 141-160)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('1209e7c1-27eb-4ed4-9815-55bbc0d53b2e', '10211', 'Tension band', 'Chain link accessories', 'Size', '1 7/8"', 'Coating', ' galvanized', NULL, NULL, 0.43, 1.18),
    ('a589ec9b-ab5c-44e1-a473-cc5866232cd8', '10212', 'Tension band', 'Chain link accessories', 'Size', '2 3/8"', 'Coating', ' galvanized', NULL, NULL, 0.3, 1.16),
    ('d14e077f-616c-4fab-b0e5-eb1c0edece14', '10213', 'Tension band', 'Chain link accessories', 'Size', '2 7/8"', 'Coating', ' galvanized', NULL, NULL, 0.57, 1.43),
    ('84788c34-3d27-43ad-9e66-043b4edddfb2', '10214', 'Tension band', 'Chain link accessories', 'Size', '4"', 'Coating', ' galvanized', NULL, NULL, 0.7, 1.4),
    ('18a2dc19-031a-4b58-8e90-030e6bf6c9d6', '10215', 'Tension band', 'Chain link accessories', 'Size', '4 1/2"', 'Coating', ' galvanized', NULL, NULL, 1.75, 3.5),
    ('68ac7708-8c95-4331-83e7-cbdd586223c5', '10216', 'Tension band', 'Chain link accessories', 'Size', '6 5/8"', 'Coating', ' galvanized', NULL, NULL, 1.54, 4.62),
    ('9408aa4f-b88d-4c62-8a2e-24c600905643', '10221', 'Tension bar', 'Chain link accessories', 'Size', '4''', 'Coating', 'Black', NULL, NULL, 2.64, 5.28),
    ('be9683a5-2833-475b-b9a2-4b129afc5942', '10222', 'Tension bar', 'Chain link accessories', 'Size', '5''', 'Coating', 'Black', NULL, NULL, 3.1, 6.2),
    ('be93858b-a878-4cd8-b62b-3d8597098326', '10223', 'Tension bar', 'Chain link accessories', 'Size', '6''', 'Coating', 'Black', NULL, NULL, 5.69, 11.38),
    ('e7771856-35a7-4309-89b3-199d56588f37', '10224', 'Tension bar', 'Chain link accessories', 'Size', '7''', 'Coating', 'Black', NULL, NULL, 7.83, 15.66),
    ('583f141b-21fb-47b6-b228-4c79f89c2252', '10225', 'Tension bar', 'Chain link accessories', 'Size', '8''', 'Coating', 'Black', NULL, NULL, 6.85, 16.9),
    ('359716d4-96fe-46f7-a9b5-3437e03ce8ce', '10227', 'Tension bar', 'Chain link accessories', 'Size', '10''', 'Coating', 'Black', NULL, NULL, 0.0, 0.0),
    ('91e3724b-d3c3-47a1-ab28-39360e3e10dc', '10229', 'Tension bar', 'Chain link accessories', 'Size', '12''', 'Coating', 'Black', NULL, NULL, 0.0, 0.0),
    ('e29618dd-bdde-43fa-98a7-ff7eda754d26', '10231', 'Tension bar', 'Chain link accessories', 'Size', '4''', 'Coating', ' galvanized', NULL, NULL, 2.47, 5.31),
    ('864c186c-a5af-4346-8a2e-347deb5dff80', '10232', 'Tension bar', 'Chain link accessories', 'Size', '5''', 'Coating', ' galvanized', NULL, NULL, 3.09, 7.59),
    ('993b5f78-73fe-4172-8d6a-a0ef5b562726', '10233', 'Tension bar', 'Chain link accessories', 'Size', '6''', 'Coating', ' galvanized', NULL, NULL, 2.7, 7.19),
    ('4c5a86a1-f191-4780-bd9c-5e7eea54ef47', '10234', 'Tension bar', 'Chain link accessories', 'Size', '7''', 'Coating', ' galvanized', NULL, NULL, 4.1, 8.68),
    ('668a298b-0548-4969-944e-056e7f5e2264', '10235', 'Tension bar', 'Chain link accessories', 'Size', '8''', 'Coating', ' galvanized', NULL, NULL, 4.59, 9.18),
    ('884126bd-9cc0-41a6-9ed9-515552c97591', '10237', 'Tension bar', 'Chain link accessories', 'Size', '10''', 'Coating', ' galvanized', NULL, NULL, 4.21, 12.18),
    ('bfccf8ec-3d35-444e-82d1-91c8d46e5644', '10239', 'Tension bar', 'Chain link accessories', 'Size', '12''', 'Coating', ' galvanized', NULL, NULL, 6.58, 13.16);

-- Batch 9 of 53 (products 161-180)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('e9d10616-ddff-415b-8c49-389dfce603d1', '10250', 'V-Track Per foot', 'Gates', NULL, NULL, NULL, NULL, NULL, NULL, 6.5, 8.78),
    ('f72487ad-08ce-4157-aaa1-16731c01205b', '10251', '4" V-Wheel w/ Sealed Bearing', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 31.41, 62.82),
    ('ccb26878-7043-491b-8404-34b44f143585', '10252', '4" Wheel Box V-Groove', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 8.68, 17.36),
    ('e0a6b148-689c-4803-990f-9d3beb6436f9', '10253', 'Gate Clip', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 0.3, 0.6),
    ('d8d43fea-1ebc-4fb1-a9b5-a30c0c5d918d', '10256', 'Tension line (9 gauge)', 'Chain link accessories', 'Coating', 'Black', 'Length', '170'' (10 lbs)', NULL, NULL, 18.58, 37.16),
    ('af0a20c7-4dd3-42dc-a5b6-448bb414b85c', '10257', 'Tension line (9 gauge)', 'Chain link accessories', 'Coating', ' galvanized', 'Length', '170'' (10 lbs)', NULL, NULL, 13.6, 27.2),
    ('b12243a8-fdd5-4198-a33d-33512e3651d3', '10258', 'Tension line (9 gauge)', 'Chain link accessories', 'Coating', 'Black', 'Length', '1700'' (100 lbs)', NULL, NULL, 142.0, 284.0),
    ('e6cf0496-232e-43a5-b774-647786812545', '10259', 'Tension line (9 gauge)', 'Chain link accessories', 'Coating', ' galvanized', 'Length', '1700'' (100 lbs)', NULL, NULL, 0.0, 0.0),
    ('bd85003b-d20b-4a11-a535-b700dca33d64', '10261', 'Truss rod - 3/8" x 12''', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 4.82, 9.64),
    ('a919c877-93a0-486c-95ae-5702f28e10c4', '10262', 'Truss rod holders', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 1.06, 2.35),
    ('b529ba65-bfa7-43e7-b6b8-3df933066c7a', '10263', 'Duckbill latches', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 5.62, 17.5),
    ('7b39e897-f46a-4dd0-b380-b26db237553c', '10264', 'Industrial swing latch', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 28.5, 42.75),
    ('96737352-7589-4f87-b8d9-874626c92309', '10265', 'Flange', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 2.96, 18.95),
    ('44a2613b-c345-40f7-8c15-3c3bcc12db78', '10266', 'Swing gate wheel', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 8.11, 19.95),
    ('8b54530c-d119-49d3-9cb3-6dfd2865d30c', '10267', 'Panic bar sets', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 429.57, 644.36),
    ('843e2b2e-eab1-4b8d-91d4-863c620d0592', '10268', 'Stymielock', 'Chain link accessories', NULL, NULL, NULL, NULL, NULL, NULL, 150.0, 300.0),
    ('f242cdf4-5f4a-4871-babd-3cc6984634ec', '10281', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 3/8" x 1 3/8"', 'Coating', 'Black', 2.18, 4.36),
    ('d478f218-028b-4597-931f-f1e9e1193f97', '10282', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 3/8" x 1 3/8"', 'Coating', 'Black', 1.86, 3.72),
    ('d7a44fb5-ad4e-4af4-b143-b36fe7a3a047', '10283', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 3/8" x 1 3/8"', 'Coating', 'Black', 0.0, 0.0),
    ('fbb08885-9c0f-4c08-b2c7-c9fd4d4ab73a', '10284', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 5/8"  x 1 3/8"', 'Coating', 'Black', 2.52, 5.04);

-- Batch 10 of 53 (products 181-200)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('8448d330-18fa-416a-bfeb-1e75cef36eb1', '10285', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 5/8"  x 1 3/8"', 'Coating', 'Black', 2.38, 4.76),
    ('2118b08d-8eef-43d4-b7d7-31faf6b98202', '10286', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 5/8"  x 1 3/8"', 'Coating', 'Black', 0.0, 0.0),
    ('aa672b26-fa02-418d-82f9-204d811a59af', '10287', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 7/8" x 1 3/8"', 'Coating', 'Black', 3.29, 6.58),
    ('e4a20fd4-68d2-4f06-a6e0-c4881a9a7d71', '10288', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 7/8" x 1 3/8"', 'Coating', 'Black', 2.65, 5.3),
    ('7eb7cef6-c598-4f68-8388-b0f60108461d', '10289', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 7/8" x 1 3/8"', 'Coating', 'Black', 0.0, 0.0),
    ('57bd9bbb-1268-4758-ba91-39eaf4923015', '10290', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 5/8" x 1 5/8"', 'Coating', 'Black', 3.52, 7.04),
    ('75507db1-6f9b-415a-a323-e1c859d56327', '10291', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 5/8" x 1 5/8"', 'Coating', 'Black', 2.61, 5.22),
    ('f4e7dbe9-f370-406b-886d-6aa2ae60473f', '10292', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 5/8" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('15482e9d-4a5a-4dd9-b210-1f43c24fadaf', '10293', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 7/8" x 1 5/8"', 'Coating', 'Black', 3.49, 6.98),
    ('ed06069c-5881-4898-b4c0-ded6293d3ba2', '10294', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 7/8" x 1 5/8"', 'Coating', 'Black', 2.68, 5.36),
    ('3e455075-883f-461d-850f-4937d3933232', '10295', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 7/8" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('ab0575ba-3c27-41d1-a30b-4c5657b69f0f', '10296', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 7/8" x 1 7/8"', 'Coating', 'Black', 4.92, 9.84),
    ('a4039e80-3f71-4db6-a453-902adf95e593', '10297', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 7/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('0ae6403d-5a02-4fda-8dcf-95824d612782', '10298', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 7/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('63582e89-8265-4464-8a63-ec6c0612b38c', '10299', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 3/8" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('7559dc51-dab3-4a18-be69-6638505154f6', '10300', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 3/8" x 1 5/8"', 'Coating', 'Black', 2.99, 5.98),
    ('1da7ffbe-f252-47c7-812d-cdaf2cc4f8cd', '10301', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 3/8" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('42aa16d4-75ff-41dd-b1f4-ee0d4b87157f', '10302', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 3/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('e0a6af3f-19d4-4044-8c4a-45765d306aef', '10303', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 3/8" x 1 7/8"', 'Coating', 'Black', 3.74, 7.48),
    ('506b2787-f0b7-40ce-9519-96ed7c74a89d', '10304', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 3/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0);

-- Batch 11 of 53 (products 201-220)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('4cdda938-a8c9-4f39-8753-8fc790a407fb', '10305', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'Black', 4.58, 9.16),
    ('10d903f6-2e91-4304-b2c0-4f2d6f20591f', '10306', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'Black', 4.04, 8.08),
    ('463cb547-13bb-4627-ac2b-2af285734d20', '10307', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('21b1d981-0dff-41c8-a7c4-6685353aaedb', '10308', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 7/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('5afb48ff-3f74-4aa9-b0d1-c51075251819', '10309', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 7/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('26d5bd1f-046d-497d-9c26-fffcef9351bb', '10310', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 7/8" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('543c09a3-7e10-4c6f-a345-27910d91ba1f', '10311', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '4" x 1 5/8"', 'Coating', 'Black', 5.49, 10.98),
    ('e430d0df-f89b-4b23-90a0-39c338a0624b', '10312', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '4" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('16d2e55d-7f0c-4eb6-8520-1124e1bf400e', '10313', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '4" x 1 5/8"', 'Coating', 'Black', 0.0, 0.0),
    ('8c59125b-c92a-43e6-88a9-af75e11a1039', '10314', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '4" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('9b9ef720-cab1-444e-94e2-82b845f3f883', '10315', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '4" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('0fa98fbf-361f-4911-81ae-d504b4c19dd2', '10316', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '4" x 1 7/8"', 'Coating', 'Black', 0.0, 0.0),
    ('bc25fd9a-51cf-4f23-a529-2767f2a60537', '10317', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 3/8" x 1 3/8"', 'Coating', 'ped galvanized', 1.48, 2.96),
    ('5b7523ab-5a4c-403b-8d48-02d39fb74646', '10318', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 3/8" x 1 3/8"', 'Coating', 'ped galvanized', 1.25, 2.5),
    ('3531aeb9-cf3e-4612-a597-79f828476453', '10319', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 3/8" x 1 3/8"', 'Coating', 'ped galvanized', 1.48, 2.96),
    ('e246bb49-59ae-4031-8cd5-589296957741', '10320', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 5/8"  x 1 3/8"', 'Coating', 'ped galvanized', 1.97, 3.94),
    ('b4d8c681-5b5b-477f-ad60-1fbea3ec6e84', '10321', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 5/8"  x 1 3/8"', 'Coating', 'ped galvanized', 1.41, 2.82),
    ('f4b3bdf4-13a0-487e-accf-62442ea0d779', '10322', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 5/8"  x 1 3/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('b0ed8321-785b-4f06-8e3a-8396b60ebaf7', '10323', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 7/8" x 1 3/8"', 'Coating', 'ped galvanized', 1.71, 3.42),
    ('1b97ec3d-7f4c-4e4f-a46d-7581e4c085e3', '10324', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 7/8" x 1 3/8"', 'Coating', 'ped galvanized', 2.42, 4.84);

-- Batch 12 of 53 (products 221-240)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('30b0277c-7e6c-4bb7-95e1-387535b13e50', '10325', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 7/8" x 1 3/8"', 'Coating', 'ped galvanized', 2.72, 5.44),
    ('b5eb0204-7c5c-469e-99ec-2b8cdcd34269', '10326', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 5/8" x 1 5/8"', 'Coating', 'ped galvanized', 1.7, 3.4),
    ('e5495d54-9129-4798-afc7-b7d1e1c1db2f', '10327', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 5/8" x 1 5/8"', 'Coating', 'ped galvanized', 1.87, 3.74),
    ('3d2d6afc-ce45-4667-b357-07ae57a1e701', '10328', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 5/8" x 1 5/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('aad0ce1a-a221-437e-80cb-489976dcd95e', '10329', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 7/8" x 1 5/8"', 'Coating', 'ped galvanized', 1.75, 3.5),
    ('4bb09cb4-d6fa-4249-bb6f-a1974456ddb1', '10330', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 7/8" x 1 5/8"', 'Coating', 'ped galvanized', 1.92, 3.84),
    ('f7a5bc94-00f6-4729-9bad-5030d70b2ae5', '10331', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 7/8" x 1 5/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('83bee2fc-cb4c-4293-8e83-8fabe38d542d', '10332', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '1 7/8" x 1 7/8"', 'Coating', 'ped galvanized', 4.13, 8.26),
    ('81f3b50f-cf52-4032-bb35-b7e6f34a4349', '10333', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '1 7/8" x 1 7/8"', 'Coating', 'ped galvanized', 1.9, 3.8),
    ('e304728b-b3f4-4dfa-a4e1-96a64b98b572', '10334', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '1 7/8" x 1 7/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('4869ae5d-ee3e-4e45-aba0-1573dcdd1f78', '10335', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 3/8" x 1 5/8"', 'Coating', 'ped galvanized', 1.55, 4.88),
    ('538aa791-a49f-4922-8978-dd8c1b34b0d5', '10336', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 3/8" x 1 5/8"', 'Coating', 'ped galvanized', 2.24, 4.48),
    ('9f80edac-00ab-4251-b571-81a252200b08', '10337', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 3/8" x 1 5/8"', 'Coating', 'ped galvanized', 3.6, 7.2),
    ('e761bfcc-ca82-4bfb-aa37-13255f9a33c9', '10338', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 3/8" x 1 7/8"', 'Coating', 'ped galvanized', 3.79, 7.58),
    ('38c82372-dd75-4040-a81f-1dea4284af79', '10339', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 3/8" x 1 7/8"', 'Coating', 'ped galvanized', 3.14, 6.28),
    ('5edb64cf-97b5-494c-8bbc-4b1d662f9db7', '10340', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 3/8" x 1 7/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('827196ae-8afe-4eb0-8b2e-f094d185b4d2', '10341', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'ped galvanized', 1.76, 6.12),
    ('d7d5d4e8-b601-47a7-8a3a-2640d0814c6d', '10342', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'ped galvanized', 2.4, 4.8),
    ('cad15464-9f3d-488c-a023-2911c2b801be', '10343', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 7/8" x 1 5/8"', 'Coating', 'ped galvanized', 3.88, 7.76),
    ('f9b61f29-ddd9-41fe-9bac-74c6be5fe55d', '10344', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '2 7/8" x 1 7/8"', 'Coating', 'ped galvanized', 3.76, 7.52);

-- Batch 13 of 53 (products 241-260)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('ff0e6859-d236-4a75-9c3f-01dca63fdde8', '10345', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '2 7/8" x 1 7/8"', 'Coating', 'ped galvanized', 2.4, 4.8),
    ('94d4891a-81bb-4c88-bbb4-01cecf203839', '10346', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '2 7/8" x 1 7/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('61feec2e-3665-435f-9b26-b7e7d9edb0cc', '10347', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '4" x 1 5/8"', 'Coating', 'ped galvanized', 3.58, 7.16),
    ('f8893bcc-a6ca-49a4-882f-4fec2b175db6', '10348', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '4" x 1 5/8"', 'Coating', 'ped galvanized', 4.12, 8.24),
    ('3497a126-2664-4f2c-9634-c6d781359292', '10349', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '4" x 1 5/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('efd614b7-89e0-49df-a846-ff21f6f2eba3', '10350', 'Rail clamp', 'Chain link accessories', 'Type', 'Line rail clamp', 'Size', '4" x 1 7/8"', 'Coating', 'ped galvanized', 5.25, 10.5),
    ('4878a20b-af57-40ba-af6d-ef6ddbdd22ca', '10351', 'Rail clamp', 'Chain link accessories', 'Type', 'End rail clamp', 'Size', '4" x 1 7/8"', 'Coating', 'ped galvanized', 4.25, 8.5),
    ('9689680e-b685-42b2-829a-53a3a6f7e0bb', '10352', 'Rail clamp', 'Chain link accessories', 'Type', 'Corner rail clamp', 'Size', '4" x 1 7/8"', 'Coating', 'ped galvanized', 0.0, 0.0),
    ('1a9ec00b-353c-4383-8873-365095cfbd64', '10361', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '9 gauge', 'Dimension', '1 5/8"', NULL, NULL, 20.09, 30.14),
    ('f1babdef-a86e-4fa6-bcd6-c6b84c541a62', '10362', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '11 gauge', 'Dimension', '1 5/8"', NULL, NULL, 14.2, 21.3),
    ('bd5ef7cf-e3d1-4b47-af6d-24b30f3368e1', '10363', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '9 gauge', 'Dimension', '2"', NULL, NULL, 21.45, 32.18),
    ('c46a078e-89e3-482b-9175-ca18b3153c26', '10364', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '11 gauge', 'Dimension', '2"', NULL, NULL, 14.86, 22.29),
    ('96a59eac-e010-4047-8c83-6e280267d57c', '10365', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '9 gauge', 'Dimension', '2 3/8"', NULL, NULL, 23.48, 0.0),
    ('0fa7e77c-e24e-4bc9-b3ce-8d9e85021479', '10366', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '11 gauge', 'Dimension', '2 3/8"', NULL, NULL, 19.54, 29.31),
    ('f880c386-1006-423f-a5bd-ed81251ac3f4', '10367', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '9 gauge', 'Dimension', '3"', NULL, NULL, 26.87, 40.31),
    ('5005ef06-1200-43b6-a1f9-f9a230383056', '10368', 'EZ twist tie 100 pack', 'Chain link accessories', 'Thickness', '9 gauge', 'Dimension', '4"', NULL, NULL, 24.32, 36.48),
    ('e1db7497-c32c-43b5-a766-9439fa68de6b', '10381', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'tan', 'Size', '4', NULL, NULL, 51.0, 84.15),
    ('0013343e-e76f-439c-8d4c-dd4635d36ad2', '10382', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'green', 'Size', '4', NULL, NULL, 33.0, 54.45),
    ('6a0fe12f-62c3-468f-8017-ff5a78f5e165', '10383', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'black', 'Size', '4', NULL, NULL, 33.0, 54.45),
    ('14a24e17-4c03-4d7d-bde0-11165088d5db', '10384', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'tan', 'Size', '5', NULL, NULL, 0.0, 0.0);

-- Batch 14 of 53 (products 261-280)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('e9f48bbc-2716-45c8-b547-1b8c3d7171f6', '10385', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'green', 'Size', '5', NULL, NULL, 43.0, 70.95),
    ('b11000d4-eb08-4ae9-8f54-0246019d649b', '10386', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'black', 'Size', '5', NULL, NULL, 36.0, 59.4),
    ('e412fdf7-3c48-457a-afab-09c20bb575de', '10387', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'tan', 'Size', '6', NULL, NULL, 58.0, 95.7),
    ('e33480a6-44ac-41d5-8615-a5c2d41c3220', '10388', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'green', 'Size', '6', NULL, NULL, 54.0, 89.1),
    ('01e47d86-b0a9-434c-9ef1-acdeef6c37e6', '10389', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'black', 'Size', '6', NULL, NULL, 39.0, 64.35),
    ('7aa16bba-e41a-4f71-8673-546440ac8fb1', '10390', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'tan', 'Size', '7', NULL, NULL, 0.0, 0.0),
    ('f35a8a85-a873-4db9-9b5b-fe577daad48b', '10391', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'green', 'Size', '7', NULL, NULL, 0.0, 0.0),
    ('f0645fa6-58b2-4106-8b42-ef9c983c31c3', '10392', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'black', 'Size', '7', NULL, NULL, 0.0, 0.0),
    ('b796aa90-49e2-4773-8267-4c5bd87109b4', '10393', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'tan', 'Size', '8', NULL, NULL, 0.0, 0.0),
    ('20eb092e-d760-46e3-84d8-2fa95457a207', '10394', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'green', 'Size', '8', NULL, NULL, 61.0, 100.65),
    ('ecef73d6-045a-4b78-8ca5-51759c8ebd61', '10395', 'Privacy screen chain link', 'Chain link accessories', 'Colour', 'black', 'Size', '8', NULL, NULL, 100.66, 140.92),
    ('e8e9dc11-b897-437d-9245-1e4e7644d25e', '10401', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Green', 'Height', '4''', NULL, NULL, 37.0, 61.05),
    ('77b52f13-3991-4e10-bb40-0fc22c2e585a', '10402', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Black', 'Height', '4''', NULL, NULL, 37.0, 61.05),
    ('40d52aab-24db-46ad-8bb8-3088699002cd', '10403', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Tan', 'Height', '4''', NULL, NULL, 37.0, 61.05),
    ('419adb63-f1b9-4a20-bafc-7b3897af8020', '10404', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Green', 'Height', '5''', NULL, NULL, 44.0, 72.6),
    ('39c3a230-71c6-4d84-926a-977043e063e7', '10405', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Black', 'Height', '5''', NULL, NULL, 44.0, 72.6),
    ('e9a9902a-20a2-4b4e-9e60-148014c84183', '10406', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Tan', 'Height', '5''', NULL, NULL, 44.0, 72.6),
    ('6719efb1-9fe6-4442-97c1-0c69ee791798', '10407', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Green', 'Height', '6''', NULL, NULL, 57.0, 94.05),
    ('70dce897-3fe9-4af0-91ae-1caad28a0430', '10408', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Black', 'Height', '6''', NULL, NULL, 57.0, 94.05),
    ('ee251a2a-db9f-44cf-80a1-d8db1a91d8e0', '10409', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Tan', 'Height', '6''', NULL, NULL, 57.0, 94.05);

-- Batch 15 of 53 (products 281-300)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('77d67927-221e-4c70-94d3-9779d21ceae6', '10410', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Green', 'Height', '8''', NULL, NULL, 75.0, 123.75),
    ('5052a20d-cc02-4fc1-841a-d3e8cb541012', '10411', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Black', 'Height', '8''', NULL, NULL, 76.0, 125.4),
    ('4985ad9f-4586-40d4-a9f2-53b046c2e690', '10412', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'Tan', 'Height', '8''', NULL, NULL, 77.0, 127.05),
    ('7705005e-c4a4-4f27-b4c1-75b595f12110', '11001', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '4''', 'Gauge', 'Residential 9 gauge finish', NULL, NULL, 50.5, 96.8),
    ('fcb7b5ac-f1f3-41f5-9119-a7dd7bca7cac', '11002', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '5''', 'Gauge', 'Residential 9 gauge finish', NULL, NULL, 106.0, 153.0),
    ('443821ad-733f-434d-86c8-a9475ac0b915', '11003', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '6''', 'Gauge', 'Residential 9 gauge finish', NULL, NULL, 130.0, 169.01),
    ('a8b1bb5b-a1d7-4939-bff1-2042b3bcad3d', '11004', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '7''', 'Gauge', 'Residential 9 gauge finish', NULL, NULL, 0.0, 0.0),
    ('b64d9b74-ff44-4290-9871-4a44eb66d586', '11005', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '8''', 'Gauge', 'Residential 9 gauge finish', NULL, NULL, 172.0, 258.0),
    ('06961fb7-d348-4921-aeb0-7227df719fd0', '11006', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '4''', 'Gauge', 'Commercial 8 gauge finish', NULL, NULL, 105.0, 160.0),
    ('15280ffd-0e7e-4fe3-ace1-18e89b49cc90', '11007', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '5''', 'Gauge', 'Commercial 8 gauge finish', NULL, NULL, 312.5, 406.25),
    ('5fc75339-77c2-4c1d-bfe3-18ef14f9d5c5', '11008', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '6''', 'Gauge', 'Commercial 8 gauge finish', NULL, NULL, 167.0, 308.95),
    ('f571ab10-ef68-4d38-9da1-5deb7dad051f', '11009', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '7''', 'Gauge', 'Commercial 8 gauge finish', NULL, NULL, 229.04, 309.2),
    ('cd7e5d5a-9c5a-47ed-8917-fb139a77b906', '11010', 'Mesh - Black (50'' roll)', 'Chain link mesh', 'Height', '8''', 'Gauge', 'Commercial 8 gauge finish', NULL, NULL, 160.01, 315.0),
    ('175700a9-bde9-441b-89dc-bcd7fefbd5d2', '11501', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '4'' KK Residential 11.5 gauge', NULL, NULL, NULL, NULL, 89.0, 120.15),
    ('6f67debe-07d0-4405-ba10-96e381864cf6', '11502', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '5'' KK Residential 11.5 gauge', NULL, NULL, NULL, NULL, 57.1, 154.0),
    ('5430a000-8de8-41c3-8f00-b4f70487ebca', '11503', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '6'' KK Residential 11.5 gauge', NULL, NULL, NULL, NULL, 64.06, 180.0),
    ('9c399f62-82d6-4484-92be-bf20a9ff448e', '11504', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '4'' KK Commercial 9 gauge', NULL, NULL, NULL, NULL, 119.5, 163.15),
    ('f415bd82-4151-4509-8659-1b99ff4b3f4e', '11505', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '5'' KK Commercial 9 gauge', NULL, NULL, NULL, NULL, 177.5, 230.75),
    ('be6f156c-e8d6-4a23-a24e-cb644ad9bba0', '11506', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '6'' KT Commercial 9 gauge', NULL, NULL, NULL, NULL, 98.54, 220.0),
    ('a360fd86-b174-42ce-8a5e-ef1732fa6e28', '11507', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '7'' KT Commercial 9 gauge', NULL, NULL, NULL, NULL, 140.3, 273.35);

-- Batch 16 of 53 (products 301-320)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('d9af2523-ca28-475d-bab2-b0ae3458aa04', '11508', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '8'' KT Commercial 9 gauge', NULL, NULL, NULL, NULL, 245.0, 346.99),
    ('381c2ae7-fd06-421c-981b-3533fa361a3c', '11509', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '10'' KT Commercial 9 gauge', NULL, NULL, NULL, NULL, 169.83, 440.0),
    ('5b530689-b9c8-4321-9e73-05cfc0821085', '11510', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '12'' KT Commercial 9 gauge', NULL, NULL, NULL, NULL, 208.58, 513.0),
    ('202b28b1-0fee-4f1f-9116-e951325fe549', '11511', 'Mesh -  galvanized (50'' roll)', 'Chain link mesh', 'Height', '14'' KT Commercial 9 gauge', NULL, NULL, NULL, NULL, 246.86, 918.75),
    ('b8ea9a72-1632-4afa-a94b-776177b5151a', '11759', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'White', 'Height', '4''', NULL, NULL, 42.91, 62.22),
    ('ef36ebea-2f0d-4934-a82b-97c073e7a0c8', '11760', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'White', 'Height', '5''', NULL, NULL, 53.62, 77.75),
    ('5c1014a0-2a9b-45cf-b018-3b8088e7e849', '11761', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'White', 'Height', '6''', NULL, NULL, 0.0, 0.0),
    ('6ee21770-9625-494e-8030-dd12ed7789f5', '11762', 'Privacy slats (wave style) chain link (10'' bag)', 'Chain link accessories', 'Colour', 'White', 'Height', '8''', NULL, NULL, 0.0, 0.0),
    ('2ccf1309-f6cf-4a77-b52a-209c79af0c14', '12001', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 3/8"', 'Length', '1''', NULL, NULL, 1.5, 1.95),
    ('efc86779-49e2-4f94-b1b3-77053880e192', '12002', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '1''', NULL, NULL, 1.92, 2.5),
    ('6dd0824b-b087-451a-bf4d-bbf01a0f192f', '12003', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '1''', NULL, NULL, 2.27, 2.95),
    ('84e757a2-9133-4625-b344-f1e232840bdf', '12004', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 2.61, 3.39),
    ('b760557a-7bc1-4c45-af58-1380b0ffa07a', '12005', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '6''', NULL, NULL, 5.85, 10.81),
    ('dea104fa-002c-4fe3-b372-f0dd089bafb2', '12006', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '6''', NULL, NULL, 6.48, 11.99),
    ('37b5a7ab-0d2d-49f1-b036-cac042c2cfd1', '12007', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 7.58, 14.02),
    ('2ad5798d-62da-4190-924e-57baf6698119', '12008', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '7''', NULL, NULL, 13.43, 17.46),
    ('107b488a-647f-44ee-9541-9247950ce10d', '12009', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '7''', NULL, NULL, 13.93, 18.11),
    ('869da190-f2bc-467f-a1a3-a7013cb07338', '12010', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 8.84, 16.35),
    ('1f323297-5ed6-49cb-92eb-2b4aa000d549', '12011', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '8''', NULL, NULL, 13.44, 17.47),
    ('834e0a4e-64dc-4add-8444-68400bcef3aa', '12012', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '8''', NULL, NULL, 15.92, 20.7);

-- Batch 17 of 53 (products 321-340)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('64947801-9cad-40c4-82a2-0e6e18e331d0', '12013', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 20.48, 26.62),
    ('cbdc3838-3d05-4fae-819b-fcdd3ab382a4', '12014', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 3/8"', 'Length', '21''', NULL, NULL, 22.26, 28.94),
    ('60b75c92-e5d6-456f-aeac-2905cecde2b2', '12015', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '21''', NULL, NULL, 40.19, 52.25),
    ('86d2541d-9495-45b6-b53e-7bc6499f45b8', '12016', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '22''', NULL, NULL, 34.54, 44.91),
    ('c48c6a1f-f4bd-434e-b745-d91b26357112', '12017', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 3/8"', 'Length', '20''', NULL, NULL, 10.73, 19.86),
    ('ce6e841f-c948-4ded-a6f4-90b89cba3636', '12018', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '20''', NULL, NULL, 20.0, 37.0),
    ('4e98ce1d-5167-4151-967e-323e4c3d476f', '12019', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('c0e198cf-3403-4243-a86d-1cb23104e36c', '12020', 'Post - Black 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('bfd7eb12-6784-4484-bc01-f5233a8f83b0', '12201', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '1''', NULL, NULL, 2.26, 2.94),
    ('b05199f2-d6a0-4baf-ab44-96970b5c1dda', '12202', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '1''', NULL, NULL, 2.63, 3.42),
    ('15ca7314-cf00-431c-9a54-76af6a72080a', '12203', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 2.78, 3.61),
    ('6b788059-abfd-484b-a086-8151a67a93bb', '12204', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '6''', NULL, NULL, 13.5, 17.55),
    ('fb04ea4f-25e1-4dd4-bf36-6f20a2262898', '12205', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '6''', NULL, NULL, 8.06, 14.91),
    ('c7bc251b-8a8f-401e-bde1-874de11d38de', '12206', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 16.2, 21.06),
    ('cfa68bad-1cec-4ce8-a918-cfb7935cc5ae', '12207', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '7''', NULL, NULL, 7.99, 14.77),
    ('970692cb-ed9d-49db-806e-b2f55ffe33b2', '12208', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '7''', NULL, NULL, 9.39, 16.9),
    ('733e1930-177d-4e0c-9bb2-d89c0067d48e', '12209', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 19.46, 25.3),
    ('07f6141f-c36a-42b4-894a-310e799daba1', '12210', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '8''', NULL, NULL, 9.12, 16.87),
    ('177eb5c1-1b85-4ec0-9d84-bde773864c91', '12211', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '8''', NULL, NULL, 10.76, 19.91),
    ('f4ba540c-2fb0-4c8a-88f1-ec62b11cc20b', '12212', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 13.24, 24.49);

-- Batch 18 of 53 (products 341-360)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('efaa2193-2541-4579-a1a4-075d8d9d91f6', '12213', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '10'' 6"', NULL, NULL, 0.0, 0.0),
    ('0fb05b79-dcbb-4455-a806-2c901ed52697', '12214', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '10'' 6"', NULL, NULL, 14.71, 27.2),
    ('65ffe18f-2edd-4cee-8c65-ddf79c93bb93', '12215', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '10'' 6"', NULL, NULL, 0.0, 0.0),
    ('a3ece7bf-af82-45be-989c-ff003cfcd3ed', '12216', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '21''', NULL, NULL, 33.81, 43.95),
    ('9e25126d-7da9-4847-bba2-df79daded793', '12217', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '21''', NULL, NULL, 55.23, 71.8),
    ('f82a7c86-4570-4c3e-acaa-6badfdc18f3f', '12218', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '21''', NULL, NULL, 58.38, 75.89),
    ('8b984653-5d80-4d6b-b0fa-6814a8ab5e04', '12219', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '24''', NULL, NULL, 46.8, 60.84),
    ('1845b089-aaf4-4964-9abb-7520630cb32c', '12220', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '24''', NULL, NULL, 57.36, 74.57),
    ('4caacb5c-1683-4eaa-875c-51e3cf04e6dd', '12221', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '24''', NULL, NULL, 68.88, 89.55),
    ('9c425dd8-d4b2-478c-9240-ace430972f42', '12222', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '20''', NULL, NULL, 23.66, 43.78),
    ('8a489b50-6a6e-460e-beb2-d5a66ba0e2e4', '12223', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('a08c72b8-9e36-41ea-9a31-41a1175d5364', '12224', 'Post - Black Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('e04310d4-827f-472a-ad50-c8dc294cbab4', '12401', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '1''', NULL, NULL, 3.48, 4.52),
    ('17891835-48dc-487a-831b-2faa6b0c746f', '12402', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '1''', NULL, NULL, 4.06, 5.28),
    ('3a7b24d0-4e41-4e5b-af65-d914adf32b4a', '12403', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 4.64, 6.03),
    ('ba7141cc-9943-479a-95ba-6ceb4589922e', '12404', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '1''', NULL, NULL, 7.19, 9.35),
    ('c876456c-756f-493d-86ba-e59e48bd4414', '12405', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '1''', NULL, NULL, 14.93, 19.41),
    ('23f71230-3120-4f95-93be-9c2c511edc48', '12406', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '6''', NULL, NULL, 30.0, 51.87),
    ('381c810f-1774-4d55-952b-3e678eeacf25', '12407', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '6''', NULL, NULL, 24.36, 31.67),
    ('276d7c87-b14c-4925-ad67-51ee6d080530', '12408', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 27.3, 35.49);

-- Batch 19 of 53 (products 361-380)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('336a8a37-b5ea-4bc5-ba11-c3ad1b1cf947', '12409', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '6''', NULL, NULL, 43.14, 56.08),
    ('c3ccdca2-9a02-4123-8d35-1c41a0b6dfff', '12410', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '6''', NULL, NULL, 89.58, 116.45),
    ('358e43d5-2d6a-4070-8f2b-b8edcf92a453', '12411', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '7''', NULL, NULL, 24.29, 31.58),
    ('3b756eb1-3280-43f0-b4e7-2981254393e4', '12412', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '7''', NULL, NULL, 28.42, 36.95),
    ('017de5f8-7ff7-48d1-bb81-c18f6d36bed7', '12413', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 31.85, 41.41),
    ('d57e5ddb-4c96-44bd-b7a6-ebbe4c4485a1', '12414', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '7''', NULL, NULL, 50.33, 65.43),
    ('0508e0ba-0ea0-494d-9a6e-9ed1b9ca3946', '12415', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '7''', NULL, NULL, 104.51, 135.86),
    ('4ce50e3f-4267-4f9a-8e11-e2cd296d0adf', '12416', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '8''', NULL, NULL, 27.76, 36.09),
    ('a402c2ad-a6d0-4f4c-a119-ad99ff9493c6', '12417', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '8''', NULL, NULL, 20.19, 30.51),
    ('f4a645f8-9897-4e2f-9e1a-099cfa1856ce', '12418', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 19.71, 39.41),
    ('1fd52351-233d-4bee-a38a-099a2cba80a0', '12419', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '8''', NULL, NULL, 33.46, 60.33),
    ('cefbb7df-9a3a-446d-829c-2007d5984e33', '12420', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '8''', NULL, NULL, 46.56, 93.13),
    ('a50f6b22-0557-40b6-9539-bfba593efaa3', '12421', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('e59d15ce-214e-45a2-a2b7-160fd6882eaa', '12422', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('f94962b7-9e05-4e08-a0f1-f515164d1eaa', '12423', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('de327992-c711-4882-a238-b4773d8217ae', '12424', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('1d38b1af-0461-4b5f-ac19-5a183379b8c4', '12425', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('c98e897c-38b8-4adc-8e1d-a483eb4ae10c', '12426', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '10'' 6"', NULL, NULL, 34.7, 45.11),
    ('53b5e5cc-53bb-45b3-a3dc-c57e22f40060', '12427', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '10'' 6"', NULL, NULL, 27.43, 39.77),
    ('ff90e9d8-e02d-4a8c-8cad-09338e3d84ce', '12428', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '10'' 6"', NULL, NULL, 42.08, 55.55);

-- Batch 20 of 53 (products 381-400)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('e0d8e0a8-d973-4909-9ab1-50ae9ae81136', '12429', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '10'' 6"', NULL, NULL, 57.64, 89.49),
    ('7e8261b7-5de8-4df4-9724-93f2b116536c', '12430', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '10'' 6"', NULL, NULL, 156.77, 203.8),
    ('62166031-7b68-4eff-9ac8-4015f8993f89', '12431', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '12''', NULL, NULL, 0.0, 0.0),
    ('ee903d08-e36a-4a83-91b6-5b03eec12649', '12432', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '12''', NULL, NULL, 0.0, 0.0),
    ('1f63a61b-b206-42f9-8de2-34408fc418ef', '12433', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '12''', NULL, NULL, 35.62, 72.44),
    ('8b59cfd2-f9dd-4467-a909-0141b4be4ff7', '12434', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '12''', NULL, NULL, 50.19, 90.5),
    ('9724108a-fc70-493e-b3fc-d5cc6712bf9f', '12435', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '12''', NULL, NULL, 69.85, 139.69),
    ('91342b3c-ae9d-4564-a321-1c15beff0ce3', '12436', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '21''', NULL, NULL, 42.63, 57.55),
    ('bb755688-88b3-4f26-9701-b59359d209a0', '12437', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '21''', NULL, NULL, 85.26, 110.84),
    ('0142c48a-0ed9-419c-b14c-50f66fcb60b3', '12438', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '21''', NULL, NULL, 95.55, 124.22),
    ('0df54f34-c12e-4487-b355-896eca0d943e', '12439', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '21''', NULL, NULL, 150.99, 196.29),
    ('5abd7a78-f7bf-4eaa-a9cc-646e0005512e', '12440', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '21''', NULL, NULL, 313.53, 407.59),
    ('885ca4b6-a3cf-471e-8f83-d5a7df48d2bb', '12441', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '24''', NULL, NULL, 83.52, 108.58),
    ('d147d055-46ee-4661-ae41-206ee23cb5c8', '12442', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '24''', NULL, NULL, 60.48, 126.67),
    ('57c27880-749b-4fbe-b7a8-91a9049b865d', '12443', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '24''', NULL, NULL, 95.04, 144.87),
    ('46d8ce57-8a63-415a-b64d-6b6400139bb8', '12444', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '24''', NULL, NULL, 123.6, 203.94),
    ('fd07589e-594f-4d6b-b766-f2722b5c1356', '12445', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '24''', NULL, NULL, 284.4, 398.16),
    ('d77cd4c1-bec8-465e-9448-25dae39ebf25', '12446', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '20''', NULL, NULL, 27.04, 54.09),
    ('c3a2b18e-3536-40d6-8b26-788dce80b27a', '12447', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('9a6e3733-e402-4c04-b785-cee12ab28972', '12448', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '20''', NULL, NULL, 48.59, 97.19);

-- Batch 21 of 53 (products 401-420)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('5e963463-f87f-402b-99c4-8b25bcbce2df', '12449', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('9d491885-cab5-4645-9fa2-827c0d39891c', '12450', 'Post - Black Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('16000670-b2fd-42bd-9a5a-6e15e264c680', '13001', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 3/8"', 'Length', '1''', NULL, NULL, 1.0, 1.3),
    ('68940c1c-327d-4214-9369-c43b17f85e69', '13002', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '1''', NULL, NULL, 1.5, 1.95),
    ('f6d596ff-853e-4ef7-a7d0-c1e6844b81b6', '13003', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '1''', NULL, NULL, 1.74, 2.26),
    ('1e0958f9-4abc-4166-8495-bf064ef59928', '13004', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 1.94, 2.52),
    ('7ef6d442-aa10-440a-904d-0ae47236a91f', '13005', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '6''', NULL, NULL, 5.11, 9.49),
    ('33a58a9d-e1cb-4d01-8034-16f373eb368d', '13006', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '6''', NULL, NULL, 5.99, 10.49),
    ('7f6350f4-a5ef-4bb0-89e9-053f91922620', '13007', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 7.1, 13.13),
    ('306e7799-f510-49d6-b9c6-5a68c6cb145e', '13008', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '7''', NULL, NULL, 10.5, 13.65),
    ('c4f18cf1-efc4-4acf-a660-9fab68534354', '13009', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '7''', NULL, NULL, 12.25, 15.93),
    ('7a964f4c-8038-418f-98fd-16308ad337d1', '13010', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 8.28, 13.65),
    ('aff1100d-0a61-45aa-8f60-71af73a20d25', '13011', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '8''', NULL, NULL, 7.9, 10.27),
    ('765cfdce-a49c-40f8-ba61-e9cdcdf5d530', '13012', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '8''', NULL, NULL, 11.6, 15.08),
    ('4d46cb23-b0d7-48e2-b6c0-939e45a27071', '13013', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 15.52, 20.18),
    ('01acd17e-a25f-4cbd-ac07-fb18822b2803', '13014', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 3/8"', 'Length', '21''', NULL, NULL, 19.74, 25.66),
    ('278bf6fc-5e85-451c-92db-6ec28f341ccc', '13015', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '21''', NULL, NULL, 29.92, 38.9),
    ('60270ea5-8751-4327-9592-53b891053912', '13016', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '22''', NULL, NULL, 23.32, 32.65),
    ('308ed93f-c537-4f68-b9fb-f86352fe9808', '13017', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 3/8"', 'Length', '20''', NULL, NULL, 11.66, 21.57),
    ('465638ce-26c3-4d16-9c87-e1fec11db341', '13018', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '20''', NULL, NULL, 15.76, 29.16);

-- Batch 22 of 53 (products 421-440)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('2df0dcdb-2888-4eba-8c73-45a374777eed', '13019', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('7c7ba31e-a012-4fa4-af29-52053a1b81d3', '13020', 'Post -  galvanized 0.065', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('f1af77a0-5a52-4a6c-9659-0e72c8800b10', '13201', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '1''', NULL, NULL, 1.91, 2.48),
    ('1f3d0f10-81e4-442a-9b0e-b2d1253d7e48', '13202', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '1''', NULL, NULL, 1.97, 2.56),
    ('aee2c17f-364c-4a38-9e00-043f7edc72d5', '13203', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 2.61, 3.39),
    ('34e95059-30ec-4b41-8389-ecf9e0640403', '13204', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '6''', NULL, NULL, 10.56, 13.73),
    ('f86c1431-6f82-42ad-8738-7468e89ebefc', '13205', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '6''', NULL, NULL, 11.82, 15.37),
    ('86bdfa4b-d4da-4ba5-9f46-f47de367d67a', '13206', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 15.65, 20.35),
    ('70b8a0e0-27e6-4a0e-9183-662c447766a8', '13207', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '7''', NULL, NULL, 7.14, 13.21),
    ('48b01715-33eb-4aea-b61c-6287e7cd759b', '13208', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '7''', NULL, NULL, 7.71, 14.26),
    ('e9c2b261-01ba-44ed-aa0a-6215e49d07ee', '13209', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 18.26, 23.74),
    ('170eb562-e667-498f-82eb-ec06fe2621dc', '13210', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '8''', NULL, NULL, 8.01, 14.82),
    ('6a95f723-a00a-4908-bb4b-3c9d0a2519f4', '13211', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '8''', NULL, NULL, 8.65, 16.01),
    ('b8022b49-b6cd-4088-ac7e-34e78384833a', '13212', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 14.41, 23.06),
    ('ede9518e-48ff-4827-9bce-632266e976cd', '13213', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '10''6"', NULL, NULL, 18.48, 24.02),
    ('9e43c102-4855-4978-963f-48e1bc01ed3e', '13214', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '10''6"', NULL, NULL, 11.5, 21.28),
    ('21772128-ee65-461b-9435-349a6159c9f6', '13215', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '10''6"', NULL, NULL, 18.31, 25.63),
    ('03dab3ea-14bf-4448-a889-8f270e035428', '13216', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '21''', NULL, NULL, 25.83, 45.79),
    ('501c4f98-45a8-49ca-8fa9-9cc1f510bb2f', '13217', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '21''', NULL, NULL, 38.43, 49.96),
    ('1ab8269a-6e0c-44db-9944-3b8da28eef7e', '13218', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '21''', NULL, NULL, 48.51, 63.06);

-- Batch 23 of 53 (products 441-460)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('c42d26a3-0dfd-4241-a909-acb47970c12b', '13219', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '24''', NULL, NULL, 45.84, 59.59),
    ('5b383f3a-5a01-4b90-90ba-960b46a9152e', '13220', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '24''', NULL, NULL, 47.37, 61.58),
    ('d9be7ed6-9f57-491c-91f2-1d327c562a48', '13221', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '24''', NULL, NULL, 52.02, 67.63),
    ('d1ca2b12-5817-47d9-9be6-af18a499172a', '13222', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '20''', NULL, NULL, 20.14, 33.23),
    ('52424552-5af5-4ed8-b3d6-fa0302ec422e', '13223', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('50b7311d-8c4f-4369-8265-49f567acd68d', '13224', 'Post -  galvanized Sch 20', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('47e8e790-4cb3-4bed-9eb2-6e531ab67221', '13401', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '1''', NULL, NULL, 1.74, 2.26),
    ('cf7d4d11-1b3b-41b0-ac07-f0db8dcf29ef', '13402', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '6''', NULL, NULL, 10.44, 13.57),
    ('cf4e0024-090e-4ab9-8c27-ecfad4b1b00e', '13403', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '7''', NULL, NULL, 12.18, 15.83),
    ('9f98d1e5-7cfd-4acf-bb29-a0573152522a', '13404', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '8''', NULL, NULL, 13.92, 18.1),
    ('52690a5d-5433-4f3b-a289-695b2d923ba8', '13405', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '10'' 6"', NULL, NULL, 18.27, 23.75),
    ('534f27b4-9f1e-43a6-b32a-d6daa8388afc', '13406', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '21''', NULL, NULL, 43.68, 56.78),
    ('518028cd-4ca0-45ca-b44a-f2501c93e7d2', '13407', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '24''', NULL, NULL, 41.76, 54.29),
    ('d95d955f-1063-4611-82ce-1c22d515f1ef', '13408', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '12''', NULL, NULL, 20.88, 27.14),
    ('deb3f0fd-7df4-4d44-89e8-a5c17c46c2ab', '13409', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '9''', NULL, NULL, 15.66, 20.36),
    ('6100e876-e1b8-4629-86ce-d2586753cafd', '13410', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 5/8"', 'Length', '20''', NULL, NULL, 26.08, 43.33),
    ('0b526d19-062c-458e-97af-2376e683b31f', '13411', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '1''', NULL, NULL, 2.52, 5.04),
    ('827d1109-984d-4b59-af0b-8b4da0d5e40b', '13412', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '6''', NULL, NULL, 10.62, 19.66),
    ('30732b53-b872-4d64-bf7d-db8092217de7', '13413', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '7''', NULL, NULL, 17.64, 22.93),
    ('96c66e6f-276a-47f2-8275-6baf196ee9c6', '13414', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '8''', NULL, NULL, 13.17, 24.54);

-- Batch 24 of 53 (products 461-480)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('19459617-3bf2-460d-8efc-622af3a8a8ae', '13415', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '10'' 6"', NULL, NULL, 18.09, 31.66),
    ('4f2de0c1-e4a9-4b7c-a99e-cc8f99413113', '13416', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '21''', NULL, NULL, 52.92, 68.8),
    ('670ad58d-8db1-4017-bb0f-aecfeb4607ba', '13417', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '24''', NULL, NULL, 60.48, 78.62),
    ('856c71e5-d65e-4aef-a0d8-1da581175025', '13418', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '12''', NULL, NULL, 30.24, 39.31),
    ('4e8dcebb-0672-4582-a415-2e30045e1d5d', '13419', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '9''', NULL, NULL, 17.66, 22.95),
    ('30f78a39-4c5b-4750-8949-3421150a346a', '13420', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '1 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('03361d4e-890f-469f-aa94-021e36e8f1c4', '13421', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 0.0, 0.0),
    ('bbbef84a-cc9c-4083-a8f7-a261e665698f', '13422', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 14.5, 24.76),
    ('362a6af9-9b1c-47fd-8ed7-e83169a084ca', '13423', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 15.61, 28.88),
    ('1ff8efc9-18f6-46de-ad61-5c5022569571', '13424', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 23.0, 34.5),
    ('d8297dd4-34ea-4cc3-a55e-207e0df2ff92', '13425', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '10'' 6"', NULL, NULL, 32.07, 49.88),
    ('472b7747-c7bb-4801-ab35-4dfa4c2bb936', '13426', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '21''', NULL, NULL, 64.05, 86.47),
    ('22910401-f628-49ec-aa4f-81021087d9cc', '13427', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '24''', NULL, NULL, 80.16, 108.22),
    ('d95b1448-ee43-4e78-8df0-06e32d5fe2c7', '13428', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '12''', NULL, NULL, 39.42, 55.19),
    ('d7f68d0d-3fde-499e-bc9d-c6cf891d03e1', '13429', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '9''', NULL, NULL, 27.13, 44.76),
    ('6c3968c0-c10d-4ca9-8013-621b110dcfd3', '13430', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '20''', NULL, NULL, 42.86, 79.29),
    ('115a5efb-cefd-4ede-a6c2-b74e1a0221ce', '13431', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '14''', NULL, NULL, 31.01, 49.38),
    ('cffd3931-387f-42c9-a0e1-c002f83c49e0', '13432', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '16''', NULL, NULL, 35.37, 56.28),
    ('e4d21616-141a-474e-a8a0-054b1d118a06', '13433', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '1''', NULL, NULL, 0.0, 0.0),
    ('76a37be0-bad1-45d4-9004-e8f2e0ae49ae', '13434', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '6''', NULL, NULL, 22.47, 31.5);

-- Batch 25 of 53 (products 481-500)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('c23fad59-de6b-4ae1-899b-4bf19ef12a37', '13435', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '7''', NULL, NULL, 0.0, 0.0),
    ('a79ddae1-e2a9-4a3a-8755-e9c672b4fd98', '13436', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '8''', NULL, NULL, 0.0, 0.0),
    ('58897019-b329-4dba-915f-a128cdd49122', '13437', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '10'' 6"', NULL, NULL, 37.48, 69.33),
    ('6314637d-b020-4ae1-9925-8fe30be1670c', '13438', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '21''', NULL, NULL, 0.0, 0.0),
    ('b5083e43-deb3-4d17-a410-47b7b1875872', '13439', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '24''', NULL, NULL, 0.0, 0.0),
    ('c36d6730-f753-46c7-8719-a2c1704e9d36', '13440', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '12''', NULL, NULL, 47.88, 64.64),
    ('84de67da-9a13-4ef5-9e19-ba9779006333', '13441', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '9''', NULL, NULL, 30.68, 56.76),
    ('da463610-bf39-429e-b4ac-adfe38e85f7c', '13442', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('b5e5cc41-1629-40a1-9e95-cc2e52003dad', '13443', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '14''', NULL, NULL, 48.83, 73.5),
    ('7a1d1b1b-963f-476c-a52c-5ab0558c8d32', '13444', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '16''', NULL, NULL, 56.03, 84.0),
    ('f539209e-000d-40eb-9969-c3cb5a68bc37', '13445', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '18''', NULL, NULL, 64.87, 94.32),
    ('6c3152f2-337e-4b42-af09-97d3fceb2311', '13446', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '1''', NULL, NULL, 0.0, 0.0),
    ('41da354b-4530-4eac-b3a2-ba9716485864', '13447', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '6''', NULL, NULL, 37.81, 45.0),
    ('bcc628bf-a61d-4a72-9cae-a435d477880b', '13448', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '7''', NULL, NULL, 0.0, 0.0),
    ('9f43f41d-7312-4896-abea-a6382f836cd1', '13449', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '8''', NULL, NULL, 0.0, 0.0),
    ('3593f72f-4be6-456b-ad9e-215b9f9cef2b', '13450', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '10'' 6"', NULL, NULL, 66.87, 123.7),
    ('8adf3622-6254-4636-97b7-e37d63f99f14', '13451', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '21''', NULL, NULL, 0.0, 0.0),
    ('c2657867-3656-4d6e-98a0-0a3529656098', '13452', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '24''', NULL, NULL, 0.0, 0.0),
    ('5da30e4a-2fb6-41e9-9c0d-42d35dc229a5', '13453', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '12''', NULL, NULL, 67.72, 88.04),
    ('2701a91a-e678-44ec-917b-67b7af431442', '13454', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '9''', NULL, NULL, 54.37, 67.5);

-- Batch 26 of 53 (products 501-520)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('a4380ab7-7084-42c1-b295-791d2e17602e', '13455', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '20''', NULL, NULL, 0.0, 0.0),
    ('e184b116-ee5c-49d9-afdf-5e543d6713e8', '13456', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '11''', NULL, NULL, 66.4, 81.59),
    ('680f6db0-5fd6-4270-96bb-5d74c857f2e2', '13457', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '14''', NULL, NULL, 82.96, 103.96),
    ('f2ef8d19-c5a2-448a-a6e6-4369f60695d1', '13458', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '16''', NULL, NULL, 100.81, 118.81),
    ('24258cbf-6f05-4c9c-9a4e-a7edd7eee67e', '13459', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '6 5/8"', 'Length', '24''', NULL, NULL, 422.64, 570.56),
    ('72301efa-7bad-47d1-b104-3a68ae5bfd58', '13460', 'Post - galvanized (Industrial) Sch 40', 'Posts/Pipes', 'Size', '6 5/8"', 'Length', '12''', NULL, NULL, 211.32, 285.28),
    ('674caafb-f7b4-4ba5-a9d9-105f525ef7a2', '13601', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '1''', NULL, NULL, 4.55, 5.92),
    ('ef4241a2-27cf-4318-a64f-bc0ea9581a01', '13602', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '6''', NULL, NULL, 27.3, 35.49),
    ('5b57c424-a429-4fe4-8a3b-12c5c88e9d25', '13603', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '7''', NULL, NULL, 31.85, 41.41),
    ('e2438b4b-2b52-4b77-9a1c-643c147d184a', '13604', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '8''', NULL, NULL, 22.8, 31.92),
    ('6845d924-7661-4f18-a287-0dcd071b22ea', '13605', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('69e8ac44-d400-4507-a8b3-7873445c585f', '13606', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '10'' 6"', NULL, NULL, 29.93, 41.9),
    ('d0dbef9b-bed5-4f2d-89d0-eba34eedfc25', '13607', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '12''', NULL, NULL, 34.2, 44.46),
    ('cdaec941-2d30-40f8-943a-256bcc446875', '13608', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '21''', NULL, NULL, 65.52, 85.18),
    ('8c9d53f2-e893-4372-b7d5-ad2226d552a7', '13609', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 3/8"', 'Length', '24''', NULL, NULL, 80.64, 104.83),
    ('88ca5524-9084-426a-a324-3c18f528cc3f', '13610', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '1''', NULL, NULL, 6.0, 7.8),
    ('3e969b82-e4ef-4c7f-bd03-27cd0b2b791d', '13611', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '6''', NULL, NULL, 31.5, 40.95),
    ('813a6f17-fd3b-4239-b775-f1ea361648c1', '13612', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '7''', NULL, NULL, 36.75, 47.78),
    ('a61a4972-d22e-43cf-a950-37de6ddd1791', '13613', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '8''', NULL, NULL, 40.0, 52.0),
    ('e26d4cf8-5a3c-4c83-95a8-14744ef85f1f', '13614', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '9''', NULL, NULL, 0.0, 0.0);

-- Batch 27 of 53 (products 521-540)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('1094a80d-f85a-4c55-a942-fdfccdd4509b', '13615', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '10'' 6"', NULL, NULL, 49.88, 69.83),
    ('c9a81072-711d-4ece-97cf-82459d7296d2', '13616', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '12''', NULL, NULL, 60.0, 78.0),
    ('966d38c3-c1c5-4606-9fdd-183d6d499539', '13617', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '21''', NULL, NULL, 110.25, 143.33),
    ('355db707-2ee1-499e-8d24-65799d04b12c', '13618', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '2 7/8"', 'Length', '24''', NULL, NULL, 138.96, 180.65),
    ('80f6eadd-9b65-4e5a-bbc0-38ad16dfee49', '13619', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '1''', NULL, NULL, 11.1, 14.43),
    ('15a245e3-fc77-48bd-8f1d-75af2ce56fda', '13620', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '6''', NULL, NULL, 63.12, 82.06),
    ('b8929bb7-323c-4c5d-a3cb-d5f99f4fd17f', '13621', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '7''', NULL, NULL, 73.64, 95.73),
    ('7c2f7e4b-c30c-4589-8801-1539cd3f87ab', '13622', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '8''', NULL, NULL, 84.16, 109.41),
    ('d5085279-8b2e-4127-9a0a-e2a93e18046e', '13623', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '9''', NULL, NULL, 0.0, 0.0),
    ('c413dbf2-ab16-4ab0-90eb-5672e1d149a1', '13624', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '10'' 6"', NULL, NULL, 63.0, 88.2),
    ('3e7dfcf5-305a-4533-af31-746a17c25672', '13625', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '12''', NULL, NULL, 72.0, 93.6),
    ('ef38923e-8b31-4eac-aa55-cfdce9ccdce6', '13626', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '21''', NULL, NULL, 220.92, 287.2),
    ('2dea4899-f63e-4ae5-a6e3-50bc4dcef448', '13627', 'Post - galvanized (Commercial) Sch 40', 'Posts/Pipes', 'Size', '4"', 'Length', '24''', NULL, NULL, 193.44, 251.49),
    ('18ffdba6-6354-4086-8899-8b0935fd7978', '15001', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '4', NULL, NULL, 189.0, 245.7),
    ('245b6741-e67d-4052-ac31-5fe0724796e2', '15002', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '4', NULL, NULL, 216.0, 280.8),
    ('39a8828d-e024-43cb-9662-675a286f8e8f', '15003', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '4', NULL, NULL, 243.0, 315.9),
    ('13ac82ba-e098-4b32-ae8f-e2a194096f23', '15004', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '5', NULL, NULL, 236.25, 307.13),
    ('892614a0-ecb3-41e6-af48-581693faea6e', '15005', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '5', NULL, NULL, 270.0, 351.0),
    ('7dcc0a28-d1cb-4c5d-b37b-78b8fc5acb01', '15006', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '5', NULL, NULL, 303.75, 394.88),
    ('3a0d6586-7bad-4844-b5c3-a2d37230402c', '15007', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '6', NULL, NULL, 283.5, 368.55);

-- Batch 28 of 53 (products 541-560)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('92b51bef-7f14-4465-a110-d91ca41f0451', '15008', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '6', NULL, NULL, 324.0, 421.2),
    ('97342b20-b976-4681-a6d5-d58af722925f', '15009', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '6', NULL, NULL, 364.5, 473.85),
    ('7eab25d4-8d74-43d9-8dea-50102f103b90', '15010', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '8', NULL, NULL, 378.0, 491.4),
    ('b507c6d0-9ff0-4dfa-a78e-45706e1d3cf7', '15011', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '8', NULL, NULL, 432.0, 561.6),
    ('55342c9a-9b13-49b6-8993-55ed61586fee', '15012', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '8', NULL, NULL, 486.0, 631.8),
    ('14715b32-30cd-4634-ba83-8d4de5b06e35', '15013', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '10', NULL, NULL, 472.5, 614.25),
    ('8b596fde-23fd-4581-8e07-3defedeecbd6', '15014', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '10', NULL, NULL, 540.0, 702.0),
    ('06c145ca-e823-4a57-9b3f-8c2e2f66ff1e', '15015', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '10', NULL, NULL, 607.5, 789.75),
    ('d5bc7237-5967-4656-a113-2a5815c42c9c', '15016', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '12', NULL, NULL, 567.0, 737.1),
    ('779af6fb-ce18-4c70-bdf6-ab3c86f059be', '15017', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '12', NULL, NULL, 648.0, 842.4),
    ('08a2751f-e787-4ace-b093-95fec04a8bb4', '15018', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '12', NULL, NULL, 729.0, 947.7),
    ('792c489e-bd13-400b-903a-cd8e82c5c832', '15019', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '16', NULL, NULL, 756.0, 982.8),
    ('6a4f9917-e111-465b-b083-e9bccf78cf3f', '15020', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '16', NULL, NULL, 864.0, 1123.2),
    ('ee17a928-1ffe-459b-a795-2257bde38d81', '15021', 'Commercial single gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '16', NULL, NULL, 972.0, 1263.6),
    ('186fdcee-bc21-462b-87e5-4d6ca30f3b0d', '15051', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '4', NULL, NULL, 210.0, 273.0),
    ('73b41876-270e-48d5-bb4a-32aa12de0121', '15052', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '4', NULL, NULL, 240.0, 312.0),
    ('a1f01911-50e0-4dec-9745-c2a01e91c886', '15053', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '4', NULL, NULL, 270.0, 351.0),
    ('012e50fc-70dd-4ad1-b8b7-b7720273a053', '15054', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '5', NULL, NULL, 262.5, 341.25),
    ('ce479184-a037-473b-b75e-6eea9779eaf2', '15055', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '5', NULL, NULL, 300.0, 390.0),
    ('c06e7cf3-d6a5-4b7a-9790-cf54c972c2dd', '15056', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '5', NULL, NULL, 337.5, 438.75);

-- Batch 29 of 53 (products 561-580)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('934e7ee3-1b5d-46ae-b3a1-e990ed595ffa', '15057', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '6', NULL, NULL, 315.0, 409.5),
    ('2c2c14b5-d885-4344-99be-dc84b1370ecb', '15058', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '6', NULL, NULL, 360.0, 468.0),
    ('760ea069-b218-4fad-9e25-5cc2bd12c64d', '15059', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '6', NULL, NULL, 405.0, 526.5),
    ('eda0a74e-b400-4698-b5df-22744fff5348', '15060', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '8', NULL, NULL, 420.0, 546.0),
    ('9e9ece6f-bbe2-4d47-907d-89cddb35107b', '15061', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '8', NULL, NULL, 480.0, 624.0),
    ('cb4acdf5-0076-451f-8b27-96ba38ad4649', '15062', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '8', NULL, NULL, 540.0, 702.0),
    ('4d5db77c-b66f-492a-a25f-3b7dc9afaa0a', '15063', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '10', NULL, NULL, 525.0, 682.5),
    ('577e4a74-d7cd-42b9-b00e-40d31e016c29', '15064', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '10', NULL, NULL, 600.0, 780.0),
    ('04b4a00f-c750-45c3-838e-4245c9fa12a2', '15065', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '10', NULL, NULL, 675.0, 877.5),
    ('981f146a-28de-4690-b9e8-737af4157bf7', '15066', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '12', NULL, NULL, 630.0, 819.0),
    ('b7df8abf-d6ff-489f-99c9-e57e585c97e4', '15067', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '12', NULL, NULL, 720.0, 936.0),
    ('7edd2262-156c-4cad-8ed0-93066af967b9', '15068', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '12', NULL, NULL, 810.0, 1053.0),
    ('2d5683d5-c434-44d0-9443-c05b3465941e', '15069', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '16', NULL, NULL, 840.0, 1092.0),
    ('1e1afe75-c4a5-4cdb-aa66-b37215afc4bf', '15070', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '16', NULL, NULL, 960.0, 1248.0),
    ('3fb5229f-63e9-4197-a0ee-0808e24010a5', '15071', 'Commercial single gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '16', NULL, NULL, 1080.0, 1404.0),
    ('8960d668-a63d-4306-b77e-97244caf51e7', '15101', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '4''', NULL, NULL, 201.6, 262.08),
    ('80fecd01-1ec8-4732-bf93-3c8e23d30a8d', '15102', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '5''', NULL, NULL, 252.0, 327.6),
    ('94585920-312d-4038-a91a-7933070e8b43', '15103', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '6''', NULL, NULL, 302.4, 393.12),
    ('7dd38aba-4087-49d7-bd06-8e698b6541f1', '15104', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '8''', NULL, NULL, 403.2, 524.16),
    ('10daa454-c2b1-4e84-8ea7-2e65438136b4', '15105', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '10''', NULL, NULL, 504.0, 655.2);

-- Batch 30 of 53 (products 581-600)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('ec71d11e-7cd9-4360-86fe-a977049bb600', '15106', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '12''', NULL, NULL, 604.8, 786.24),
    ('e775682d-f664-421d-aa21-fbe0b9748980', '15107', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '16''', NULL, NULL, 806.4, 1048.32),
    ('4760f02c-80b8-4b39-8142-a059a00bdc2f', '15108', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '4''', NULL, NULL, 230.4, 299.52),
    ('85a78c59-23fb-4780-b2f5-6d4a8c16e488', '15109', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '5''', NULL, NULL, 288.0, 374.4),
    ('24ca66ec-9e28-48b9-951d-528709151fa3', '15110', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '6''', NULL, NULL, 345.6, 449.28),
    ('d8716aec-cb4f-4774-b33b-a2489e46f56e', '15111', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '8''', NULL, NULL, 460.8, 599.04),
    ('2985cb03-6a10-48e9-a9ee-622bfa38d9e7', '15112', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '10''', NULL, NULL, 576.0, 748.8),
    ('6718d06b-cbbc-4acb-81d1-3a0016030680', '15113', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '12''', NULL, NULL, 691.2, 898.56),
    ('e512943a-9884-4933-a98e-d082b6e0fa3a', '15114', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '16''', NULL, NULL, 921.6, 1198.08),
    ('6ff7ae22-a5d1-41fb-ade8-edd9c82eb51b', '15115', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '4''', NULL, NULL, 259.2, 336.96),
    ('2707a744-d21d-4900-b3f5-729500e3a376', '15116', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '5''', NULL, NULL, 324.0, 421.2),
    ('c76f005e-8eaf-4179-ad02-5938f19c696d', '15117', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '6''', NULL, NULL, 388.8, 505.44),
    ('da9937ac-3c12-45c5-b219-7bd5b6619010', '15118', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '8''', NULL, NULL, 518.4, 673.92),
    ('3839943a-48bd-4bd6-9c4f-5a308078639e', '15119', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '10''', NULL, NULL, 648.0, 842.4),
    ('b0ff6a0c-ab0d-4d07-bbcd-ed48af112faa', '15120', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '12''', NULL, NULL, 777.6, 1010.88),
    ('1f8f2657-0e08-4172-a79e-89b5ae51f6b4', '15121', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '16''', NULL, NULL, 1036.8, 1347.84),
    ('9dcfe6d9-9a8c-468d-abef-b7c31a67ecd7', '15122', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '4''', NULL, NULL, 336.0, 436.8),
    ('e8fd311f-fe03-41c1-a809-08f8a59df3a4', '15123', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '5''', NULL, NULL, 420.0, 546.0),
    ('bbb401b6-1ba6-415d-b026-7f86e9e4f515', '15124', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '6''', NULL, NULL, 504.0, 655.2),
    ('a54d9ef5-9072-4cb3-bdfd-b93ad3ce8d2e', '15125', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '8''', NULL, NULL, 672.0, 873.6);

-- Batch 31 of 53 (products 601-620)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('beff2ab7-da7b-49e8-bd63-95e820b9b6a6', '15126', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '10''', NULL, NULL, 840.0, 1092.0),
    ('2303a06c-00fd-4362-96a1-64686415927e', '15127', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '12''', NULL, NULL, 1008.0, 1310.4),
    ('9b11f895-75d3-4f39-8283-cecab43edc4f', '15128', 'Commercial single gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '16''', NULL, NULL, 1344.0, 1747.2),
    ('2d2c3a0e-d206-4859-9998-13514f48adf1', '15151', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '4', NULL, NULL, 224.0, 291.2),
    ('b41d6143-66b6-4319-a185-a6d1a2debac6', '15152', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '4', NULL, NULL, 256.0, 332.8),
    ('26446a68-3e52-4193-8556-64ff84894350', '15153', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '4', NULL, NULL, 288.0, 374.4),
    ('ab642e71-f66b-4298-96b3-fb3612056985', '15154', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '5', NULL, NULL, 280.0, 364.0),
    ('19183f31-78be-436c-b948-e5f5dc8896a9', '15155', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '5', NULL, NULL, 320.0, 416.0),
    ('ad8c5380-0571-4ea0-9d1e-b1392a0b12b5', '15156', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '5', NULL, NULL, 360.0, 468.0),
    ('2e9d8d63-295b-489c-96ba-f72e5f86c1fd', '15157', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '6', NULL, NULL, 336.0, 436.8),
    ('b04f3751-9ad2-4238-8e94-068ee829d31b', '15158', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '6', NULL, NULL, 384.0, 499.2),
    ('3611661c-02e5-445e-be8b-d00e4ee32c5c', '15159', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '6', NULL, NULL, 432.0, 561.6),
    ('d704193d-baf1-4cf5-a0b9-f06ca6674c02', '15160', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '8', NULL, NULL, 448.0, 582.4),
    ('3cc7b10b-1f4e-4ad8-b96b-e820e09bda82', '15161', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '8', NULL, NULL, 512.0, 665.6),
    ('a69516f1-6ff7-4180-9632-18a10d6f0cd5', '15162', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '8', NULL, NULL, 576.0, 748.8),
    ('685c175c-7699-4b1f-be49-a2db1797c18a', '15163', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '10', NULL, NULL, 560.0, 728.0),
    ('2269954b-8f1a-48e1-b2a6-c7d6ab77736d', '15164', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '10', NULL, NULL, 640.0, 832.0),
    ('653512f1-0068-4f82-8e05-d195435b8e94', '15165', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '10', NULL, NULL, 720.0, 936.0),
    ('b5023374-2d72-4ca7-8d2d-237ad3e7e79a', '15166', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '12', NULL, NULL, 672.0, 873.6),
    ('c7cd82eb-5b3e-4ecc-b828-88b84a022fdc', '15167', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '12', NULL, NULL, 768.0, 998.4);

-- Batch 32 of 53 (products 621-640)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('98057ab1-5725-4594-ae49-d73f8afe5a45', '15168', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '12', NULL, NULL, 864.0, 1123.2),
    ('b4b9153a-8c3c-4ed8-8e47-2428d8356c1d', '15169', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '16', NULL, NULL, 896.0, 1164.8),
    ('2a131087-4e8c-43c5-ad6b-e88f36fa9b6f', '15170', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '16', NULL, NULL, 1024.0, 1331.2),
    ('e97823fc-862a-42d7-af0d-6caf00a63285', '15171', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '16', NULL, NULL, 1152.0, 1497.6),
    ('7a3b1c7b-f24f-4f70-9b0b-02002ea841b5', '15172', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '25', NULL, NULL, 0.0, 0.0),
    ('4f57f489-d33f-4e69-9560-8d5c07ef1804', '15173', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '30', NULL, NULL, 0.0, 0.0),
    ('c10bb8d1-8069-4ad6-9250-20d499249390', '15174', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '25', NULL, NULL, 1600.0, 2392.0),
    ('7dfdad3a-7573-4eb7-92ba-4117a4fbc975', '15175', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '30', NULL, NULL, 2048.0, 3061.76),
    ('248393d7-549e-4cdf-9bab-0224ece030a3', '15176', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '25', NULL, NULL, 1800.0, 2392.0),
    ('817e9619-0922-4285-807c-d8d12f06c343', '15177', 'Commercial single gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '30', NULL, NULL, 0.0, 0.0),
    ('b36de765-796e-4dcd-8b66-ae5fc9866c20', '15201', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '8', NULL, NULL, 378.0, 491.4),
    ('89954f03-e4d6-4ddf-a2b5-972148615909', '15202', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '8', NULL, NULL, 432.0, 561.6),
    ('aa9c68e5-31f5-4528-9fd7-9cc7b17be21c', '15203', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '8', NULL, NULL, 486.0, 631.8),
    ('d9dfc86d-a1d5-460e-8d03-08bc8367c673', '15204', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '10', NULL, NULL, 472.5, 614.25),
    ('c17daa89-7d21-4f54-8a72-9c98611e95a7', '15205', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '10', NULL, NULL, 540.0, 702.0),
    ('8ebde18b-707d-44d1-bd57-3bf6d4204df1', '15206', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '10', NULL, NULL, 607.5, 789.75),
    ('af685f4b-eb19-42fa-ade1-fd82b2ed0a66', '15207', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '12', NULL, NULL, 529.2, 687.96),
    ('c023d650-45da-4a75-9885-18290dd97c3d', '15208', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '12', NULL, NULL, 604.8, 786.24),
    ('7a85b5a0-7742-42dc-9090-30f5a2f84f62', '15209', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '12', NULL, NULL, 680.4, 884.52),
    ('fecfa2b3-26ad-438d-aa67-be1afd2d7bbf', '15210', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '14', NULL, NULL, 617.4, 802.62);

-- Batch 33 of 53 (products 641-660)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('dff98138-4eac-4ba0-a73e-da7699700bd0', '15211', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '14', NULL, NULL, 705.6, 917.28),
    ('4fa85b3d-8d61-4f72-a550-2a4ebd4b4a2e', '15212', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '14', NULL, NULL, 793.8, 1031.94),
    ('2a03ee7f-59bb-44c4-98bd-27458ec80d85', '15213', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '16', NULL, NULL, 705.6, 917.28),
    ('21e03657-946a-43d2-b760-633652f6a868', '15214', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '16', NULL, NULL, 806.4, 1048.32),
    ('d103d68b-af80-4f36-9574-c9212853192f', '15215', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '16', NULL, NULL, 907.2, 1179.36),
    ('54f7ded7-b438-46f4-9c2f-ed791b62c6e9', '15216', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '20', NULL, NULL, 882.0, 1146.6),
    ('68d74e2b-9526-4793-bd3d-bba64d4cb2de', '15217', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '20', NULL, NULL, 1008.0, 1310.4),
    ('2f51a56d-f8e8-43ba-a301-7e170f939717', '15218', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '20', NULL, NULL, 1134.0, 1474.2),
    ('37b03ae1-f8bd-401d-892e-d5b420584f0f', '15219', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '22', NULL, NULL, 970.2, 1261.26),
    ('c5eead04-a512-4041-b330-06859dc55a7b', '15220', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '22', NULL, NULL, 1108.8, 1441.44),
    ('d9c6f64d-9f9a-4c9d-b3ea-c094eaca3f41', '15221', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '22', NULL, NULL, 1247.4, 1621.62),
    ('c69bf70d-cdb0-406c-8c42-8b82e275ce1b', '15222', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '24', NULL, NULL, 1058.4, 1375.92),
    ('9cb94991-09a3-41b0-ab0d-dbedf59eb576', '15223', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '24', NULL, NULL, 1209.6, 1572.48),
    ('9163311f-a732-47f4-b9fc-33472b01e4a4', '15224', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '24', NULL, NULL, 1360.8, 1769.04),
    ('f13a4c78-2a82-499e-ba1f-0f28e73f3006', '15225', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '26', NULL, NULL, 1146.6, 1490.58),
    ('751644a0-015c-425c-9794-3ca57c3c8aff', '15226', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '26', NULL, NULL, 1310.4, 1703.52),
    ('4161b4db-c611-4c3e-8fb1-9787834e56b1', '15227', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '26', NULL, NULL, 1474.2, 1916.46),
    ('6438cb66-0a61-4d70-87d6-b0538dae710e', '15228', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '28', NULL, NULL, 1234.8, 1605.24),
    ('e3dce185-ac2a-4354-94d9-ba0f9fa0553a', '15229', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '28', NULL, NULL, 1411.2, 1834.56),
    ('18a5e985-a02d-4d79-9eb7-6f331fb31210', '15230', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '28', NULL, NULL, 1587.6, 2063.88);

-- Batch 34 of 53 (products 661-680)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('154fc5fc-ba6d-4e62-bccf-7d68abcad331', '15231', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '30', NULL, NULL, 1323.0, 1719.9),
    ('e9921d9a-ae77-4442-ab3e-41add73e481f', '15232', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '30', NULL, NULL, 1512.0, 1965.6),
    ('4d4ad5cf-b31c-47a8-b0f2-02ea5a35f7fa', '15233', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '30', NULL, NULL, 1701.0, 2211.3),
    ('5f416ea9-4dab-402f-bc18-0ca305f9b42a', '15234', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6''', 'Width', '32', NULL, NULL, 1411.2, 1834.56),
    ('dadec5b7-930b-435a-b23f-1269de510686', '15235', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7''', 'Width', '32', NULL, NULL, 1612.8, 2096.64),
    ('4551dd11-fccf-4c54-b5b7-42c2e1b3995b', '15236', 'Commercial double gate no barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8''', 'Width', '32', NULL, NULL, 1814.4, 2358.72),
    ('c3197f63-d5b9-40e9-b6ab-e94ce87ec095', '15251', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '8', NULL, NULL, 420.0, 546.0),
    ('91df91ef-cef8-4d7b-b5b0-8f9090dec770', '15252', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '8', NULL, NULL, 480.0, 624.0),
    ('93638455-daa7-4795-b3f7-e44bd70c6979', '15253', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '8', NULL, NULL, 540.0, 702.0),
    ('a71c1be6-0ba2-4b4c-8728-a61c8206df71', '15254', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '10', NULL, NULL, 525.0, 682.5),
    ('e1db19c2-8d9c-43bf-a77c-90667616d0ad', '15255', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '10', NULL, NULL, 600.0, 780.0),
    ('9f5d0bfe-636c-4560-bec1-b6357deed1e0', '15256', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '10', NULL, NULL, 675.0, 877.5),
    ('69299bbb-2ae0-4d64-acd6-c7695bf1e078', '15257', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '12', NULL, NULL, 588.0, 764.4),
    ('d6679e7a-6c99-4d06-8bdf-34a02a2ade51', '15258', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '12', NULL, NULL, 672.0, 873.6),
    ('0d5682fe-a5e8-43e7-90a1-f1fa3c6ca266', '15259', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '12', NULL, NULL, 756.0, 982.8),
    ('e191673f-a493-4a02-a9a4-bf59fe989a8e', '15260', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '14', NULL, NULL, 686.0, 891.8),
    ('b740d2e4-e288-401b-a488-4029db47b34f', '15261', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '14', NULL, NULL, 784.0, 1019.2),
    ('685abfff-96e0-4d85-b5c6-b64c189c5530', '15262', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '14', NULL, NULL, 882.0, 1146.6),
    ('10981cea-14a0-47eb-b0e3-6fe1b27613ef', '15263', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '16', NULL, NULL, 784.0, 1019.2),
    ('f0029805-23d9-49ce-ad07-916d9e7a9f4c', '15264', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '16', NULL, NULL, 896.0, 1164.8);

-- Batch 35 of 53 (products 681-700)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('2386d6e7-b9f4-477e-b921-e1aadf9a3129', '15265', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '16', NULL, NULL, 1008.0, 1310.4),
    ('5c0c4f82-9084-4283-bbb4-569b86244b28', '15266', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '20', NULL, NULL, 980.0, 1274.0),
    ('d8f6a5aa-bec3-4276-8927-136a00995009', '15267', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '20', NULL, NULL, 1120.0, 1456.0),
    ('e377c737-13e9-4f60-a628-8454b77a857c', '15268', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '20', NULL, NULL, 1260.0, 1638.0),
    ('49048890-e9e9-4d5a-b032-14f497a83625', '15269', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '22', NULL, NULL, 1078.0, 1401.4),
    ('64895409-c6d5-47a6-be4c-13af68ea665a', '15270', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '22', NULL, NULL, 1232.0, 1601.6),
    ('f6c7dbf1-9ef5-4b80-aad1-8c0515d050a9', '15271', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '22', NULL, NULL, 1386.0, 1801.8),
    ('20a225ef-e716-44a7-b3b3-090b679e255e', '15272', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '24', NULL, NULL, 1176.0, 1528.8),
    ('03d1cca4-92fa-4d4a-b604-c1b20597eae6', '15273', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '24', NULL, NULL, 1344.0, 1747.2),
    ('1f73c8cb-ec05-4dfd-a054-8172e125d86a', '15274', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '24', NULL, NULL, 1512.0, 1965.6),
    ('6a451a48-8570-49c0-94d4-545429487651', '15275', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '26', NULL, NULL, 1274.0, 1656.2),
    ('1de296c6-e9bb-4c42-977d-4ff971945586', '15276', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '26', NULL, NULL, 1456.0, 1892.8),
    ('e1abac58-6654-47c6-936d-8875c9e74a4a', '15277', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '26', NULL, NULL, 1638.0, 2129.4),
    ('26446c59-99c4-4587-972a-faa99db10625', '15278', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '28', NULL, NULL, 1372.0, 1783.6),
    ('1984e8db-56b1-42fd-b563-cd70d6285c55', '15279', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '28', NULL, NULL, 1568.0, 2038.4),
    ('18066df9-4b5b-4db0-a0c2-f677d74111f7', '15280', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '28', NULL, NULL, 1764.0, 2293.2),
    ('007b085c-296e-4735-9292-a0f9d9172d45', '15281', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '30', NULL, NULL, 1470.0, 1911.0),
    ('6a412552-eef5-4673-bb68-ee8cc21e5512', '15282', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '30', NULL, NULL, 1680.0, 2184.0),
    ('3955564d-56d9-4973-aef1-504641e1f1ac', '15283', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '30', NULL, NULL, 1890.0, 2457.0),
    ('eaf36af8-2b81-4f41-a4d2-d61cdd783a9b', '15284', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '32', NULL, NULL, 1568.0, 2038.4);

-- Batch 36 of 53 (products 701-720)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('9bce9c42-e8d3-4eb1-9474-3fbeae49408d', '15285', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '32', NULL, NULL, 1792.0, 2329.6),
    ('94abdf92-b42a-414f-9fdd-8194a0d4aacd', '15286', 'Commercial double gate with barb wire - galvanized 1 5/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '32', NULL, NULL, 2016.0, 2620.8),
    ('a907bab6-86fd-4086-9ebf-e83b870eda0e', '15301', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '8''', NULL, NULL, 403.2, 524.16),
    ('2549ace0-16ab-472d-84f4-5fceffaf1c6e', '15302', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '10''', NULL, NULL, 504.0, 655.2),
    ('0839541a-e3cb-45db-a481-6704a443be73', '15303', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '12''', NULL, NULL, 604.8, 786.24),
    ('73c22c67-c576-4fce-a75c-4cc2a9a36342', '15304', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '14''', NULL, NULL, 705.6, 917.28),
    ('79d6b632-8ef1-4384-a2c2-59bc244ca128', '15305', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '16''', NULL, NULL, 806.4, 1048.32),
    ('0abea0c5-e438-4440-ad64-a04756ed1aab', '15306', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '20''', NULL, NULL, 1008.0, 1310.4),
    ('75b7a0af-f63d-483a-870c-d91610d979d5', '15307', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '22''', NULL, NULL, 1108.8, 1441.44),
    ('92e9f034-7d81-43cf-a8f2-e85a05922413', '15308', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '24''', NULL, NULL, 1209.6, 1572.48),
    ('e9d72277-8c27-4f76-8141-491455a5964f', '15309', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '26''', NULL, NULL, 1310.4, 1703.52),
    ('89bfcd95-38bc-453f-b0a5-153ab47cb61f', '15310', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '28''', NULL, NULL, 1411.2, 1834.56),
    ('da75530d-56cd-4f6e-bb09-b91d74d7f537', '15311', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '30''', NULL, NULL, 1512.0, 1965.6),
    ('37dbd8b9-3820-492a-87ba-6738b534370e', '15312', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6''', 'Width', '32''', NULL, NULL, 1612.8, 2096.64),
    ('5411a63e-e0ae-40e0-a113-703b0ee796f5', '15313', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '8''', NULL, NULL, 460.8, 599.04),
    ('cd254c25-d808-463e-acfa-d857b50313a7', '15314', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '10''', NULL, NULL, 576.0, 748.8),
    ('fbea5511-5d48-4251-bdcc-f742e68ca373', '15315', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '12''', NULL, NULL, 691.2, 898.56),
    ('a488818f-96ed-402a-9e02-d9d08ea848a4', '15316', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '14''', NULL, NULL, 806.4, 1048.32),
    ('d7f7376c-8f21-41a5-ae4b-f43a9d53110d', '15317', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '16''', NULL, NULL, 921.6, 1198.08),
    ('a5b4714f-7c44-4964-8d7f-44d2248cdd3e', '15318', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '20''', NULL, NULL, 1152.0, 1497.6);

-- Batch 37 of 53 (products 721-740)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('dd65b73b-ccab-45f8-88f3-e83793e5958a', '15319', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '22''', NULL, NULL, 1267.2, 1647.36),
    ('069e812f-87ee-4121-aa21-564d18f049c2', '15320', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '24''', NULL, NULL, 1382.4, 1797.12),
    ('5d1ccdc4-9784-4b7c-9fa7-2b90b0e4ff1f', '15321', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '26''', NULL, NULL, 1497.6, 1946.88),
    ('e9bfbd9a-1ca1-4cbb-b024-8e8c2b82576d', '15322', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '28''', NULL, NULL, 1612.8, 2096.64),
    ('9943c610-77bf-4208-91dc-cb8d1177aebc', '15323', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '30''', NULL, NULL, 1728.0, 2246.4),
    ('a0e44a4b-565a-4133-9178-987d7eec2e38', '15324', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7''', 'Width', '32''', NULL, NULL, 1843.2, 2396.16),
    ('d129a2d8-0291-4e80-a051-303be9cc9500', '15325', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '8''', NULL, NULL, 518.4, 673.92),
    ('26f186db-ff73-49fd-8bf7-b81ddadddcd8', '15326', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '10''', NULL, NULL, 648.0, 842.4),
    ('29cd3d4a-da84-49b3-8399-8731f0ad1d45', '15327', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '12''', NULL, NULL, 777.6, 1010.88),
    ('fcc916f7-b585-40ac-8c77-d598040e95da', '15328', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '14''', NULL, NULL, 907.2, 1179.36),
    ('969bb58e-2308-4c79-9633-2d9e9e6e5f2b', '15329', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '16''', NULL, NULL, 1036.8, 1347.84),
    ('f73c3792-4e7b-4ba9-aeb4-13aff15b8156', '15330', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '20''', NULL, NULL, 1296.0, 1684.8),
    ('87eadaac-0724-4cbf-9e16-8510426eeed5', '15331', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '22''', NULL, NULL, 1425.6, 1853.28),
    ('ac168343-710a-47e8-8bd6-b0691cc8dfb3', '15332', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '24''', NULL, NULL, 1555.2, 2021.76),
    ('16bcdc13-167c-428e-8bfb-86e356dd11f3', '15333', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '26''', NULL, NULL, 1684.8, 2190.24),
    ('54449470-7d6f-4970-a308-0f31cefc6983', '15334', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '28''', NULL, NULL, 1814.4, 2358.72),
    ('091402b5-ebab-4b66-9bb5-a49330cb1619', '15335', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '30''', NULL, NULL, 1944.0, 2527.2),
    ('244defea-8ccc-4379-b33c-0d2893f6e827', '15336', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8''', 'Width', '32''', NULL, NULL, 2073.6, 2695.68),
    ('b28d7795-8b98-407d-9362-fcaab48b7c9a', '15337', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '8''', NULL, NULL, 672.0, 873.6),
    ('549b72ee-9ae4-431f-8dcc-7743d5daa384', '15338', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '10''', NULL, NULL, 840.0, 1092.0);

-- Batch 38 of 53 (products 741-760)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('664e32d5-47a8-4bad-83f8-c5e6c32d19df', '15339', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '12''', NULL, NULL, 1008.0, 1310.4),
    ('d3f0c7ec-7620-4aac-9732-27c016dad15f', '15340', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '14''', NULL, NULL, 1176.0, 1528.8),
    ('ca973b85-416c-4b5a-823a-c18619607ba7', '15341', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '16''', NULL, NULL, 1344.0, 1747.2),
    ('fdccebdf-fa5d-41f7-b3d1-c2b149395262', '15342', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '20''', NULL, NULL, 1680.0, 2184.0),
    ('e34d1818-4714-401e-8586-7b92d63816dd', '15343', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '22''', NULL, NULL, 1848.0, 2402.4),
    ('caca6ef9-02bf-410d-a293-c538b01743df', '15344', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '10''', 'Width', '24''', NULL, NULL, 2016.0, 2620.8),
    ('b84d3549-eec7-4532-aca2-1d3ad8c74a92', '15345', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '8''', NULL, NULL, 806.4, 1048.32),
    ('2b790e28-f240-4f44-a620-c536730e8793', '15346', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '10''', NULL, NULL, 1008.0, 1310.4),
    ('5d5ca44c-c182-4377-a980-c09fdf11b968', '15347', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '12''', NULL, NULL, 1209.6, 1572.48),
    ('196b6c56-9b4a-4e46-bebc-265e88d41132', '15348', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '14''', NULL, NULL, 1411.2, 1834.56),
    ('07e63736-de59-498c-940f-32ee608fb501', '15349', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '16''', NULL, NULL, 1612.0, 2095.6),
    ('beff2faa-0c15-45f8-b6ef-51f66b25da09', '15350', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '20''', NULL, NULL, 2016.0, 2620.8),
    ('59668aed-a4da-4440-a352-d7c02322a285', '15351', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '22''', NULL, NULL, 2217.6, 2882.88),
    ('64432127-b0b2-4cf7-8cff-fef01ed09819', '15352', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '12''', 'Width', '24''', NULL, NULL, 2419.2, 3144.96),
    ('fcadb5bd-93da-46d4-958a-da86ad0134ee', '15353', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '8''', NULL, NULL, 940.8, 1223.04),
    ('242d4b2f-4fb8-4312-86e5-cd87545d9dfe', '15354', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '10''', NULL, NULL, 1176.0, 1528.8),
    ('110e5152-cb1d-4609-9aba-982f17da5dbf', '15355', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '12''', NULL, NULL, 1411.2, 1834.56),
    ('92371c1e-50a4-4607-b2f4-786004b0b566', '15356', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '14''', NULL, NULL, 1646.4, 2140.32),
    ('5836eecd-1209-40b1-8289-3f88eda6364c', '15357', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '16''', NULL, NULL, 1881.6, 2446.08),
    ('fbc43a1c-718d-449a-988f-14b1b12146b1', '15358', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '20''', NULL, NULL, 2352.0, 3057.6);

-- Batch 39 of 53 (products 761-780)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('cc80ac39-6a2c-41e1-9570-99c91212fe26', '15359', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '22''', NULL, NULL, 2587.2, 3363.36),
    ('1697a195-e95c-4cb9-92d0-1c5d2c1ba72e', '15360', 'Commercial double gate no barb wire - galvanized 1 7/8"', 'Gates', 'Height', '14''', 'Width', '24''', NULL, NULL, 2822.4, 3669.12),
    ('6b7fab27-ae24-44cd-a018-cf54cc181185', '15401', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '8', NULL, NULL, 448.0, 582.4),
    ('bc0dfbe9-b52a-4162-8e8b-e06b80d6c386', '15402', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '10', NULL, NULL, 560.0, 728.0),
    ('4c4e16b8-7fce-4dfa-acb8-0b054e4e4a33', '15403', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '12', NULL, NULL, 672.0, 873.6),
    ('bcc08dbf-b648-4329-9020-fe96eb7f1b7a', '15404', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '14', NULL, NULL, 784.0, 1019.2),
    ('7c6b5414-93ae-4b49-a5fd-e2598bb9b9f9', '15405', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '16', NULL, NULL, 896.0, 1164.8),
    ('36d1f71e-4c83-4ebe-8b02-55946c7a6c6a', '15406', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '20', NULL, NULL, 1120.0, 1456.0),
    ('25f75d04-9dde-4fa9-b9e5-dfb899199c63', '15407', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '22', NULL, NULL, 1232.0, 1601.6),
    ('1b650219-de0e-4ee1-8483-f968133babfa', '15408', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '24', NULL, NULL, 1344.0, 1747.2),
    ('0903e93d-e40e-42b9-b2ba-ef00beba9998', '15409', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '26', NULL, NULL, 1456.0, 1892.8),
    ('336ee673-f979-429a-b7a3-67aa8eb06c59', '15410', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '28', NULL, NULL, 1568.0, 2038.4),
    ('777395a9-9c7b-4f27-a1b3-4bcecb669f01', '15411', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '30', NULL, NULL, 1680.0, 2184.0),
    ('d743b0e9-0aa3-440c-9891-9aa6c49d7a2f', '15412', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '6'' plus 1', 'Width', '32', NULL, NULL, 1792.0, 2329.6),
    ('a0cf7a05-4568-4995-a269-52959c0e6ca4', '15413', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '8', NULL, NULL, 512.0, 665.6),
    ('3da3d874-e2cd-467e-a4b1-5af14099a797', '15414', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '10', NULL, NULL, 640.0, 832.0),
    ('12ac61fb-e0ef-4c97-9714-a7cbb1e1e0fc', '15415', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '12', NULL, NULL, 768.0, 998.4),
    ('4f3753cd-da61-45b0-94ce-b4ce9e9d1487', '15416', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '14', NULL, NULL, 896.0, 1164.8),
    ('93a3e1b6-2249-48fe-a701-fca2b64f1887', '15417', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '16', NULL, NULL, 1024.0, 1331.2),
    ('7586f359-ac3b-48d4-8de6-3d649f53673c', '15418', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '20', NULL, NULL, 1280.0, 1664.0);

-- Batch 40 of 53 (products 781-800)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('64dad864-4289-4b67-953c-07bd89295331', '15419', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '22', NULL, NULL, 1408.0, 1830.4),
    ('0cdf46f7-ed83-46d2-8b90-155a0f3892af', '15420', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '24', NULL, NULL, 1536.0, 1996.8),
    ('4a3525d0-a43c-4299-af4c-e5f21b7dc080', '15421', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '26', NULL, NULL, 1664.0, 2163.2),
    ('d6eb5436-d234-4cf1-ae76-c9e882dce227', '15422', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '28', NULL, NULL, 1792.0, 2329.6),
    ('57c267e0-6222-44ca-aeb4-9d14b30e856a', '15423', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '30', NULL, NULL, 1920.0, 2496.0),
    ('89055491-f3e2-4148-9722-1e2d55ded766', '15424', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '7'' plus 1', 'Width', '32', NULL, NULL, 2048.0, 2662.4),
    ('61d4aafc-ac8d-44ab-a365-8f0d37ef0490', '15425', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '8', NULL, NULL, 576.0, 748.8),
    ('1cf2e346-c9d3-41fc-b16c-937cea5dbd50', '15426', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '10', NULL, NULL, 720.0, 936.0),
    ('98750f09-4451-4ff4-a9b4-a28144afaeec', '15427', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '12', NULL, NULL, 864.0, 1123.2),
    ('17509b08-dddd-4fb9-aefb-94dfb6f53eab', '15428', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '14', NULL, NULL, 1008.0, 1310.4),
    ('6593b9d9-25a4-49ca-8381-c03329c885e0', '15429', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '16', NULL, NULL, 1152.0, 1497.6),
    ('157ed944-ca36-4df1-a6c6-89b7361aa27b', '15430', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '20', NULL, NULL, 1440.0, 1872.0),
    ('e3be38b9-47c5-4660-bf8f-d34bc8259ab2', '15431', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '22', NULL, NULL, 1584.0, 2059.2),
    ('36bbd090-72ec-4465-828e-ca60878a9f31', '15432', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '24', NULL, NULL, 1728.0, 2246.4),
    ('a209f07f-2f72-4505-9546-a597f5dd354d', '15433', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '26', NULL, NULL, 1872.0, 2433.6),
    ('aa9c4aee-d3a9-4fd2-9986-b5c0bfde2531', '15434', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '28', NULL, NULL, 2016.0, 2620.8),
    ('443d1061-552d-41e2-9797-2d8064b4057c', '15435', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '30', NULL, NULL, 2160.0, 2808.0),
    ('42ece465-1bb0-45de-a99b-55dbae6cd87f', '15436', 'Commercial double gate with barb wire - galvanized 1 7/8"', 'Gates', 'Height', '8'' plus 1', 'Width', '32', NULL, NULL, 2304.0, 2995.2),
    ('fe395edc-c5d7-4533-ac51-37c7b03f2617', '15501', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '4', NULL, NULL, 29.86, 89.58),
    ('49cc8a72-2486-4268-a97c-d580c1fb4dcd', '15502', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '4', NULL, NULL, 35.35, 106.06);

-- Batch 41 of 53 (products 801-820)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('a76104d7-ad59-44e3-a49c-98f3701c4dd0', '15503', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '4', NULL, NULL, 41.48, 124.44),
    ('2ab15977-fbaf-42b2-b053-7120cd6b6dcc', '15504', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '5', NULL, NULL, 35.35, 106.06),
    ('e6631b72-4561-4a75-b363-ce6fd2f5fbfc', '15505', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '5', NULL, NULL, 45.36, 136.06),
    ('0628c872-60a0-47c0-b46b-0a8416dab6eb', '15506', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '5', NULL, NULL, 53.24, 159.73),
    ('09b1f94c-0ac0-4986-a988-56c6ca0199c3', '15507', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '6', NULL, NULL, 42.75, 128.25),
    ('8ac79c7b-a38d-4296-9914-f8074578250e', '15508', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '6', NULL, NULL, 53.39, 160.15),
    ('eefceeab-35c6-48ae-981c-fd1af9fed7e3', '15509', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '6', NULL, NULL, 64.96, 194.88),
    ('c087df81-e372-4a7f-aef6-3fe72914b864', '15510', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 248.0, 322.4),
    ('323bacf1-35ed-48c0-bf36-524b3cbaf25c', '15511', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 310.0, 403.0),
    ('b31112cb-15e0-43f4-8a36-38b0b1794754', '15512', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 372.0, 483.6),
    ('61385f21-9cb6-46e4-9cd4-8c5dc1a8d539', '15513', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 310.0, 403.0),
    ('0706f666-fb38-4ff6-b7fe-d36ef8476892', '15514', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 387.5, 503.75),
    ('05b3f005-c4ba-48d8-9fa2-6f1014b11a81', '15515', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 465.0, 604.5),
    ('276412f9-7db9-4c41-8001-a6178b4d0cba', '15516', 'Residential single gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '16', NULL, NULL, 744.0, 967.2),
    ('e44be8fa-0286-482c-a91f-01e33dcb65e5', '15551', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '4', NULL, NULL, 132.0, 171.6),
    ('ad21572e-7aef-46b8-94ed-bd641f443c6d', '15552', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '4', NULL, NULL, 165.0, 214.5),
    ('9530fca7-179a-4d55-b0bc-d036464562ee', '15553', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '4', NULL, NULL, 198.0, 257.4),
    ('bd79d03c-652f-4f6e-95e3-c9881d00cdac', '15554', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '5', NULL, NULL, 165.0, 214.5),
    ('e5c3ade2-81bf-40a2-b4e0-917072aac26a', '15555', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '5', NULL, NULL, 206.25, 268.13),
    ('fdb4aede-f020-4f9e-91b1-c1ee54e8030f', '15556', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '5', NULL, NULL, 247.5, 321.75);

-- Batch 42 of 53 (products 821-840)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('7db92f78-209e-46ff-b157-4212f04639ba', '15557', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '6', NULL, NULL, 198.0, 257.4),
    ('db009bff-144b-4ee1-b711-48264c1a5a77', '15558', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '6', NULL, NULL, 247.5, 321.75),
    ('6647b4e1-9d42-486f-828e-41ea508d2ceb', '15559', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '6', NULL, NULL, 297.0, 386.1),
    ('bb14a2ef-e8d6-4884-bdc0-ed209b88cccf', '15560', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '7', NULL, NULL, 231.0, 300.3),
    ('0e561927-adbd-4450-8e8f-c2de534731ba', '15561', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '7', NULL, NULL, 288.75, 375.38),
    ('fc9c91ef-4383-4bdc-be1a-bd2e0490b984', '15562', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '7', NULL, NULL, 346.5, 450.45),
    ('df2a60b7-90e8-4f5a-9cc9-3e07705ef986', '15563', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 264.0, 343.2),
    ('1ea12312-7890-4c69-a4ff-fc28be93cef7', '15564', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 330.0, 429.0),
    ('a04fa349-4976-429d-a894-8c3cb5e8055f', '15565', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 396.0, 514.8),
    ('763b468c-f12e-4a77-b304-8904cc6375e1', '15566', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 330.0, 429.0),
    ('99de5a1e-5793-49b3-a29a-d557275cf824', '15567', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 412.5, 536.25),
    ('f2a7277e-4385-4dd8-b64f-340a98bbcac7', '15568', 'Residential single gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 495.0, 643.5),
    ('fb3849db-5928-4cdd-bcef-f92917de1f7a', '15601', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '4', NULL, NULL, 35.37, 106.1),
    ('562a6510-aef9-4ef2-b520-e9e7fde7470b', '15602', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '4', NULL, NULL, 38.04, 114.13),
    ('38b2d5e5-7a60-4339-a329-3369920bdb6c', '15603', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '4', NULL, NULL, 42.95, 128.86),
    ('ad2b847a-5628-42a4-aa95-d01cd361d9d6', '15604', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '5', NULL, NULL, 39.43, 118.28),
    ('cec12d41-2b4a-4cbe-ba8f-26ff3b3c8d70', '15605', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '5', NULL, NULL, 43.66, 130.98),
    ('4ea6e2ad-bee6-4cd0-b5a6-c9273c952ad4', '15606', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '5', NULL, NULL, 46.35, 139.05),
    ('ccb10a32-f8f6-47b3-a30b-96566c4baf30', '15607', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '6', NULL, NULL, 43.36, 130.08),
    ('b16b458f-8cb8-47cb-b707-8174344140c8', '15608', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '6', NULL, NULL, 46.6, 139.81);

-- Batch 43 of 53 (products 841-860)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('dbc98553-93d9-4cf2-8e0f-57087e4d81fa', '15609', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '6', NULL, NULL, 52.63, 157.88),
    ('6f578005-d636-4369-a93f-ac65f2533d92', '15610', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 224.0, 291.2),
    ('dab93a5a-710e-4a09-855b-515d079315c4', '15611', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 280.0, 364.0),
    ('6d801cfb-821d-4db9-b21c-c7a0e869e4a1', '15612', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 336.0, 436.8),
    ('56c8fc0b-804e-40c5-8f56-04ba2a5d19ae', '15613', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 280.0, 364.0),
    ('e6479b83-737e-48b2-aaed-14609f58db0c', '15614', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 350.0, 455.0),
    ('8b7febc4-0414-4cc7-9ec1-a60168e6f01b', '15615', 'Residential single gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 420.0, 546.0),
    ('709e015a-39ef-4043-a4bf-66e5f9e01512', '15651', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '4', NULL, NULL, 120.0, 156.0),
    ('743cdcff-3813-4d4d-8220-e00631e7b608', '15652', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '4', NULL, NULL, 150.0, 195.0),
    ('b7d3744d-dafc-4973-8458-1a7d7870bf7f', '15653', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '4', NULL, NULL, 180.0, 234.0),
    ('025b0e6d-7fe0-4aef-b86a-fe63da41c879', '15654', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '5', NULL, NULL, 150.0, 195.0),
    ('8d4613ce-b2ef-48f6-8939-d41bdd4e9461', '15655', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '5', NULL, NULL, 187.5, 243.75),
    ('aec72b35-30f1-488d-b98e-0047988c462d', '15656', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '5', NULL, NULL, 225.0, 292.5),
    ('5f634ba1-218f-42f7-bfbf-7597cab49904', '15657', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '6', NULL, NULL, 180.0, 234.0),
    ('29e38ce3-e188-447f-a23a-8da5505659bb', '15658', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '6', NULL, NULL, 225.0, 292.5),
    ('9fc955d9-124c-4693-813b-7598702a0e8f', '15659', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '6', NULL, NULL, 270.0, 351.0),
    ('56882531-999c-4aa8-b7d9-7bc078d98639', '15660', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '7', NULL, NULL, 210.0, 273.0),
    ('602a86a9-c570-4f1d-ac9a-20e3858d6666', '15661', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '7', NULL, NULL, 262.5, 341.25),
    ('0e3f6e40-826e-413b-b908-ba515b63d686', '15662', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '7', NULL, NULL, 315.0, 409.5),
    ('df442a3d-38f8-49db-ac13-dfd29c5d6637', '15663', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 240.0, 312.0);

-- Batch 44 of 53 (products 861-880)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('b63fb866-7ff2-4a51-80c1-4874cd01ec84', '15664', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 300.0, 390.0),
    ('63b7db62-e09e-4370-88ff-f7e9498ff6ff', '15665', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 360.0, 468.0),
    ('7e9c11d2-e49e-49ce-8ff9-c23ca290e2d6', '15666', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 300.0, 390.0),
    ('f2cbbc15-dc17-4fda-b29b-129aca535497', '15667', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 375.0, 487.5),
    ('086cb4f5-5747-4dea-8e0a-7879ae541cbd', '15668', 'Residential single gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 450.0, 585.0),
    ('13626305-37d4-4b03-a0e6-5b6007050e4e', '15701', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 59.72, 179.16),
    ('ad5666a4-f728-44c5-9955-1b2db425d829', '15702', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 70.71, 212.12),
    ('4ec24a97-da9c-49bb-bacf-88df0a1bfbd0', '15703', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 82.96, 248.89),
    ('c2b24c4b-378c-40c0-a670-b1ee4160ef41', '15704', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 70.71, 212.12),
    ('d24a3c50-6497-497c-808c-318855f10e1b', '15705', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 90.71, 272.13),
    ('7bb618a6-9eae-4339-b516-e2c0a2afc563', '15706', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 106.48, 319.45),
    ('6182b559-d407-4d84-bb26-12fd9df443d0', '15707', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '12', NULL, NULL, 85.5, 256.49),
    ('1babbf2c-dae3-46d6-9ad8-cacbe94dbf60', '15708', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '12', NULL, NULL, 106.77, 320.3),
    ('c21246e5-018e-4f56-9cc4-c83c77de1f56', '15709', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '12', NULL, NULL, 129.92, 389.77),
    ('61122626-01f6-43ab-96b8-779b42a70c75', '15710', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '14', NULL, NULL, 434.0, 564.2),
    ('b3e11f2f-c47c-494b-8d0f-1bf6f71abae0', '15711', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '14', NULL, NULL, 542.5, 705.25),
    ('5ac24e81-0e10-47f6-ad5b-07a02a4a9f71', '15712', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '14', NULL, NULL, 651.0, 846.3),
    ('398fc5e2-d40c-40dc-994d-c22b2a69dbeb', '15713', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '16', NULL, NULL, 496.0, 644.8),
    ('315fc9e0-8c59-45dc-8f48-1d40687cc978', '15714', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '16', NULL, NULL, 620.0, 806.0),
    ('f1093153-4f31-49ca-b96e-bf25463e0d5d', '15715', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '16', NULL, NULL, 744.0, 967.2);

-- Batch 45 of 53 (products 881-900)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('bd40d036-e040-4704-8e8f-72de999f987b', '15716', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '20', NULL, NULL, 620.0, 806.0),
    ('ce7181ee-fe70-4884-9e2f-6913422744ac', '15717', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '20', NULL, NULL, 775.0, 1007.5),
    ('c882f9bc-fcf4-4f17-86ef-01d205527dd2', '15718', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '20', NULL, NULL, 930.0, 1209.0),
    ('35608e8f-09b5-494a-8643-fcf426e491b6', '15719', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '4', 'Width', '24', NULL, NULL, 744.0, 967.2),
    ('bb57e79e-221b-4f31-ad63-2b6c723aa1f0', '15720', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '5', 'Width', '24', NULL, NULL, 930.0, 1209.0),
    ('ab5259e4-3804-4004-9e1b-50f3f4c6337f', '15721', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '6', 'Width', '24', NULL, NULL, 1116.0, 1450.8),
    ('056ac0cc-22e0-4440-9c1c-67379cd25cfa', '15722', 'Residential double gate - Black 1 5/8"', 'Gates', 'Height', '8', 'Width', '12', NULL, NULL, 744.0, 967.2),
    ('01953da9-d7a4-4e61-98b4-a51ea220adad', '15751', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 264.0, 343.2),
    ('f339e8c1-946c-4f0f-a2cb-0a8cebf9c66f', '15752', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 330.0, 429.0),
    ('044e9580-d713-4bdc-a920-68e892029064', '15753', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 396.0, 514.8),
    ('db317fad-3653-4d06-85f7-92b8ffb1b4d8', '15754', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 330.0, 429.0),
    ('853c17b1-e8fc-452f-98a6-91ffb9373325', '15755', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 412.5, 536.25),
    ('60636881-e8ab-4dbd-b638-388026b222f9', '15756', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 495.0, 643.5),
    ('646f5875-7f38-4a40-8c8e-d644ce754b6d', '15757', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '12', NULL, NULL, 396.0, 514.8),
    ('2dc701ef-cd6b-4618-bcf2-00d5538e1e94', '15758', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '12', NULL, NULL, 495.0, 643.5),
    ('025a3465-2bee-4fd4-9e81-f06c5b357a0b', '15759', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '12', NULL, NULL, 594.0, 772.2),
    ('4b003eaa-fa63-45f7-9b3c-91da633cd25d', '15760', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '14', NULL, NULL, 462.0, 600.6),
    ('9cc3959d-51ed-4d42-86ae-a85a4f891dae', '15761', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '14', NULL, NULL, 577.5, 750.75),
    ('1c919799-1e85-4118-bc2e-8f9e3b391221', '15762', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '14', NULL, NULL, 693.0, 900.9),
    ('fba79d7c-dc34-4f82-a750-b989e81c75ff', '15763', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '16', NULL, NULL, 528.0, 686.4);

-- Batch 46 of 53 (products 901-920)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('bd2cb167-e0ad-460b-a967-b623990ce1cd', '15764', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '16', NULL, NULL, 660.0, 858.0),
    ('e70a03bb-4b0e-48a3-ba88-2ab4021b581d', '15765', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '16', NULL, NULL, 792.0, 1029.6),
    ('e641942b-39e0-42e0-a461-c6dfefdf6be8', '15766', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '20', NULL, NULL, 660.0, 858.0),
    ('2c0dd8aa-8f74-4aa0-8127-2305c0408cc1', '15767', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '20', NULL, NULL, 825.0, 1072.5),
    ('3d0544b9-6afa-41c1-990f-95aa379359dd', '15768', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '20', NULL, NULL, 990.0, 1287.0),
    ('c8a18f8f-aa56-48c1-bce7-35cd84c8bb59', '15769', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '4', 'Width', '24', NULL, NULL, 792.0, 1029.6),
    ('ef5abfc8-9a9d-45f0-a917-36b9f948a4a9', '15770', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '5', 'Width', '24', NULL, NULL, 990.0, 1287.0),
    ('c8130e0c-c2b4-443e-992c-1c2372fd7e3e', '15771', 'Residential double gate - Black 1 7/8"', 'Gates', 'Height', '6', 'Width', '24', NULL, NULL, 1188.0, 1544.4),
    ('528a9e9e-2ba3-407e-82e8-61090c4e5248', '15801', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 70.74, 212.21),
    ('5367f7c7-a61a-49c4-b5f5-1187acadf8a0', '15802', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 76.09, 228.26),
    ('21c72755-55ef-4512-aa8c-628f2e06c673', '15803', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 85.9, 257.71),
    ('5a990811-3200-480d-a701-5447b1e324ff', '15804', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 78.85, 236.56),
    ('ac712d86-b906-4b6c-a17c-d6db57a53469', '15805', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 87.32, 261.96),
    ('feaeb7c7-ff90-4ca9-b8d1-461d84721710', '15806', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 92.7, 278.1),
    ('5583c705-db0b-4af1-937f-ea3fe14cbf71', '15807', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '12', NULL, NULL, 86.72, 260.16),
    ('b5c565d9-06f3-4401-abb4-088fea7b21d2', '15808', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '12', NULL, NULL, 93.2, 279.61),
    ('38c565c8-2aa5-4ccf-b381-8cc99853200a', '15809', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '12', NULL, NULL, 105.26, 315.77),
    ('5c670422-dfcf-4fb2-877b-0ba7768ca143', '15810', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '14', NULL, NULL, 392.0, 509.6),
    ('db982cb3-b048-4ad9-8174-93a065433f0c', '15811', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '14', NULL, NULL, 490.0, 637.0),
    ('4ae54650-c5f5-4943-a899-b83ab8a5e8cf', '15812', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '14', NULL, NULL, 588.0, 764.4);

-- Batch 47 of 53 (products 921-940)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('92647baa-7a2b-4236-88e3-2211a4ec7881', '15813', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '16', NULL, NULL, 448.0, 582.4),
    ('3823ca00-9ad7-488b-b0ab-a3b100386af5', '15814', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '16', NULL, NULL, 560.0, 728.0),
    ('3cd657f7-5889-4f79-b69e-6f96ed378d25', '15815', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '16', NULL, NULL, 672.0, 873.6),
    ('0031eec0-db78-441c-990f-148dc2bcc21a', '15816', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '20', NULL, NULL, 560.0, 728.0),
    ('f406e940-0cb9-478c-893e-a64f95a04050', '15817', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '20', NULL, NULL, 700.0, 910.0),
    ('71a41ce0-af78-462b-835e-7211ee795c19', '15818', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '20', NULL, NULL, 840.0, 1092.0),
    ('6c7d4731-237e-4422-8594-190421e8ead5', '15819', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '4', 'Width', '24', NULL, NULL, 672.0, 873.6),
    ('eabb8876-5dcf-4267-bae6-0b37ebf5c5b3', '15820', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '5', 'Width', '24', NULL, NULL, 840.0, 1092.0),
    ('6d336089-ca56-468c-9561-32b82fc8aac9', '15821', 'Residential double gate - galvanized 1 5/8"', 'Gates', 'Height', '6', 'Width', '24', NULL, NULL, 1008.0, 1310.4),
    ('b0187774-670d-464e-ad82-40d64cb1d9eb', '15851', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '8', NULL, NULL, 240.0, 312.0),
    ('c9e3e535-ac33-4dea-94a6-c256398987dd', '15852', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '8', NULL, NULL, 300.0, 390.0),
    ('8d41ecca-1ea9-49e5-8d83-a0386a9fb38d', '15853', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '8', NULL, NULL, 360.0, 468.0),
    ('84528a93-4dfb-4e32-8419-8850e45242d6', '15854', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '10', NULL, NULL, 300.0, 390.0),
    ('be5d7d7a-2fbe-4571-9bfe-843d3ccfc5a2', '15855', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '10', NULL, NULL, 375.0, 487.5),
    ('fed427db-6145-45d0-8978-361c75b19145', '15856', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '10', NULL, NULL, 450.0, 585.0),
    ('e6204f2e-96ae-4196-885d-8f6056ee671b', '15857', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '12', NULL, NULL, 360.0, 468.0),
    ('73cc9f80-9cce-4d4e-be73-a996ab51fece', '15858', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '12', NULL, NULL, 450.0, 585.0),
    ('759a5766-d0c5-447f-ac6b-fbd8a7e0f031', '15859', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '12', NULL, NULL, 540.0, 702.0),
    ('a17613d1-a30d-4d71-afa2-1eda0ccf22f4', '15860', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '14', NULL, NULL, 420.0, 546.0),
    ('774a1374-f2bb-4ea4-88c3-e98da1dbac3c', '15861', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '14', NULL, NULL, 525.0, 682.5);

-- Batch 48 of 53 (products 941-960)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('66ca4dc1-b07d-427f-b564-25976e2bdfc8', '15862', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '14', NULL, NULL, 630.0, 819.0),
    ('397b2c6d-22d9-4f11-abaf-106c774c7b3e', '15863', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '16', NULL, NULL, 480.0, 624.0),
    ('e2c8b6ca-655d-463e-ab19-e1270303f0c3', '15864', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '16', NULL, NULL, 600.0, 780.0),
    ('b38ff838-c36d-44b8-a3f3-cc69cf118192', '15865', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '16', NULL, NULL, 720.0, 936.0),
    ('353a7041-5e58-40f4-885a-bd952ca2f176', '15866', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '20', NULL, NULL, 600.0, 780.0),
    ('3cb8ffc9-34ad-4911-9abb-963fd7586b43', '15867', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '20', NULL, NULL, 750.0, 975.0),
    ('5463b83d-aecc-4c4c-85d7-09c7eef50e37', '15868', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '20', NULL, NULL, 900.0, 1170.0),
    ('82b37514-c7da-4823-923d-dab349b18c95', '15869', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '4', 'Width', '24', NULL, NULL, 720.0, 936.0),
    ('0861af51-19b0-48bd-b4dc-6dc6b475c9ac', '15870', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '5', 'Width', '24', NULL, NULL, 900.0, 1170.0),
    ('c352effa-af0a-4526-b077-218d71c207ba', '15871', 'Residential double gate - galvanized 1 7/8"', 'Gates', 'Height', '6', 'Width', '24', NULL, NULL, 1080.0, 1404.0),
    ('a4182bdb-0d7e-41b3-adc4-27fb7b8a66cb', '16001', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '6''W', NULL, NULL, 288.0, 374.4),
    ('8d9850e9-b704-4643-a0e2-d16959d65269', '16002', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '8''W', NULL, NULL, 384.0, 499.2),
    ('c1797e31-80e1-4728-80ab-4eacc2730804', '16003', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '10''W', NULL, NULL, 480.0, 624.0),
    ('51618943-5b0d-426e-94b1-087b6f4b190b', '16004', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '12''W', NULL, NULL, 576.0, 748.8),
    ('f5d7ace8-6546-4259-bbd3-32bb0b8c1d41', '16005', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '14''W', NULL, NULL, 672.0, 873.6),
    ('57d235ac-b050-4fea-bb9b-59920a652d68', '16006', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '16''W', NULL, NULL, 768.0, 998.4),
    ('921947d7-6e9b-4424-b7d1-5bf21bf7f4e3', '16007', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '18''W', NULL, NULL, 864.0, 1123.2),
    ('f4736370-bb42-46d7-84ed-35d926dae0ce', '16008', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '20''W', NULL, NULL, 960.0, 1248.0),
    ('00db5916-0384-4257-98a5-f7181ec141ab', '16009', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '22''W', NULL, NULL, 1056.0, 1372.8),
    ('4144033b-5b57-4b62-a843-8482ee8838a9', '16010', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '24''W', NULL, NULL, 1152.0, 1497.6);

-- Batch 49 of 53 (products 961-980)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('01fd4ccd-204f-4010-b924-63dc554f17cd', '16011', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '26''W', NULL, NULL, 1248.0, 1622.4),
    ('db669c45-0955-4bcc-8117-5055e6b80c83', '16012', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '28''W', NULL, NULL, 1344.0, 1747.2),
    ('276a617d-871a-45dd-8325-766aa3e2b220', '16013', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '30''W', NULL, NULL, 1440.0, 1872.0),
    ('f03921d6-79dc-4ede-b239-3601e68174e3', '16014', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '32''W', NULL, NULL, 1536.0, 1996.8),
    ('980e74ef-8eaf-415d-931f-cc3ef78d7b0e', '16015', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '34''W', NULL, NULL, 1632.0, 2121.6),
    ('a36ac8ab-c536-464e-98c8-5414535d20ef', '16016', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '36''W', NULL, NULL, 1728.0, 2246.4),
    ('b84db1ff-6f40-4e33-a72d-51afde840dd8', '16017', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '4''H', 'Width', '38''W', NULL, NULL, 1824.0, 2371.2),
    ('8069bf25-3b56-4c78-a27a-76773dd08665', '16018', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '6''W', NULL, NULL, 360.0, 468.0),
    ('410e2f05-472e-4079-8a85-08f3a4ecb594', '16019', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '8''W', NULL, NULL, 480.0, 624.0),
    ('c31e0516-12cc-4706-adfd-1da898abe924', '16020', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '10''W', NULL, NULL, 600.0, 780.0),
    ('cb7bef96-2b13-461b-82aa-ba360104d8ee', '16021', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '12''W', NULL, NULL, 720.0, 936.0),
    ('7eddc648-f007-4160-a1a4-b7147bfda442', '16022', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '14''W', NULL, NULL, 840.0, 1092.0),
    ('fb1e42c2-f98e-480c-959f-e6bb838aacd2', '16023', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '16''W', NULL, NULL, 960.0, 1248.0),
    ('d30d8776-34e7-4190-a8ba-4379a0940cc0', '16024', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '18''W', NULL, NULL, 1080.0, 1404.0),
    ('1833e360-c85c-4840-87b1-d9395fb8b228', '16025', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '20''W', NULL, NULL, 1200.0, 1560.0),
    ('26e4f6e2-f1ae-4e1e-b65b-e1a98b64d2a1', '16026', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '22''W', NULL, NULL, 1320.0, 1716.0),
    ('d6652a32-2153-4368-809c-7177d840aef8', '16027', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '24''W', NULL, NULL, 1440.0, 1872.0),
    ('0fad7b39-dcf4-4ce6-8fd9-a82b515b1646', '16028', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '26''W', NULL, NULL, 1560.0, 2028.0),
    ('bd6b207c-f825-4ca7-852e-6b9ae7800f25', '16029', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '28''W', NULL, NULL, 1680.0, 2184.0),
    ('8081c33b-b518-4f04-82e8-9ec751256f61', '16030', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '30''W', NULL, NULL, 1800.0, 2340.0);

-- Batch 50 of 53 (products 981-1000)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('5471b4f3-1f94-4ad0-b4dc-c4fc97c550da', '16031', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '32''W', NULL, NULL, 1920.0, 2496.0),
    ('2ca642ee-8e39-4a38-b13e-c057c0809cd9', '16032', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '34''W', NULL, NULL, 2040.0, 2652.0),
    ('3efef9ed-3770-4482-904e-15962d2833b5', '16033', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '36''W', NULL, NULL, 2160.0, 2808.0),
    ('701965d3-4314-46fe-899a-a7f96ea7fb2d', '16034', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '5''H', 'Width', '38''W', NULL, NULL, 2280.0, 2964.0),
    ('9805f21a-4cbc-42db-a997-bb84b46b3ceb', '16035', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '6''W', NULL, NULL, 432.0, 561.6),
    ('aa630209-443b-4591-a6ec-59ccf302a170', '16036', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '8''W', NULL, NULL, 576.0, 748.8),
    ('3c7e3194-2ca7-43a7-8b89-c23897acd965', '16037', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '10''W', NULL, NULL, 720.0, 936.0),
    ('69aa8391-6537-41ea-88cf-522a505f1dc4', '16038', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '12''W', NULL, NULL, 864.0, 1123.2),
    ('f2bce446-bbe6-4554-815c-175254d32fd9', '16039', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '14''W', NULL, NULL, 1008.0, 1310.4),
    ('c65bbcd9-85bd-44e3-b725-5f5d1200fc1f', '16040', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '16''W', NULL, NULL, 1152.0, 1497.6),
    ('876a0737-c749-4048-9bfb-4f187027b31b', '16041', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '18''W', NULL, NULL, 1296.0, 1684.8),
    ('220d4e1b-ef41-42d4-afa7-c8a1ee75fc96', '16042', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '20''W', NULL, NULL, 1440.0, 1872.0),
    ('3dd1ebf7-c577-4c29-bdff-05f1770a45cb', '16043', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '22''W', NULL, NULL, 1584.0, 2059.2),
    ('1ef910f1-bb2e-4aae-9f2c-e55a661a18f5', '16044', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '24''W', NULL, NULL, 1728.0, 2246.4),
    ('91403f08-7b03-4a10-82ee-6db3d67273ca', '16045', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '26''W', NULL, NULL, 1872.0, 2433.6),
    ('da67183e-15ce-4115-9dba-5cd6128dabe5', '16046', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '28''W', NULL, NULL, 2016.0, 2620.8),
    ('2caf6feb-cae9-45cb-b442-8d25db69a359', '16047', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '30''W', NULL, NULL, 2160.0, 2808.0),
    ('337de311-4f37-49e1-ae96-87f913bda63e', '16048', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '32''W', NULL, NULL, 2304.0, 2995.2),
    ('0afa1d97-724a-4529-bd20-e72854868ff4', '16049', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '34''W', NULL, NULL, 2448.0, 3182.4),
    ('cb90ef06-7baa-4b4a-bdf2-2eeb3499e6b1', '16050', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '36''W', NULL, NULL, 2592.0, 3369.6);

-- Batch 51 of 53 (products 1001-1020)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('fc7ca45d-321c-4d82-b454-0b7022ea69b2', '16051', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '6''H', 'Width', '38''W', NULL, NULL, 2736.0, 3556.8),
    ('aee34393-5281-46a8-b154-6464f78f0748', '16052', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '6''W', NULL, NULL, 504.0, 655.2),
    ('e85dc117-93a3-4df6-a8e9-c6cf4c9a062f', '16053', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '8''W', NULL, NULL, 672.0, 873.6),
    ('c7789392-0aed-42fa-9c64-0b8fee281401', '16054', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '10''W', NULL, NULL, 840.0, 1092.0),
    ('abaa0411-d934-488f-85cc-37096c3e9214', '16055', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '12''W', NULL, NULL, 1008.0, 1310.4),
    ('2be8bc06-4901-4b98-bc0b-89df9cf25c21', '16056', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '14''W', NULL, NULL, 1176.0, 1528.8),
    ('5828fdfe-0da8-4228-a5cb-2dec3512ec21', '16057', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '16''W', NULL, NULL, 1344.0, 1747.2),
    ('1eaebbe0-f41b-46a7-b4e8-bf1172adc824', '16058', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '18''W', NULL, NULL, 1512.0, 1965.6),
    ('69643ba4-3a39-4552-ba1e-35f9f2379602', '16059', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '20''W', NULL, NULL, 1680.0, 2184.0),
    ('79157907-6be7-4d2f-9c76-f8424c5a5c8c', '16060', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '22''W', NULL, NULL, 1848.0, 2402.4),
    ('08975975-69ca-477d-8e14-b2c4ebeb64ab', '16061', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '24''W', NULL, NULL, 2016.0, 2620.8),
    ('a4ba9853-3fae-4a86-acb7-161b81791f80', '16062', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '26''W', NULL, NULL, 2184.0, 2839.2),
    ('1fffd29c-09c1-437e-b284-eb2a02ebaf1e', '16063', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '28''W', NULL, NULL, 2352.0, 3057.6),
    ('710e5899-b9ed-44f6-bed8-13c490eedcf3', '16064', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '30''W', NULL, NULL, 2520.0, 3276.0),
    ('d17f82b9-8558-4790-9e1b-b104cd091fb2', '16065', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '32''W', NULL, NULL, 2688.0, 3494.4),
    ('f2789860-8236-48fc-a609-6307079c73fc', '16066', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '34''W', NULL, NULL, 2856.0, 3712.8),
    ('a3ff179a-281c-4854-81bd-1476873312ca', '16067', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '36''W', NULL, NULL, 3024.0, 3931.2),
    ('faea1308-5ea8-4f1c-829c-5f01a7cfb0b2', '16068', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '7''H', 'Width', '38''W', NULL, NULL, 3192.0, 4149.6),
    ('97e89762-c2d1-438c-9a90-27d5119ccb30', '16069', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '6''W', NULL, NULL, 576.0, 748.8),
    ('4db0e970-bfda-4feb-b479-e009b9e3d190', '16070', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '8''W', NULL, NULL, 768.0, 998.4);

-- Batch 52 of 53 (products 1021-1040)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('37f27132-2df1-4beb-980d-e9f42e62956f', '16071', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '10''W', NULL, NULL, 960.0, 1248.0),
    ('87118f8e-5440-471d-b4fc-5eb6815f4fbe', '16072', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '12''W', NULL, NULL, 1152.0, 1497.6),
    ('d10718b8-381a-4884-88ba-71cea701e85f', '16073', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '14''W', NULL, NULL, 1344.0, 1747.2),
    ('3013d00b-3381-4fb3-88bd-c18bd01c5b2d', '16074', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '16''W', NULL, NULL, 1536.0, 1996.8),
    ('6b4a041a-1a31-40f3-a513-ff47b117d29c', '16075', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '18''W', NULL, NULL, 1728.0, 2246.4),
    ('40a0ba95-ca48-4867-8f2d-7694fc4ed1d4', '16076', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '20''W', NULL, NULL, 1920.0, 2496.0),
    ('54687ca0-2c36-4c1d-8f19-d27cd670d8c3', '16077', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '22''W', NULL, NULL, 2112.0, 2745.6),
    ('3d1318f4-044d-44f7-b35b-2d08f0531dfe', '16078', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '24''W', NULL, NULL, 2304.0, 2995.2),
    ('ee19cc0a-5b8c-474d-8d58-3b972ed4a197', '16079', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '26''W', NULL, NULL, 2496.0, 3244.8),
    ('5d01a413-4d20-4134-8676-283d221f484f', '16080', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '28''W', NULL, NULL, 2688.0, 3494.4),
    ('a05455aa-4d9c-47b0-b778-0ce5a729b134', '16081', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '30''W', NULL, NULL, 2880.0, 3744.0),
    ('4c1d4a2b-db4a-4f37-9b74-640472507ac8', '16082', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '32''W', NULL, NULL, 3072.0, 3993.6),
    ('98a30775-25e9-4c56-8737-1b98a74004cd', '16083', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '34''W', NULL, NULL, 3264.0, 4243.2),
    ('5da12f32-448e-47f8-a3e8-a6ea68afc942', '16084', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '36''W', NULL, NULL, 3456.0, 4492.8),
    ('5b4ac034-12a2-4e00-bc02-72c44cd1c2aa', '16085', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '8''H', 'Width', '38''W', NULL, NULL, 3648.0, 4742.4),
    ('89918eb3-ddf3-495c-93bf-d668d0fea025', '16086', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '6''W', NULL, NULL, 720.0, 936.0),
    ('a95dced1-8eb8-464b-a71d-f419c3482baf', '16087', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '8''W', NULL, NULL, 960.0, 1248.0),
    ('e968e44f-d7eb-48cc-824b-b2a36ec51436', '16088', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '10''W', NULL, NULL, 1200.0, 1560.0),
    ('05146917-5bda-4ecb-8b32-f361be45257a', '16089', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '12''W', NULL, NULL, 1440.0, 1872.0),
    ('fab65398-0abb-48e3-a5fc-93a3807f246e', '16090', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '14''W', NULL, NULL, 1680.0, 2184.0);

-- Batch 53 of 53 (products 1041-1051)
INSERT INTO public.chainlink_products (
    uuid, sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES
    ('f64f310e-fd5b-48a6-bfbd-cbb8d0569791', '16091', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '16''W', NULL, NULL, 1920.0, 2496.0),
    ('1ce5f3e7-8452-4d0c-912b-9db118270fd0', '16092', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '18''W', NULL, NULL, 2160.0, 2808.0),
    ('467254ab-1d3b-4f9f-8216-4418244ddca9', '16093', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '20''W', NULL, NULL, 2400.0, 3120.0),
    ('1996b97e-4847-4bd4-bfc1-5e56a6cf9f9d', '16094', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '22''W', NULL, NULL, 2640.0, 3432.0),
    ('674b3413-efd2-4afc-bd97-31f102b2a3b6', '16095', 'Sliding gate - galvanized 1 5/8"', 'Gates', 'Height', '10''H', 'Width', '24''W', NULL, NULL, 2880.0, 3744.0),
    ('39477558-3f9b-43de-94f3-d1f53e98b881', '30001', 'Concrete bags', 'Building material', 'Colour', 'Red', 'Weight', '50 pound', NULL, NULL, 6.05, 8.76),
    ('e8fba369-5051-4051-ac46-d56b24fccfe3', '30004', 'Concrete bags', 'Building material', 'Colour', 'Yellow', 'Weight', '60 pound', NULL, NULL, 4.06, 6.09),
    ('2d11dc7d-6dcd-46d5-baeb-668633aa619b', '30006', 'Concrete bags', 'Building material', 'Colour', 'Yellow', 'Weight', '80 pound', NULL, NULL, 5.3, 6.63),
    ('95ff0823-e158-4972-92db-06f5d64afe86', '40112', 'nuts and bolts', 'Fasteners', 'Size', '5/16" x 1  1/4"', 'Quantity', 'Box', 'Coating', 'Black', 3.99, 13.0),
    ('ee6b11c5-8832-45e2-b16f-683b963179d9', '40122', 'nuts and bolts', 'Fasteners', 'Size', '5/16" x 1  1/4"', 'Quantity', 'Box', 'Coating', ' galvanized', 4.88, 8.0),
    ('9917aaff-13c8-4926-9f2b-a76e8957c6ab', '40512', 'Wedge Anchor galvanized', 'Fasteners', 'Size', '1/2" x 3 3/4"', 'Quantity', '25', NULL, NULL, 5.01, 23.98);

-- Commit the transaction
COMMIT;

-- Verify the count
SELECT COUNT(*) FROM public.chainlink_products;
