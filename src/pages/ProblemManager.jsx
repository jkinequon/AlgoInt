import React, { Component } from "react";
import { Problem } from ".";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setCurrentQuestion,
  setQuestionQueue,
  setCurrentMode
} from "../redux/actions/actions";

import RankingModal from "../components/RankingModal";

import { NavLink, withRouter } from "react-router-dom";

class ProblemManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionActive: false
    };
  }

  callRankingFunction = (e, number) => {
    e.preventDefault();
    e.stopPropagation();
    this.clickChild(number);
  };

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

  render() {
    const {
      currentQuestion,
      questionQueue,
      questionsObject = [],
      currentMode,
      completedQuestions
    } = this.props;
    console.log(questionsObject);
    return (
      <>
        <RankingModal setClick={click => (this.clickChild = click)} />

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
              {currentMode == 3 ? <h1>Mock Interview Completed!</h1> : <></>}
              {currentMode == 3 && completedQuestions.length != 0 ? (
                completedQuestions.map(val => {
                  return (
                    <h2>
                      Question {val}:{" "}
                      <span className="console-success">Success! </span>
                      <button
                        className="ranking-button"
                        onClick={e => this.callRankingFunction(e, val)}
                      >
                        <span>RANKING Q{val}</span>
                      </button>
                    </h2>
                  );
                })
              ) : (
                <></>
              )}
              {currentMode == 3 && currentQuestion != null ? (
                <h2>
                  Question {currentQuestion}:{" "}
                  <span className="console-failed">Not Completed... </span>
                  <button
                    className="ranking-button"
                    onClick={e => this.callRankingFunction(e, currentQuestion)}
                  >
                    <span>RANKING Q{currentQuestion}</span>
                  </button>
                </h2>
              ) : (
                <></>
              )}
              {currentMode == 3 && questionQueue.length != 0 ? (
                questionQueue.map(val => {
                  return (
                    <h2>
                      Question {val}:{" "}
                      <span className="console-failed">Not Attempted... </span>
                      <button
                        className="ranking-button"
                        onClick={e => this.callRankingFunction(e, val)}
                      >
                        <span>RANKING Q{val}</span>
                      </button>
                    </h2>
                  );
                })
              ) : (
                <></>
              )}
              {currentMode != 3 ? <h2>Question Completed!</h2> : <></>}

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

const mapStateToProps = state => {
  return {
    currentQuestion: state.delta.currentQuestion,
    questionQueue: state.delta.questionQueue,
    questionsObject: state.delta.questionsObject,
    currentMode: state.delta.currentMode,
    completedQuestions: state.delta.completedQuestions
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
