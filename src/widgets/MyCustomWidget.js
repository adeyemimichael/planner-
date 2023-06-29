import React, { useEffect, useState } from 'react';

export default function LocationWidget() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Use geolocation API or any other method to retrieve the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error retrieving current location:', error);
      }
    );
  }, []);

  useEffect(() => {
    // Call location search API with the searchQuery to fetch results
    // Replace `YOUR_LOCATION_SEARCH_API_KEY` with your actual API key
    fetch(
      `https://api.your-location-search-api.com/places?key=YOUR_LOCATION_SEARCH_API_KEY`
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
      })
      .catch((error) => {
        console.error('Error fetching location search results:', error);
      });
  }, []);

  return (
    <div className="location-widget-container">
      
      {currentLocation ? (
        <div>
          <h2>Your Current Location:</h2>
          <p>Latitude: {currentLocation.latitude}</p>
          <p>Longitude: {currentLocation.longitude}</p>
        </div>
      ) : (
        <p>Loading location...</p>
      )}

      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
      <h3>Created by livingman</h3>
    </div>
  );
}
