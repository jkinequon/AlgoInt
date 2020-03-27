import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setQuestionObject } from "../src/redux/actions/actions";

import { Navbar, Sidebar } from "./components";
import {
  Home,
  NotFound,
  Selection,
  ProblemManager,
  LogIn,
  Problem
} from "./pages";
import firebase from "./firebase_config";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

/**
 * Deals with all re-routing for the website
 */
class SecureRouter extends Component {
  // When the component mounts get all the questions from firebase
  // Useful to load it here once
  // Then we can access the questions whenever
  componentDidMount() {
    const { setQuestionObject } = this.props;
    var questions = firebase.database().ref("/questions/");
    questions.on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        setQuestionObject(childData);
      });
    });
  }

  render() {
    const { signedIn, questionsObject } = this.props;
    // console.log(questionsObject)
    return (
      <Router>{/** Router - which is important for redirecting */}
        <Navbar />{/** Navbar - static bar at the top of the webpage */}
        <div
          className="root-inner-container"
          style={{ height: "calc(100vh - Xpx)" }}
        >
          <Switch>{/** Switch - switches depending on the desired route */}
            {!signedIn ? (
              <Route path="*">
                <LogIn />{/** Shows logging in page */}
              </Route>
            ) : (
              <>
                <Route exact path="/">
                  <Home />{/** Shows Home page */}
                </Route>
                <Route path="/Selection">
                  <Selection />{/** Shows Selection page */}
                </Route>
                <Route path="/Problem">
                  <ProblemManager />{/** Shows Problem page */}
                </Route>
                {/* <Route path="*"><NotFound /></Route> */}
              </>
            )}
          </Switch>
        </div>
      </Router>
    );
  }
}

/** Retrieving states for the redux store */
const mapStateToProps = state => {
  return {
    signedIn: state.delta.signedIn,
    questionsObject: state.delta.questionsObject
  };
};

/** Retrieving actions for the redux store */
function mapDispatchToProps(dispatch) {
  return {
    setQuestionObject: bindActionCreators(setQuestionObject, dispatch)
  };
}

/** Connecting to the redux store */
export default connect(mapStateToProps, mapDispatchToProps)(SecureRouter);
