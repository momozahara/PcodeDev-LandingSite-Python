from flask import Blueprint, render_template, request, abort, redirect
from datetime import datetime

main = Blueprint('main', 'main', template_folder='templates/main', static_folder='static/main', static_url_path='/static')

@main.context_processor
def TimeNow():
	return { 'now': datetime.utcnow() }

@main.route('/')
def Home():
	return render_template('home.html')

@main.route('/git/')
def Github():
	return redirect('https://github.com/momozahara')

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

@main.route('/video/')
def Video():
	return render_template('video.html', name='Video')

@main.route('/video/<ID>/')
def Video_ID(ID):
	args = {
		"vid": ID
	}
	return render_template('watch.html', name=f"{ID}", **args)

@main.after_request
def After_request(res):
	res.headers['Access-Control-Allow-Origin'] = '*'
	res.headers['Cache-Control'] = 'no-cache'
	MEDIAS = [
		'.png',
		'.jpg',
		'.mp3'
	]
	for x in MEDIAS:
		if request.path.find(x) > 0:
			res.headers['Cache-Control'] = 'public, max-age=43200'
	return res
