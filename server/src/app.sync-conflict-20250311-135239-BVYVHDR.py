import datetime
from dotenv import load_dotenv
import logging
import os
from flask import Flask, jsonify, make_response, redirect, request, url_for
from flask_wtf.csrf import CSRFProtect
from flask_cors import CORS
from config import config
from helpers.responses import json_response
from services.firebase import initialize_firebase
from routes.index import index_bp
from routes.auth import logout_bp
from routes.dashboard import dashboard_bp
from routes.cvmaker import cvmaker_bp
from routes.contactme import contactme_bp
from routes.privacy import privacy_bp
from routes.search import search_bp
from routes.upload import upload_bp
from routes.ydownload import ydownload_bp
from routes.notes import notes_bp
from routes.notfound import notfound_bp
from routes.offline import offline_bp
from routes.expire import expire_bp
from routes.data import data_bp
from routes.library import library_bp
from routes.lastactive import lastactive_bp
# Initialize Flask app
# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'hasanmeady123456789azertyuiop')
app.config["SESSION_PERMANENT"] = True
app.config['WTF_CSRF_ENABLED'] = True
CORS(app, supports_credentials=True, origins=["https://drnull.web.app"])
csrf = CSRFProtect(app)



# Initialize Firebase
firebase_services = initialize_firebase(config)
# app.py
# After initializing Firebase
app.firebase_services = firebase_services  # Add this line
app.isLogged = False
expires_in = datetime.timedelta(days=30)
app.expires = datetime.datetime.now() + expires_in
# Register blueprints
app.register_blueprint(index_bp)
app.register_blueprint(notfound_bp)
app.register_blueprint(logout_bp)
app.register_blueprint(privacy_bp)
app.register_blueprint(contactme_bp)

app.register_blueprint(ydownload_bp)
app.register_blueprint(upload_bp)
app.register_blueprint(search_bp)
app.register_blueprint(cvmaker_bp)
app.register_blueprint(notes_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(offline_bp)
app.register_blueprint(expire_bp)
app.register_blueprint(data_bp)
app.register_blueprint(library_bp)
app.register_blueprint(lastactive_bp)

# Custom 404 error handler
@app.errorhandler(404)
def page_not_found(error):
    # Redirect to the custom "Not Found" page
    return redirect(url_for('notfound.not_found'))




# Logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
if __name__ == "__main__":
    app.run(debug= os.environ.get('DEBUG'), port=int(os.environ.get('PORT', 8080)))


