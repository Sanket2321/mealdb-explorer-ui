
const API_BASE_URL = 'https://mealdb-explorer-backend.onrender.com/api';


const fetchWrapper = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse = await response.json();

        if (jsonResponse.statusCode === 200) {
            return jsonResponse.result || jsonResponse.data || {};

        } else {
            console.error("Backend error:", jsonResponse.message);
            return [];
        }
    } catch (error) {
        console.error("API call failed:", error);
        return [];
    }
};


export const searchMeals = async (query) => {
    const result = await fetchWrapper(`/search?name=${encodeURIComponent(query)}`);

    return result.map(item => ({
        idMeal: item.id,
        strMeal: item.name,
        strMealThumb: item.thumbnail,
        strCategory: item.category,
        strArea: item.area,
        strInstructions: item.instructions,
        strYoutube: item.youtube
    }));
};

export const getMealDetails = async (id) => {
    const item = await fetchWrapper(`/meal/${id}`);

    if (!item) return null;

    return {
        idMeal: item.id,
        strMeal: item.name,
        strMealThumb: item.thumbnail,
        strCategory: item.category,
        strArea: item.area,
        strInstructions: item.instructions,
        strYoutube: item.youtube,
        ingredients: item.ingredients || [],
        measures: item.measures || []
    };
};


export const getRandomMeal = async () => {
    const result = await fetchWrapper('/random');

    // Result can be array OR object → normalize it
    const item = Array.isArray(result) ? result[0] : result;

    if (!item) return null;

    return {
        idMeal: item.id,
        strMeal: item.name,
        strMealThumb: item.thumbnail,
        strCategory: item.category,
        strArea: item.area,
        strInstructions: item.instructions,
        strYoutube: item.youtube
    };
};



export const getCategories = async () => {
    const result = await fetchWrapper('/categories');
    return result.map(item => ({
        strCategory: item.name
    }));
};


export const getAreas = async () => {
    const result = await fetchWrapper('/areas');
    return result.map(item => ({
        strArea: item.name
    }));
};

