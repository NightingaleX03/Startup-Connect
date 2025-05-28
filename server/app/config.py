import os
from openai import OpenAI

from dotenv import load_dotenv

load_dotenv()

apiKey = os.getenv("API_KEY")

client = OpenAI(api_key=apiKey, base_url="https://api.perplexity.ai")
