import json
import os

# Path to the JSON file
json_file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'complete-pricebook.json')

# Path to output SQL file
sql_file_path = os.path.join(os.path.dirname(__file__), 'insert_chainlink_products.sql')

def determine_product_category(product):
    """Determine product category based on name and description."""
    name = product.get('name', '').lower()
    description = product.get('description', '').lower()
    
    if 'mesh' in name or 'mesh' in description:
        return 'Chain Link Mesh'
    elif 'post' in name or 'postpipe' in description:
        return 'Chain Link Posts'
    elif 'gate' in name and ('chain' in description or 'link' in description):
        return 'Chain Link Gates'
    elif 'chain link' in description and 'accessory' in description:
        return 'Chain Link Accessories'
    else:
        return 'Uncategorized'

def generate_sql():
    """Generate SQL INSERT statements from JSON data."""
    try:
        # Read the JSON file
        with open(json_file_path, 'r', encoding='utf-8') as file:
            products = json.load(file)
        
        print(f"Total products in JSON file: {len(products)}")
        
        # Start writing SQL
        with open(sql_file_path, 'w', encoding='utf-8') as sql_file:
            # Write transaction start
            sql_file.write("BEGIN;\n\n")
            
            # Write truncate statement to clear existing data
            sql_file.write("TRUNCATE TABLE public.chainlink_products;\n\n")
            
            # Write insert statements
            for product in products:
                sku = product.get('sku', '')
                name = product.get('name', '').replace("'", "''")  # Escape single quotes
                product_category = determine_product_category(product)
                
                # Extract variant options
                variations = product.get('variations', [])
                variant_option_one_name = "NULL"
                variant_option_one_value = "NULL"
                variant_option_two_name = "NULL"
                variant_option_two_value = "NULL"
                variant_option_three_name = "NULL"
                variant_option_three_value = "NULL"
                
                if variations and len(variations) > 0:
                    if 'name' in variations[0] and variations[0]['name']:
                        variant_option_one_name = f"'{variations[0]['name'].replace("'", "''")}'"
                    if 'options' in variations[0] and variations[0]['options'] and len(variations[0]['options']) > 0:
                        if 'value' in variations[0]['options'][0] and variations[0]['options'][0]['value']:
                            variant_option_one_value = f"'{variations[0]['options'][0]['value'].replace("'", "''")}'"
                
                if variations and len(variations) > 1:
                    if 'name' in variations[1] and variations[1]['name']:
                        variant_option_two_name = f"'{variations[1]['name'].replace("'", "''")}'"
                    if 'options' in variations[1] and variations[1]['options'] and len(variations[1]['options']) > 0:
                        if 'value' in variations[1]['options'][0] and variations[1]['options'][0]['value']:
                            variant_option_two_value = f"'{variations[1]['options'][0]['value'].replace("'", "''")}'"
                
                if variations and len(variations) > 2:
                    if 'name' in variations[2] and variations[2]['name']:
                        variant_option_three_name = f"'{variations[2]['name'].replace("'", "''")}'"
                    if 'options' in variations[2] and variations[2]['options'] and len(variations[2]['options']) > 0:
                        if 'value' in variations[2]['options'][0] and variations[2]['options'][0]['value']:
                            variant_option_three_value = f"'{variations[2]['options'][0]['value'].replace("'", "''")}'"
                
                # Get prices
                base_price = product.get('basePrice', '0')
                try:
                    supply_price = float(base_price)
                    retail_price = supply_price  # Using same value for retail price
                except (ValueError, TypeError):
                    supply_price = 0
                    retail_price = 0
                
                # Write insert statement
                sql_file.write(
                    f"INSERT INTO public.chainlink_products "
                    f"(sku, name, product_category, "
                    f"variant_option_one_name, variant_option_one_value, "
                    f"variant_option_two_name, variant_option_two_value, "
                    f"variant_option_three_name, variant_option_three_value, "
                    f"supply_price, retail_price) VALUES "
                    f"('{sku}', '{name}', '{product_category}', "
                    f"{variant_option_one_name}, {variant_option_one_value}, "
                    f"{variant_option_two_name}, {variant_option_two_value}, "
                    f"{variant_option_three_name}, {variant_option_three_value}, "
                    f"{supply_price}, {retail_price});\n"
                )
            
            # Write transaction end and count verification
            sql_file.write("\nCOMMIT;\n\n")
            sql_file.write("-- Verify count\n")
            sql_file.write("SELECT COUNT(*) FROM public.chainlink_products;\n")
        
        print(f"SQL file generated at: {sql_file_path}")
        print(f"Total INSERT statements: {len(products)}")
        
    except Exception as e:
        print(f"Error generating SQL: {e}")

if __name__ == "__main__":
    generate_sql()
