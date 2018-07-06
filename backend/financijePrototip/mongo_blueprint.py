"""
Module with reworked flask Blueprint class
"""


from flask import Blueprint


class MongoBlueprint(Blueprint):
    """
    Flask Blueprint class reworked for usage with PyMongo.
    Added mongo_db class attribute to make database usage easier
    :param Blueprint:
    """

    def __init__(self, mongo_db, * args, **kwargs):
        """
        docstring here
            :param self:
            :param mongo_db: PyMongo database object
            :param *args:
            :param **kwargs:
        """
        Blueprint.__init__(self, *args, **kwargs)
        self.mongo = mongo_db
