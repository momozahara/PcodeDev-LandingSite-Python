import multiprocessing
import gunicorn

gunicorn.SERVER = 'PcodeDev'
bind = "localhost:5000"
workers = 4
reload = True

