import React, { Component } from 'react'

export default class Problem extends Component {
    render() {
        return (
            <div className="parent-container">
                <div className="left-container">
                    <div className="question-div">
                        Question
                        <div>
                            Description
                        </div>
                    </div>

                    <div className="console-div">
                        Console
                    </div>
                </div>
                <div className="right-container">
                    <div className="bottom-right-bar">
                        <button><span>RUN</span></button>
                        <button><span>SUBMIT</span></button>
                    </div>
                </div>
            </div>
        )
    }
}
