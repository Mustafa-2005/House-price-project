from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core import config
from app.api.routes import prediction
from app.services.inference import ModelService

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model once at startup
    model_service = ModelService(config.settings.MODEL_PATH)
    model_service.load_model()
    app.state.model_service = model_service
    yield
    # Clean up at shutdown
    app.state.model_service = None

app = FastAPI(title=config.settings.PROJECT_NAME, lifespan=lifespan)

# Setup CORS middleware to allow connection from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction.router)