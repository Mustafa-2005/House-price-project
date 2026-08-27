from fastapi import APIRouter, Request, HTTPException, status
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.preprocessing import transform_request_to_df

router = APIRouter()

@router.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "ok"}

@router.post("/predict", response_model=PredictionResponse, status_code=status.HTTP_200_OK)
def predict_price(payload: PredictionRequest, request: Request):
    model_service = request.app.state.model_service
    if not model_service:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE, 
            detail="Prediction model is unavailable"
        )
    
    try:
        df_row = transform_request_to_df(payload)
        prediction = model_service.predict(df_row)
        return PredictionResponse(predicted_price=prediction)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Inference execution failed: {str(e)}"
        )