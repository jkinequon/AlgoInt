import React, { Component } from "react";
import Countdown from "react-countdown";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTimeFinished, setCountdownRef } from "../redux/actions/actions";
import { ClockHelper } from "./";

var willUnmount = false; // For debugging purposes

class Clock extends Component {
  countdownApi = null; // For debugging purposes

  renderer = ({ formatted: { hours, minutes, seconds }, completed }) => {
    if (completed) {
      // Render a complete state
      this.countdownApi && this.countdownApi.pause();  // For debugging purposes
      return (
        <span className="float-right timer">
          Time's up!
          <ClockHelper />
        </span>
      );
    } else {
      // Render a countdown
      return (
        <span className="float-right timer">
          {hours}:{minutes}:{seconds} {/**Displays the time */}
        </span>
      );
    }
  };

  handlePause = ({ seconds }) => {
    const { setTimeFinished, timeFinished } = this.props;
    this.forceUpdate(); // For debugging purposes
    setTimeFinished(true);
    // alert(seconds);
  };

  setRef = countdown => {
    const { setCountdownRef } = this.props;
    if (countdown) {
      this.countdownApi = countdown.getApi(); // For debugging purposes
      console.log(this.countdownApi);
      setCountdownRef(this.countdownApi); // todo store countdownref and call countdownref.pause() when submitting and .start() when fetched
    }
  };

  componentWillUnmount() { // For debugging purposes
    willUnmount = true;
  }

  render() {
    const { mockInterviewTime, timeFinished } = this.props;

    return (
      <div>
        {!timeFinished ? (
          <Countdown // Keeps track of the time and passes it to the renderer
            ref={this.setRef} // For debugging purposes
            date={Date.now() + mockInterviewTime * 60000}
            // date={Date.now() + 3000} // Sets timer to 3 seconds for testing
            renderer={this.renderer}
            autoStart={true}
            onPause={this.handlePause} // For debugging purposes
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

/** Retrieving states for the redux store */
const mapStateToProps = state => {
  return {
    mockInterviewTime: state.delta.mockInterviewTime,
    timeFinished: state.delta.timeFinished
  };
};

/** Retrieving actions for the redux store */
function mapDispatchToProps(dispatch) {
  return {
    setTimeFinished: bindActionCreators(setTimeFinished, dispatch),
    setCountdownRef: bindActionCreators(setCountdownRef, dispatch)
  };
}

/** Connecting to the redux store */
export default connect(mapStateToProps, mapDispatchToProps)(Clock);
