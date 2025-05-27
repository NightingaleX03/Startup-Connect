from database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid
from flask_login import UserMixin

class User(UserMixin, db.Model):

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

    startup_profile = db.relationship(
        "StartupProfile",
        uselist=False,
        back_populates="user",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"Name : {self.name}"
    
    def get_id(self):
        return str(self.id)

    

