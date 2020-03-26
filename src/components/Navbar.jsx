import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signIn, signOff, setUsername } from "../redux/actions/actions";
import firebase from "../firebase_config";
import { NavLink, withRouter } from "react-router-dom";
import { Clock } from "./";

class Navbar extends Component {
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
        signIn();
        setUsername(user["displayName"]);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var redential = error.credential;
      });
  };

  googleSignOut = () => {
    const { signOff, setUsername } = this.props;
    firebase
      .auth()
      .signOut()
      .then(function() {
        signOff();
        // successful signout
        setUsername("");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const {
      signedIn,
      currentMode,
      currentQuestion,
      questionQueue
    } = this.props;

    return (
      <nav className="navbar-root">
        <NavLink
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
        {currentMode == 3 && currentQuestion != null && questionQueue != [] ? (
          <Clock />
        ) : (
          <div />
        )}
      </nav>
    );
  }
}
const mapStateToProps = state => {
  return {
    signedIn: state.delta.signedIn,
    currentMode: state.delta.currentMode,
    mockInterviewTime: state.delta.mockInterviewTime,
    currentQuestion: state.delta.currentQuestion,
    questionQueue: state.delta.questionQueue
  };
};

function mapDispatchToProps(dispatch) {
  return {
    signIn: bindActionCreators(signIn, dispatch),
    signOff: bindActionCreators(signOff, dispatch),
    setUsername: bindActionCreators(setUsername, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
