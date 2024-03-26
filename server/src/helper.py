from flask import make_response, request, session


def flash_msg(type,msg):
    dict =  {
        "msg" : msg ,
        "type" : type
    }
    session['__session'] = dict

def get_flash():
    flash = None
    if  session.get("__session"):
        flash = session.get("__session")
        session.pop('__session')
    return flash


def isUserLogged():
    return '__session' in request.cookies

def getResponse(template):
        response = make_response(template)
        response.headers['Cache-Control'] = 'private, max-age=300, s-maxage=600'
        return response