import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signIn, signOff, setUsername } from "../redux/actions/actions";
import firebase from "../firebase_config";
import { NavLink, withRouter } from "react-router-dom";
import { Clock } from "./";

/**
 * Navbar will be static on the top of the page
 * - Will contain a link button to redirect back to the home page
 * - Will contain a Google sign-in/sign-out button
 * - Will contain the timer
 */
class Navbar extends Component {
  // Deals with google authentication
  googleSignIn = () => {
    const { signIn, setUsername } = this.props;
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // used for google API
        var token = result.credential.accessToken;
        // user info
        var user = result.user;
        // console.log(user)
        signIn(); // Sets signed in to true in redux
        setUsername(user["displayName"]); // Sets username in redux
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var redential = error.credential;
      });
  };
  // Deals with google de-authentication
  googleSignOut = () => {
    const { signOff, setUsername } = this.props;
    firebase
      .auth()
      .signOut()
      .then(function() {
        signOff(); // Sets signed in to false in redux
        // successful signout
        setUsername(""); // Sets empty name in redux
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { signedIn, currentMode } = this.props;
    return (
      <nav className="navbar-root">
        <NavLink // Used to redirect to home page via router
          className="root-container-home"
          activeClassName={"root-container-home-active"}
          to={"/"}
        >
          <div className="navbar-title">
            <div className="title-text">AlgoInt</div>
          </div>
        </NavLink>
        {signedIn ? (
          <div
            className="google-sign-in-div float-left"
            onClick={() => {
              this.googleSignOut();
            }}
          >
            <span className="third_party_text_Signout">Sign out</span>
          </div>
        ) : (
          <div
            className="google-sign-in-div float-left"
            onClick={() => {
              this.googleSignIn();
            }}
          >
            <button className="google-image-button">
              <img className="google-image" src="assets/google-logo.png"></img>
            </button>
            <span className="third_party_text">Sign in with google</span>
          </div>
        )}
        { // If in mock interview mode, show clock
        currentMode == 3 ? <Clock /> : <div />}
        {/* <Clock /> */}
      </nav>
    );
  }
}

/** Retrieving states for the redux store */
const mapStateToProps = state => {
  return {
    signedIn: state.delta.signedIn,
    currentMode: state.delta.currentMode,
    mockInterviewTime: state.delta.mockInterviewTime,
    questionQueue: state.delta.questionQueue
  };
};

/** Retrieving actions for the redux store */
function mapDispatchToProps(dispatch) {
  return {
    signIn: bindActionCreators(signIn, dispatch),
    signOff: bindActionCreators(signOff, dispatch),
    setUsername: bindActionCreators(setUsername, dispatch),
  };
}

/** Connecting to the redux store */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
