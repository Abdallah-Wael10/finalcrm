"use client";

import React, { createContext, useState, useEffect } from 'react';

export const Store = createContext();

export const LeadDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Retrieve userId from local storage

    const fetchData = async () => {
      if (!userId) {
        console.error("User ID not found in local storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/userLeads/");
        
        // Ensure response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        
        // Filter leads by userId
        const filteredData = result.filter(lead => lead.userId === userId);
        console.log(filteredData);
        
        setData(filteredData);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // No need to depend on userId as it is fetched from local storage directly

  return (
    <Store.Provider value={{ data, loading, error }}>
      {children}
    </Store.Provider>
  );
}
