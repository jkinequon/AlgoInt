import React, { Component } from "react";
import ReactModal from "react-modal";
import firebase from "../firebase_config";

import { NavLink, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setQuestionQueue } from "../redux/actions/actions";

class SelectionOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRankingModal: false
    };
  }

  handleOpenRankingModal = (rankingObject) => {
    this.setState({ showRankingModal: true });
    console.log(rankingObject)
  };

  handleCloseRankingModal = () => {
    this.setState({ showRankingModal: false });
  };

  rankingHandler = (e, number) => {
    e.preventDefault();
    e.stopPropagation();
    const { questionsObject } = this.props;


    console.log();

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
            this.handleOpenRankingModal(rankingObject);
      });
  };

  render() {
    const {
      onClick = () => {},
      difficulty,
      type,
      language,
      description,
      number = [999],
      setQuestionQueue
    } = this.props;

    return (
      <>
        <ReactModal
          isOpen={this.state.showRankingModal}
          contentLabel=""
          onRequestClose={this.handleCloseRankingModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="modal-div">
            <h1>SOMETHING</h1>
            <button
              className="problem-button modal-close"
              onClick={this.handleCloseRankingModal}
            >
              <span>Close Modal</span>
            </button>
          </div>
        </ReactModal>
        <NavLink
          className="no-text-decoration"
          activeClassName={"no-text-decoration"}
          to={"/Problem"}
        >
          <div className="table-row" onClick={() => setQuestionQueue([number])}>
            {[
              difficulty,
              type,
              language,
              description,
              <button
                className="ranking-button"
                onClick={e => this.rankingHandler(e, number)}
              >
                <span>RANKINGS</span>
              </button>
            ].map((e, i) => {
              return (
                <div className="row-item" key={e.toString() + " " + i}>
                  {e}
                </div>
              );
            })}
          </div>
        </NavLink>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    questionsObject: state.delta.questionsObject
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setQuestionQueue: bindActionCreators(setQuestionQueue, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SelectionOption)
);
