from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

DATABASE_URI = os.getenv("DATABASE_URI")

engine = create_engine(DATABASE_URI, echo=True)

Base = declarative_base()

# Optional function to test the connection
def test_connection():
    try:
        with engine.connect() as connection:
            print("Database connection successful!")
            return True
    except Exception as e:
        print("Database connection failed:", e)
        return False
    finally:
        connection.close()