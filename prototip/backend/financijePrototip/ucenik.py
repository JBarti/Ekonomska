from flask import request, jsonify
from mongo_blueprint import MongoBlueprint


def generate_blueprint(mongo):

    ucenikB = MongoBlueprint(mongo, 'ucenikB_api',
                             __name__, url_prefix='/ucenik')

    @ucenikB.route('/add', methods=['POST'])
    def add_ucenik():
        try:
            _id = ucenikB.mongo.db.ucenici.insert_one(
                {
                    'ime': request.form['ime'],
                    'prezime': request.form['prezime'],
                    'razred': request.form['razred']
                }
            ).inserted_id
        except KeyError:
            raise KeyError("Request data not sent")

        razred = ucenikB.mongo.db.razredi.find_one(
            {'odjel': request.form['razred']})

        print(str(_id))

        razred['ucenici'].append(_id)

        print(razred['ucenici'])

        ucenikB.mongo.db.razredi.find_one_and_update(
            {'odjel': request.form['razred']},
            {'$set': {'ucenici': razred['ucenici']}})

        return 'Done'

    @ucenikB.route('/get/<ime>/<prezime>', methods=['GET'])
    def get_ucenik(ime, prezime):
        ucenik = ucenikB.mongo.db.ucenici.find_one(
            {'ime': ime, 'prezime': prezime})

        ucenik['_id'] = str(ucenik['_id'])

        razred = ucenikB.mongo.db.razredi.find_one({'odjel': ucenik['razred']})

        profesor = ucenikB.mongo.db.profesori.find_one(
            {'_id': razred['profesor']})

        def map_func(node):
            if ucenik['razred'] in node['razredi']:
                node['_id'] = str(node['_id'])
                return node
            else:
                node['_id'] = None
                node['test_tekst'] = None
                return node

        ucenik['raspored'] = list(map(map_func, profesor['raspored']))

        return jsonify(**ucenik)
    return ucenikB
