import React, { Component } from 'react';
import './labyrinthControls.css';

export class LabyrinthControls extends Component {


    render() {
        const directions = [
            "north",
            "south",
            "east",
            "west",
            "stay"
        ];

        return directions.map(item => {
            return <input type="button" value={item} onClick={() => this.props.makeMove(item)}></input>;
        });
    };
}
