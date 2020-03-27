import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setCurrentQuestion,
  setQuestionQueue,
  setCurrentMode,
  setTimeFinished
} from "../redux/actions/actions";

import RankingModal from "../components/RankingModal";

/**
 * Component used to display the question results for each question that was in the queue
 */
class MockIntResults extends Component {
  // Stops the default button events
  callRankingFunction = (e, number) => {
    e.preventDefault();
    e.stopPropagation();
    this.clickChild(number);
  };

  // If this is mounted, hide the timer
  componentDidMount() {
    const { setTimeFinished } = this.props;
    setTimeFinished(true);
  }

  render() {
    const { currentQuestion, questionQueue, completedQuestions } = this.props;
    return (
      <div>
        {/**Modal containing the ranks for the question */}
        <RankingModal setClick={click => (this.clickChild = click)} />

        <h1>Mock Interview Completed!</h1>
        {/**
         * The following shows all completed, failed, and unattempted questions
         */}
        {completedQuestions.length != 0 ? (
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
        {currentQuestion != null ? (
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
        {questionQueue.length != 0 ? (
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
      </div>
    );
  }
}

/** Retrieving states for the redux store */
const mapStateToProps = state => {
  return {
    currentQuestion: state.delta.currentQuestion,
    questionQueue: state.delta.questionQueue,
    completedQuestions: state.delta.completedQuestions,
    timeFinished: state.delta.timeFinished
  };
};

/** Retrieving actions for the redux store */
function mapDispatchToProps(dispatch) {
  return {
    setTimeFinished: bindActionCreators(setTimeFinished, dispatch)
  };
}

/** Connecting to the redux store */
export default connect(mapStateToProps, mapDispatchToProps)(MockIntResults);
