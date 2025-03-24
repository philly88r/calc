import csv
import os
import json
from pathlib import Path

# CSV file path
CSV_FILE_PATH = Path(r"C:\Users\info\Downloads\Untitled spreadsheet - Sheet1.csv")

def read_csv_and_generate_inserts():
    """Read the CSV file and generate SQL INSERT statements"""
    try:
        print(f"Reading data from {CSV_FILE_PATH}...")
        
        # Check if the file exists
        if not CSV_FILE_PATH.exists():
            print(f"Error: File not found at {CSV_FILE_PATH}")
            return
        
        # Read the CSV file
        with open(CSV_FILE_PATH, 'r', encoding='utf-8-sig') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            rows = list(csv_reader)
            
            print(f"Successfully read {len(rows)} rows from CSV file")
            
            # Print the first row as a sample
            if rows:
                print("\nSample row:")
                print(json.dumps(dict(rows[0]), indent=2))
            
            # Generate SQL for each row
            for i, row in enumerate(rows[:5]):  # Just process the first 5 rows as a test
                print(f"\nGenerating SQL for row {i+1}:")
                
                # Format values for SQL
                sku = row.get('sku', '')
                name = row.get('name', '').replace("'", "''")
                product_category = row.get('product_category', '').replace("'", "''")
                
                variant_option_one_name = row.get('variant_option_one_name', '').replace("'", "''") if row.get('variant_option_one_name') else 'NULL'
                variant_option_one_value = row.get('variant_option_one_value', '').replace("'", "''") if row.get('variant_option_one_value') else 'NULL'
                
                variant_option_two_name = row.get('variant_option_two_name', '').replace("'", "''") if row.get('variant_option_two_name') else 'NULL'
                variant_option_two_value = row.get('variant_option_two_value', '').replace("'", "''") if row.get('variant_option_two_value') else 'NULL'
                
                variant_option_three_name = row.get('variant_option_three_name', '').replace("'", "''") if row.get('variant_option_three_name') else 'NULL'
                variant_option_three_value = row.get('variant_option_three_value', '').replace("'", "''") if row.get('variant_option_three_value') else 'NULL'
                
                # Handle numeric values
                try:
                    supply_price = float(row.get('supply_price', 0)) if row.get('supply_price') else 0
                except (ValueError, TypeError):
                    supply_price = 0
                
                try:
                    retail_price = float(row.get('retail_price', 0)) if row.get('retail_price') else 0
                except (ValueError, TypeError):
                    retail_price = 0
                
                # Generate SQL
                sql = f"""
INSERT INTO public.chainlink_products (
    sku, name, product_category,
    variant_option_one_name, variant_option_one_value,
    variant_option_two_name, variant_option_two_value,
    variant_option_three_name, variant_option_three_value,
    supply_price, retail_price
) VALUES (
    '{sku}', '{name}', '{product_category}',
    {'NULL' if variant_option_one_name == 'NULL' else f"'{variant_option_one_name}'"}, 
    {'NULL' if variant_option_one_value == 'NULL' else f"'{variant_option_one_value}'"}, 
    {'NULL' if variant_option_two_name == 'NULL' else f"'{variant_option_two_name}'"}, 
    {'NULL' if variant_option_two_value == 'NULL' else f"'{variant_option_two_value}'"}, 
    {'NULL' if variant_option_three_name == 'NULL' else f"'{variant_option_three_name}'"}, 
    {'NULL' if variant_option_three_value == 'NULL' else f"'{variant_option_three_value}'"}, 
    {supply_price}, {retail_price}
);
"""
                print(sql)
    
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    read_csv_and_generate_inserts()
