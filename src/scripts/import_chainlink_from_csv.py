import csv
import os
import psycopg2
from psycopg2.extras import execute_values

# Database connection parameters (these should be in environment variables in production)
DB_HOST = "localhost"  # Replace with your Supabase database host
DB_PORT = "5432"       # Default PostgreSQL port
DB_NAME = "postgres"   # Default database name
DB_USER = "postgres"   # Default user
DB_PASSWORD = ""       # Add your password here

# CSV file path
CSV_FILE_PATH = r"C:\Users\info\Downloads\Untitled spreadsheet - Sheet1.csv"

def connect_to_db():
    """Connect to the PostgreSQL database server"""
    conn = None
    try:
        # Connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        return conn
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error connecting to the database: {error}")
        if conn is not None:
            conn.close()
        raise

def import_data_from_csv():
    """Import data from CSV file to the database"""
    conn = None
    try:
        conn = connect_to_db()
        cursor = conn.cursor()
        
        # First, truncate the existing table to avoid duplicates
        print("Truncating existing table...")
        cursor.execute("TRUNCATE TABLE public.chainlink_products;")
        
        # Read the CSV file and prepare data for insertion
        print(f"Reading data from {CSV_FILE_PATH}...")
        with open(CSV_FILE_PATH, 'r', encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            products = []
            
            for row in csv_reader:
                # Convert empty strings to None for nullable fields
                for key, value in row.items():
                    if value == '':
                        row[key] = None
                
                # Handle numeric values
                try:
                    supply_price = float(row['supply_price']) if row['supply_price'] else 0
                except (ValueError, TypeError):
                    supply_price = 0
                
                try:
                    retail_price = float(row['retail_price']) if row['retail_price'] else 0
                except (ValueError, TypeError):
                    retail_price = 0
                
                # Create a tuple with the product data
                product = (
                    row['sku'],
                    row['name'],
                    row['product_category'],
                    row['variant_option_one_name'],
                    row['variant_option_one_value'],
                    row['variant_option_two_name'],
                    row['variant_option_two_value'],
                    row['variant_option_three_name'],
                    row['variant_option_three_value'],
                    supply_price,
                    retail_price
                )
                products.append(product)
        
        # Insert data in batches for better performance
        batch_size = 100
        total_products = len(products)
        print(f"Inserting {total_products} products into the database...")
        
        # SQL for inserting products
        insert_sql = """
            INSERT INTO public.chainlink_products (
                sku, name, product_category,
                variant_option_one_name, variant_option_one_value,
                variant_option_two_name, variant_option_two_value,
                variant_option_three_name, variant_option_three_value,
                supply_price, retail_price
            ) VALUES %s
        """
        
        # Insert data in batches
        for i in range(0, total_products, batch_size):
            batch = products[i:i + batch_size]
            execute_values(cursor, insert_sql, batch)
            conn.commit()
            print(f"Inserted batch {i // batch_size + 1} ({len(batch)} products)")
        
        # Verify the count in the database
        cursor.execute("SELECT COUNT(*) FROM public.chainlink_products;")
        count = cursor.fetchone()[0]
        print(f"Total products in database after import: {count}")
        
        # Close the database connection
        cursor.close()
        conn.close()
        print("Database connection closed.")
        
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error: {error}")
        if conn is not None:
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    import_data_from_csv()
