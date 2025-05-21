# from sqlalchemy import Column, String, Integer
# from ..database import Base

# class StartupUser(Base):

#     __tablename__ = "startup_users"

#     id = Column(Integer, primary_key=True)
#     startup_name = Column(String(120))
#     email = Column(String(120), unique=True, nullable=False)
#     telephone = Column(String(15), unique=True, nullable=False)
#     size = Column(String(50))
#     password_hash = Column(String(128), nullable=False)
    
# class VCFirmUser(Base):

#     __tablename__ = "vc_firm_users"

#     id = Column(Integer, primary_key=True)
#     company_name = Column(String(80), unique=True, nullable=False)
#     email = Column(String(120), unique=True, nullable=False)
#     telephone = Column(String(15), unique=True, nullable=False)
#     password_hash = Column(String(128), nullable=False)
