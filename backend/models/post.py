import pymysql
import json
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

# --- CREATE ---
def create_post(title, content, image, category_id, tags, author_id):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO posts (title, content, image, category_id, tags, author_id, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (
                title, content, image, category_id, json.dumps(tags), author_id, datetime.now()
            ))
            connection.commit()
            return True
    except Exception as e:
        print("Error creating post:", e)
        return False
    finally:
        if 'connection' in locals():
            connection.close()

# --- READ ALL POSTS ---
def get_all_posts(category_id=None, search=None):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            query = """
                SELECT posts.*, categories.name AS category_name
                FROM posts
                LEFT JOIN categories ON posts.category_id = categories.id
                WHERE 1=1
            """
            values = []

            if category_id:
                query += " AND posts.category_id = %s"
                values.append(category_id)

            if search:
                query += " AND posts.title LIKE %s"
                values.append(f"%{search}%")

            query += " ORDER BY posts.created_at DESC"
            cursor.execute(query, values)
            results = cursor.fetchall()

            for post in results:
                post['tags'] = json.loads(post['tags'])

            return results
    except Exception as e:
        print("Error fetching posts:", e)
        return []
    finally:
        if 'connection' in locals():
            connection.close()

# --- READ SINGLE POST ---
def get_post_by_id(post_id):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT posts.*, categories.name AS category_name
                FROM posts
                LEFT JOIN categories ON posts.category_id = categories.id
                WHERE posts.id = %s
            """, (post_id,))
            post = cursor.fetchone()
            if post:
                post['tags'] = json.loads(post['tags'])
            return post
    except Exception as e:
        print("Error fetching post:", e)
        return None
    finally:
        if 'connection' in locals():
            connection.close()

# --- READ POSTS BY USER ID (For Loggedin User) ---
def get_posts_by_user_id(user_id):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT posts.*, categories.name AS category_name
                FROM posts
                LEFT JOIN categories ON posts.category_id = categories.id
                WHERE posts.author_id = %s
                ORDER BY posts.created_at DESC
            """, (user_id,))
            posts = cursor.fetchall()
            for post in posts:
                post['tags'] = json.loads(post['tags'])
            return posts
    except Exception as e:
        print("Error fetching user posts:", e)
        return []
    finally:
        if 'connection' in locals():
            connection.close()

# --- UPDATE ---
def update_post(post_id, data):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            fields = []
            values = []

            for key in ['title', 'content', 'image', 'category_id', 'tags']:
                if key in data:
                    if key == 'tags':
                        fields.append(f"{key} = %s")
                        values.append(json.dumps(data[key]))
                    else:
                        fields.append(f"{key} = %s")
                        values.append(data[key])

            values.append(post_id)
            sql = f"UPDATE posts SET {', '.join(fields)}, updated_at = NOW() WHERE id = %s"
            cursor.execute(sql, tuple(values))
            connection.commit()
            return cursor.rowcount > 0
    except Exception as e:
        print("Error updating post:", e)
        return False
    finally:
        if 'connection' in locals():
            connection.close()

# def update_post(post_id, data):
#     try:
#         connection = get_db_connection()
#         with connection.cursor() as cursor:
#             fields = []
#             values = []

#             # Fix: handle 'category' as 'category_id'
#             if 'category' in data:
#                 data['category_id'] = data.pop('category')

#             for key in ['title', 'content', 'image', 'category_id', 'tags']:
#                 if key in data:
#                     if key == 'tags':
#                         fields.append(f"{key} = %s")
#                         values.append(json.dumps(data[key]))
#                     else:
#                         fields.append(f"{key} = %s")
#                         values.append(data[key])

#             values.append(post_id)
#             sql = f"UPDATE posts SET {', '.join(fields)}, updated_at = NOW() WHERE id = %s"
#             cursor.execute(sql, tuple(values))
#             connection.commit()
#             return cursor.rowcount > 0
#     except Exception as e:
#         print("Error updating post:", e)
#         return False
#     finally:
#         if 'connection' in locals():
#             connection.close()


# --- DELETE ---
def delete_post(post_id):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM posts WHERE id = %s", (post_id,))
            connection.commit()
            return cursor.rowcount > 0
    except Exception as e:
        print("Error deleting post:", e)
        return False
    finally:
        if 'connection' in locals():
            connection.close()

# --- FETCH ALL CATEGORIES ---
def get_all_categories_from_db():
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM categories")
            return cursor.fetchall()
    finally:
        connection.close()
