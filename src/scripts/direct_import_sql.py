import csv
import os

# CSV file path
CSV_FILE_PATH = r"C:\Users\info\Downloads\Untitled spreadsheet - Sheet1.csv"

# Output SQL file
OUTPUT_SQL_FILE = r"C:\Users\info\crmcalc\src\scripts\import_all_products.sql"

def generate_sql_from_csv():
    """Generate SQL INSERT statements from CSV file"""
    try:
        print(f"Reading data from {CSV_FILE_PATH}...")
        
        # Check if the file exists
        if not os.path.exists(CSV_FILE_PATH):
            print(f"Error: File not found at {CSV_FILE_PATH}")
            return
            
        # Read the CSV file and prepare data for insertion
        with open(CSV_FILE_PATH, 'r', encoding='utf-8-sig') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            
            # Open the output SQL file
            with open(OUTPUT_SQL_FILE, 'w', encoding='utf-8') as sql_file:
                # Write the truncate statement
                sql_file.write("-- Truncate the existing table to avoid duplicates\n")
                sql_file.write("TRUNCATE TABLE public.chainlink_products;\n\n")
                
                # Write the begin transaction statement
                sql_file.write("-- Begin transaction\n")
                sql_file.write("BEGIN;\n\n")
                
                # Write the insert statement header
                sql_file.write("-- Insert all products\n")
                sql_file.write("INSERT INTO public.chainlink_products (\n")
                sql_file.write("    sku, name, product_category,\n")
                sql_file.write("    variant_option_one_name, variant_option_one_value,\n")
                sql_file.write("    variant_option_two_name, variant_option_two_value,\n")
                sql_file.write("    variant_option_three_name, variant_option_three_value,\n")
                sql_file.write("    supply_price, retail_price\n")
                sql_file.write(") VALUES\n")
                
                # Process each row and write the values
                product_count = 0
                rows = list(csv_reader)  # Convert to list to get count
                total_rows = len(rows)
                
                for row in rows:
                    product_count += 1
                    
                    # Handle empty values and escape single quotes in strings
                    sku = row['sku'] if row['sku'] else ''
                    name = row['name'].replace("'", "''") if row['name'] else ''
                    product_category = row['product_category'].replace("'", "''") if row['product_category'] else ''
                    
                    variant_option_one_name = row['variant_option_one_name'].replace("'", "''") if row['variant_option_one_name'] else None
                    variant_option_one_value = row['variant_option_one_value'].replace("'", "''") if row['variant_option_one_value'] else None
                    
                    variant_option_two_name = row['variant_option_two_name'].replace("'", "''") if row['variant_option_two_name'] else None
                    variant_option_two_value = row['variant_option_two_value'].replace("'", "''") if row['variant_option_two_value'] else None
                    
                    variant_option_three_name = row['variant_option_three_name'].replace("'", "''") if row['variant_option_three_name'] else None
                    variant_option_three_value = row['variant_option_three_value'].replace("'", "''") if row['variant_option_three_value'] else None
                    
                    # Handle numeric values
                    try:
                        supply_price = float(row['supply_price']) if row['supply_price'] else 0
                    except (ValueError, TypeError):
                        supply_price = 0
                    
                    try:
                        retail_price = float(row['retail_price']) if row['retail_price'] else 0
                    except (ValueError, TypeError):
                        retail_price = 0
                    
                    # Format the values for SQL
                    values = []
                    values.append(f"'{sku}'")
                    values.append(f"'{name}'")
                    values.append(f"'{product_category}'")
                    
                    values.append("NULL" if variant_option_one_name is None else f"'{variant_option_one_name}'")
                    values.append("NULL" if variant_option_one_value is None else f"'{variant_option_one_value}'")
                    
                    values.append("NULL" if variant_option_two_name is None else f"'{variant_option_two_name}'")
                    values.append("NULL" if variant_option_two_value is None else f"'{variant_option_two_value}'")
                    
                    values.append("NULL" if variant_option_three_name is None else f"'{variant_option_three_name}'")
                    values.append("NULL" if variant_option_three_value is None else f"'{variant_option_three_value}'")
                    
                    values.append(str(supply_price))
                    values.append(str(retail_price))
                    
                    # Write the values
                    sql_file.write(f"    ({', '.join(values)})")
                    
                    # Add comma if not the last row
                    if product_count < total_rows:
                        sql_file.write(",\n")
                    else:
                        sql_file.write(";\n\n")
                
                # Write the commit statement
                sql_file.write("-- Commit the transaction\n")
                sql_file.write("COMMIT;\n\n")
                
                # Write a verification query
                sql_file.write("-- Verify the count\n")
                sql_file.write("SELECT COUNT(*) FROM public.chainlink_products;\n")
                
                print(f"SQL file generated successfully with {product_count} products.")
                print(f"Output file: {OUTPUT_SQL_FILE}")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    generate_sql_from_csv()
