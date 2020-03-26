import React, { Component } from "react";
import Countdown from "react-countdown";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import { NavLink, withRouter } from "react-router-dom";
import RankingModal from "./RankingModal";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimeUpModal: false
    };
  }

  callRankingFunction = (e, number) => {
    e.preventDefault();
    e.stopPropagation();
    this.clickChild(number);
  };

  handleOpenTimeUpModal = () => {
    this.setState({ showTimeUpModal: true });
  };

  handleCloseTimeUpModal = () => {
    <Redirect to="/" />;
    this.setState({ showTimeUpModal: false });
  };
  renderer = ({ formatted: { hours, minutes, seconds }, completed }) => {
    if (completed) {
      // Render a complete state

      return (
        <>
          <span className="float-right timer">Time's up!</span>
          {this.handleOpenTimeUpModal()}
        </>
      );
    } else {
      // Render a countdown
      return (
        <span className="float-right timer">
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  render() {
    const {
      mockInterviewTime,
      currentQuestion,
      questionQueue,
      currentMode,
      completedQuestions
    } = this.props;

    return (
      <div>
        <Countdown
          date={Date.now() + mockInterviewTime * 60000}
          // date={Date.now() + 3000} // Sets timer to 3 seconds for testing
          renderer={this.renderer}
          autoStart={true}
        />
        <ReactModal
          isOpen={this.state.showTimeUpModal}
          contentLabel="Modal #1 Global Style Override Example"
          onRequestClose={this.handleCloseTimeUpModal}
          className="hint-modal"
          overlayClassName="hint-modal-overlay"
        >
          <RankingModal setClick={click => (this.clickChild = click)} />

          <div className="hint-modal-div">
            {currentMode == 3 ? <h1>Time up!</h1> : <></>}
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

            <NavLink
              className="no-text-decoration"
              activeClassName={"no-text-decoration"}
              to={"/"}
            >
              <button
                className="problem-button modal-close"
                onClick={this.handleCloseTimeUpModal}
              >
                <span>Return Home</span>
              </button>
            </NavLink>
          </div>
        </ReactModal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    mockInterviewTime: state.delta.mockInterviewTime,
    currentQuestion: state.delta.currentQuestion,
    questionQueue: state.delta.questionQueue,
    questionsObject: state.delta.questionsObject,
    currentMode: state.delta.currentMode,
    completedQuestions: state.delta.completedQuestions
  };
};

export default connect(mapStateToProps, null)(Clock);
