import React, { Component } from 'react';
import { HomeOptions } from '../components';


export default class Home extends Component {
    render() {
        return (
            <div className="inner-middle-container">
                <div className="main-home-container">
                    <HomeOptions title="WHITEBOARD" description="-add description-" toLink="/Selection"/>
                    <HomeOptions title="CODING PROBLEM" description="-add description-"  toLink="/Selection"/>
                    <HomeOptions title="MOCK INTERVIEW" description="-add description-"  toLink="/Problem"/>
                </div>
            </div>
        )
    }
}
