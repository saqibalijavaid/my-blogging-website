from flask import Blueprint, request, jsonify, session
from models.post import (
    create_post, get_all_posts, get_post_by_id, get_posts_by_user_id, update_post, delete_post, get_all_categories_from_db
)
from functools import wraps

post_routes = Blueprint('post_routes', __name__)

# --- Login Required Decorator ---
def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({"message": "❌ Unauthorized. Please log in."}), 401
        return f(*args, **kwargs)
    return wrapper

# --- Create a Post ---
@post_routes.route('/', methods=['POST'])
@login_required
def create_blog_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    image = data.get('image')
    category = data.get('category')
    tags = data.get('tags', [])

    author_id = session['user_id']

    success = create_post(title, content, image, category, tags, author_id)
    if success:
        return jsonify({"message": "✅ Post created successfully!"}), 201
    return jsonify({"message": "❌ Failed to create post."}), 500

# --- Get All Posts ---
@post_routes.route('/', methods=['GET'])
def get_posts():
    category = request.args.get('category')
    search = request.args.get('search')
    posts = get_all_posts(category, search)
    return jsonify(posts), 200

# --- Get Single Post ---
@post_routes.route('/<int:post_id>', methods=['GET'])
def get_single_post(post_id):
    post = get_post_by_id(post_id)
    if post:
        return jsonify(post), 200
    return jsonify({"message": "❌ Post not found"}), 404

@post_routes.route('/mine', methods=['GET'])
@login_required
def get_my_posts():
    user_id = session['user_id']
    posts = get_posts_by_user_id(user_id)
    return jsonify(posts), 200

# --- Update Post ---
@post_routes.route('/<int:post_id>', methods=['PUT'])
@login_required
def update_blog_post(post_id):
    data = request.get_json()
    post = get_post_by_id(post_id)

    if not post:
        return jsonify({"message": "❌ Post not found"}), 404

    if post['author_id'] != session['user_id']:
        return jsonify({"message": "❌ Forbidden: You can only edit your own posts."}), 403

    updated = update_post(post_id, data)
    if updated:
        return jsonify({"message": "✅ Post updated successfully!"}), 200
    return jsonify({"message": "❌ Failed to update post."}), 400

# --- Delete Post ---
@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_blog_post(post_id):
    post = get_post_by_id(post_id)

    if not post:
        return jsonify({"message": "❌ Post not found"}), 404

    if post['author_id'] != session['user_id']:
        return jsonify({"message": "❌ Forbidden: You can only delete your own posts."}), 403

    deleted = delete_post(post_id)
    if deleted:
        return jsonify({"message": "🗑️ Post deleted successfully!"}), 200
    return jsonify({"message": "❌ Failed to delete post."}), 400

@post_routes.route('/categories', methods=['GET'])
@login_required
def get_all_categories():
    categories = get_all_categories_from_db()
    return jsonify(categories), 200
