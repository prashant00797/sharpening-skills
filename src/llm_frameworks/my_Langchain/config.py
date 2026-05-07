from functools import lru_cache
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict



BASE_DIR = Path(__file__).resolve().parents[3]
env_file = BASE_DIR / ".env"
print(env_file)
class Settings(BaseSettings):
    OPENAI_API_KEY:str

    model_config=SettingsConfigDict(env_file=env_file)


@lru_cache
def getSettings():
    return Settings() # type: ignore