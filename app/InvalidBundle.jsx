import React, { PropTypes } from 'react'

export default class InvalidBundle extends React.Component {

    render() {

        return (
            <div className="invalidBundle">
                {this.props.bundle.lineText}
            </div>
        )
    }
}
InvalidBundle.propTypes = { bundle: React.PropTypes.object }