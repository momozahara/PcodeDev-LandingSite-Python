from flask import Blueprint, render_template, request, abort
from datetime import datetime

main = Blueprint('main', 'main', template_folder='templates/main', static_folder='static/main', static_url_path='/static')

@main.context_processor
def TimeNow():
	return { 'now': datetime.utcnow() }

@main.route('/')
def Home():
	return render_template('home.html')

MENUTPATH = ['profile', 'blog', 'media']

@main.route('/official/')
def Official():
        return render_template('official.html', name='Official', MENUTPATH=MENUTPATH)

@main.route('/official/<path>/')
def Official_path(path):
	if any(i == path.lower() for i in MENUTPATH):
		name = path[0].upper() + path[1:].lower()
		return render_template('official.html', name=name, MENUTPATH=MENUTPATH)
	else:
		return abort(404)

MEDIAS = [
	'.png',
	'.jpg',
	'.mp3'
]

@main.route('/video/<id>/')
def Video(id):
	return render_template('video.html', name='Video')

@main.after_request
def After_request(res):
	res.headers['Access-Control-Allow-Origin'] = '*'
	res.headers['Cache-Control'] = 'no-cache'
	for x in MEDIAS:
		if request.path.find(x) > 0:
			res.headers['Cache-Control'] = 'public, max-age=43200'
	return res
