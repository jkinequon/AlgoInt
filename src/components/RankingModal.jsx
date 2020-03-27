import React, { Component } from "react";
import ReactModal from "react-modal";
import firebase from "../firebase_config";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setCurrentQuestion,
  setCompletedQuestions
} from "../redux/actions/actions";

/**
 * Will display a modal which will hold the top 10 ranks for the question
 * Ranks are based on submition's runtime
 * - The faster the code, the higher the rank
 */
class RankingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRankingModal: false,
      currentRankingObject: []
    };
    this.rankingHandler = this.rankingHandler.bind(this);
  }

  // Setting the parent's click to call rankingHandler
  componentDidMount() {
    this.props.setClick(this.rankingHandler);
  }

  // Sets the state to show the modal
  handleOpenRankingModal = () => {
    this.setState({ showRankingModal: true });
    // console.log(this.state.currentRankingObject);
  };

  // Sets the state to hide the modal
  handleCloseRankingModal = () => {
    const {
      withinProblem = false,
      setCurrentQuestion,
      setCompletedQuestions,
      currentQuestion
    } = this.props;
    // If we are in a problem, close the problem
    if (withinProblem) {
      setCompletedQuestions(currentQuestion);
      setCurrentQuestion(null);
    } else {
      // Otherwise just close the modal
      this.setState({ showRankingModal: false });
    }
  };

  // Gets the rankings from firebase
  rankingHandler(number) {
    const { questionsObject } = this.props;
    var rankingObject = [];
    var rankings = firebase
      .database()
      .ref("/" + questionsObject[number]["Question Python File"])
      .orderByChild("priority")
      .limitToFirst(10);

    rankings
      .once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          rankingObject.push(childData);
        });
      })
      .then(() => {
        this.setState({ currentRankingObject: rankingObject }); // Sets the object
      })
      .then(() => {
        this.handleOpenRankingModal(); // When object containing all rankings is fetched, open the modal
      });
  }

  render() {
    const { username, withinProblem = false } = this.props;
    return (
      <div>
        <ReactModal // Handles the modal's functionality
          isOpen={this.state.showRankingModal}
          contentLabel=""
          onRequestClose={() => this.handleCloseRankingModal()}
          className="ranking-modal"
          overlayClassName="ranking-modal-overlay"
        >
          <div className="ranking-modal-div">
            {/** HEADERS */}
            <div className="ranking-row header">
              <div>Username</div>
              <div>Code Efficiency</div>
            </div>
            {/** BODY: For every rank in the object, print a row for the rank */}
            {this.state.currentRankingObject.map((item, i) => {
              if (item["user"] == username) {
                return (
                  <div className="ranking-row row-highlight" key={i}>
                    <div>{item["user"]}</div>
                    <div>{item["time"]}</div>
                  </div>
                );
              } else {
                return (
                  <div className="ranking-row" key={i}>
                    <div>{item["user"]}</div>
                    <div>{item["time"]}</div>
                  </div>
                );
              }
            })}
            <button
              className="problem-button modal-close"
              onClick={() => this.handleCloseRankingModal()}
            >
              <span>Close</span>
            </button>
          </div>
        </ReactModal>
      </div>
    );
  }
}

/** Retrieving states for the redux store */
const mapStateToProps = state => {
  return {
    questionsObject: state.delta.questionsObject,
    username: state.delta.username,
    currentQuestion: state.delta.currentQuestion
  };
};

/** Retrieving actions for the redux store */
function mapDispatchToProps(dispatch) {
  return {
    setCurrentQuestion: bindActionCreators(setCurrentQuestion, dispatch),
    setCompletedQuestions: bindActionCreators(setCompletedQuestions, dispatch)
  };
}

/** Connecting to the redux store */
export default connect(mapStateToProps, mapDispatchToProps)(RankingModal);
