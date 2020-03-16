import React, { Component } from 'react'

import {
    NavLink,
    withRouter
} from "react-router-dom";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setQuestionQueue } from '../redux/actions/actions'

 class SelectionOption extends Component {

    test = () => {
        const {  number='999', setQuestionQueue  } = this.props;

        setQuestionQueue(number)
        console.log("TESTING")

    }

    render() {

        const { difficulty, type, language, description, number='999'  } = this.props;

        return (
            <button className="selectionOption" onClick={this.test}>
            <NavLink className="no-text-decoration" activeClassName={'no-text-decoration'} to={'/problem'} >
                    <table className="option">
                        <tr>
                            <td>{difficulty}</td>
                            <td>{type}</td>
                            <td>{language}</td>
                            <td>{description}</td>
                        </tr>
                    </table>
            </NavLink>
            </button>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         signedIn: state.delta.signedIn,
//     };
// };

function mapDispatchToProps(dispatch) {
    return {
        setQuestionQueue: bindActionCreators(setQuestionQueue, dispatch),
    };
}

export default withRouter(connect(null, mapDispatchToProps)(SelectionOption));
