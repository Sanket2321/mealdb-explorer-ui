
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MealCard = ({ meal }) => {
    const navigate = useNavigate();

    return (
        <div className="meal-card">
            <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-thumbnail"
            />
            <div className="card-body">
                <h5 className="meal-title">{meal.strMeal}</h5>
                <div className="meal-meta">
                    <span className="category-tag">{meal.strCategory}</span>
                    <span className="area-tag">{meal.strArea}</span>
                </div>
                <button
                    className="details-button"
                    onClick={() => navigate(`/meal/${meal.idMeal}`)}
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default MealCard;