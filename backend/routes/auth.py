from flask import Blueprint, request, jsonify
from models.user import create_user  # Importing the create_user function from the user model
from models.user import find_user_by_email  # Importing the find_user_by_email function from the user model
from datetime import datetime
import logging

# Configure logging to print to console
logging.basicConfig(level=logging.DEBUG)

# Creating a Blueprint for authentication-related routes
auth_routes = Blueprint('auth_routes', __name__)

# -------------------- SIGNUP ROUTE --------------------
@auth_routes.route('/signup', methods=['POST'])
def signup():
    try:
        # Get data from the request body (sent as JSON)
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        profile_picture = data.get('profilePicture')
        has_custom_picture = data.get('hasCustomPicture')

        # Attempt to create a new user using a helper function
        result = create_user(name, email, password, profile_picture, has_custom_picture)
        
        # If user creation is successful
        if result:
            return jsonify({"message": "✅ User created successfully!"}), 201
        else:
            # If user already exists
            return jsonify({"message": "❌ User already exists with this email."}), 409

    except Exception as e:
        # Handle any server-side error
        print("Error during signup:", e)
        return jsonify({"message": f"Error: {e}"}), 500

# -------------------- SIGNIN ROUTE --------------------
@auth_routes.route('/signin', methods=['POST'])
def signin():
    try:
        # Extract credentials from the request body
        data = request.get_json()
        print(f"Received data: {data}")  # Log parsed data
        email = data.get('email')
        password = data.get('password')

        # Fetch user details from the database by email
        user = find_user_by_email(email)

        # If no user is found with the given email
        if not user:
            return jsonify({"message": "❌ No user found with this email."}), 404

        # Compare provided password with stored password
        if user['password'] != password:
            return jsonify({"message": "❌ Incorrect password."}), 401

        # If sign-in is successful, return user data
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
        # Handle any server-side error
        print("Error during signin:", e)
        return jsonify({"message": f"Error: {e}"}), 500
