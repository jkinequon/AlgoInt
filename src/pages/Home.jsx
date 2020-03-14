import React, { Component } from 'react';
import {HomeOptions} from '../components';


export default class Home extends Component {
    render() {
        return (
            <div className="main-home-container">
                <HomeOptions title="WHITEBOARD" description="-add description-" toLink="/whiteboard"/>
                <HomeOptions title="CODING PROBLEM" description="-add description-"  toLink="/codeproblem"/>
                <HomeOptions title="MOCK INTERVIEW" description="-add description-"  toLink="/mockinterview"/>
            </div>
        )
    }
}
