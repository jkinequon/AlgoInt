import React, { Component } from "react";
import Countdown from "react-countdown";
import { connect } from "react-redux";

// Renderer callback with condition
const renderer = ({ formatted: { hours, minutes, seconds }, completed }) => {
  if (completed) {
    // Render a complete state
    return <span className="float-right timer">Time's up!</span>;
  } else {
    // Render a countdown
    return (
      <span className="float-right timer">
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

class Clock extends Component {
  render() {
    const { mockInterviewTime } = this.props;

    return (
      <Countdown
        date={Date.now() + mockInterviewTime}
        renderer={renderer}
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
