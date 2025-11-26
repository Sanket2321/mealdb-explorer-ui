import React from "react";
import { useNavigate } from "react-router-dom";
import { getRandomMeal } from "../api/mealApi";

const RandomMealButton = () => {
    const navigate = useNavigate();

    const handleRandomMeal = async () => {
        const meal = await getRandomMeal();
        if (meal?.idMeal) navigate(`/meal/${meal.idMeal}`);
    };

    return (
        <button className="random-button" onClick={handleRandomMeal}>
            I'm Feeling Hungry
        </button>
    );
};

export default RandomMealButton;
