
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MealDetailsPage from './pages/MealDetailsPage';
import { getRandomMeal } from './api/mealApi';
import 'bootstrap-icons/font/bootstrap-icons.css';



function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="content">

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/meal/:id" element={<MealDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;