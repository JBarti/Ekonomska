from flask import request, jsonify
from mongo_blueprint import MongoBlueprint
from flask_pymongo import ObjectId


def generate_blueprint(mongo):

    profesorB = MongoBlueprint(mongo, 'profesor_api',
                               __name__, url_prefix='/profesor')

    @profesorB.route('/add', methods=['POST'])
    def add_profesorB():
        try:
            mongo.db.profesori.insert_one(
                {
                    'ime': request.form['ime'],
                    'prezime': request.form['prezime'],
                    'razredi': [],
                    'raspored': []
                }
            )
            return 'Done'
        except:
            return 'Nemože'

    @profesorB.route('/get/<ime>/<prezime>', methods=['GET'])
    def get_profesorB(ime, prezime):
        profesor = mongo.db.profesori.find_one(
            {'ime': ime, 'prezime': prezime})

        profesor['_id'] = str(profesor['_id'])

        for node in profesor['raspored']:
            node['_id'] = str(node['_id'])

        return jsonify(**profesor)

    @profesorB.route('/raspored/add', methods=['POST'])
    def add_timeline():
        profesor = mongo.db.profesori.find_one(
            {'_id': ObjectId(request.form['_id'])})

        node = {
            '_id': str(ObjectId()),
            'lekcija': request.form['lekcija'],
            'vrsta': request.form['vrsta'],
            'razredi': [],
            'test_tekst': request.form['test_tekst']
        }

        profesor['raspored'].append(node)

        mongo.db.profesori.find_one_and_update(
            {'_id': ObjectId(request.form['_id'])},
            {'$set': {'raspored': profesor['raspored']}})

        return jsonify(**node)

    @profesorB.route('/raspored/unlock', methods=['POST'])
    def otkljucaj_raspored():
        profesor = mongo.db.profesori.find_one(
            {'_id': ObjectId(request.form['profesor_id'])})

        vrati = None
        for node in profesor['raspored']:
            if str(node['_id']) == request.form['node_id']:
                node['razredi'].append(request.form['razred'])
                vrati = node

        mongo.db.profesori.find_one_and_update(
            {'_id': ObjectId(request.form['profesor_id'])},
            {'$set': {'raspored': profesor['raspored']}})

        profesor['_id'] = str(profesor['_id'])
        for node in profesor['raspored']:
            node['_id'] = str(node['_id'])

        vrati['_id'] = str(vrati['_id'])
        return jsonify(**vrati)
    return profesorB
