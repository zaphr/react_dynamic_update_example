import {createStore } from 'redux'
import OrderUtils from './OrderUtil.jsx'

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

    bundles: []
}

const flowerStore = (state = intialState, action) => {

    switch (action.type) {
        case 'USER_ENTRY':
            var orders = []
            action.value.forEach((line) => {
                let order = OrderUtils.orderForLine(line, state.stockBundles)
                if (order.valid) {
                    order.bundleData = state.stockBundles[order.code].bundles
                    order.name = state.stockBundles[order.code].name
                    order.bundleCount = OrderUtils.bundlesForOrder(order, order.bundleData)
                    order.orderTotal = OrderUtils.orderTotal(order)
                }
                orders.push(order)
            })
            return Object.assign({}, state, {bundles: orders})
    }

    return state
}

export default createStore(flowerStore)



