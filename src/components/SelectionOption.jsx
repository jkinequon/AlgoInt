import React, { Component } from 'react'

export default class SelectionOption extends Component {

    test = () => {
        console.log("TESTING")
    }

    render() {

        const { difficulty, type, language, description  } = this.props;


        return (
            <button className="selectionOption" onClick={this.test}>
                <table className="option">
                    <tr>
                        <td>{difficulty}</td>
                        <td>{type}</td>
                        <td>{language}</td>
                        <td>{description}</td>
                    </tr>
                </table>
            </button>
        )
    }
}
