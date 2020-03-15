import React, { Component } from 'react'

import { CodeEditor } from '../components'



export default class Problem extends Component {
    render() {
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
                        <button><span>RUN</span></button>
                        <button><span>SUBMIT</span></button>
                    </div>
                </div>
            </div>
        )
    }
}
