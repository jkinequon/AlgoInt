import React, { Component } from "react";
import { HomeOptions } from "../components";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTimeFinished } from "../redux/actions/actions";

/**
 * This will serve as the main home component of the website ('/')
 */
class Home extends Component {
  /**
   * When this component mounts, it ensures that the time is disabled
   */
  componentDidMount() {
    const { setTimeFinished } = this.props;
    setTimeFinished(true);
  }

  /**
   * Returning three selectable options that will redirect the user to the appropriate pages for Whiteboard, Coding Proble, and Mock Interview options
   */
  render() {
    return (
      <div className="inner-middle-container">
        <div className="main-home-container">
          <HomeOptions
            title="WHITEBOARD"
            description="Practice Coding Interviews Problems with no code autocompletion."
            toLink="/Selection"
            mode={1}  // Set to mode 1
          />
          <HomeOptions
            title="CODING PROBLEM"
            description="Pratice Coding Interview Problems with code autocompletion for a more relaxed environment"
            toLink="/Selection"
            mode={2}  // Set to mode 2
          />
          <HomeOptions
            title="MOCK INTERVIEW"
            description="Complete 3 Coding Interview Problems back-to-back in a restricted time with no assisting hints"
            toLink="/Problem"
            mode={3}  // Set to mode 3
            isMockInterview={true}
          />
        </div>
      </div>
    );
  }
}

/** Retrieving actions for the redux store */
function mapDispatchToProps(dispatch) {
  return {
    setTimeFinished: bindActionCreators(setTimeFinished, dispatch)
  };
}

/** Connecting to the redux store */
export default connect(null, mapDispatchToProps)(Home);
