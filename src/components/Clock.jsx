import React, { Component } from "react";
import Countdown from "react-countdown";
import { connect } from "react-redux";
import ReactModal from "react-modal";

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
    this.setState({ showTimeUpModal: false });
  };
  renderer = ({ formatted: { hours, minutes, seconds }, completed }) => {
    if (completed) {
      // Render a complete state
      return <span className="float-right timer">Time up</span>;
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
      <Countdown
        date={Date.now() + mockInterviewTime * 60000}
        renderer={this.renderer}
        autoStart={true}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    mockInterviewTime: state.delta.mockInterviewTime
  };
};

export default connect(mapStateToProps, null)(Clock);
