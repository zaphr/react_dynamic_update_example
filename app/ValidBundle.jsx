import React, { PropTypes } from 'react'

export default class ValidBundle extends React.Component {

    render() {
        let bundle = this.props.bundle
        // Render largest bundles first
        let bundleKeys = Object.keys(bundle.bundleCount).sort((a, b)=> { return a - b * -1 })
        let bundleItems = bundleKeys.map((bundleMin, index)=> {
            return <li key={index} className="bundleLine"
            >{bundle.bundleCount[bundleMin]} x {bundleMin} ${bundle.bundleData[bundleMin].toFixed(2)}</li>
        })

        return (
            <div className="validBundle">
              <div className="orderSummary">
                    {this.props.bundle.count} {this.props.bundle.code} ${this.props.bundle.orderTotal.toFixed(2)}
              </div>
                <ul>
                    {bundleItems}
                </ul>

            </div>
        )
    }
}
ValidBundle.propTypes = { bundle: React.PropTypes.object }