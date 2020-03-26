import React, { Component } from "react";
import { HomeOptions } from "../components";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTimeFinished } from "../redux/actions/actions";

class Home extends Component {
  componentDidMount() {
    const { setTimeFinished } = this.props;
    setTimeFinished(true);
  }

  render() {
    return (
      <div className="inner-middle-container">
        <div className="main-home-container">
          <HomeOptions
            title="WHITEBOARD"
            description="Practice Coding Interviews Problems with no code autocompletion."
            toLink="/Selection"
            mode={1}
          />
          <HomeOptions
            title="CODING PROBLEM"
            description="Pratice Coding Interview Problems with code autocompletion for a more relaxed environment"
            toLink="/Selection"
            mode={2}
          />
          <HomeOptions
            title="MOCK INTERVIEW"
            description="Complete 3 Coding Interview Problems back-to-back in a restricted time with no assisting hints"
            toLink="/Problem"
            mode={3}
            isMockInterview={true}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTimeFinished: bindActionCreators(setTimeFinished, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Home);
