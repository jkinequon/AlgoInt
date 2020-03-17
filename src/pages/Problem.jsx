import React, { Component } from 'react'

import { CodeEditor } from '../components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setCurrentQuestion, setQuestionQueue } from '../redux/actions/actions'

class Problem extends Component {
    render() {
        const { setCurrentQuestion } = this.props;

        return (
            <div className="parent-container">
                <div className="left-container">
                    <div className="question-div">
                        <h1 className="question-title">
                            Question 233
                        </h1>
                        <h2 className="question-text">
                            A description of the title
                        </h2>
                    </div>

                    <div className="console-div">
                        Console Output
                    </div>
                </div>
                <div className="right-container">
                    <CodeEditor/>
                    <div className="bottom-right-bar">
                        <button className='problem-button'><span>RUN</span></button>
                        <button className='problem-button' onClick={() => setCurrentQuestion(null)}><span>SUBMIT</span></button>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Problem);
