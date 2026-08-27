import React, { useState, useEffect } from 'react';
import { PredictionRequest } from '../types/prediction';

interface PredictionFormProps {
  onSubmit: (data: PredictionRequest) => void;
  isLoading: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, isLoading }) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [formData, setFormData] = useState<Partial<PredictionRequest>>({
    location: '',
    carpet_area_sqft: undefined,
    floor_num: undefined,
    bathroom: undefined,
    balcony: undefined,
    furnishing: 'Semi-Furnished',
    transaction: 'Resale',
    ownership: 'Freehold',
    facing: 'North-East',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/locations.json')
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, location: data[0] }));
        }
      })
      .catch(() => setError('Could not load target area locations.'));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { location, carpet_area_sqft, floor_num, bathroom, balcony, furnishing, transaction, ownership, facing } = formData;

    // Client-side validation
    if (!location || carpet_area_sqft === undefined || floor_num === undefined || bathroom === undefined || balcony === undefined) {
      setError('Please fill in all numerical and selection fields.');
      return;
    }

    if (carpet_area_sqft <= 0) {
      setError('Carpet area must be a positive number greater than zero.');
      return;
    }

    onSubmit({
      location,
      carpet_area_sqft,
      floor_num,
      bathroom,
      balcony,
      furnishing,
      transaction,
      ownership,
      facing,
    } as PredictionRequest);
  };

  return (
    <form onSubmit={handleSubmit} className="prediction-form">
      <h3>Enter Property Details</h3>
      {error && <div className="error-banner">{error}</div>}

      <div className="form-group">
        <label>Location</label>
        <select name="location" value={formData.location || ''} onChange={handleChange}>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Carpet Area (sqft)</label>
        <input 
          type="number" 
          name="carpet_area_sqft" 
          placeholder="e.g. 1200" 
          value={formData.carpet_area_sqft ?? ''} 
          onChange={handleChange} 
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Floor Number</label>
          <input 
            type="number" 
            name="floor_num" 
            placeholder="e.g. 3" 
            value={formData.floor_num ?? ''} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Bathrooms</label>
          <input 
            type="number" 
            name="bathroom" 
            placeholder="e.g. 2" 
            value={formData.bathroom ?? ''} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Balconies</label>
          <input 
            type="number" 
            name="balcony" 
            placeholder="e.g. 1" 
            value={formData.balcony ?? ''} 
            onChange={handleChange} 
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Furnishing Status</label>
          <select name="furnishing" value={formData.furnishing || ''} onChange={handleChange}>
            <option value="Furnished">Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>

        <div className="form-group">
          <label>Transaction Type</label>
          <select name="transaction" value={formData.transaction || ''} onChange={handleChange}>
            <option value="New Property">New Property</option>
            <option value="Resale">Resale</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Calculating Prediction...' : 'Estimate Price'}
      </button>
    </form>
  );
};