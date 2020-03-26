import React, { Component } from "react";
import ReactModal from "react-modal";
import firebase from "../firebase_config";
import { connect } from "react-redux";

class RankingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRankingModal: false,
      currentRankingObject: []
    };
    this.rankingHandler = this.rankingHandler.bind(this);
  }

  componentDidMount() {
    this.props.setClick(this.rankingHandler);
  }

  handleOpenRankingModal = () => {
    this.setState({ showRankingModal: true });
    console.log(this.state.currentRankingObject);
  };

  handleCloseRankingModal = () => {
    this.setState({ showRankingModal: false });
  };

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
        this.setState({ currentRankingObject: rankingObject });
      })
      .then(() => {
        this.handleOpenRankingModal();
      });
  }

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.state.showRankingModal}
          contentLabel=""
          onRequestClose={() => this.handleCloseRankingModal()}
          className="ranking-modal"
          overlayClassName="ranking-modal-overlay"
        >
          <div className="ranking-modal-div">
            <div className="ranking-row header">
              <div>Username</div>
              <div>Code Efficiency</div>
            </div>
            {this.state.currentRankingObject.map((item, i) => {
              return (
                <div className="ranking-row" key={i}>
                  <div>{item["user"]}</div>
                  <div>{item["time"]}</div>
                </div>
              );
            })}
            <button
              className="problem-button modal-close"
              onClick={() => this.handleCloseRankingModal()}
            >
              <span>Close Modal</span>
            </button>
          </div>
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questionsObject: state.delta.questionsObject
  };
};

export default connect(mapStateToProps, null)(RankingModal);