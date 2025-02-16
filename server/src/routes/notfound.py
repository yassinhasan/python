from flask import Blueprint, render_template , current_app

from helpers.responses import get_response

notfound_bp = Blueprint("notfound" , __name__)
@notfound_bp.route("/notfound")
def errorpage():
    template =   render_template("404.html",pagetitle="(Not FOund Page))✌Dr.Null") 
    return get_response(template)