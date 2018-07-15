from flask import Flask, request, g
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['DEBUG'] = True
app.config['MONGO_DBNAME'] = 'prototypeServer'
app.config['MONGO_URI'] = 'mongodb://127.0.0.1:27017/prototip'

mongo = PyMongo(app)


from razred import generate_blueprint
app.register_blueprint(generate_blueprint(mongo))

from profesor import generate_blueprint
app.register_blueprint(generate_blueprint(mongo))

from ucenik import generate_blueprint
app.register_blueprint(generate_blueprint(mongo))


@app.cli.command('initdb')
def init_db():
    mongo.db.razredi.drop()
    mongo.db.ucenici.drop()
    mongo.db.profesori.drop()

    profesor_id = mongo.db.profesori.insert_one({
        'ime': 'Profesor',
        'prezime': 'Profesoric',
        'razredi': ['2A'],
        'raspored': []
    }).inserted_id

    ucenik_id = mongo.db.ucenici.insert_one(
        {
            'ime': 'Ucenik',
            'prezime': 'Ucenikic',
            'razred': '2A'
        }
    ).inserted_id

    razred_id = mongo.db.razredi.insert_one(
        {
            'odjel': '2A',
            'ucenici': [ucenik_id],
            'profesor': profesor_id
        }
    ).inserted_id


@app.route('/test')
def test():
    mongo.db.test.insert_one({'test': 'test'}).inserted_id
    return 'Successful'
