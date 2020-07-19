import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MapWrapper from './Map.styles';
import mapManager from './mapManager';

const MainMap = () => {
  const containerEl = useRef(null);

  const [mapReady, setMapReady] = useState(false);

  const mapCenter = useSelector(state => {
    if (state.Devices.selectedId) {
      const position = state.Positions.items[state.Devices.selectedId] || null;
      if (position) {
        return [position.longitude, position.latitude];
      }
    }
    return null;
  });
  
  const createFeature = (state, position) => {
    const device = state.Devices.items[position.deviceId] || null;
    return {
      name: device ? device.name : '',
      description: device ? device.name : 'Desconhecido'
    }
  };
  
  const positions = useSelector(state => ({
    type: 'FeatureCollection',
    features: Object.values(state.Positions.items).map(position => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [position.longitude, position.latitude]
      },
      properties: createFeature(state, position),
    })),
  }));
  
  useLayoutEffect(() => {
    const currentEl = containerEl.current;
    currentEl.appendChild(mapManager.element);
    if (mapManager.map) {
      mapManager.map.resize();
    }
    return () => {
      currentEl.removeChild(mapManager.element);
    };
  }, [containerEl]);

  useEffect(() => {
    mapManager.registerListener(() => setMapReady(true));
  }, []);

  useEffect(() => {
    if (mapReady) {
      mapManager.map.addSource('positions', {
        type: 'geojson',
        data: positions,
        cluster: true, 
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });
      mapManager.addLayer('device-icon', 'positions', 'icon-marker', '{name}');

      const bounds = mapManager.calculateBounds(positions.features);
      if (bounds) {
        mapManager.map.fitBounds(bounds, {
          padding: 100,
          maxZoom: 9
        });
      }

      return () => {
        mapManager.map.removeLayer('device-icon');
        mapManager.map.removeSource('positions');
      };
    }
  }, [mapReady]);

  useEffect(() => {
    mapManager.map.easeTo({
      center: mapCenter
    });
  }, [mapCenter]);

  useEffect(() => {
    const source = mapManager.map.getSource('positions');
    if (source) {
      source.setData(positions);
    } 
  }, [positions]);

  const style = {
    width: '100%',
    height: '100%',
  };

  return <MapWrapper className="map-wrapper">
      <div style={style} ref={containerEl} />
    </MapWrapper>;
}

export default MainMap;
