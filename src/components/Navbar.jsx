import React, { Component } from 'react'
import {
    NavLink,
    withRouter
} from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <NavLink className="root-container-home" activeClassName={'root-container-home-active'} to={'/'} >
                <nav className="navbar-root">
                    <div className="navbar-title">
                        <div className="title-text">
                            AlgoInt
                        </div>
                    </div>
                </nav>
            </NavLink>
        )
       }
}
