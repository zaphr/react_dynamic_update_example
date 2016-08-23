import React, { PropTypes } from 'react'
import store from './Store.jsx'

export default class BundleDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userEntry: "",
      bundleDisplay: ""
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({userEntry: store.getState().userEntry})
    }) 

  }

  handleUserChange(event) {
    store.dispatch({
      type: 'USER_ENTRY',
      value: event.target.value.split("\n")
    })
  }

  render() {

    return (
      <div>
        <textarea
            type="text"
            placeholder="Enter orders"
            onChange={this.handleUserChange}
        />
        <label>{this.state.userEntry}</label>
      </div>
    );
  }
}
BundleDisplay.propTypes = { testText: React.PropTypes.string };
