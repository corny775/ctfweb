import { useEffect, useRef } from 'react';

export default function Map({ handleMapClick, guessedLocation, actualLocation, showResult }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const polylineRef = useRef(null);

  // Initialize the map
  useEffect(() => {
    // Make sure L (Leaflet) is available
    if (typeof window !== 'undefined' && typeof L !== 'undefined' && mapRef.current && !mapInstanceRef.current) {
      // Initialize the map
      mapInstanceRef.current = L.map(mapRef.current).setView([20, 0], 2);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(mapInstanceRef.current);
      
      // Add click event
      mapInstanceRef.current.on('click', (e) => {
        handleMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
      });

      // Force a resize to ensure the map renders properly
      setTimeout(() => {
        mapInstanceRef.current.invalidateSize();
      }, 100);
    }
    
    return () => {
      // Clean up on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [handleMapClick]);

  // Handle markers and polyline
  useEffect(() => {
    if (!mapInstanceRef.current || typeof L === 'undefined') return;

    // Clear previous markers and polyline
    markersRef.current.forEach(marker => {
      marker.remove();
    });
    markersRef.current = [];
    
    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }
    
    // Add guessed location marker
    if (guessedLocation) {
      const guessMarker = L.marker([guessedLocation.lat, guessedLocation.lng], {
        icon: L.divIcon({
          className: 'guess-marker',
          html: `<div style="background-color: blue; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        })
      }).addTo(mapInstanceRef.current);
      
      markersRef.current.push(guessMarker);
    }
    
    // Add actual location marker and polyline if showing result
    if (showResult && actualLocation && guessedLocation) {
      const actualMarker = L.marker([actualLocation.lat, actualLocation.lng], {
        icon: L.divIcon({
          className: 'actual-marker',
          html: `<div style="background-color: green; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        })
      }).addTo(mapInstanceRef.current);
      
      markersRef.current.push(actualMarker);
      
      // Add polyline
      polylineRef.current = L.polyline([
        [actualLocation.lat, actualLocation.lng],
        [guessedLocation.lat, guessedLocation.lng]
      ], {
        color: 'red',
        weight: 2,
        opacity: 0.7
      }).addTo(mapInstanceRef.current);
      
      // Fit bounds to show both markers
      const bounds = L.latLngBounds(
        [actualLocation.lat, actualLocation.lng],
        [guessedLocation.lat, guessedLocation.lng]
      );
      mapInstanceRef.current.fitBounds(bounds, {
        padding: [50, 50]
      });
    }
  }, [guessedLocation, actualLocation, showResult]);

  return (
    <div 
      ref={mapRef} 
      style={{ width: '100%', height: '80%', backgroundColor: '#f0f0f0' }}
      className="leaflet-container"
    />
  );
}