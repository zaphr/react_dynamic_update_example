import React, { PropTypes } from 'react'

export default class ValidBundle extends React.Component {

    render() {

        return (
            <div className="validBundle">
                {this.props.bundle.lineText}
            </div>
        );
    }
}
ValidBundle.propTypes = { bundle: React.PropTypes.object };