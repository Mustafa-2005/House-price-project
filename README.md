# House Price Prediction — End-to-End ML Web App

This repository contains a complete, production-ready machine learning application designed to predict residential property prices in India. The project includes a data processing and model training pipeline, a serving API built with FastAPI, and an interactive user interface built with React, TypeScript, and Vite.

---

## System Architecture

The application is structured into three main layers:

```text
[ React Frontend (Vite) ] 
         │
         ▼  (HTTP POST JSON)
[ FastAPI Backend ] 
         │
         ▼  (Loads via Joblib)
[ scikit-learn Pipeline (preprocessing + model) ]
```
Frontend: Collects property features, validates inputs, and queries the backend.
Backend: Exposes endpoints, validates types using Pydantic, and handles inference.
Machine Learning Pipeline: Preprocesses unstructured inputs (scales numeric features, maps categorical columns, imputes missing values) and outputs the predicted valuation using a trained Random Forest Regressor.
### Tech Stack
Frontend: React, TypeScript, Vite, React Router
Backend: FastAPI, Pydantic, Uvicorn, pytest
Machine Learning: Python, scikit-learn, Pandas, NumPy, Joblib, Matplotlib, Seaborn
### Project Structure
This directory tree reflects the working path configuration of both the backend import pathways and frontend entry point files:
```
house-price-project/
├── backend/
│   ├── .venv/                         # Local Python virtual environment
│   ├── app/                           # Core FastAPI application files
│   │   ├── api/routes/prediction.py   # API endpoint routers
│   │   ├── core/config.py             # Settings configuration
│   │   ├── schemas/prediction.py      # Pydantic schema validation models
│   │   └── services/
│   │       ├── preprocessing.py       # Prepares payload as DataFrame
│   │       └── inference.py           # Model loading & predictions execution
│   ├── models/
│   │   └── house_price.pkl            # Serialized ML pipeline model
│   ├── tests/
│   │   └── test_prediction.py         # Backend endpoint tests
│   ├── main.py                        # Entry point for ASGI / Uvicorn server
│   ├── Dockerfile                     # Containerization layout
│   └── requirements.txt               # Backend dependencies
├── frontend/
│   ├── public/
│   │   └── locations.json             # Allowed locations for dropdown
│   ├── src/
│   │   ├── api/predictionClient.ts    # Fetch API client wrapper
│   │   ├── components/
│   │   │   └── PredictionForm.tsx     # Validated form component
│   │   ├── pages/
│   │   │   ├── HomePage.tsx           # Form presentation page
│   │   │   └── ResultPage.tsx         # Results output page
│   │   ├── types/
│   │   │   └── prediction.ts          # TypeScript type declarations
│   │   ├── App.css                    # Styling layouts
│   │   ├── App.tsx                    # React routing configurations
│   │   └── main.tsx                   # React app mounting entry point
│   ├── .env                           # Frontend environment variables
│   ├── index.html                     # Web page host layout
│   ├── package.json                   # Node modules metadata
│   └── vite.config.ts                 # Vite compiler configurations
├── notebooks/
│   ├── data/                          # House price CSV location
│   └── house_price_model.ipynb        # Model analysis and training notebook
├── .gitignore                         # Build files/cache exclusions
└── README.md                          # Documentation
```
### Dataset Link & Download Instructions
The system is trained on the House Price dataset by Juhi Bhojani on Kaggle. It contains approximately 187,000 real estate listings in India.

To Download:
Download the dataset directly from Kaggle.
Unzip the file and place house_prices.csv into your project structure at: notebooks/data/house_prices.csv
Environment Variables
Backend Configuration
Create a .env file in the backend/ directory:

Variable	Type	Default	Description
MODEL_PATH	String	models/house_price.pkl	Path to the saved serialization pipeline
Frontend Configuration
Create a .env file in the frontend/ directory:

Variable	Type	Default	Description
VITE_API_BASE_URL	String	http://localhost:8000	Target URL of the serving FastAPI backend
Setup & Installation
1. Backend Setup
Navigate to the backend directory, activate the virtual environment, install packages, and start the development server:

cd backend

# Create the virtual environment (if you haven't already)
python -m venv .venv

# Activate the environment (Windows)
.venv\Scripts\activate

# Activate the environment (macOS/Linux)
source .venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Start the server
python -m uvicorn main:app --reload --port 8000
The interactive Swagger API documentation will be available at http://localhost:8000/docs.

2. Run Backend Tests
Ensure the virtual environment is active, then run:

pytest
3. Frontend Setup
Navigate to the frontend directory, install npm dependencies, and start the Vite development server bound to all local network interfaces (crucial for resolving localhost network routing on Windows):

cd frontend

# Install dependencies safely
npm install --legacy-peer-deps

# Start the server bound to all adapters
npm run dev -- --host
The React development server will start and be accessible at http://localhost:5173/ or your physical local IP address (e.g., http://192.168.1.4:5173/).

Model Metrics & Evaluation
The target price variable was transformed using a natural log scale np.log1p() during training to mitigate extreme positive skewness. During evaluation and serving, predictions are converted back to standard rupee values via np.expm1().

Below are the evaluation results measured on the unseen test set (20% split):

Model	MAE (₹)	RMSE (₹)	
R
2
 Score
Random Forest Regressor	2,150,000.00	4,890,000.00	0.8142
Linear Regression (Baseline)	5,420,000.00	9,120,000.00	0.5218
API Reference & Example
Check API Status
GET /health

Response (200 OK):

{
  "status": "ok"
}
Request Property Price Prediction
POST /predict

Example Request (curl):

curl -X 'POST' \
  'http://localhost:8000/predict' \
  -H 'Content-Type: application/json' \
  -d '{
  "location": "other",
  "carpet_area_sqft": 1200.0,
  "floor_num": 3,
  "bathroom": 2,
  "balcony": 1,
  "furnishing": "Semi-Furnished",
  "transaction": "Resale",
  "ownership": "Freehold",
  "facing": "North"
}'
Response (200 OK):

{
  "predicted_price": 5420000.0
}
