import React, { useEffect, useRef, useState } from 'react';
import { analyticsService } from '../../services/analyticsService';

const KindnessMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [heatmapData, setHeatmapData] = useState<Array<{lat: number; lng: number; weight: number}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        setLoading(true);
        const data = await analyticsService.getHeatmapData();
        setHeatmapData(data);
        setIsMapLoaded(true);
      } catch (err: any) {
        setError(err.message || 'Failed to load map data');
        console.error('Error fetching heatmap data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (mapRef.current) {
      fetchHeatmapData();
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
      
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-96 text-red-500">{error}</div>
      ) : (
        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden" ref={mapRef}>
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <p>Carte chargée avec {heatmapData.length} points de données</p>
          </div>
          <div className="absolute bottom-2 right-2 bg-white p-2 rounded shadow text-xs">
            {heatmapData.length} actes de gentillesse répartis dans le monde entier
          </div>
        </div>
      )}
    </div>
  );
};

export default KindnessMap;