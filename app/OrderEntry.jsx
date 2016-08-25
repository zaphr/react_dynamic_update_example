import React, { PropTypes } from 'react'
import store from './Store.jsx'

export default class OrderEntry extends React.Component {

    handleUserChange(event) {
        // TODO: Line split needs testing on windows. *Believe* react normalises line endings but docs not clear
        store.dispatch({
            type: 'USER_ENTRY',
            value: event.target.value.split("\n")
        })
    }

    render() {
        return (
            <div className="orderEntry">
        <textarea
            type="text"
            placeholder="Enter orders"
            onChange={this.handleUserChange}
        />
            </div>
        )
    }
}
