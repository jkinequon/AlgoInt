import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTimeFinished } from "../redux/actions/actions";

class ClockHelper extends Component {
  componentDidMount() {
    const { setTimeFinished, timeFinished } = this.props;
    () => setTimeFinished(true);
  }
  render() {
    return <div></div>;
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(ClockHelper);