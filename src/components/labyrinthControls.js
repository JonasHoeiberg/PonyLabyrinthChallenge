import React, { Component } from 'react';
import './labyrinthControls.css';

export class LabyrinthControls extends Component {


    render() {
        let nodeDirections = [];

        if (this.props.currentNode != null) {
            nodeDirections = this.props.currentNode.edges.map(item => item.label);
            //stay is always valid if there is an active board
            nodeDirections.push("stay");
            if (this.props.solutionFound) {
                nodeDirections.push("toggleSolution");
                nodeDirections.push("executeSolution");
                nodeDirections.push("executeOneMove");
            }
        }

        const directions = [
            "north",
            "south",
            "east",
            "west",
            "stay",
            "toggleSolution",
            "executeSolution",
            "executeOneMove"
        ];

        return directions.map(item => {
            return <input type="button" className={item + "Button"} value={item} onClick={() => this.props.handleControl(item)} disabled={!nodeDirections.some(dir => dir === item)}></input>;
        });
    };
}
