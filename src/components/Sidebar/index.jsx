import React, { Component } from 'react';
import SidebarOption from './SidebarOption';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { signIn, signOff } from '../../redux/actions/actions'

import { GoPerson } from "react-icons/go";
import { IoMdTrophy, IoMdMedal } from "react-icons/io";

import {
    NavLink,
    withRouter
} from "react-router-dom";



class index extends Component {
    render() {
        var topOptions = [
            {
                name: "Profile",
                position: "top",
                Logo: () => <GoPerson />,
                path: '/profile' 
            },
            {
                name: "Challenges",
                position: "top",
                Logo: () => <IoMdTrophy/>,
                path: '/challenges' 

            },
        ]

        var bottomOptions = [
        ]

        const { signedIn, signIn, signOff } = this.props;

        return (
            <div className="sidebar-root">
                <div className="option-container">
                    <div className="inner-container top">
                        {
                            !signedIn
                            ?
                            <div className="sign-button" onClick={signIn}>Sign In</div>
                            :
                            < >
                                { 
                                    topOptions.map((op, i) => {
                                        return(
                                            <NavLink
                                                className={`sidebar-option-link`} 
                                                activeClassName={`sidebar-option-link active`}
                                                to={op.path} 
                                                key={i}
                                                children={<SidebarOption name={op.name} Logo={op.Logo}/>}
                                            />
                                        )
                                    })
                                }
                                <div 
                                    className="sign-button" 
                                    onClick={() => {
                                        signOff();
                                        this.props.history.push('/');    
                                    }}>Sign Off</div>
                            </>
                        }
                    </div>
                    <div className="inner-container bottom">
                        {
                            bottomOptions.map((op, i) => {
                                return(
                                    <NavLink
                                        className={`sidebar-option-link`} 
                                        activeClassName={`sidebar-option-link active`}
                                        to={op.path} 
                                        key={i}
                                        children={<SidebarOption name={op.name} Logo={op.Logo}/>}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        signedIn: state.delta.signedIn,
    };
};

function mapDispatchToProps(dispatch) {
    return {
      signIn: bindActionCreators(signIn, dispatch),
      signOff: bindActionCreators(signOff, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(index));