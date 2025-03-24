# PowerShell script to import CSV data into Supabase

# CSV file path
$csvFilePath = "C:\Users\info\Downloads\Untitled spreadsheet - Sheet1.csv"

# Output SQL file path
$sqlFilePath = "C:\Users\info\crmcalc\src\scripts\import_all_products.sql"

# Check if the CSV file exists
if (-not (Test-Path $csvFilePath)) {
    Write-Error "CSV file not found at $csvFilePath"
    exit 1
}

# Read the CSV file
Write-Host "Reading data from $csvFilePath..."
$products = Import-Csv -Path $csvFilePath

# Count the products
$productCount = $products.Count
Write-Host "Found $productCount products in the CSV file"

# Create the SQL file
Write-Host "Generating SQL file at $sqlFilePath..."
Set-Content -Path $sqlFilePath -Value "-- Truncate the existing table to avoid duplicates
TRUNCATE TABLE public.chainlink_products;

-- Begin transaction
BEGIN;

-- Insert all products
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES"

# Process each product
$counter = 0
foreach ($product in $products) {
    $counter++
    
    # Handle empty values and escape single quotes in strings
    $sku = if ([string]::IsNullOrEmpty($product.sku)) { "''" } else { "'" + $product.sku + "'" }
    $name = if ([string]::IsNullOrEmpty($product.name)) { "''" } else { "'" + $product.name.Replace("'", "''") + "'" }
    $productCategory = if ([string]::IsNullOrEmpty($product.product_category)) { "''" } else { "'" + $product.product_category.Replace("'", "''") + "'" }
    
    $variantOptionOneName = if ([string]::IsNullOrEmpty($product.variant_option_one_name)) { "NULL" } else { "'" + $product.variant_option_one_name.Replace("'", "''") + "'" }
    $variantOptionOneValue = if ([string]::IsNullOrEmpty($product.variant_option_one_value)) { "NULL" } else { "'" + $product.variant_option_one_value.Replace("'", "''") + "'" }
    
    $variantOptionTwoName = if ([string]::IsNullOrEmpty($product.variant_option_two_name)) { "NULL" } else { "'" + $product.variant_option_two_name.Replace("'", "''") + "'" }
    $variantOptionTwoValue = if ([string]::IsNullOrEmpty($product.variant_option_two_value)) { "NULL" } else { "'" + $product.variant_option_two_value.Replace("'", "''") + "'" }
    
    $variantOptionThreeName = if ([string]::IsNullOrEmpty($product.variant_option_three_name)) { "NULL" } else { "'" + $product.variant_option_three_name.Replace("'", "''") + "'" }
    $variantOptionThreeValue = if ([string]::IsNullOrEmpty($product.variant_option_three_value)) { "NULL" } else { "'" + $product.variant_option_three_value.Replace("'", "''") + "'" }
    
    # Handle numeric values
    $supplyPrice = if ([string]::IsNullOrEmpty($product.supply_price)) { "0" } else { $product.supply_price }
    $retailPrice = if ([string]::IsNullOrEmpty($product.retail_price)) { "0" } else { $product.retail_price }
    
    # Create the SQL values
    $values = "    ($sku, $name, $productCategory, $variantOptionOneName, $variantOptionOneValue, $variantOptionTwoName, $variantOptionTwoValue, $variantOptionThreeName, $variantOptionThreeValue, $supplyPrice, $retailPrice)"
    
    # Add comma if not the last product
    if ($counter -lt $productCount) {
        $values += ","
    } else {
        $values += ";"
    }
    
    # Append to the SQL file
    Add-Content -Path $sqlFilePath -Value $values
    
    # Show progress
    if ($counter % 100 -eq 0 -or $counter -eq $productCount) {
        Write-Host "Processed $counter of $productCount products"
    }
}

# Add commit and verification
Add-Content -Path $sqlFilePath -Value "

-- Commit the transaction
COMMIT;

-- Verify the count
SELECT COUNT(*) FROM public.chainlink_products;"

Write-Host "SQL file generated successfully with $productCount products"
Write-Host "Output file: $sqlFilePath"
