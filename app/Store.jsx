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

    userEntry: "",

    bundles: []
}

const flowerStore = (state = intialState, action) => {

    switch (action.type) {
        case 'USER_ENTRY':
            var orders = []
            action.value.forEach((line) => {
                orders.push(orderForLine(line, state.stockBundles))
            })
            return Object.assign({}, state, {bundles: orders})
    }

    return state
}

export default createStore(flowerStore)

const orderForLine = (lineText, bundleData) => {
    var order = {
        valid: false,
        lineText: lineText
    }

    let textSections = lineText.trim().split(" ").filter((line) => line.length != 0)

    if (textSections.length != 2) {
        return order
    }

    order.count = textSections[0]
    order.code = textSections[1]

    let validOrderQuantity = /^[0-9]+$/.test(order.count)
    let validOrderId = Object.keys(bundleData).filter((productID) => productID == order.code).length > 0

    order.valid = validOrderQuantity && validOrderId
    return order
}


