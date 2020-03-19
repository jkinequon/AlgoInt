import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setCurrentQuestion, setQuestionQueue } from '../redux/actions/actions'

import {
    NavLink,
    withRouter
} from "react-router-dom";

class HomeOptions extends Component {

    setMockIntQuestions = (isMockInterview) => {
        const { setQuestionQueue, setCurrentQuestion, questionsObject = [] } = this.props;
        setCurrentQuestion(null)
        setQuestionQueue([])
        if (isMockInterview){
            if (questionsObject.length > 0){
                let tempQuestionQueue = []
                while(tempQuestionQueue.length < 3) {
                    var min=0; 
                    var max=questionsObject.length;  
                    var random = Math.floor(Math.random() * (+max - +min)) + +min;
                    if(!tempQuestionQueue.includes(random)){
                        tempQuestionQueue.push(random)
                    }
                }                
                setQuestionQueue(tempQuestionQueue)                 
            }
        }
    }

    render() {

        const { title, description, toLink='/', isMockInterview=false } = this.props; 

        return (
            <NavLink className="root-container-home" activeClassName={'root-container-home-active'} to={toLink} onClick={() =>this.setMockIntQuestions(isMockInterview)} >
                <div className="inner-container">
                    <div className="title-container">
                        <div className="title-text">
                            {title}
                        </div>
                    </div>
                    <div className="info-text">
                        {description}
                    </div>
                </div>
            </NavLink>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentQuestion: state.delta.currentQuestion,
        questionQueue: state.delta.questionQueue,
        questionsObject: state.delta.questionsObject,

    };
};

function mapDispatchToProps(dispatch) {
    return {
        setCurrentQuestion: bindActionCreators(setCurrentQuestion, dispatch),
        setQuestionQueue: bindActionCreators(setQuestionQueue, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeOptions);



