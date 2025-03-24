import csv
import os
import subprocess
import json
from pathlib import Path

# CSV file path
CSV_FILE_PATH = Path(r"C:\Users\info\Downloads\Untitled spreadsheet - Sheet1.csv")

# Batch size for inserts
BATCH_SIZE = 50

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

def generate_insert_sql(rows, batch_num):
    """Generate SQL INSERT statement for a batch of rows"""
    sql = f"-- Batch {batch_num}\n"
    sql += "INSERT INTO public.chainlink_products (\n"
    sql += "    sku, name, product_category,\n"
    sql += "    variant_option_one_name, variant_option_one_value,\n"
    sql += "    variant_option_two_name, variant_option_two_value,\n"
    sql += "    variant_option_three_name, variant_option_three_value,\n"
    sql += "    supply_price, retail_price\n"
    sql += ") VALUES\n"
    
    values_list = []
    for row in rows:
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
        
        values = f"({sku}, {name}, {product_category}, "
        values += f"{variant_option_one_name}, {variant_option_one_value}, "
        values += f"{variant_option_two_name}, {variant_option_two_value}, "
        values += f"{variant_option_three_name}, {variant_option_three_value}, "
        values += f"{supply_price}, {retail_price})"
        
        values_list.append(values)
    
    sql += ",\n".join(values_list)
    sql += ";"
    
    return sql

def execute_sql(sql):
    """Execute SQL using the MCP server via a temporary file"""
    temp_file = Path("temp_sql.sql")
    with open(temp_file, "w", encoding="utf-8") as f:
        f.write(sql)
    
    try:
        # Execute the SQL using the MCP server
        result = subprocess.run(
            ["mcp", "execute", "-f", str(temp_file)],
            capture_output=True,
            text=True,
            check=True
        )
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error executing SQL: {e}")
        print(f"Stdout: {e.stdout}")
        print(f"Stderr: {e.stderr}")
        return False
    finally:
        # Clean up the temporary file
        if temp_file.exists():
            temp_file.unlink()

def main():
    """Main function to import data from CSV"""
    if not CSV_FILE_PATH.exists():
        print(f"Error: CSV file not found at {CSV_FILE_PATH}")
        return
    
    print(f"Reading data from {CSV_FILE_PATH}...")
    
    # Read the CSV file
    with open(CSV_FILE_PATH, 'r', encoding='utf-8-sig') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        rows = list(csv_reader)
    
    total_rows = len(rows)
    print(f"Found {total_rows} products in the CSV file")
    
    # First, truncate the existing table
    truncate_sql = "TRUNCATE TABLE public.chainlink_products;"
    print("Truncating existing table...")
    if not execute_sql(truncate_sql):
        print("Failed to truncate table. Aborting.")
        return
    
    # Process in batches
    batch_count = (total_rows + BATCH_SIZE - 1) // BATCH_SIZE  # Ceiling division
    for i in range(batch_count):
        start_idx = i * BATCH_SIZE
        end_idx = min((i + 1) * BATCH_SIZE, total_rows)
        batch = rows[start_idx:end_idx]
        
        print(f"Processing batch {i+1}/{batch_count} (rows {start_idx+1}-{end_idx})")
        
        # Generate and execute SQL for this batch
        sql = generate_insert_sql(batch, i+1)
        
        # Save SQL to a file for debugging
        batch_file = Path(f"batch_{i+1}.sql")
        with open(batch_file, "w", encoding="utf-8") as f:
            f.write(sql)
        
        print(f"Executing batch {i+1}...")
        if not execute_sql(sql):
            print(f"Failed to execute batch {i+1}. Stopping.")
            return
    
    # Verify the count
    verify_sql = "SELECT COUNT(*) FROM public.chainlink_products;"
    print("Verifying count...")
    execute_sql(verify_sql)
    
    print("Import completed successfully!")

if __name__ == "__main__":
    main()
