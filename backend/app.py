from flask import Flask
from flask_cors import CORS
from routes.auth import auth_routes  # Importing auth routes from the auth.py file

app = Flask(__name__)
CORS(app)  # Enable CORS

# Register the routes from auth.py
app.register_blueprint(auth_routes, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
