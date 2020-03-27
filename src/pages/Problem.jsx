import React, { Component } from "react";

import { CodeEditor, Loader } from "../components";
import ReactModal from "react-modal";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setCurrentQuestion,
  setQuestionQueue,
  addCompletedQuestion,
  setTimeFinished
} from "../redux/actions/actions";

import { ClockHelper } from "../components/";
import RankingModal from "./../components/RankingModal";

/**
 * This component will display the problem page:
 * - Question Description
 * - Question Hints
 * - Question Console Window
 * - Code Editor
 * - Run & Submit buttons
 */
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
      enableHints: true,
      consoleOutput: [],
      isLoading: false
    };
  }

  // Opens the hint modal
  handleOpenHint1Modal = () => {
    this.setState({ showHint1Modal: true });
  };

  // Opens the hint modal
  handleOpenHint2Modal = () => {
    this.setState({ showHint2Modal: true });
  };

  // Closes the hint modal
  handleCloseHint1Modal = () => {
    this.setState({ showHint1Modal: false });
  };

  // Closes the hint modal
  handleCloseHint2Modal = () => {
    this.setState({ showHint2Modal: false });
  };

  /**
   * For the Submit Button
   * Communicates to the server back-end
   * - Sends the code to compile
   * - Receives a response
   * Submits the question to the database if the question's tests passed
   */
  submitHandler = () => {
    const {
      setCurrentQuestion,
      currentQuestion,
      username,
      uid,
      questionsObject,
      currentMode,
      frontEndTest,
      addCompletedQuestion
    } = this.props;
    var success = false; // If the question succeeded
    // console.log(currentQuestion, username);
    // console.log(this.state.value);
    // console.log(questionsObject);
    if (currentQuestion != null) {
      // object to send to the server
      var data = {
        name: username,
        message: "Submit",
        UUID: uid,
        Question: questionsObject[currentQuestion]["Question Python File"],
        Solution: this.state.value
      };
    }
    if (!frontEndTest) {
      // console.log(data);
      this.setState({ isLoading: true }); // Brings up loading screen
      //Communication with the server /Submit
      let response = fetch("http://127.0.0.1:5000/api/Submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(jsonObject => {
          var response = JSON.parse(jsonObject["response"]);
          if (response["response"] == "Success") {
            success = true;
            this.setState({
              consoleOutput: ["Success"]
            });
          } else {
            this.setState({
              consoleOutput: ["Failed"]
            });
          }
          if (response["outputData"] != []) {
            // Save console ouput
            this.setState({
              consoleOutput: [
                ...this.state.consoleOutput,
                ...response["outputData"]
              ]
            });
          }
          // If it was successful then either bring up the next question or show the rankings
          if (success) {
            if (currentMode == 3) {
              addCompletedQuestion(currentQuestion);
              setCurrentQuestion(null);
            } else {
              this.clickChild(currentQuestion);
            }
          }
          this.setState({ isLoading: false }); // Hides the loading screen
        });
    } else {
      // THIS IS FRONT-END TESTING CASE
      addCompletedQuestion(currentQuestion);
      setCurrentQuestion(null);
    }
  };

  runHandler = () => {
    const {
      setCurrentQuestion,
      currentQuestion,
      username,
      uid,
      questionsObject,
      frontEndTest
    } = this.props;
    // console.log(currentQuestion, username);
    // console.log(this.state.value);
    // object to send to the server
    var data = {
      name: username,
      message: "Run",
      UUID: uid,
      Question: questionsObject[currentQuestion]["Question Python File"],
      Solution: this.state.value
    };
    if (!frontEndTest) {
      this.setState({ isLoading: true }); // Brings up loading screen
      // console.log(data);
      //Communication with the server /Run
      let response = fetch("http://127.0.0.1:5000/api/Run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(jsonObject => {
          var response = JSON.parse(jsonObject["response"]);

          if (response["response"] == "Success") {
            this.setState({
              consoleOutput: ["Success"]
            });
          } else {
            this.setState({
              consoleOutput: ["Failed"]
            });
          } // Save console ouput
          if (response["outputData"] != []) {
            this.setState({
              consoleOutput: [
                ...this.state.consoleOutput,
                ...response["outputData"]
              ]
            });
          }
          this.setState({ isLoading: false }); // Hides the loading screen
        });
    } else {
      // THIS IS FRONT-END TESTING CASES
      this.setState({
        consoleOutput: [
          ...this.state.consoleOutput,
          "-DevMode: Response output from server-"
        ]
      });
      var output = ["Success", "Failed", "test string"];
      if (output != []) {
        this.setState({
          consoleOutput: [...this.state.consoleOutput, ...output]
        });
      }
    }
  };

  /** When component mounts, set the question title, description and hints */
  componentDidMount() {
    const { questionsObject, currentQuestion, currentMode } = this.props;
    var q_object = questionsObject[currentQuestion];
    this.setState({
      questionTitle: q_object["Question Name"],
      questionDescription: q_object["Question Description"],
      questionHints: q_object["Question Hints"]
    });
    // Enable/Disable hints based on mode
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
    // console.log(this.state.consoleOutput);
    // console.log(this.state.questionHints);
    var consoleOutput = this.state.consoleOutput;
    const { currentMode, completedQuestions } = this.props;
    return (
      <div className="parent-container">
        { // This is a helper to stop the clock (setting state in render)
        currentMode == 3 && completedQuestions.length >= 3 ? (
          <ClockHelper />
        ) : (
          <></>
        )}
        {// Displays the Loader when the state is set
        this.state.isLoading ? <Loader /> : <></>}
        {/* The modal to display the rankings*/}
        <RankingModal
          setClick={click => (this.clickChild = click)}
          withinProblem={true}
        />
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
              <span>Close</span>
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
              className="problem-button modal-close "
              onClick={this.handleCloseHint2Modal}
            >
              <span>Close</span>
            </button>
          </div>
        </ReactModal>
        {/* HINT MODALS */}
        {/* Div contains the question, hints and console */}
        <div className="left-container">
          <div className="question-div">
            <h1 className="question-title">{this.state.questionTitle}</h1>
            <h2 className="question-text">{this.state.questionDescription}</h2>
          </div>
          {this.state.enableHints ? (
            <div className="hint-div">
              <button
                className="problem-button hint-button"
                onClick={() => this.handleOpenHint1Modal()}
              >
                <span>HINT 1</span>
              </button>
              <button
                className="problem-button hint-button"
                onClick={() => this.handleOpenHint2Modal()}
              >
                <span>HINT 2</span>
              </button>
            </div>
          ) : (
            <div />
          )}
          <div className="console-div">
            <div className="inner-console-div">
              {// Prints all the console messages
              consoleOutput != [] ? (
                consoleOutput.map((val, i) => {
                  if (val == "Success") {
                    return (
                      <p className="console-success" key={i}>
                        {val}
                      </p>
                    );
                  } else if (val == "Failed") {
                    return (
                      <p className="console-failed" key={i}>
                        {val}
                      </p>
                    );
                  } else {
                    return <p key={i}>{val}</p>;
                  }
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {/* Div contains the code editor and Submit/Run buttons */}
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

/** Retrieving states for the redux store */
const mapStateToProps = state => {
  return {
    currentQuestion: state.delta.currentQuestion,
    questionQueue: state.delta.questionQueue,
    questionsObject: state.delta.questionsObject,
    username: state.delta.username,
    uid: state.delta.uid,
    frontEndTest: state.delta.frontEndTest,
    currentMode: state.delta.currentMode,
    completedQuestions: state.delta.completedQuestions
  };
};

/** Retrieving actions for the redux store */
function mapDispatchToProps(dispatch) {
  return {
    setCurrentQuestion: bindActionCreators(setCurrentQuestion, dispatch),
    addCompletedQuestion: bindActionCreators(addCompletedQuestion, dispatch),
    setQuestionQueue: bindActionCreators(setQuestionQueue, dispatch),
    setTimeFinished: bindActionCreators(setQuestionQueue, setTimeFinished)
  };
}

/** Connecting to the redux store */
export default connect(mapStateToProps, mapDispatchToProps)(Problem);
