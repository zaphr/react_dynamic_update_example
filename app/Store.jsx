import {createStore } from 'redux'

const intialState = {
    stockBundles: {
        R12: {
            name: "Roses",
            bundles: {
                5: 6.99,
                10: 12.99
            }
        },
        L09: {
            name: "Lilies",
            bundles: {
                3: 9.95,
                6: 16.95,
                9: 24.95
            }
        },
        T58: {
            name: "Tulips",
            bundles: {
                3: 5.95,
                5: 9.95,
                9: 16.99
            }
        }
    },

    userEntry: "foozzzzz",

    bundles: []
}

const flowerStore = (state = intialState, action) => {

    switch (action.type) {
        case 'USER_ENTRY':
            return Object.assign({}, state, {userEntry: action.value})
    }

    return state
}

export default createStore(flowerStore)

