from flask_pymongo import ObjectId
from flask import request, jsonify
from mongo_blueprint import MongoBlueprint


def generate_blueprint(mongo):
    razred = MongoBlueprint(mongo, 'razred_api',
                            __name__, url_prefix='/razred')

    @razred.route('/add', methods=['POST'])
    def add_razred():
        try:
            razred.mongo.db.razredi.insert_one(
                {
                    'odjel': request.form['odjel'],
                    'ucenici': [],
                    'profesor': ObjectId(request.form['profesor_id'])
                }
            )
        except KeyError:
            raise KeyError("Request data not sent")

        profesor = razred.mongo.db.profesori.find_one(
            {'_id': ObjectId(request.form['profesor_id'])})

        profesor['razredi'].append(request.form['odjel'])

        mongo.db.profesori.find_one_and_update(
            {'_id': ObjectId(request.form['profesor_id'])},
            {'$set': {'razredi': profesor['razredi']}})

        return 'Done'

    @razred.route('/get/all', methods=['GET'])
    def get_all():
        razredi = mongo.db.razredi.find({})
        razredi = [x['odjel'] for x in razredi]
        return jsonify(razredi)

    return razred
