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
import { withRouter } from "react-router-dom";

/**
 * This class will handle the introduction page and the google sign-in option
 */
class LogIn extends Component {
  /**
   * Function to authenticate the user through google authentication using firebase
   */
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
        signIn(); // Set signin to true - for SecureRouter
        setUsername(user["displayName"]); // Storing username into redux store
        setUID(user["uid"]);   // Storing UID into redux store
      })
      .catch(function(error) { // Used for printing errors
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var redential = error.credential;
      });
  };

    /**
   * Function to successfully sign the user out using google auth and firebase
   */
  googleSignOut = () => {
    const { signOff, setUsername, setUID } = this.props;
    firebase
      .auth()
      .signOut()
      .then(function() {
        signOff();  // Set signin to false - for SecureRouter
        // successful signout
        setUsername("default_user");
        setUID("abcd");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { setFrontEndTest } = this.props; // For testing front-end
    return (
      <div className="home-panel">
        <div className="welcome-intro">Welcome to</div>
        <div className="title-div">
          <h1 className="h1-block">lgoInt</h1>
        </div>
        <div class="loader-title triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"> </polygon>
          </svg>
        </div>
        <div className="intro">
          <h1>
            AlgoInt is a platform that{" "}
            <span className="console-success">
              prepares you for coding interviews.
            </span>
          </h1>
          <div className="mode-intro">
            <h2 className="console-failed">Modes: </h2>
            <h3>
              <span className="console-failed">Whiteboard:</span> Enhance your
              raw skills with no editor assistance!
            </h3>
            <h3>
              <span className="console-failed">Coding Problem:</span>{" "}
              Comfortable tackle problems with live autocompletion!
            </h3>
            <h3>
              <span className="console-failed">Mock Interview:</span> Escape
              your comfort zone and tackle problems within a time frame!
            </h3>
          </div>
          <h2>
            Solve our 6 questions as{" "}
            <span className="console-success">efficent</span> as possible and
            see your rank compared to others.
          </h2>
        </div>
        {/* <button
          className=""
          onClick={() => {
            signIn();
            setFrontEndTest();
          }}
        >
          Front-end Dev Testing
        </button> */}
        <div
          className="google-sign-in-div"
          onClick={() => {
            this.googleSignIn();
          }}
        >
          <button className="google-image-button">
            <img className="google-image" src="assets/google-logo.png"></img>
          </button>
          <span className="third_party_text">Sign in with google</span>
        </div>
      </div>
    );
  }
}

/** Retrieving states for the redux store */
const mapStateToProps = state => {
  return {
    signedIn: state.delta.signedIn
  };
};

/** Retrieving actions for the redux store */
function mapDispatchToProps(dispatch) {
  return {
    setFrontEndTest: bindActionCreators(setFrontEndTest, dispatch),
    signIn: bindActionCreators(signIn, dispatch),
    signOff: bindActionCreators(signOff, dispatch),
    setUsername: bindActionCreators(setUsername, dispatch),
    setUID: bindActionCreators(setUID, dispatch)
  };
}

/** Connecting to the redux store */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
