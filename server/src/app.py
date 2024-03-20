import datetime
from functools import wraps
import json
from uuid import uuid4
from flask import Flask, jsonify, redirect ,render_template,request,make_response,session, url_for
from flask_wtf import CSRFProtect
from download import extract_video_info
import requests
import pyrebase
from flask_cors import CORS,cross_origin
import os
import firebase_admin
from  firebase_admin import auth
from firebase_admin import credentials ,db 
from config import config



cred = credentials.Certificate(config)
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://drnull-f3805-default-rtdb.firebaseio.com'
})
ref = db.reference('users')


firebase = pyrebase.initialize_app(config)
database = firebase.database()
pyrbase_auth = firebase.auth()
# Read the data at the posts reference (this is a blocking operation)
# print(ref.get())

uniqueId  = uuid4()

app = Flask(__name__)

app.secret_key = 'hasanmeady0546035917'

app.config["SESSION_PERMANENT"] = True
app.config["SECRET_KEY"] = "hasanmeady0546035917"
app.config['WTF_CSRF_ENABLED'] = True
scrf = CSRFProtect(app)

# sessions = db.collection('sessions')
expires_in = datetime.timedelta(days=30)
expires = datetime.datetime.now() + expires_in
isLogged = False

def isUserLogged():
    return '__session' in request.cookies



@app.route("/index.html")
def indexpage():
        return redirect(url_for('homepage')) 

@app.route("/")
def homepage():
    if isUserLogged() == True:
        return redirect(url_for('uploadpage')) 
    else:
        isLogged = False
        template = render_template("index.html",pagetitle="(H.meady)✌Dr.Null",isLogged=isLogged)
        response = make_response(template)
        response.headers['Cache-Control'] = 'private, max-age=300, s-maxage=600'
        return response

@app.route("/download")
def downloadpage():
    if isUserLogged() == True:
        global isLogged 
        isLogged= True
    template =   render_template("download.html",pagetitle="(download))✌Dr.Null",isLogged=isLogged) 
    response = make_response(template)
    response.headers['Cache-Control'] = 'private, max-age=300, s-maxage=600'
    return response 
  

@app.route("/upload", methods=['GET'])
def uploadpage():
    token = request.args.get('token')
    if isUserLogged() == True:
        isLogged = True
        uid = request.cookies.get('__session') 
        signedUser =  database.child("users").child(uid).get().val()
        template =   render_template("upload.html",pagetitle="(Upload))✌Dr.Null",username=signedUser['username'],isLogged=isLogged) 
        response = make_response(template)
        response.headers['Cache-Control'] = 'private, max-age=300, s-maxage=600'
        return response
    if token is None:
        # jsonify({"msg": "Token is missing!"})
       return redirect(url_for('homepage')) 
    else:
        try :
            decoded_token = auth.verify_id_token(token)
            uid = decoded_token['uid']
            signedUser =  database.child("users").child(uid).get().val()
            isLogged = True
            template =   render_template("upload.html",pagetitle="(Upload))✌Dr.Null",username=signedUser['username'],isLogged=isLogged) 
            response = make_response(template)
            response.set_cookie('__session', value=uid ,max_age = None, expires = expires)
            response.headers['Cache-Control'] = 'private, max-age=300, s-maxage=600'
            return response
        except Exception as e:
            return jsonify({"msg": "Token is invalid!"}) 



@app.route("/logout",methods=['POST'])
def logoutpage():
    response = make_response()
    response= jsonify({"success":True})  
    response.set_cookie('__session','', expires=0)
    global isLogged
    isLogged = False
    response.headers['Cache-Control'] = 'private, max-age=300, s-maxage=600'
    return response


if __name__ == "__main__":
    app.run(debug=True,port=int(os.environ.get('PORT',8080)))
   

