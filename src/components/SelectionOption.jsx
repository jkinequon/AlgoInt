import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setQuestionQueue } from "../redux/actions/actions";

import RankingModal from "./RankingModal";

/**
 * Is a component for a row for the question selection
 * - Handles a button in a div button
 */
class SelectionOption extends Component {
  // Deals with event handling
  callRankingFunction = (e, number) => {
    e.preventDefault();
    e.stopPropagation();
    this.clickChild(number);
  };

  render() {
    const {
      onClick = () => {},
      difficulty,
      type,
      language,
      description,
      number = [999],
      setQuestionQueue,
      key
    } = this.props;

    return (
      <>
        {/** The Ranking modal to show when the user wants to check the question's ranking */}
        <RankingModal setClick={click => (this.clickChild = click)} />
        <NavLink // Redirects the user to the problem when they select this option
          className="no-text-decoration"
          activeClassName={"no-text-decoration"}
          to={"/Problem"}
        >
          <div
            className="table-row"
            onClick={() => setQuestionQueue([number])}
            key={key}
          >
            {// Insert each item into a column of the row
            [
              difficulty,
              type,
              language,
              description,
              <button
                className="ranking-button"
                // onClick={e => this.rankingHandler(e, number)}
                onClick={e => this.callRankingFunction(e, number)}
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

/** Retrieving actions for the redux store */
function mapDispatchToProps(dispatch) {
  return {
    setQuestionQueue: bindActionCreators(setQuestionQueue, dispatch)
  };
}

/** Connecting to the redux store */
export default withRouter(connect(null, mapDispatchToProps)(SelectionOption));
