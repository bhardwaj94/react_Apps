import fetch from 'isomorphic-fetch';

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const UPDATE_SRC = 'UPDATE_SRC';

function updateSrcString(searchStr) {
    return {
        type: UPDATE_SRC,
        searchStr,
    };
}

function requestItems(searchStr) {
    return {
        type: REQUEST_ITEMS,
        searchStr,
    };
}

function receiveItems(searchStr, items) {
    return {
        type: RECEIVE_ITEMS,
        searchStr,
        items,
        receivedAt: Date.now(),
    };
}

function compareNames(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

function prepareItems(array) {
    let combined = [];
    array.forEach((item) => {
        combined = combined.concat(item.results);
    });

    return combined.map((item) => {
        if (Object.hasOwnProperty.call(item, 'orbital_period')) {
            return {
                type: 'planet',
                name: item.name,
                gravity: item.gravity,
                terrain: item.terrain,
                population: item.population,
            };
        }
        return {
            type: 'person',
            name: item.name,
            gender: item.gender,
            height: item.height,
            mass: item.mass,
        };
    }).sort(compareNames);
}

function fetchAllItems(searchStr) {
    const endpoints = [
        `https://swapi.co/api/planets/?search=${searchStr}`
    ];

    return (dispatch) => {
        /*
         * TODO Prepare responses as they come back
         * As opposed to in one go when all promises have returned as is current
         */
        dispatch(updateSrcString(searchStr));
        dispatch(requestItems(searchStr));
        return Promise.all(endpoints.map(url =>
            fetch(url).then(resp => resp.json())
        ))
            .then(array => prepareItems(array))
            .then(json => dispatch(receiveItems(searchStr, json)));
    };
}

function shouldFetchItems(state, searchStr) {
    const posts = state.itemsBySearchString[searchStr];
    if (!posts) {
        return true;
    } else if (posts.isFetching) {
        return false;
    }
    return false;
}

export function fetchItemsIfNeeded(searchStr) {
    return (dispatch, getState) => {
        if (shouldFetchItems(getState(), searchStr)) {
            return dispatch(fetchAllItems(searchStr));
        }
        return dispatch(updateSrcString(searchStr));
    };
}
