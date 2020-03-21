import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { signIn, signOff, setUsername } from '../redux/actions/actions'
import firebase from '../firebase_config'
import {
    NavLink,
    withRouter
} from "react-router-dom";


class LogIn extends Component {
    googleSignIn = () => {
        const { signIn, setUsername } = this.props;

        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // used for google API
            var token = result.credential.accessToken;
            // user info
            var user = result.user;
            // console.log(user['displayName'])
            signIn();
            setUsername(user['displayName'])
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var redential = error.credential;
        });
    }

    googleSignOut = () => {
        const { signOff, setUsername } = this.props;
        firebase.auth().signOut().then(function(){
            signOff()
            // successful signout
            setUsername('')
        }).catch(function(error){
            console.log(error);
        });
    }

    render() {
        const { signedIn, signIn, signOff } = this.props;

        return (
            <div className="test">
                <form className="signIn">
                    <label>Log In</label>
                    <input type="email" placeholder="email" name="email" ></input>
                    <input type="password" placeholder="password" name="psw" ></input>
                    {signedIn ?
                        <button className="" onClick={() => { signOff() }}>Log out</button> :
                        <>
                            <button className="" onClick={() => { signIn() }}>Log in</button>
                            <div className="google-sign-in-div"  onClick={() => { this.googleSignIn() }}>
                                <button className="google-image-button">
                                    <img className='google-image' src='assets/google-logo.png'></img>
                                </button>
                                <span className="third_party_text">Sign in with google</span>
                            </div>
                        </>
                    }
                </form>
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
        setUsername: bindActionCreators(setUsername, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
