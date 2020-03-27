import React, { Component } from "react";
import { Problem } from ".";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setCurrentQuestion,
  setQuestionQueue,
  setCurrentMode
} from "../redux/actions/actions";
import { MockIntResults } from "../components";

import { NavLink } from "react-router-dom";

/**
 * This component will serve as the main /problems route
 * It will go on to show 1 of three components
 * 1. A description of the question to start - with a button to start it
 * 2. The Problem.jsx component itself - this will show the Q description, hint buttons, console panel, and code editor
 * 3. The Results component displaying either question completed, each question result and an option to view the rankings page
 */
class ProblemManager extends Component {
  /**
   * Selects a new question from the question queue
   */
  selectQuestion = questionQueue => {
    const { setCurrentQuestion, setQuestionQueue } = this.props;
    if (questionQueue != null) {
      var question = questionQueue[0];
      var queue = questionQueue.slice(1);
      setCurrentQuestion(question); // set the question in redux
      setQuestionQueue(queue); // set the updated queue in redux
    }
  };

  // If this component unmounts, mode is no longer 1, 2, or 3
  componentWillUnmount() {
    const { setCurrentMode } = this.props;
    setCurrentMode(0);
  }

  render() {
    const {
      currentQuestion,
      questionQueue,
      questionsObject = [],
      currentMode,
      timeFinished
    } = this.props;
    // console.log(questionsObject);
    return (
      <>
        {// if no current question and there exists a queue then show problem initializer
        questionQueue.length != 0 && currentQuestion == null ? (
          <div className="problem-start">
            <div className="center-align">
              <h1>
                {questionsObject &&
                  questionsObject[questionQueue[0]] &&
                  questionsObject[questionQueue[0]]["Question Name"]}
              </h1>
              <h2>
                Language:{" "}
                {questionsObject &&
                  questionsObject[questionQueue[0]] &&
                  questionsObject[questionQueue[0]]["Language"]}
              </h2>
              <h2>
                Type:{" "}
                {questionsObject &&
                  questionsObject[questionQueue[0]] &&
                  questionsObject[questionQueue[0]]["Question Type"]}
              </h2>
              <h2>
                Difficulty:{" "}
                {questionsObject &&
                  questionsObject[questionQueue[0]] &&
                  questionsObject[questionQueue[0]]["Question Difficulty"]}
              </h2>

              <button
                className="problem-button"
                // This will set the problem and bring up the new window
                onClick={() => this.selectQuestion(questionQueue)}
              >
                <span>START</span>
              </button>
            </div>
          </div>
        ) : // IF in interview mode and time is not yet finished
        currentMode == 3 && timeFinished == false ? (
          <Problem />
        ) : // IF in whiteboard or coding problem mode and a question is already active
        currentMode != 3 && currentQuestion != null ? (
          <Problem />
        ) : (
          // IF there are no selected questions, show the results
          <div className="problem-start">
            <div className="center-align">
              {currentMode != 3 ? (
                <h2>Question Completed!</h2>
              ) : (
                <MockIntResults /> // Shows the results for Mock Interview
              )}

              <NavLink
                className="no-text-decoration"
                activeClassName={"no-text-decoration"}
                to={"/"}
              >
                <button className="problem-button">
                  <span>RETURN</span>
                </button>
              </NavLink>
            </div>
          </div>
        )}
      </>
    );
  }
}

/** Retrieving states for the redux store */
const mapStateToProps = state => {
  return {
    currentQuestion: state.delta.currentQuestion,
    questionQueue: state.delta.questionQueue,
    questionsObject: state.delta.questionsObject,
    currentMode: state.delta.currentMode,
    completedQuestions: state.delta.completedQuestions,
    timeFinished: state.delta.timeFinished
  };
};

/** Retrieving actions for the redux store */
function mapDispatchToProps(dispatch) {
  return {
    setCurrentQuestion: bindActionCreators(setCurrentQuestion, dispatch),
    setQuestionQueue: bindActionCreators(setQuestionQueue, dispatch),
    setCurrentMode: bindActionCreators(setCurrentMode, dispatch)
  };
}

/** Connecting to the redux store */
export default connect(mapStateToProps, mapDispatchToProps)(ProblemManager);
