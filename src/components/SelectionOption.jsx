import React, { Component } from 'react'

import {
    NavLink,
    withRouter
} from "react-router-dom";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setQuestionQueue } from '../redux/actions/actions'

 class SelectionOption extends Component {

    render() {

        const { difficulty, type, language, description, number=[999], setQuestionQueue  } = this.props;

        return (
            <button className="selectionOption"  onClick={() => setQuestionQueue([number])}>
            <NavLink className="no-text-decoration" activeClassName={'no-text-decoration'} to={'/Problem'} >
                    <table className="option">
                        <tr>
                            <td>{difficulty}</td>
                            <td>{type}</td>
                            <td>{language}</td>
                            <td>{description}</td>
                            <td><button className='ranking-button' onClick={() => this.submitHandler()}><span>RANKINGS</span></button></td>
                        </tr>
                    </table>
            </NavLink>
            </button>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setQuestionQueue: bindActionCreators(setQuestionQueue, dispatch),
    };
}

export default withRouter(connect(null, mapDispatchToProps)(SelectionOption));
