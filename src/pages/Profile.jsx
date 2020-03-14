import React, { Component } from 'react';
import { Survey } from '../components';
import { GoPerson } from "react-icons/go";
import { connect } from 'react-redux';

class Profile extends Component {
    render() {

        const { 
            name = "John Doe",
            surveyScore = 7.4,
            surveyTaken
        } = this.props;

        var colors = ["zero", "one", "two"]

        return (
            <div className="profile-page-root">
                {
                    surveyTaken
                    ?
                    < >
                        <div className="profile-container top">
                            <div className="logo">
                                <GoPerson/>
                            </div>
                            <div className="name">
                                Welcome,&nbsp;&nbsp;{name}
                            </div>
                            <div className="yeti-percenti">
                                Yeti-Percenti:&nbsp;{surveyScore} 
                            </div>
                        </div>
                        <div className="profile-container bio">
                            <div className="title">
                                Bio
                            </div>
                            <div className="description">
                                {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Non molestias 
                                doloribus nisi magnam totam aperiam atque? Reprehenderit est odit, maiores 
                                error rerum, ut, saepe unde corrupti magnam sunt quis pariatur.`}
                            </div>
                        </div> 
                        <div className="profile-container achievements">
                            <div className="achievements-title">
                                Achievements
                            </div>
                            {
                                [1, 2, 3, 4, 5].map((e, i) => {
                                    return (
                                        <div className="achievement-group" key={i}>
                                            <div className={"logo " + colors[Math.abs(e - 3)]}>
                                            </div>
                                            <div className="description">
                                                Sample Achievement {e} 
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="profile-container challenges">
                            <div className="challenges-title">
                                Challenges
                            </div>
                            {
                                [1, 2, 3, 4, 5].map((e, i) => {
                                    return (
                                        <div className="challenge-group" key={i}>
                                            <div className={"logo " + colors[Math.abs(e - 3)]}>
                                            </div>
                                            <div className="description">
                                                Sample Challenge {e} 
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                    :
                    <Survey/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        surveyTaken: state.delta.surveyTaken,
        surveyScore: state.delta.surveyScore
    };
};

export default connect(mapStateToProps, null)(Profile);