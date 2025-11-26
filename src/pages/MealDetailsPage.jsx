import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getMealDetails } from '../api/mealApi';

// Extract ingredients from API
const extractIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ing && ing.trim() !== "") {
            ingredients.push({ ingredient: ing, measure: measure || "" });
        }
    }
    return ingredients;
};

const MealDetailsPage = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMeal = useCallback(async () => {
        setLoading(true);
        const data = await getMealDetails(id);
        setMeal(data);
        setLoading(false);
    }, [id]);

    useEffect(() => {
        fetchMeal();
    }, [fetchMeal]);

    if (loading) return <div className="loading">Loading meal details...</div>;
    if (!meal) return <div className="no-results">No meal found.</div>;

    const steps = meal.strInstructions
        ? meal.strInstructions.split("\n").filter(x => x.trim() !== "")
        : [];

    const ingredients = extractIngredients(meal);

    const videoId = meal.strYoutube
        ? meal.strYoutube.split("v=")[1]?.split("&")[0]
        : null;

    return (
        <div className="meal-details-container">
            <h1 className="meal-title">{meal.strMeal}</h1>

            <div className="meal-info-bar">
                <span><strong>Category:</strong> {meal.strCategory}</span>
                <span><strong>Area:</strong> {meal.strArea}</span>
            </div>

            <div className="meal-image-section">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="meal-detail-image"
                />
            </div>

            <div className="ingredients-section">
                <h2>Ingredients</h2>
                <ul className="ingredients-list">
                    {meal.ingredients?.map((ing, i) => (
                        <li key={i}>
                            <strong>{meal.measures[i]}</strong> {ing}
                        </li>
                    ))}
                </ul>
            </div>



            {/* INSTRUCTIONS */}
            <div className="instructions-section">
                <h2>Instructions</h2>
                <ol>
                    {steps.map((step, i) => (
                        <li key={i}>{step}</li>
                    ))}
                </ol>
            </div>

            {/* YOUTUBE VIDEO */}
            {videoId && (
                <div className="video-section">
                    <h2>Watch Video Recipe</h2>
                    <div className="video-container">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealDetailsPage;
