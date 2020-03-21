import React, { Component } from 'react'

import { SelectionOption } from '../components';
import { connect } from 'react-redux'


class Selection extends Component {

    returnSelections = (questionsObject) => 
    questionsObject.map((val, i) => {
        console.log(val)

        return (
            <tr key={i}>
                <td colSpan="5">
                    <SelectionOption 
                        difficulty={val['Question Difficulty']} 
                        type={val['Question Type']} 
                        language={val['Language']} 
                        description={val['Question Name']}
                        number={val['QuestionID']}
                    />
                </td>
            </tr>
        )
    })

    render() {
        const {questionsObject} = this.props

        return (
            <div className="container">
                <table className="questions">
                    <thead>
                        <tr>
                            <th>Difficulty</th>
                            <th>Type</th>
                            <th>Language</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.returnSelections(questionsObject)}                        
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questionsObject: state.delta.questionsObject,

    };
};

export default connect(mapStateToProps, null)(Selection);