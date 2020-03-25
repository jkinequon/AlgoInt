import React, { Component } from 'react';
import { HomeOptions } from '../components';


export default class Home extends Component {
    render() {
        return (
            <div className="inner-middle-container">
                <div className="main-home-container">
                    <HomeOptions title="WHITEBOARD" description="Selection of challenges, no autocomplete in the code editor"
                                 toLink="/Selection" mode={1}/>
                    <HomeOptions title="CODING PROBLEM" description="Selection of challenges, with autocomplete in the code editor"
                                 toLink="/Selection" mode={2}/>
                    <HomeOptions title="MOCK INTERVIEW" description="Randomly selected challenges, timed, without hints"
                                 toLink="/Problem" mode={3} isMockInterview={true}/>
                </div>
            </div>
        )
    }
}
