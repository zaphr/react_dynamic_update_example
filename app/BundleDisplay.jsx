import React, { PropTypes } from 'react'
import store from './Store.jsx'
import ValidBundle from './ValidBundle.jsx'
import InvalidBundle from './InvalidBundle.jsx'

export default class BundleDisplay extends React.Component {

  handleUserChange(event) {
    // TODO: Line split needs testing on windows. *Believe* react normalises line endings but docs not clear
    store.dispatch({
      type: 'USER_ENTRY',
      value: event.target.value.split("\n")
    })
  }

  render() {
    let bundleOutput = this.props.bundles.map((bundle, index)=> {
      if (bundle.valid) {
        return <ValidBundle bundle={bundle} key={index}/>
      } else {
        return <InvalidBundle bundle={bundle} key={index}/>
      }
    })

    return (
      <div>
        <textarea
            type="text"
            placeholder="Enter orders"
            onChange={this.handleUserChange}
        />
        <div>{bundleOutput}</div>
      </div>
    );
  }
}

BundleDisplay.propTypes = { bundles: React.PropTypes.array };
