import React, { useEffect, useRef, useState } from 'react';
import { mockHeatmapData } from '../../data/mockData';

const KindnessMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // This is a placeholder for where we would initialize the map using a library
    // like Google Maps, Mapbox, or Leaflet. For this demo, we'll just show a static image.
    if (mapRef.current) {
      setIsMapLoaded(true);
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Global Kindness Map</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex flex-wrap gap-4 mb-4">
          <button className="px-4 py-2 bg-teal-100 text-teal-800 rounded-md text-sm font-medium">
            Live View
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium">
            Time-lapse
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium">
            Categories
          </button>
          
          <div className="ml-auto">
            <select
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              defaultValue="30"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div
          ref={mapRef}
          className="h-[500px] w-full relative bg-gray-100"
        >
          {isMapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <img
                  src="https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Global Map"
                  className="w-full h-full object-cover opacity-80"
                />
                {/* Simulated heatmap points */}
                {mockHeatmapData.map((point, index) => {
                  // These positioning values are just approximations for visual purposes
                  // In a real application, we would convert lat/lng to pixel coordinates
                  const leftPercentage = ((point.lng + 180) / 360) * 100;
                  const topPercentage = ((90 - point.lat) / 180) * 100;
                  
                  return (
                    <div
                      key={index}
                      className="absolute rounded-full animate-pulse"
                      style={{
                        left: `${leftPercentage}%`,
                        top: `${topPercentage}%`,
                        width: `${Math.max(20, point.weight / 3)}px`,
                        height: `${Math.max(20, point.weight / 3)}px`,
                        backgroundColor: `rgba(56, 178, 172, ${point.weight / 100})`,
                        boxShadow: `0 0 ${point.weight / 5}px rgba(56, 178, 172, 0.8)`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Loading map...</p>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Total Acts:</span>
              <span className="ml-2 text-lg font-bold text-teal-700">28,475</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Countries:</span>
              <span className="ml-2 text-lg font-bold text-teal-700">83</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Today:</span>
              <span className="ml-2 text-lg font-bold text-teal-700">+342</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KindnessMap;