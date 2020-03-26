import React, { Component } from "react";

import { SelectionOption } from "../components";
import { connect } from "react-redux";

class Selection extends Component {
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
    const { questionsObject } = this.props;

    return (
      <div className="container">
        <div className="react-table-root">
          <div className="table-header">
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
          {this.returnSelections(questionsObject)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questionsObject: state.delta.questionsObject
  };
};

export default connect(mapStateToProps, null)(Selection);
