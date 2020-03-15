import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { signIn, signOff } from '../redux/actions/actions'

import {
    NavLink,
    withRouter
} from "react-router-dom";


class LogIn extends Component {
    render() {
        const { signedIn, signIn, signOff } = this.props;
        
        return (
            <div className="test">
                Log In
                {signedIn ? 
                <button className="" onClick={() => {signOff()}}>Log out</button> : 
                <button className="" onClick={() => {signIn()}}>Log in</button>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        signedIn: state.delta.signedIn,
    };
};

function mapDispatchToProps(dispatch) {
    return {
      signIn: bindActionCreators(signIn, dispatch),
      signOff: bindActionCreators(signOff, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
