import pymysql
from datetime import datetime
from config import Config

def get_db_connection():
    return pymysql.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME,
        port=Config.DB_PORT,
        cursorclass=pymysql.cursors.DictCursor
    )


# Function to create a new user
def create_user(name, email, password, profile_picture, has_custom_picture):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            # Check if the user already exists
            cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
            if cursor.fetchone():
                return False  # User already exists

            # Insert the new user into the database
            cursor.execute(""" 
                INSERT INTO users (name, email, password, profile_picture, has_custom_picture, created_at)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (name, email, password, profile_picture, has_custom_picture, datetime.now()))

            connection.commit()
            return True  # Successfully created user

    except Exception as e:
        print("Error during database operation:", e)
        return False

    finally:
        if 'connection' in locals():
            connection.close()

# Add this function below the create_user function
def find_user_by_email(email):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
            user = cursor.fetchone()
            return user
    except Exception as e:
        print("Error fetching user by email:", e)
        return None
    finally:
        if 'connection' in locals():
            connection.close()
