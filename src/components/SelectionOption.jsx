import React, { Component } from 'react'

import {
    NavLink,
    withRouter
} from "react-router-dom";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setQuestionQueue } from '../redux/actions/actions'

 class SelectionOption extends Component {
    rankingHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("Modal pop-up for: " )
    }
    // 
    render() {

        const {onClick =() => {}, difficulty, type, language, description, number=[999], setQuestionQueue  } = this.props;

        return (
            <NavLink className="no-text-decoration" activeClassName={'no-text-decoration'} to={'/Problem'} >
                <div className="table-row" onClick={() => setQuestionQueue([number])}  onMouseOver={(e) => { console.log("Test Row Hover") }}>
                    {
                        [difficulty, type, language, description, <button className='ranking-button' onClick={(e) => this.rankingHandler(e)}><span>RANKINGS</span></button>].map((e, i) => {
                            return(
                                <div className="row-item" key={e.toString() + " " +  i}>
                                    {e}
                                </div>
                            )
                        })
                    }
                </div>

            </NavLink>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setQuestionQueue: bindActionCreators(setQuestionQueue, dispatch),
    };
}

export default withRouter(connect(null, mapDispatchToProps)(SelectionOption));
