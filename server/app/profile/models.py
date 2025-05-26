from database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.orm import relationship

class StartupProfile(db.Model):
    __tablename__ = "startup_profiles"

    id = db.Column(
        UUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4, 
        unique=True, 
        nullable=False
    )
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), unique=True, nullable=False)

    avatar = db.Column(db.String(255))
    name = db.Column(db.String(255))
    size = db.Column(db.String(50))
    location = db.Column(db.String(100))
    founded_on = db.Column(db.String(10))
    founded_by = db.Column(db.String(100))
    tags = db.Column(db.ARRAY(db.String)) 
    description = db.Column(db.Text)
    instagram = db.Column(db.String(255))
    linkedin = db.Column(db.String(255))

    user = relationship("User", back_populates="startup_profile")

    def __repr__(self):
        return f"<StartupProfile for user_id={self.user_id}>"
