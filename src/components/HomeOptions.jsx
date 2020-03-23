import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setCurrentQuestion,
  setQuestionQueue,
  setCurrentMode
} from "../redux/actions/actions";

import { NavLink, withRouter } from "react-router-dom";

class HomeOptions extends Component {
  initializeModeSelection = (mode, isMockInterview) => {
    const {
      setQuestionQueue,
      setCurrentQuestion,
      setCurrentMode,
      questionsObject = []
    } = this.props;
    setCurrentQuestion(null);
    setQuestionQueue([]);
    setCurrentMode(mode);

    // If Whiteboard mode
    if (mode == 0) {
      alert("No mode detected, error?");
      alert("WHaT tHE FucK!?");
    }
    // If MockInterview Mode
    else if (mode == 3) {
      if (questionsObject.length > 0) {
        let tempQuestionQueue = [];
        while (tempQuestionQueue.length < 3) {
          var min = 0;
          var max = questionsObject.length;
          var random = Math.floor(Math.random() * (+max - +min)) + +min;
          if (!tempQuestionQueue.includes(random)) {
            tempQuestionQueue.push(random);
          }
        }
        setQuestionQueue(tempQuestionQueue);
      }
    }
  };

  render() {
    const {
      title,
      description,
      toLink = "/",
      isMockInterview = false,
      mode = 0
    } = this.props;

    return (
      <NavLink
        className="root-container-home"
        activeClassName={"root-container-home-active"}
        to={toLink}
        onClick={() => this.initializeModeSelection(mode, isMockInterview)}
      >
        <div className="inner-container">
          <div className="title-container">
            <div className="title-text">{title}</div>
          </div>
          <div className="info-text">{description}</div>
        </div>
      </NavLink>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentQuestion: state.delta.currentQuestion,
    questionQueue: state.delta.questionQueue,
    questionsObject: state.delta.questionsObject
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setCurrentQuestion: bindActionCreators(setCurrentQuestion, dispatch),
    setQuestionQueue: bindActionCreators(setQuestionQueue, dispatch),
    setCurrentMode: bindActionCreators(setCurrentMode, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeOptions);
