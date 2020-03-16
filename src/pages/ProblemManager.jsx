import React, { Component } from 'react'

import { Problem } from '.'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setCurrentQuestion, setQuestionQueue } from '../redux/actions/actions'

class ProblemManager extends Component {

    componentDidMount(){
        const { currentQuestion, questionQueue, setCurrentQuestion, setQuestionQueue } = this.props;
        if (currentQuestion == null && questionQueue.length != 0){
            var question = questionQueue[0]
            var queue = questionQueue.slice(1)
            console.log(question)
            console.log(queue)
            setCurrentQuestion(question)
            setQuestionQueue(queue)

        }else if (currentQuestion != null){
            // go to question

        }else if (questionQueue.length == 0){
            // No question selected
        }
    }

    render() {
        return (
        <>
        {/* if current question != null then show problem */}
            <Problem/>
        </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentQuestion: state.delta.currentQuestion,
        questionQueue: state.delta.questionQueue,

    };
};

function mapDispatchToProps(dispatch) {
    return {
        setCurrentQuestion: bindActionCreators(setCurrentQuestion, dispatch),
        setQuestionQueue: bindActionCreators(setQuestionQueue, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemManager);
