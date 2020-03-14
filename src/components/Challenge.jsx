import React, { Component } from 'react'

export default class Challenge extends Component {
    


    render() {
        const { name = "", description = "", points = 0 } = this.props;
        return (
            <div className="challenge-component-root">
                <h1>{name}</h1>
                <div className="description">
                    {description}
                </div>
                <div className="points">
                    {`${points} Points`}
                </div>
            </div>
        )
    }
}
