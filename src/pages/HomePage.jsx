
import React, { useState, useEffect } from 'react';
import MealCard from '../components/MealCard';
import CategoryChips from '../components/CategoryChips';
import AreaSelector from '../components/AreaSelector';
import { searchMeals } from '../api/mealApi';
import RandomMealButton from "../components/RandomMealButton";

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchType, setSearchType] = useState('initial'); // 'initial', 'search', 'category', 'area'


    useEffect(() => {

        handleSearch('Chicken', 'initial');
    }, []);

    const handleSearch = async (query, type = 'search') => {
        if (!query) return;

        setLoading(true);
        const result = await searchMeals(query);
        setMeals(result || []);
        setSearchQuery(query);
        setSearchType(type);
        setLoading(false);
    };

    const handleCategorySelect = (category) => {
        handleSearch(category, 'category');
    };

    const handleAreaSelect = (area) => {
        handleSearch(area, 'area');
    };

    const handleTextSearch = (e) => {
        e.preventDefault();

        if (searchQuery.trim()) {
            handleSearch(searchQuery.trim(), 'search');
        }
    };

    const getResultsHeading = () => {
        if (loading) return "Loading meals...";
        if (searchType === 'search' && searchQuery) return `Search Results for "${searchQuery}"`;
        if (searchType === 'category' && searchQuery) return `Meals in the ${searchQuery} Category`;
        if (searchType === 'area' && searchQuery) return `Meals from the ${searchQuery} Area`;
        return 'Popular Meals';
    };

    return (
        <div className="home-page">
            <form onSubmit={handleTextSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for a meal (e.g., 'Chicken', 'Lasagna')..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            {/* Center Position */}
            <div className="hungry-container">
                <RandomMealButton />
            </div>

            <div className="navigation-selectors">

                <div className="category-section">
                    <h4>Browse by Category:</h4>
                    <CategoryChips onSelectCategory={handleCategorySelect} />
                </div>

                <div className="area-section">
                    <h4>Browse by Cuisine Area:</h4>
                    <AreaSelector onSelectArea={handleAreaSelect} />
                </div>

            </div>


            <h2 className="results-heading">{getResultsHeading()}</h2>

            {loading ? (
                <div className="loading">Fetching data...</div>
            ) : meals.length > 0 ? (
                <div className="meal-grid">
                    {meals.map((meal) => (
                        <MealCard key={meal.idMeal} meal={meal} />
                    ))}
                </div>
            ) : (
                <div className="no-results">No meals found for your criteria. Try another keyword or filter!</div>
            )}
        </div>
    );
};

export default HomePage;