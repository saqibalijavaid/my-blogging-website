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

# Find user by ID (used in /me GET route)
def find_user_by_id(user_id):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
            user = cursor.fetchone()
            return user
    except Exception as e:
        print("Error fetching user by ID:", e)
        return None
    finally:
        if 'connection' in locals():
            connection.close()

# Update user profile (used in /me PUT route)
def update_user(user_id, data):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            fields = []
            values = []

            if 'name' in data:
                fields.append("name = %s")
                values.append(data['name'])
            if 'profile_picture' in data:
                fields.append("profile_picture = %s")
                values.append(data['profile_picture'])
            if 'has_custom_picture' in data:
                fields.append("has_custom_picture = %s")
                values.append(data['has_custom_picture'])

            if not fields:
                return False  # Nothing to update

            values.append(user_id)
            query = f"UPDATE users SET {', '.join(fields)} WHERE id = %s"
            cursor.execute(query, tuple(values))
            connection.commit()
            return cursor.rowcount > 0
    except Exception as e:
        print("Error updating user:", e)
        return False
    finally:
        if 'connection' in locals():
            connection.close()

# Delete user (used in /delete route)
def delete_user(user_id):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
            connection.commit()
            return cursor.rowcount > 0
    except Exception as e:
        print("Error deleting user:", e)
        return False
    finally:
        if 'connection' in locals():
            connection.close()
