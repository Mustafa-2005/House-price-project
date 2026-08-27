import joblib
import numpy as np
import pandas as pd

class ModelService:
    def __init__(self, model_path: str):
        self.model_path = model_path
        self.model = None

    def load_model(self):
        self.model = joblib.load(self.model_path)

    def predict(self, df_features: pd.DataFrame) -> float:
        if self.model is None:
            raise RuntimeError("Model is not loaded.")
        
        # The model yields predictions in log scale log1p(y)
        prediction_log = self.model.predict(df_features)
        
        # Convert predictions back to original values using expm1
        prediction_rupees = np.expm1(prediction_log[0])
        return float(prediction_rupees)