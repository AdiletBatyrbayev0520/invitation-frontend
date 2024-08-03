import React, { useEffect, useRef, useState } from 'react';
import { load } from '@2gis/mapgl';
import axios from 'axios';

const Map = () => {
    const mapContainer = useRef(null);
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        // Fetch API key from the backend
        axios.get('/2gis_apikeys')
            .then(response => {
                const key = response.data.key;
                if (key) {
                    setApiKey(key);
                }
            })
            .catch(error => {
                console.error('Error fetching API key:', error);
            });
    }, []);

    useEffect(() => {
        if (mapContainer.current && apiKey) {
            load().then((mapglAPI) => {
                const map = new mapglAPI.Map(mapContainer.current, {
                    center: [77.02221, 43.292448],
                    zoom: 15,
                    key: apiKey,
                });

                new mapglAPI.Marker(map, {
                    coordinates: [77.02221, 43.292448],
                });
            }).catch(error => {
                console.error('Error loading 2GIS MapGL:', error);
            });
        }
    }, [apiKey]);

    return <div ref={mapContainer} className="map-container" style={{ width: '100%', height: '250px' }}></div>;
};

export default Map;
