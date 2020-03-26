import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setQuestionQueue } from "../redux/actions/actions";

import RankingModal from "./RankingModal";

class SelectionOption extends Component {
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
      setQuestionQueue
    } = this.props;

    return (
      <>
        <RankingModal setClick={click => (this.clickChild = click)} />
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

function mapDispatchToProps(dispatch) {
  return {
    setQuestionQueue: bindActionCreators(setQuestionQueue, dispatch)
  };
}

export default withRouter(connect(null, mapDispatchToProps)(SelectionOption));