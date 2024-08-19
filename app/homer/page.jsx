// pages/index.js
'use client';
import React, { useState, useEffect } from 'react';
import Locations from '../components/StoreMap';

export default function Display() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await fetch('/data/stores.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setStores(data);
      } catch (error) {
        console.error("Could not fetch store data:", error);
      }
    }

    fetchStores();
  }, []);

  return (
    <div>
      <h1>Store Locations</h1>
      <Locations stores={stores} />
    </div>
  );
}
