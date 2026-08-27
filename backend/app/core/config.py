from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "House Price Prediction API"
    MODEL_PATH: str = "models/house_price.pkl"
    
    class Config:
        env_file = ".env"

settings = Settings()