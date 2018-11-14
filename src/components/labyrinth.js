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
                let node = this.props.maze.nodes[x + (this.width * y)];

                if (node.properties.indexOf("endPoint") !== -1) {
                    cellElements.push(this.renderEndPointCell(x, y, node));
                }
                else if (node.properties.indexOf("pony") !== -1) {
                    cellElements.push(this.renderPonyCell(x, y, node));
                }
                else if (node.properties.indexOf("domokun") !== -1) {
                    cellElements.push(this.renderDomokunCell(x, y, node));
                }
                else if (node.properties.indexOf("solution") !== -1 && this.props.showSolution) {
                    cellElements.push(this.renderSolutionCell(x, y, node));
                }
                else {
                    cellElements.push(this.renderBasicCell(x, y, node));
                }
            }
        }

        return cellElements;
    }

    //These are separate functions just to remind myself that someday they should be their own components.
    renderPonyCell(x, y, node) {
        return this.renderBasicCell(x, y, node, "Pony");
    }

    renderDomokunCell(x, y, node) {
        return this.renderBasicCell(x, y, node, "Domokun");
    }

    renderEndPointCell(x, y, node) {
        return this.renderBasicCell(x, y, node, "End");
    }

    renderSolutionCell(x, y, node) {
        return this.renderBasicCell(x, y, node, "Solution");
    }

    renderBasicCell(x, y, node, additionalClasses) {
        let nodeWidth = this.cellWidth;
        let nodeHeight = this.cellWidth;
        let nodeLeft = x*this.cellWidth;
        let nodeTop = y*this.cellWidth;

        let classNames = [];
        node.edges.forEach(item => {
            switch (item.label) {
                case "north":
                    classNames.push("N");
                    nodeHeight++;
                    break;
                case "west":
                    classNames.push("W");
                    nodeWidth++;
                    break;
                case "east":
                    classNames.push("E");
                    nodeWidth++;
                    break;
                case "south":
                    classNames.push("S");
                    nodeHeight++;
                    break;
                default:
                    break;
            }
        });

        let classes = classNames.reduce((acc, value, index) => {
            return acc + " " + value;
        }, "MazeCell");

        let style = {
            width: nodeWidth.toString() + "px",
            height: nodeHeight.toString() + "px",
            left: nodeLeft.toString() + "px",
            top: nodeTop.toString() + "px"
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
        if (this.props.maze == null) {
            return (<div></div>);
        }

        this.width = this.props.width;
        this.height = this.props.height;

        return (
            <div className="MazeVisualization" style={this.getContainerStyle()}>
                {this.renderMazeCells()}
            </div>
        );
    };
}
