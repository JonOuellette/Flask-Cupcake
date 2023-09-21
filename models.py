"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE = "https://tinyurl.com/demo-cupcake"


class Cupcake(db.Model):
    __tablename__="cupcakes"

    id = db.Column(db.Integer, primary_key=True, autoincrement= True)
    flavor = db.Column(db.Text, nullable = False)
    size = db.Column(db.Text, nullable = False)
    rating = db.Column(db.Float, nullable = False)
    image = db.Column(db.Text, nullable = True)

    def image_url(self):
        """sets column image to user provided image or default"""
        return self.image or DEFAULT_IMAGE

def connect_db(app):
    """Connect to database"""
    
    db.app = app
    db.init_app(app)