import React, { Component } from 'react';
import './mazeControls.css';

export class MazeControls extends Component {


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
            {
                value: "north",
                label: "N"
            },
            {
                value: "south",
                label: "S"
            },
            {
                value: "east",
                label: "E"
            },
            {
                value: "west",
                label: "W"
            },
            {
                value: "stay",
                label: "X"
            },
            {
                value: "toggleSolution",
                label: "Toggle solution"
            },
            {
                value: "executeSolution",
                label: "Run solution"
            },
            {
                value: "executeOneMove",
                label: "Make optimal move"
            },
        ];

        return  (
            <div className="ControlContainer">
                {directions.map(item => {
                    return <input type="button" className={item.value + "Button ControlButton"} value={item.label} onClick={() => this.props.handleControl(item.value)} disabled={!nodeDirections.some(dir => dir === item.value)}></input>;
                })}
            </div>
        );
    };
}
