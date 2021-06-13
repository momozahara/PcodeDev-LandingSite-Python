from flask import Flask, render_template
from flask_minify import minify
from routes import main, api

app = Flask(__name__, subdomain_matching=True, template_folder="templates", static_folder=None, static_url_path=None)
minify(app=app, html=True, js=True, cssless=True)
app.config['SERVER_NAME'] = 'pcode.dev'

@app.errorhandler(404)
def Error404(error):
	return render_template("404.html"), 404

app.register_blueprint(main)
app.register_blueprint(main, subdomain='www')
app.register_blueprint(api, subdomain='api')
