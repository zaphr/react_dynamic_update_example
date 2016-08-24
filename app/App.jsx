import React from 'react'
import BundleDisplay from './BundleDisplay.jsx'
import OrderEntry from './OrderEntry.jsx'
import store from './Store.jsx'

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bundles: []
        }
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState({bundles: store.getState().bundles})
        })
    }

    render() {
        return (
            <div>
                <OrderEntry/>
                <BundleDisplay bundles={this.state.bundles}/>
            </div>
        );
    }
}

