import React, { Component } from 'react'

import { SelectionOption } from '../components';

export default class Selection extends Component {
    render() {
        return (
           <div className="test">
                <SelectionOption difficulty="Difficulty" type="Q Type" language="Q Language" description="Q Description" />
                <SelectionOption difficulty="***" type="Q Type" language="Q Language" description="Q Description" />

           </div>
        )
    }
}

