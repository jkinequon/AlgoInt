import React, { Component } from 'react'

import {
    NavLink,
    withRouter
} from "react-router-dom";

export default class HomeOptions extends Component {
    render() {

        const { title, description, toLink='/' } = this.props; 

        return (
            <NavLink className="root-container-home" activeClassName={''} to={toLink} >
                <div className="inner-container">
                    <div className="title-container">
                        <div className="title-text">
                            {title}
                        </div>
                    </div>
                    <div className="info-text">
                        {description}
                    </div>
                </div>
            </NavLink>
        )
    }
}


