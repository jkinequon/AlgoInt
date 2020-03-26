import React, { Component } from "react";
import Countdown from "react-countdown";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import { NavLink, withRouter } from "react-router-dom";
import RankingModal from "./RankingModal";
import { bindActionCreators } from "redux";
import { setTimeFinished } from "../redux/actions/actions";

var willUnmount = false;

class Clock extends Component {
  renderer = ({ formatted: { hours, minutes, seconds }, completed }) => {
    const { setTimeFinished, timeFinished } = this.props;
    if (completed) {
      // Render a complete state
      setTimeFinished(true);
      if (timeFinished) {
        return <span className="float-right timer">Time's up!</span>;
      } else {
        return <div />;
      }
    } else {
      // Render a countdown
      return (
        <span className="float-right timer">
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  componentWillUnmount() {
    willUnmount = true;
  }

  render() {
    const { mockInterviewTime, timeFinished } = this.props;

    return (
      <div>
        {!willUnmount && !timeFinished ? (
          <Countdown
            date={Date.now() + mockInterviewTime * 60000}
            // date={Date.now() + 3000} // Sets timer to 3 seconds for testing
            renderer={this.renderer}
            autoStart={true}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    mockInterviewTime: state.delta.mockInterviewTime,
    timeFinished: state.delta.timeFinished
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setTimeFinished: bindActionCreators(setTimeFinished, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
