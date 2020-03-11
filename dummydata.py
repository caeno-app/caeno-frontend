import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('service-key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def populate_user(id):
    doc_ref = db.collection('users').document(id)
    doc_ref.set(generate_data());

def generate_data():
    return {
        u'history': [],
        u'total': 1,
        u'vector': [0] * 11
    }

populate_user('test')