import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTimeFinished } from "../redux/actions/actions";

/** Just a helper function to set a state on render
 * This is due to redux store taking some time to set the state
 * The clock constantly sets its state and therefore cannot be enabled/disabled during render
 */
class ClockHelper extends Component {
  componentDidMount() {
    console.log("CLOCK HELPER");
    const { setTimeFinished, timeFinished } = this.props;
    setTimeFinished(true);
  }
  render() {
    return <div></div>;
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
    setTimeFinished: bindActionCreators(setTimeFinished, dispatch)
  };
}

/** Connecting to the redux store */
export default connect(mapStateToProps, mapDispatchToProps)(ClockHelper);
