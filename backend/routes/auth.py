from flask import Blueprint, request, jsonify, session, make_response
from models.user import create_user, find_user_by_email
from datetime import datetime
import logging
from werkzeug.security import generate_password_hash, check_password_hash

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Blueprint
auth_routes = Blueprint('auth_routes', __name__)

# -------------------- SIGNUP ROUTE --------------------
@auth_routes.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        profile_picture = data.get('profilePicture')
        has_custom_picture = data.get('hasCustomPicture')

        # Hash password before saving
        # hashed_password = generate_password_hash(password)

        result = create_user(name, email, password, profile_picture, has_custom_picture)

        if result:
            return jsonify({"message": "✅ User created successfully!"}), 201
        else:
            return jsonify({"message": "❌ User already exists with this email."}), 409

    except Exception as e:
        print("Error during signup:", e)
        return jsonify({"message": f"Error: {e}"}), 500

# -------------------- SIGNIN ROUTE --------------------
@auth_routes.route('/signin', methods=['POST'])
def signin():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = find_user_by_email(email)

        if not user:
            return jsonify({"message": "❌ No user found with this email."}), 404

        # Check hashed password
        # if not check_password_hash(user['password'], password):
        if user['password'] != password:
            return jsonify({"message": "❌ Incorrect password."}), 401

        # Set session data
        session['user_id'] = user['id']
        session['user_name'] = user['name']
        session['user_email'] = user['email']
        # session['profile_picture'] = user['profile_picture']
        # session['has_custom_picture'] = user['has_custom_picture']

        return jsonify({
            "message": "✅ Sign-in successful!",
            "user": {
                "id": user['id'],
                "name": user['name'],
                "email": user['email'],
                "profile_picture": user['profile_picture'],
                "has_custom_picture": user['has_custom_picture']
            }
        }), 200

    except Exception as e:
        print("Error during signin:", e)
        return jsonify({"message": f"Error: {e}"}), 500

# -------------------- SIGNOUT ROUTE --------------------
@auth_routes.route('/signout', methods=['POST'])
def signout():
    session.clear()
    return jsonify({"message": "👋 Logged out successfully!"}), 200
