import React, { PropTypes } from 'react'

export default class ValidBundle extends React.Component {

    render() {
        let bundle = this.props.bundle
        let bundleItems = Object.keys(bundle.bundleCount).map((bundleMin, index)=> {
            if (! bundle.bundleData[bundleMin]) {
                return <li key={index}>{bundle.bundleCount[bundleMin]} x {bundleMin}  **** </li>
            } else {
                let lineTotal = bundle.bundleCount[bundleMin] * bundle.bundleData[bundleMin]
                return <li key={index}>{bundle.bundleCount[bundleMin]} x {bundleMin} ${lineTotal} </li>
            }
        })

        return (
            <div className="validBundle">
              <div className="orderSummary">
                    {this.props.bundle.count} {this.props.bundle.code} ${this.props.bundle.orderTotal}
              </div>
                <ul>
                    {bundleItems}
                </ul>

            </div>
        );
    }
}
ValidBundle.propTypes = { bundle: React.PropTypes.object };