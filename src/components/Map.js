import { useEffect, useRef, useState } from 'react';

export default function Map({ handleMapClick, guessedLocation, actualLocation, showResult }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const polylineRef = useRef(null);
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);

  // Check if Leaflet is loaded
  useEffect(() => {
    const checkLeaflet = () => {
      if (typeof window !== 'undefined' && window.L) {
        setIsLeafletLoaded(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (!checkLeaflet()) {
      // If not loaded yet, set up a polling mechanism
      const interval = setInterval(() => {
        if (checkLeaflet()) {
          clearInterval(interval);
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, []);

  // Initialize the map
  useEffect(() => {
    if (!isLeafletLoaded || !mapRef.current || mapInstanceRef.current) return;

    try {
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

      // Force a resize after a short delay
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 500);
    } catch (error) {
      console.error("Error initializing map:", error);
    }
    
    return () => {
      // Clean up on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isLeafletLoaded, handleMapClick]);

  // Add resize handler
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle markers and polyline
  useEffect(() => {
    if (!isLeafletLoaded || !mapInstanceRef.current) return;

    try {
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
    } catch (error) {
      console.error("Error updating map markers:", error);
    }
  }, [guessedLocation, actualLocation, showResult, isLeafletLoaded]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '400px', 
        minHeight: '400px',
        backgroundColor: '#f0f0f0' 
      }}
      className="leaflet-container"
    />
  );
}