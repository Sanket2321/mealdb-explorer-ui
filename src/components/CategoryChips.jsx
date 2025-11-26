
import React, { useState, useEffect } from 'react';
import { getCategories } from '../api/mealApi';

const CategoryChips = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data.slice(0, 10) || []);
        };
        fetchCategories();
    }, []);

    const handleClick = (category) => {
        setActiveCategory(category);
        onSelectCategory(category);
    };

    return (
        <div className="category-chips-container">

            <div className="chips-list">
                {categories.map((cat) => (
                    <button
                        key={cat.strCategory}
                        className={`chip ${activeCategory === cat.strCategory ? 'active' : ''}`}
                        onClick={() => handleClick(cat.strCategory)}
                    >
                        {cat.strCategory}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryChips;
