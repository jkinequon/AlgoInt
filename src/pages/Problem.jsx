import React, { Component } from "react";

import { CodeEditor } from "../components";
import ReactModal from "react-modal";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setCurrentQuestion, setQuestionQueue } from "../redux/actions/actions";

class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionTitle: "999",
      questionDescription: "A description of the title",
      questionHints: "",
      showHint1Modal: false,
      showHint2Modal: false,
      value: "",
      enableHints: true
    };
  }

  handleOpenHint1Modal = () => {
    this.setState({ showHint1Modal: true });
  };

  handleOpenHint2Modal = () => {
    this.setState({ showHint2Modal: true });
  };

  handleCloseHint1Modal = () => {
    this.setState({ showHint1Modal: false });
  };

  handleCloseHint2Modal = () => {
    this.setState({ showHint2Modal: false });
  };

  submitHandler = () => {
    const {
      setCurrentQuestion,
      currentQuestion,
      username,
      uid,
      questionsObject
    } = this.props;

    console.log(currentQuestion, username);
    console.log(this.state.value);
    var data = {
      name: username,
      message: "Submit",
      UUID: uid,
      Question: questionsObject[currentQuestion]["Question Python File"],
      Solution: this.state.value
    };
    console.log(data);
    let response = fetch("http://127.0.0.1:5000/api/Submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .then(setCurrentQuestion(null));
    console.log(response);
  };

  runHandler = () => {
    const {
      setCurrentQuestion,
      currentQuestion,
      username,
      uid,
      questionsObject
    } = this.props;

    console.log(currentQuestion, username);
    console.log(this.state.value);
    var data = {
      name: username,
      message: "Run",
      UUID: uid,
      Question: questionsObject[currentQuestion]["Question Python File"],
      Solution: this.state.value
    };
    console.log(data);
    let response = fetch("http://127.0.0.1:5000/api/Run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .then(setCurrentQuestion(null));
    console.log(response);
  };

  componentDidMount() {
    const { questionsObject, currentQuestion, currentMode } = this.props;
    var q_object = questionsObject[currentQuestion];
    this.setState({
      questionTitle: q_object["Question Name"],
      questionDescription: q_object["Question Description"],
      questionHints: q_object["Question Hints"]
    });

    if (currentMode == 1) {
      // Whiteboard
      this.setState({ enableHints: true });
    } else if (currentMode == 2) {
      // Coding Problem
      this.setState({ enableHints: true });
    } else if (currentMode == 3) {
      // Mock Interview
      this.setState({ enableHints: false });
    }
  }

  render() {
    console.log(this.state.questionHints);
    return (
      <div className="parent-container">
        {/* HINT MODALS */}
        <ReactModal
          isOpen={this.state.showHint1Modal}
          contentLabel="Modal #1 Global Style Override Example"
          onRequestClose={this.handleCloseHint1Modal}
          className="hint-modal"
          overlayClassName="hint-modal-overlay"
        >
          <div className="hint-modal-div">
            <h1>{this.state.questionHints[0]}</h1>
            <button
              className="problem-button modal-close"
              onClick={this.handleCloseHint1Modal}
            >
              <span>Close Modal</span>
            </button>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={this.state.showHint2Modal}
          contentLabel="Modal #2 Global Style Override Example"
          onRequestClose={this.handleCloseHint2Modal}
          className="hint-modal"
          overlayClassName="hint-modal-overlay"
        >
          <div className="hint-modal-div">
            <h1>{this.state.questionHints[1]}</h1>
            <button
              className="problem-button modal-close"
              onClick={this.handleCloseHint2Modal}
            >
              <span>Close Modal</span>
            </button>
          </div>
        </ReactModal>
        {/* HINT MODALS */}
        <div className="left-container">
          <div className="question-div">
            <h1 className="question-title">
              Question {this.state.questionTitle}
            </h1>
            <h2 className="question-text">{this.state.questionDescription}</h2>
          </div>
          {this.state.enableHints ? (
            <div className="hint-div">
              <button
                className="problem-button"
                onClick={() => this.handleOpenHint1Modal()}
              >
                <span>HINT 1</span>
              </button>
              <button
                className="problem-button"
                onClick={() => this.handleOpenHint2Modal()}
              >
                <span>HINT 2</span>
              </button>
            </div>
          ) : (
            <div />
          )}

          <div className="console-div">Console Output</div>
        </div>
        <div className="right-container">
          <CodeEditor
            onChange={newValue => {
              this.setState({ value: newValue });
            }}
          />
          {this.state.value != "" ? (
            <div className="bottom-right-bar">
              <button
                className="problem-button submit-button"
                onClick={() => this.runHandler()}
              >
                <span>RUN</span>
              </button>
              <button
                className="problem-button submit-button"
                onClick={() => this.submitHandler()}
              >
                <span>SUBMIT</span>
              </button>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentQuestion: state.delta.currentQuestion,
    questionQueue: state.delta.questionQueue,
    questionsObject: state.delta.questionsObject,
    username: state.delta.username,
    uid: state.delta.uid,
    currentMode: state.delta.currentMode
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setCurrentQuestion: bindActionCreators(setCurrentQuestion, dispatch),
    setQuestionQueue: bindActionCreators(setQuestionQueue, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Problem);
