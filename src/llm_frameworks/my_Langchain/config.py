import os
from functools import lru_cache
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parents[3]
env_file = BASE_DIR / ".env"


class Settings(BaseSettings):
    OPENAI_API_KEY: str

    model_config = SettingsConfigDict(env_file=env_file)


@lru_cache
def getSettings() -> Settings:
    return Settings()  # type: ignore


def load_env() -> None:
    settings = getSettings()
    os.environ["OPENAI_API_KEY"] = settings.OPENAI_API_KEY
