import React, { Component } from 'react';
import './labyrinth.css';

//TODO: Split Cells and their different types into separate components
export class Labyrinth extends Component {
    cellWidth = 20;

    width = 10;
    height = 10;

    renderMazeCells() {
        let cellElements = [];

        //Normally I'd use an iterator, reducer or foreach, but given the nature of the data, I opted for x and y loops
        for (let y = 0; y < this.width; y++) {
            for (let x = 0; x < this.height; x++) {
                if (this.props.mazeData.endPoint[0] === x + (this.width * y)) {
                    cellElements.push(this.renderEndPointCell(x, y, this.props.mazeData.data[x + (this.width * y)]));
                }
                else if (this.props.mazeData.pony[0] === x + (this.width * y)) {
                    cellElements.push(this.renderPonyCell(x, y, this.props.mazeData.data[x + (this.width * y)]));
                }
                else if (this.props.mazeData.domokun[0] === x + (this.width * y)) {
                    cellElements.push(this.renderDomokunCell(x, y, this.props.mazeData.data[x + (this.width * y)]));
                }
                else {
                    cellElements.push(this.renderBasicCell(x, y, this.props.mazeData.data[x + (this.width * y)]));
                }
            }
        }

        return cellElements;
    }

    //These are separate functions just to remind myself that someday they should be their own components.
    renderPonyCell(x, y, cellWalls) {
        return this.renderBasicCell(x, y, cellWalls, "Pony");
    }

    renderDomokunCell(x, y, cellWalls) {
        return this.renderBasicCell(x, y, cellWalls, "Domokun");
    }

    renderEndPointCell(x, y, cellWalls) {
        return this.renderBasicCell(x, y, cellWalls, "End");
    }

    renderBasicCell(x, y, cellWalls, additionalClasses) {
        let classNames = [];
        cellWalls.forEach(item => {
            switch (item) {
                case "north":
                    classNames.push("N");
                    break;
                case "west":
                    classNames.push("W");
                    break;
            }
        });

        let classes = classNames.reduce((acc, value, index) => {
            return acc + " " + value;
        }, "MazeCell");

        let style = {
            width: this.cellWidth.toString() + "px",
            height: this.cellWidth.toString() + "px",
            left: x*this.cellWidth.toString() + "px",
            top: y*this.cellWidth.toString() + "px"
        };

        if (additionalClasses != null) {
            classes += " " + additionalClasses;
        }

        return (<div className={classes} style={style}></div>)
    }

    getContainerStyle() {
        return {
            width: (this.cellWidth * this.width).toString() + "px",
            height: (this.cellWidth * this.height).toString() + "px",
        }
    }

    render() {
        if (this.props.mazeData == null) {
            return (<div></div>);
        }

        this.width = this.props.mazeData.size[0];
        this.height = this.props.mazeData.size[1];

        return (
            <div className="MazeVisualization" style={this.getContainerStyle()}>
                {this.renderMazeCells()}
            </div>
        );
    };
}
