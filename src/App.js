import React, { Component } from 'react';
import './App.css';
import {LabyrinthParameters} from "./components/labyrinthParameters";
import {Labyrinth} from "./components/labyrinth";
import {LabyrinthControls} from "./components/labyrinthControls";
import {kebabToCamel, Graph, shortestPath} from "./util";

//This is sort of acting as the model/synchronizer/central piece. If this grows beyond a fun little experiment, proper MVC separation would be preferable.

class App extends Component {
    state = {
        mazeHeight: null,
        mazeWidth: null,
        maze_id: null,
        labyrinthState: null
    };

    solution = null;

    async fetchMaze(maze_id) {
        const mazeRequest = new Request(
            "https://ponychallenge.trustpilot.com/pony-challenge/maze/" + maze_id.toString(),
            {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        const mazeResponse = await fetch(mazeRequest);

        if (mazeResponse.status !== 200) {
            throw new Error("Something went wrong when fecthing maze");
        }

        const mazeData = await mazeResponse.json();

        let graph = this.generateGraph(kebabToCamel(mazeData));

        this.setState({
            mazeWidth: mazeData.size[0],
            mazeHeight: mazeData.size[1],
            maze_id: mazeData.maze_id,
            labyrinthState: Object.assign({}, graph)
        });
    }

    async makeMove(direction) {
        if (this.state.labyrinthState == null || this.state.maze_id == null)
            return;

        if (direction === "solve") {
            this.generateSolution();
        }
        else {
            const moveRequest = new Request(
                "https://ponychallenge.trustpilot.com/pony-challenge/maze/" + this.state.maze_id.toString(),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        direction: direction
                    })
                }
            );

            const response = await fetch(moveRequest);

            if (response.status !== 200) {
                throw new Error("Couldn't make move");
            }

            this.fetchMaze(this.state.maze_id.toString());
        }
    }

    generateSolution() {
        this.solution = shortestPath(
            this.state.labyrinthState,
            this.state.labyrinthState.nodes.find(node => node.properties.some(prop => prop === "pony")),
            this.state.labyrinthState.nodes.find(node => node.properties.some(prop => prop === "endPoint")),
            node => node.properties.every(prop => prop !== "domokun")
        );

        this.solution.forEach(item => {
            item.node.properties.push("solution");
        });

        this.setState({
            labyrinthState: this.state.labyrinthState
        });
    }

    generateGraph(maze) {
        return Graph.fromMaze(maze);
    }

    render() {
        let currentNode = null;

        if (this.state.labyrinthState != null) {
            currentNode = this.state.labyrinthState.nodes.find(item => item.properties.indexOf("pony") !== -1);
        }

        return (
            <div className="App">
                <header className="App-header">
                    <LabyrinthParameters generateMaze={(maze_id) => this.fetchMaze(maze_id)} />
                    <Labyrinth maze={this.state.labyrinthState} solution={this.state.solution} width={this.state.mazeWidth} height={this.state.mazeHeight} />
                    <LabyrinthControls currentNode={currentNode} makeMove={(direction) => this.makeMove(direction)} />
                </header>
            </div>
        );
    };
}

export default App;
