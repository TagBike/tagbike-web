import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

let ready = false;
let registeredListener = null;

const registerListener = listener => {
  if (ready) {
    listener();
  } else {
    registeredListener = listener;
  }
};

const loadImage = (url) => {
  return new Promise(imageLoaded => {
    const image = new Image();
    image.onload = () => imageLoaded(image);
    image.src = url;
  });
};

const loadIcon = (key, background, url) => {
  return loadImage(url).then((image) => {
    const canvas = document.createElement('canvas');
    canvas.width = background.width * window.devicePixelRatio;
    canvas.height = background.height * window.devicePixelRatio;
    canvas.style.width = `${background.width}px`;
    canvas.style.height = `${background.height}px`;
    const context = canvas.getContext('2d');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    const imageWidth = image.width * window.devicePixelRatio;
    const imageHeight = image.height * window.devicePixelRatio;
    context.drawImage(image, (canvas.width - imageWidth) / 2, (canvas.height - imageHeight) / 2, imageWidth, imageHeight);

    map.addImage(key, context.getImageData(0, 0, canvas.width, canvas.height), {
      pixelRatio: window.devicePixelRatio
    });
  });
};

const addLayer = (id, source, icon, text) => {
  const layer = {
    'id': id,
    'type': 'symbol',
    'source': 'positions',
    'filter': ['!', ['has', 'point_count']],
    'layout': {
      'icon-image': icon,
      'icon-allow-overlap': true,
    },
  };
  if (text) {
    layer.layout = {
      ...layer.layout,
      'text-field': text,
      'text-allow-overlap': true,
      'text-anchor': 'bottom',
      'text-offset': [0, -2],
      'text-font': ['Roboto Bold'],
      'text-size': 12,
    }
    layer.paint = {
      'text-halo-color': 'white',
      'text-halo-width': 1,
    }
  } else {
    layer.layout = {
      ...layer.layout,
      'text-field': 'Desconhecido',
      'text-allow-overlap': true,
      'text-anchor': 'bottom',
      'text-offset': [0, -2],
      'text-font': ['Roboto Bold'],
      'text-size': 12,
    }
    layer.paint = {
      'text-halo-color': 'white',
      'text-halo-width': 1,
    }
  } 
  

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'positions',
    filter: ['has', 'point_count'],
    paint: {
    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    // with three steps to implement three types of circles:
    //   * Blue, 20px circles when point count is less than 100
    //   * Yellow, 30px circles when point count is between 100 and 750
    //   * Pink, 40px circles when point count is greater than or equal to 750
    'circle-color': [
    'step',
    ['get', 'point_count'],
    '#51bbd6',
    100,
    '#f1f075',
    750,
    '#f28cb1'
    ],
    'circle-radius': [
    'step',
    ['get', 'point_count'],
    20,
    100,
    30,
    750,
    40
    ]
    }
  });

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: source,
    filter: ['has', 'point_count'],
    layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['Roboto Regular'],
    'text-size': 12
    }
  });

  map.addLayer(layer);

  
}

const calculateBounds = features => {
  if (features && features.length) {
    const first = features[0].geometry.coordinates;
    const bounds = [[...first], [...first]];
    for (let feature of features) {
      const longitude = feature.geometry.coordinates[0]
      const latitude = feature.geometry.coordinates[1]
      if (longitude < bounds[0][0]) {
        bounds[0][0] = longitude;
      } else if (longitude > bounds[1][0]) {
        bounds[1][0] = longitude;
      }
      if (latitude < bounds[0][1]) {
        bounds[0][1] = latitude;
      } else if (latitude > bounds[1][1]) {
        bounds[1][1] = latitude;
      }
    }
    return bounds;
  } else {
    return null;
  }
}

const element = document.createElement('div');
element.style.width = '100%';
element.style.height = '100%';

const map = new mapboxgl.Map({
  container: element,
  style: {
    'version': 8,
    'sources': {
      'raster-tiles': {
        'type': 'raster',
        'tiles': [
            'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
            'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
            'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
            'https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png'
        ],
        'tileSize': 256,
        'attribution': 'Tag Bike © <a target="_top" rel="noopener" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a target="_top" rel="noopener" href="https://carto.com/attribution">CARTO</a>'
      }
    },
    'glyphs': 'https://cdn.traccar.com/map/fonts/{fontstack}/{range}.pbf',
    'layers': [
      {
        'id': 'simple-tiles',
        'type': 'raster',
        'source': 'raster-tiles',
        'minzoom': 0,
        'maxzoom': 22
      }
    ]
  },
  center: [0, 0],
  zoom: 1
});

map.addControl(new mapboxgl.NavigationControl());

map.on('load', () => {

  loadImage('images/background.svg').then((background) => {
    Promise.all([
      loadIcon('icon-marker', background, 'images/icon/marker.svg')
    ]).then(() => {
      ready = true;
      if (registeredListener) {
        registeredListener();
        registeredListener = null;
      }
    });
  });
});

map.on('click', 'device-icon', function(e) {
  var coordinates = e.features[0].geometry.coordinates.slice();
  var description = e.features[0].properties.description;
  
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
  
  new mapboxgl.Popup()
  .setLngLat(coordinates)
  .setHTML(description)
  .addTo(map);
});

map.on('mouseenter', 'device-icon', function() {
  map.getCanvas().style.cursor = 'pointer';
});
   
map.on('mouseleave', 'device-icon', function() {
  map.getCanvas().style.cursor = '';
});

// inspect a cluster on click
map.on('click', 'clusters', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
  layers: ['clusters']
  });
  var clusterId = features[0].properties.cluster_id;
  map.getSource('positions').getClusterExpansionZoom(
  clusterId,
  function(err, zoom) {
  if (err) return;
   
  map.easeTo({
  center: features[0].geometry.coordinates,
  zoom: zoom
  });
  }
  );
});

export default {
  element,
  map,
  registerListener,
  addLayer,
  calculateBounds,
};
