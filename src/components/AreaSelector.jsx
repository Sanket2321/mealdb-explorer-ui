
import React, { useState, useEffect } from 'react';
import { getAreas } from '../api/mealApi';

const AreaSelector = ({ onSelectArea }) => {
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');

    useEffect(() => {
        const fetchAreas = async () => {
            const data = await getAreas();
            setAreas(data || []);
        };
        fetchAreas();
    }, []);

    const handleChange = (e) => {
        const area = e.target.value;
        setSelectedArea(area);
        if (area) onSelectArea(area);
    };

    return (
        <div className="area-selector">

            <select id="area-select" value={selectedArea} onChange={handleChange}>
                <option value="">-- Select an Area --</option>
                {areas.map((area) => (
                    <option key={area.strArea} value={area.strArea}>
                        {area.strArea}
                    </option>
                ))}
            </select>
        </div>
    );

};

export default AreaSelector;
