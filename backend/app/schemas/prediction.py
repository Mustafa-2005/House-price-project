from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    location: str = Field(..., description="Grouped location name")
    carpet_area_sqft: float = Field(..., gt=0, description="Carpet area in square feet")
    floor_num: int = Field(..., description="Floor number of the property")
    bathroom: int = Field(..., ge=0, description="Number of bathrooms")
    balcony: int = Field(..., ge=0, description="Number of balconies")
    furnishing: str = Field(..., description="Furnished | Semi-Furnished | Unfurnished")
    transaction: str = Field(..., description="New Property | Resale")
    ownership: str = Field(..., description="Type of ownership")
    facing: str = Field(..., description="Facing direction")

class PredictionResponse(BaseModel):
    predicted_price: float