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

/**
 * Component to control the contents for each selection component for the home page
 */
class HomeOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 60
    };
  }

  // Gets called when a mode is selected
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
    // Set some control states
    setCurrentQuestion(null);
    setQuestionQueue([]);
    setCurrentMode(mode);
    setMockInterviewTime(this.state.sliderValue);
    setCompletedQuestions([]);

    // If an error somehow occured
    if (mode == 0) {
      alert("No mode detected, error?");
      alert("WHaT tHE FucK!?");
    }
    // If MockInterview Mode
    else if (mode == 3) {
      setTimeFinished(false); // Start timer
      if (questionsObject.length > 0) {
        // Select three random questions from the database
        // And insert it into the questio queue
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
  // Gandles the value change for the slider
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
      <NavLink // To re-route using Router
        className="root-container-home"
        activeClassName={"root-container-home-active"}
        to={toLink} // Go to the link supplied (/Problem or /Selection)
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
              <Slider // Slider component for selecting amount of minutes to set the timer to
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

/** Retrieving states for the redux store */
const mapStateToProps = state => {
  return {
    currentQuestion: state.delta.currentQuestion,
    questionQueue: state.delta.questionQueue,
    questionsObject: state.delta.questionsObject,
    mockInterviewTime: state.delta.mockInterviewTime
  };
};

/** Retrieving actions for the redux store */
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

/** Connecting to the redux store */
export default connect(mapStateToProps, mapDispatchToProps)(HomeOptions);
