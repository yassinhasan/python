from flask import Flask, jsonify, redirect ,render_template,request,make_response,session, url_for
from download import extract_video_info
from flask_session import Session
import pyrebase
import json
import os


firebaseConfig = {
    "apiKey": "AIzaSyDEi2XLHPBDJ6mesKhaJnRWyNyKG4CJdkk",
    "authDomain": "uplaod-now.firebaseapp.com",
    "projectId": "uplaod-now",
    "storageBucket": "uplaod-now.appspot.com",
    "messagingSenderId": "584367053002",
    "appId": "1:584367053002:web:470a853d95f5f02e263c33",
    "measurementId": "G-QYFBWR04Z5",
    "databaseURL": "https://uplaod-now-default-rtdb.firebaseio.com",
  }
  
firebase = pyrebase.initialize_app(firebaseConfig)
storage = firebase.storage()
db = firebase.database()
auth = firebase.auth()


app = Flask(__name__)
app.config["SESSION_TYPE"] = "filesystem"
app.secret_key = 'hasanmeady0546035917'

@app.route("/")
def homepage():
   # user = auth.create_user_with_email_and_password("youremail@gmail.com","1234567")
   # print(user)
   if "isLogged" in session:
      return redirect(url_for('uploadpage'))
   else:
      return render_template("index.html",pagetitle="(H.meady)✌Dr.Null")

@app.route("/download")
def downloadpage():
    session['active'] ="download"
    try:

        return extract_video_info("htsdfutu.be/ANw02-TpcKk?si=hdvqEchPtvx146-0")
    except Exception as e:
        return jsonify({"error":"invalid url or somthing error happened"})  
  
    return render_template("download.html",pagetitle="(Download))✌Dr.Null")

@app.route("/logout",methods=['POST'])
def logoutpage():
   session.pop("isLogged", None)
   session.clear()
   return jsonify({"success":True})  


@app.route("/upload",methods=['GET'])
def uploadpage():
    session['active'] ="upload"
    if "isLogged" in session:
      username= session['username']
      return render_template("upload.html",pagetitle="(Upload))✌Dr.Null",username=username)  
    else:
      return redirect(url_for('homepage'))   

# login
@app.route('/login', methods=['POST'])
def login():
    return userlogin()

# register
@app.route('/register', methods=['POST'])
def register():
    return userRegister()





   
def userlogin():
      current_url = request.url_rule
      if(current_url == "/" ):
          template = "index.html"
      elif (current_url == "/download"):
          template = "download.html"
      else:
          template = "index.html"
      if(request.method == "POST"):
        session['username'] = request.form["username"]
        session['email'] = request.form["email"]
        session['isLogged'] = True
        return jsonify({"success":True}) 
      else:
         return render_template(template,pagetitle="(Upload))✌Dr.Null") 
                
            
def userRegister():
      current_url = request.url_rule
      if(current_url == "/" ):
          template = "index.html"
      elif (current_url == "/download"):
          template = "download.html"
      else:
          template = "index.html"
      if(request.method == "POST"):
        session['username'] = request.form["username"]
        session['email'] = request.form["email"]
        session['isLogged'] = True
        return jsonify({"success":True}) 
      else:
         return render_template(template,pagetitle="(Upload))✌Dr.Null") 



   

   



if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT',80)))
   

