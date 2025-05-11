from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes.auth import auth_routes

app = Flask(__name__)

# JWT Config
app.config['JWT_SECRET_KEY'] = 'your-super-secret-key'  # Replace with env var in prod
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_SECURE'] = False  # True if using HTTPS
app.config['JWT_COOKIE_SAMESITE'] = 'None'
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'  # Optional
app.config['JWT_COOKIE_CSRF_PROTECT'] = False  # Set to True in production

# Initialize extensions
CORS(app, supports_credentials=True, origins="http://localhost:5173")  # Allow credentials from React frontend
jwt = JWTManager(app)

# Register routes
app.register_blueprint(auth_routes, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
