from database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class User(db.Model):

    __tablename__ = "users"

    id = db.Column(
        UUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4, 
        unique=True, 
        nullable=False
    )
    name = db.Column(db.String(120), unique=True, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    telephone = db.Column(db.String(15), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    
    def __repr__(self):
        return f"Name : {self.name}"
    

