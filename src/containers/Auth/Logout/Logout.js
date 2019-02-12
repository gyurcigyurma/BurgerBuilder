import React, { Component } from 'react'
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout(this.props.history);
    }

    render() {
        return (
            <Redirect to="/" />
        )
    }
}

const mapDispathToProps = (dispatch) => ({
    onLogout: () => dispatch(actions.logout())

})

export default connect(null, mapDispathToProps)(Logout);


