import React, { Component } from "react";

import { SelectionOption } from "../components";
import { connect } from "react-redux";

/**
 * This component will list all problems for the user to select from
 */
class Selection extends Component {
  /**
   * Returns a SelectionOption component for each question in the database
   * And passing the details of the question to it
   */
  returnSelections = questionsObject =>
    questionsObject.map((val, i) => {
      // console.log(val)
      if (i != 0)
        return (
          <SelectionOption
            difficulty={val["Question Difficulty"]}
            type={val["Question Type"]}
            language={val["Language"]}
            description={val["Question Name"]}
            number={val["QuestionID"]}
            key={i}
          />
        );
    });

  render() {
    const { questionsObject } = this.props; // Retrieve the state from redux store

    return (
      <div className="container">
        <div className="react-table-root">
          <div className="table-header">
            {/**
             * Add each of the headers to each column
             */}
            {["Difficulty", "Type", "Language", "Description", "Rankings"].map(
              (e, i) => {
                return (
                  <div className="header-item" key={i}>
                    {e}
                  </div>
                );
              }
            )}
          </div>
          {/** Get each row for each question from the database */}
          {this.returnSelections(questionsObject)} 
        </div>
      </div>
    );
  }
}

/** Retrieving states for the redux store */
const mapStateToProps = state => {
  return {
    questionsObject: state.delta.questionsObject
  };
};

/** Connecting to the redux store */
export default connect(mapStateToProps, null)(Selection);
