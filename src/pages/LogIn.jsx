import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setFrontEndTest,
  signIn,
  signOff,
  setUsername,
  setUID
} from "../redux/actions/actions";
import firebase from "../firebase_config";
import { NavLink, withRouter } from "react-router-dom";

class LogIn extends Component {
  googleSignIn = () => {
    const { signIn, setUsername, setUID } = this.props;

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // used for google API
        var token = result.credential.accessToken;
        // user info
        var user = result.user;
        console.log(user);
        signIn();
        setUsername(user["displayName"]);
        setUID(user["uid"]);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var redential = error.credential;
      });
  };

  googleSignOut = () => {
    const { signOff, setUsername, setUID } = this.props;
    firebase
      .auth()
      .signOut()
      .then(function() {
        signOff();
        // successful signout
        setUsername("default_user");
        setUID("abcd");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { signedIn, signIn, signOff, setFrontEndTest } = this.props;

    return (
      <div className="test">
        <div className="intro">
          AlgoInt is a platform that prepares you for coding interviews.
          Everything you need from whiteboard, mock interviews and more. Solve
          our 6 questions as efficient as you can and see your rank compared to
          others.
        </div>
        <form className="signIn">
          {signedIn ? (
            <button
              className=""
              onClick={() => {
                signOff();
              }}
            >
              Log out
            </button>
          ) : (
            <>
              <button
                className=""
                onClick={() => {
                  signIn();
                  setFrontEndTest();
                }}
              >
                Front-end Dev Testing
              </button>
              <div
                className="google-sign-in-div"
                onClick={() => {
                  this.googleSignIn();
                }}
              >
                <button className="google-image-button">
                  <img
                    className="google-image"
                    src="assets/google-logo.png"
                  ></img>
                </button>
                <span className="third_party_text">Sign in with google</span>
              </div>
            </>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signedIn: state.delta.signedIn
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setFrontEndTest: bindActionCreators(setFrontEndTest, dispatch),
    signIn: bindActionCreators(signIn, dispatch),
    signOff: bindActionCreators(signOff, dispatch),
    setUsername: bindActionCreators(setUsername, dispatch),
    setUID: bindActionCreators(setUID, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
