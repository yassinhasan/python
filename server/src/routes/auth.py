from flask import Blueprint, current_app ,jsonify, make_response
import datetime


logout_bp = Blueprint('logout', __name__)
expires_in = datetime.timedelta(days=30)


@logout_bp.route("/logout", methods=['POST'])
def logoutpage():
    # Create a response object
    response = make_response(jsonify({"success": True}))

    # Clear the session cookie
    response.set_cookie(
        '__session',
        value='',
        expires=0,  # Expire the cookie immediately
        secure=True,  # Ensure the cookie is only sent over HTTPS
        httponly=True,  # Prevent JavaScript from accessing the cookie
        samesite='Lax'  # Prevent CSRF attacks
    )

    # Clear the CSRF token cookie (if used)
    response.set_cookie(
        'csrf_token',
        value='',
        expires=0,  # Expire the cookie immediately
        secure=True,  # Ensure the cookie is only sent over HTTPS
        httponly=True,  # Prevent JavaScript from accessing the cookie
        samesite='Lax'  # Prevent CSRF attacks
    )

    # Update the application state
    current_app.isLogged = False

    # Set caching headers
    response.headers['Cache-Control'] = 'private, max-age=300, s-maxage=600'

    return response


