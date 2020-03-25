import React, { Component } from "react";
import { Problem } from ".";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setCurrentQuestion,
  setQuestionQueue,
  setCurrentMode
} from "../redux/actions/actions";

import { NavLink, withRouter } from "react-router-dom";

class ProblemManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionActive: false
    };
  }

  selectQuestion = questionQueue => {
    const { setCurrentQuestion, setQuestionQueue } = this.props;

    if (questionQueue != null) {
      var question = questionQueue[0];
      var queue = questionQueue.slice(1);
      console.log(question);
      console.log(queue);
      setCurrentQuestion(question);
      setQuestionQueue(queue);
    }
  };

  componentWillUnmount() {
    const { setCurrentMode } = this.props;
    setCurrentMode(0);
  }

  returnHome = () => {};

  // getObjectOfQuestionNumber = () => this.props.questionsObject[this.props.questionQueue[0]]['Question Name']
  // getObjectOfQuestionNumber = () => questionsObject[questionQueue[0]]['Question Name']

  // TODO: Maybe add in secureRouter that if the queue is not empty, to redirect to /problem
  render() {
    const { currentQuestion, questionQueue, questionsObject = [] } = this.props;
    console.log(questionsObject);
    return (
      <>
        {// if no current question and there exists a queue
        currentQuestion == null && questionQueue.length != 0 ? (
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
                onClick={() => this.selectQuestion(questionQueue)}
              >
                <span>START</span>
              </button>
            </div>
          </div>
        ) : // if a question is already active
        currentQuestion != null ? (
          <Problem />
        ) : (
          // if there are no selected questions
          <div className="problem-start">
            <div className="center-align">
              <h1>No questions remaining</h1>
              <NavLink
                className="no-text-decoration"
                activeClassName={"no-text-decoration"}
                to={"/"}
              >
                <button
                  className="problem-button"
                  onClick={() => this.returnHome()}
                >
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

export default connect(mapStateToProps, mapDispatchToProps)(ProblemManager);
