from flask import Flask
from flask_cors import CORS
from routes.auth import auth_routes
from routes.user import user_routes
from routes.post import post_routes



app = Flask(__name__)

# Secret key for session encryption
app.secret_key = 'hello'  # 🔐 Replace with env variable in production

# CORS setup for React frontend
CORS(app, supports_credentials=True, origins="http://localhost:5173")

# Register your authentication routes
app.register_blueprint(auth_routes, url_prefix='/api')
app.register_blueprint(user_routes, url_prefix='/api/user')
app.register_blueprint(post_routes, url_prefix='/api/posts')

if __name__ == '__main__':
    app.run(debug=True)
