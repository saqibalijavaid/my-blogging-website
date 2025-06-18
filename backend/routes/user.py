from flask import Blueprint, session, jsonify, request
from models.user import find_user_by_id, update_user, delete_user  # You'll define these
from functools import wraps

user_routes = Blueprint('user_routes', __name__)

# --- Decorator to require login ---
def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({"message": "❌ Unauthorized. Please log in."}), 401
        return f(*args, **kwargs)
    return wrapper

# --- Get current user profile ---
@user_routes.route('/me', methods=['GET'])
@login_required
def get_current_user():
    user_id = session['user_id']
    user = find_user_by_id(user_id)
    if user:
        return jsonify({
            "id": user['id'],
            "name": user['name'],
            "email": user['email'],
            "profile_picture": user['profile_picture'],
            "has_custom_picture": user['has_custom_picture']
        })
    return jsonify({"message": "❌ User not found"}), 404

# --- Update profile ---
@user_routes.route('/me', methods=['PUT'])
@login_required
def update_profile():
    user_id = session['user_id']
    data = request.get_json()
    updated = update_user(user_id, data)
    if updated:
        return jsonify({"message": "✅ Profile updated successfully!"})
    return jsonify({"message": "❌ Failed to update profile"}), 400

# --- Delete account ---
@user_routes.route('/delete', methods=['DELETE'])
@login_required
def delete_account():
    user_id = session['user_id']
    deleted = delete_user(user_id)
    if deleted:
        session.clear()
        return jsonify({"message": "🗑️ Account deleted and logged out."})
    return jsonify({"message": "❌ Failed to delete account"}), 400
