from flask import Blueprint, render_template, abort, redirect

api = Blueprint('api', 'api', template_folder='templates/api', static_folder='static/api', static_url_path='/static')

@api.after_request
def After_request(res):
	res.headers['Access-Control-Allow-Origin'] = '*'
	res.headers['Cache-Control'] = 'no-cache'
	return res

pages = ['official', 'profile', 'blog', 'media']
results = [
        { 'date': "2020.09.09 06:12", 'message': "「POP」「PIP」「PUP」「PRAA!」" },
        { 'date': "2020.09.07 01:07", 'message': "Another test goes Skrrrrrrrr Skidikip PaPa" },
        { 'date': "2020.09.07 01:00", 'message': "Test Feed goes Brrrrrrrr" },
        { 'date': "2020.09.07 11:41", 'message': "Test 「DROP」 「DROP」 「DROP」" },
        { 'date': "2021.04.09 03:40", 'message': "Hello, world!" }
]
medialist = [
        '/static/official/media/countdownOnTheDayVisual.jpg',
        '/static/official/media/countdownImg09.jpg',
        '/static/official/media/pepe.png',
        '/static/official/media/alice.png',
        '/static/official/media/keyvisual01.jpg',
        '/static/official/media/keyvisual02.jpg'
]

@api.route('/page/<id>/')
def Official(id):
        id = id.lower()
        if any(i == id for i in pages):
                if id == 'official':
                        args = {
                                'rows': ['Official', 'Informations'],
                                'results': results
                        }
                        return render_template('official_home.html', **args)
                elif id == 'profile':
                        return render_template('profile.html')
                elif id == 'media':
                        return render_template('media.html', medialist=medialist)
                else:
                        return abort(404)
        else:
                return abort(404)

@api.route('/github/')
def Github_redirect():
	return redirect("https://github.com/momozahara")
