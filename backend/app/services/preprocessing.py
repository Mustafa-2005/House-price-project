import pandas as pd
from app.schemas.prediction import PredictionRequest

def transform_request_to_df(request: PredictionRequest) -> pd.DataFrame:
    """
    Transforms the incoming validated Pydantic model into a 1-row DataFrame.
    The keys must align with the feature names used during training.
    """
    data = {
        "carpet_area_sqft": [request.carpet_area_sqft],
        "floor_num": [request.floor_num],
        "bathroom": [request.bathroom],
        "balcony": [request.balcony],
        "location_grouped": [request.location],
        "Furnishing": [request.furnishing],
        "Transaction": [request.transaction],
        "Ownership": [request.ownership],
        "facing": [request.facing]
    }
    return pd.DataFrame(data)