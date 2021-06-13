from flask import Flask
from routes import main, api

app = Flask(__name__, subdomain_matching=True, template_folder=None, static_folder=None, static_url_path=None)
app.config['SERVER_NAME'] = 'pcode.dev'

@app.errorhandler(404)
def Error404(error):
	return '<pr>404 page not exist.</pr>', 404

app.register_blueprint(main)
app.register_blueprint(main, subdomain='www')
app.register_blueprint(api, subdomain='api')
