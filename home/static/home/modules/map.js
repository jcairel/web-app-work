import {
    updateSelectedStore,
} from './stores.js';

// https://www.mapbox.com/
mapboxgl.accessToken = ''
/**
 * @typedef {import('./api').Store} Store
 */

/**
 * Stores GeoJSON Feature object
 * @typedef {Object} StoreFeatureObject
 * @property {'Feature'} type
 * @property {{type: 'Point', coordinates: [number, number] }} geometry
 * @property {Store} properties
 */

/**
 * Stores GeoJSON FeatureCollection
 * @typedef {Object} StoresGeoJSON
 * @property {'FeatureCollection'} type
 * @property {StoreFeatureObject[]} features
 */

/**
 * Create a new mapbox map instance
 * @return {Object} Map
 */
export function addMap() {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-117.161087, 32.715736],
        zoom: 12
    });

    map.addControl(new mapboxgl.NavigationControl());

    return map;
}

/**
 * Add a geoCoder control to a mapbox map
 * @param {Object} map
 * @param {function} geocoderCallback - The callback that handles the response.
 */
export function addGeocoder(map, geocoderCallback) {
    const geocoder = new MapboxGeocoder({ 
        accessToken: mapboxgl.accessToken, 
        mapboxgl: mapboxgl,
        });
    map.addControl(geocoder);
    geocoder.on("result", (data) => {
        geocoderCallback(data);
        map.flyTo({
            center: data.result.center,
            zoom: 15
        });
    });
}

/**
 * Converts array of stores to GeoJSON format
 * @param {Store[]} stores
 * @return {StoresGeoJSON} Stores in GeoJSON
 */
export function convertToGeoJson(stores) {
    return {
        type: 'FeatureCollection',
        features: stores.map(store => {
            return {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [store.longitude, store.latitude]
                },
                properties: {
                    id: store.id,
                    name: store.name,
                    address: store.address,
                    phone: store.phone,
                    distance: store.distance,
                    rating: store.rating,
                }
            }
        })
    }
}

/**
 * Display stores on map
 * @param {Object} map
 * @param {StoresGeoJSON} storesGeoJson
 */
export function plotStoresOnMap(map, storesGeoJson) {
    for (let store of storesGeoJson.features){
        // Create a HTML element for each feature
        let el = document.createElement('div');
        el.className = 'store';
        el.title = `${store.properties.name}\n` +
            `approximately ${store.properties.distance.toFixed(2)} km away\n` +
            `Address: ${store.properties.address || "N/A"}\n` +
            `Phone: ${store.properties.phone || "N/A"}\n` +
            `Rating: ${store.properties.rating || "N/A"}`;
        let marker = new mapboxgl.Marker(el).setLngLat(store.geometry.coordinates).addTo(map);
        marker.getElement().addEventListener('click', function(e) {
            updateSelectedStore(store.properties.id);
        });
    }
}

/**
 * Zoom in-to a specific point on a map
 * @param {Object} map
 * @param {StoreFeatureObject} point
 */
export function flyToStore(map, point) {
    map.flyTo({
        center: point.geometry.coordinates,
        zoom: 19
    });
}

/**
 * Display store info on the map using a popup
 * @param {Object} map
 * @param {StoreFeatureObject} point
 */
export function displayStoreDetails(map, point) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    // Check if there is already a popup on the map and if so, remove it
    if (popUps[0]){
        popUps[0].remove();
    }
    const popup = new mapboxgl.Popup({closeOnClick: false})
        .setLngLat(point.geometry.coordinates)
        .setHTML(`
            <details>  
                <summary><h2>${point.properties.name}</h2></summary>  
                <dl>  
                    <dt>Distance</dt>  
                    <dd>Approximately <strong>${point.properties.distance.toFixed(2)} km</strong> away</dd>
                    
                    <dt>Address</dt>  
                    <dd>${point.properties.address || 'N/A'}</dd>
                    
                    <dt>Phone</dt>  
                    <dd>${point.properties.phone || 'N/A'}</dd>
                    
                    <dt>Rating</dt>  
                    <dd>${point.properties.rating || 'N/A'}</dd>  
                </dl>  
            </details>
            `).addTo(map);
    return popup;

}
