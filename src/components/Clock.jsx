import React, { Component } from "react";
import Countdown from "react-countdown";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import { NavLink, withRouter } from "react-router-dom";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimeUpModal: false
    };
  }
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
    const { mockInterviewTime } = this.props;

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
          <div className="hint-modal-div">
            <h1>Time is up!</h1>
            <h1>Any unsubmitted work will be lost.</h1>
            <h1>That kinda sucks</h1>
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
    mockInterviewTime: state.delta.mockInterviewTime
  };
};

export default connect(mapStateToProps, null)(Clock);
