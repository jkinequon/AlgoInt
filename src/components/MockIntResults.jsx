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

class MockIntResults extends Component {
  callRankingFunction = (e, number) => {
    e.preventDefault();
    e.stopPropagation();
    this.clickChild(number);
  };

  componentDidMount() {
    const { setTimeFinished } = this.props;
    setTimeFinished(true);
  }

  render() {
    const { currentQuestion, questionQueue, completedQuestions } = this.props;
    return (
      <div>
        <RankingModal setClick={click => (this.clickChild = click)} />

        <h1>Mock Interview Completed!</h1>
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

const mapStateToProps = state => {
  return {
    currentQuestion: state.delta.currentQuestion,
    questionQueue: state.delta.questionQueue,
    completedQuestions: state.delta.completedQuestions,
    timeFinished: state.delta.timeFinished
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setTimeFinished: bindActionCreators(setTimeFinished, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MockIntResults);
