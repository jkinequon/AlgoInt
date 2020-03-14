import React, { Component } from 'react'

export default class SidebarOption extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        }
    }

    render() {

        const { name, Logo } = this.props; 

        return(
            <div className={`sidebar-option ${name.toLowerCase()}`}>
                <div className="sidebar-option-text">
                    {name}
                </div>
                <Logo />
            </div>
        )
    }
}
