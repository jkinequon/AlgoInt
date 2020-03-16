import React, { Component } from 'react'

import { CodeEditor } from '../components'

// PLAN TO STORE UP TO 3 QUESTION NUMBERS HERE 
// QUERY DATABASE FOR QUESTIONS

// var question =  firebase.database().ref('/questions/' + questionID).once('value').then(function(snapshot){ 
//     var information = snapshot.val()
//   });
    
//   var information = snapshot.val().QuestionName();

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
