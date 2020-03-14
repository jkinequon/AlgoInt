import React, { Component } from 'react'

export default class SelectionOption extends Component {

    test = () => {
        console.log("TESTING")
    }

    render() {

        const { difficulty, type, language, description  } = this.props;


        return (
            <button className="testSelectionOption" onClick={this.test}>
                <table></table>
                {difficulty} | {type} | {language} | {description}
            </button>
        )
    }
}
