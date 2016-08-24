import React, { PropTypes } from 'react'
import ValidBundle from './ValidBundle.jsx'
import InvalidBundle from './InvalidBundle.jsx'

export default class BundleDisplay extends React.Component {

  render() {
    let bundleOutput = this.props.bundles.map((bundle, index)=> {
      if (bundle.valid) {
        return <ValidBundle bundle={bundle} key={index}/>
      } else {
        return <InvalidBundle bundle={bundle} key={index}/>
      }
    })

    return (
        <div className="bundleDisplay">
          {bundleOutput}
        </div>
    );
  }
}

BundleDisplay.propTypes = { bundles: React.PropTypes.array };
