import csv
import os
from pathlib import Path

# CSV file path
CSV_FILE_PATH = Path(r"C:\Users\info\Downloads\Untitled spreadsheet - Sheet1.csv")
OUTPUT_SQL_FILE = Path(r"C:\Users\info\crmcalc\src\scripts\complete_import.sql")

def escape_sql_string(s):
    """Escape single quotes in SQL strings"""
    if s is None or s == '':
        return "NULL"
    return "'" + str(s).replace("'", "''") + "'"

def format_value(value, is_numeric=False):
    """Format a value for SQL insertion"""
    if value is None or value == '':
        return "NULL"
    if is_numeric:
        try:
            return str(float(value))
        except (ValueError, TypeError):
            return "0"
    return escape_sql_string(value)

def generate_sql_file():
    """Generate a complete SQL file from the CSV data"""
    if not CSV_FILE_PATH.exists():
        print(f"Error: CSV file not found at {CSV_FILE_PATH}")
        return
    
    print(f"Reading data from {CSV_FILE_PATH}...")
    
    try:
        # Read the CSV file
        with open(CSV_FILE_PATH, 'r', encoding='utf-8-sig') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            rows = list(csv_reader)
        
        total_rows = len(rows)
        print(f"Found {total_rows} products in the CSV file")
        
        # Create the SQL file
        with open(OUTPUT_SQL_FILE, 'w', encoding='utf-8') as sql_file:
            # Write header
            sql_file.write("-- Generated SQL for importing all chainlink products\n")
            sql_file.write("-- Total products: " + str(total_rows) + "\n\n")
            
            # Write truncate statement
            sql_file.write("-- First, truncate the existing table to avoid duplicates\n")
            sql_file.write("TRUNCATE TABLE public.chainlink_products;\n\n")
            
            # Write begin transaction
            sql_file.write("-- Begin transaction\n")
            sql_file.write("BEGIN;\n\n")
            
            # Process in batches of 20 products
            batch_size = 20
            batch_count = (total_rows + batch_size - 1) // batch_size  # Ceiling division
            
            for batch_num in range(batch_count):
                start_idx = batch_num * batch_size
                end_idx = min((batch_num + 1) * batch_size, total_rows)
                batch = rows[start_idx:end_idx]
                
                # Write batch header
                sql_file.write(f"-- Batch {batch_num + 1} of {batch_count} (products {start_idx + 1}-{end_idx})\n")
                sql_file.write("INSERT INTO public.chainlink_products (\n")
                sql_file.write("    sku, name, product_category,\n")
                sql_file.write("    variant_option_one_name, variant_option_one_value,\n")
                sql_file.write("    variant_option_two_name, variant_option_two_value,\n")
                sql_file.write("    variant_option_three_name, variant_option_three_value,\n")
                sql_file.write("    supply_price, retail_price\n")
                sql_file.write(") VALUES\n")
                
                # Process each row in the batch
                for i, row in enumerate(batch):
                    sku = format_value(row.get('sku', ''))
                    name = format_value(row.get('name', ''))
                    product_category = format_value(row.get('product_category', ''))
                    
                    variant_option_one_name = format_value(row.get('variant_option_one_name', ''))
                    variant_option_one_value = format_value(row.get('variant_option_one_value', ''))
                    
                    variant_option_two_name = format_value(row.get('variant_option_two_name', ''))
                    variant_option_two_value = format_value(row.get('variant_option_two_value', ''))
                    
                    variant_option_three_name = format_value(row.get('variant_option_three_name', ''))
                    variant_option_three_value = format_value(row.get('variant_option_three_value', ''))
                    
                    supply_price = format_value(row.get('supply_price', 0), is_numeric=True)
                    retail_price = format_value(row.get('retail_price', 0), is_numeric=True)
                    
                    # Format the values
                    values = []
                    values.append(sku)
                    values.append(name)
                    values.append(product_category)
                    values.append(variant_option_one_name)
                    values.append(variant_option_one_value)
                    values.append(variant_option_two_name)
                    values.append(variant_option_two_value)
                    values.append(variant_option_three_name)
                    values.append(variant_option_three_value)
                    values.append(supply_price)
                    values.append(retail_price)
                    
                    # Write the values
                    sql_file.write(f"    ({', '.join(values)})")
                    
                    # Add comma if not the last row in the batch
                    if i < len(batch) - 1:
                        sql_file.write(",\n")
                    else:
                        sql_file.write(";\n\n")
            
            # Write commit transaction
            sql_file.write("-- Commit the transaction\n")
            sql_file.write("COMMIT;\n\n")
            
            # Write verification query
            sql_file.write("-- Verify the count\n")
            sql_file.write("SELECT COUNT(*) FROM public.chainlink_products;\n")
        
        print(f"SQL file generated successfully at {OUTPUT_SQL_FILE}")
        print(f"Total products: {total_rows}")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    generate_sql_file()
