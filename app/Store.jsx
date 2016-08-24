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

    bundles: []
}

const flowerStore = (state = intialState, action) => {

    switch (action.type) {
        case 'USER_ENTRY':
            var orders = []
            action.value.forEach((line) => {
                let order = orderForLine(line, state.stockBundles)
                if (order.valid) {
                    order.bundleData = state.stockBundles[order.code].bundles
                    order.name = state.stockBundles[order.code].name
                    order.bundleCount = findValidBundleCombination(order, order.bundleData)
                    if (order.bundleCount){
                        order.orderTotal = orderTotal(order)
                    } else {
                        order.valid = false
                    }
                }
                orders.push(order)
            })
            return Object.assign({}, state, {bundles: orders})
    }

    return state
}

export default createStore(flowerStore)

////////


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
    if (validOrderQuantity) {
        order.count = parseInt(order.count, 10)
    }
    let validOrderId = Object.keys(bundleData).filter((productID) => productID == order.code).length > 0

    order.valid = validOrderQuantity && validOrderId
    return order
}

const findValidBundleCombination = (order, bundleData) => {
    // Sort bundle counts in descending order
    var bundleKeys =  Object.keys(bundleData).sort((a, b)=> {
        return a - b * -1 })
    let totalItems = bundleKeys.length

    for (var i=0; i < totalItems; i++){
        let bundleCount = bundlesForOrder(order, bundleKeys)
        if (bundleCount) {
            return bundleCount
        } else {
            bundleKeys.shift()
        }
    }
    return false
}

const bundlesForOrder = (order, bundleData) => {

    var bundleCount = {}
    var orderCountRemaining = order.count

    bundleData.forEach((bundleCountMin) => {
        let countForBundle = Math.floor(orderCountRemaining / bundleCountMin)
        if (countForBundle > 0) {
            bundleCount[bundleCountMin] = countForBundle
            orderCountRemaining = orderCountRemaining - (countForBundle * bundleCountMin)
        }
    })

    if (orderCountRemaining > 0) {
        return false
    } else {
        return bundleCount
    }
}

const orderTotal = (order) => {
    var orderTotal = 0.0
    Object.keys(order.bundleCount).forEach((bundleCountMin) => {
        orderTotal = orderTotal + order.bundleCount[bundleCountMin] * order.bundleData[bundleCountMin]
    })
    return Math.round(orderTotal * 100) / 100
}

