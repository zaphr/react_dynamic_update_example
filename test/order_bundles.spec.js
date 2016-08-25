import React from 'react'
import { mount, shallow } from 'enzyme'
import {expect} from 'chai'
import App from '../app/App.jsx'

describe('entering a valid 3 line order', () => {

    let app = mount(<App />);

    before(() => {

        let order = `
        10 R12
        15 L09
        13 T58`

        app.find('textarea').simulate('change', { target: { value: order} })
    })

    it('should display 3 valid bundles', () => {
        expect(app.find('ValidBundle')).to.have.length(3);
    })

    it('should not display any invalid bundles', () => {
        expect(app.find('InvalidBundle')).to.have.length(0);
    })

    it('should show a bundle summary for each order item', () => {
        let expectedSummaries = [
            "10 R12 $12.99",
            "15 L09 $41.90",
            "13 T58 $25.85"
        ]

        let displayedOrderSummaries = app.find('.orderSummary')
        expect(displayedOrderSummaries).to.have.length(3)

        displayedOrderSummaries.forEach((displayedSummary, index) => {
            expect(displayedSummary.text()).to.equal(expectedSummaries[index])
        })
    })

    describe('order bundle lines', () => {
        it('should show bundle lines for each order in descending bundle size order', () => {
            let expectedSummaries = [
                ['1 x 10 $12.99'],
                ['1 x 9 $24.95', '1 x 6 $16.95'],
                ['2 x 5 $9.95', '1 x 3 $5.95']
            ]

            let bundles = app.find('ValidBundle')
            bundles.forEach((bundle, index) => {
                let bundleLines = bundle.find('.bundleLine')
                expect(bundleLines).to.have.length(expectedSummaries[index].length)

                bundleLines.forEach((bundleLine, innerIndex) => {
                    expect(bundleLine.text()).to.equal(expectedSummaries[index][innerIndex])
                })
            })
        })
    })

})