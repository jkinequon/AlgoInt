import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setCurrentQuestion,
  setQuestionQueue,
  setCurrentMode,
  setMockInterviewTime,
  setCompletedQuestions,
  setTimeFinished
} from "../redux/actions/actions";
import Slider from "@material-ui/core/Slider";
import { NavLink, withRouter } from "react-router-dom";

class HomeOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 60
    };
  }

  initializeModeSelection = (mode, isMockInterview) => {
    const {
      setQuestionQueue,
      setCurrentQuestion,
      setCurrentMode,
      setMockInterviewTime,
      questionsObject = [],
      setCompletedQuestions,
      setTimeFinished
    } = this.props;
    setCurrentQuestion(null);
    setQuestionQueue([]);
    setCurrentMode(mode);
    setMockInterviewTime(this.state.sliderValue);
    setCompletedQuestions([]);

    // If Whiteboard mode
    if (mode == 0) {
      alert("No mode detected, error?");
      alert("WHaT tHE FucK!?");
    }
    // If MockInterview Mode
    else if (mode == 3) {
      setTimeFinished(false);
      if (questionsObject.length > 0) {
        let tempQuestionQueue = [];
        while (tempQuestionQueue.length < 3) {
          var min = 1;
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

  handleChange = (event, newValue) => {
    const { setMockInterviewTime } = this.props;
    this.setState({ sliderValue: newValue });
    setMockInterviewTime(this.state.sliderValue);
  };

  render() {
    const {
      title,
      description,
      toLink = "/",
      isMockInterview = false,
      mode = 0,
      mockInterviewTime
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
            <h1 className="title-text">{title}</h1>
          </div>
          <div className="info-text">{description}</div>
          {isMockInterview ? (
            <div className="range-slider">
              <div className="info-text">
                Time frame: {mockInterviewTime} minutes
              </div>
              <Slider
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onChange={(e, val) => this.handleChange(e, val)}
                defaultValue={60}
                aria-labelledby="discrete-slider-small-steps"
                step={10}
                marks
                min={10}
                max={100}
                valueLabelDisplay="auto"
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      </NavLink>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentQuestion: state.delta.currentQuestion,
    questionQueue: state.delta.questionQueue,
    questionsObject: state.delta.questionsObject,
    mockInterviewTime: state.delta.mockInterviewTime
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setCurrentQuestion: bindActionCreators(setCurrentQuestion, dispatch),
    setQuestionQueue: bindActionCreators(setQuestionQueue, dispatch),
    setCurrentMode: bindActionCreators(setCurrentMode, dispatch),
    setMockInterviewTime: bindActionCreators(setMockInterviewTime, dispatch),
    setCompletedQuestions: bindActionCreators(setCompletedQuestions, dispatch),
    setTimeFinished: bindActionCreators(setTimeFinished, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeOptions);
