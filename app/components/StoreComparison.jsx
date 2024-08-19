// components/StoreComparison.js
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StoreComparison = ({ stores, injuries }) => {
  const [selectedStores, setSelectedStores] = useState([]);

  const handleStoreSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedStores(selected);
  };

  const comparisonData = selectedStores.map(store => ({
    name: store,
    injuries: injuries.filter(injury => injury.store === store).length
  }));

  return (
    <div>
      <select multiple onChange={handleStoreSelect}>
        {stores.map((store, index) => (
          <option key={index} value={store.name}>{store.name}</option>
        ))}
      </select>
      <BarChart width={600} height={300} data={comparisonData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="injuries" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};
