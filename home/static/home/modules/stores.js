import {
    fetchNearbyStores
} from './api.js';

import {
    convertToGeoJson,
    plotStoresOnMap,
    flyToStore,
    displayStoreDetails,
} from './map.js';

/**
 * Current selected store's ID
 * @type {string}
 */
export let SELECTED_STORE_ID;

/**
 * Update selected store
 * @param {string} storeId
 */
export function updateSelectedStore(storeId) {
    SELECTED_STORE_ID = storeId;
}

/**
 * Fetch and display nearby stores
 * @typedef {import('./map').StoresGeoJSON} StoresGeoJSON
 * @param {Object} map
 * @param {number} latitude
 * @param {number} longitude
 * @return {Promise<StoresGeoJSON>} Stores in GeoJSON
 */
export async function displayNearbyStores(map, latitude, longitude) {
    const stores = await fetchNearbyStores(latitude, longitude);
    const storesGeoJson = convertToGeoJson(stores);
    plotStoresOnMap(map, storesGeoJson);
    return storesGeoJson;
}


/**
 * Set-up event handlers for each wishlist element
 * @param {Object} map
 * @param {StoresGeoJSON} storesGeoJson
 */
export function setStoreNavigation(map, storesGeoJson) {
    const wishlistElements = document.getElementsByClassName('wishlist');

    for (let i = 0; i < wishlistElements.length; i++){
        wishlistElements[i].onclick = (event) => {
            const storeId = event.currentTarget.getAttribute('data-store-id');
            console.log('Store ID: ' + storeId + ' ' + typeof storeId);
            for (let point of storesGeoJson.features){
                console.log('point.properties.id ' + point.properties.id + ' ' + typeof point.properties.id);
                if (storeId === point.properties.id.toString()){
                    console.log('found');
                    flyToStore(map, point);
                    displayStoreDetails(map, point);
                    updateSelectedStore(storeId);
                    break;
                }
            }
        }
    }
}
