export default  {

    orderForLine : (lineText, bundleData) => {
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
    },

    bundlesForOrder: (order, bundleData) => {

        var bundleCount = {}
        var orderCountRemaining = order.count

        // Make sure bundle counts are in descending order
        Object.keys(bundleData).sort((a, b)=> {
            return a - b * -1
        }).forEach((bundleCountMin) => {
            let countForBundle = Math.floor(orderCountRemaining / bundleCountMin)
            if (countForBundle > 0) {
                bundleCount[bundleCountMin] = countForBundle
                orderCountRemaining = orderCountRemaining - (countForBundle * bundleCountMin)
            }
        })
        if (orderCountRemaining > 0) {
            bundleCount[1] = orderCountRemaining
        }

        return bundleCount
    },

    orderTotal: (order) => {
        var orderTotal = 0.0
        // Ignore singles in total until requirements and values known
        Object.keys(order.bundleCount).filter((countType) => countType != 1).forEach((bundleCountMin) => {
            orderTotal = orderTotal + (order.bundleCount[bundleCountMin] * order.bundleData[bundleCountMin])
        })
        return orderTotal
    }

}
