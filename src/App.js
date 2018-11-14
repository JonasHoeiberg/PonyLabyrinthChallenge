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
        labyrinthState: null,
        showSolution: false,
        resultImage: null,
        solution: null
    };



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

        const mazeData = kebabToCamel(await mazeResponse.json(), true);

        if (mazeData.gameState.state.toLowerCase() !== "active") {
            this.setState({
                resultImage: mazeData.gameState.hiddenUrl
            });
            return;
        }

        let graph = this.generateGraph(mazeData);

        this.generateSolution(graph);

        this.setState({
            mazeWidth: mazeData.size[0],
            mazeHeight: mazeData.size[1],
            maze_id: mazeData.maze_id,
            labyrinthState: graph
        });
    }

    async handleControl(signal) {
        if (this.state.labyrinthState == null || this.state.maze_id == null)
            return;

        //TODO: make enum
        if (signal === "toggleSolution") {
            this.setState({
                showSolution: !this.state.showSolution
            })
        }
        else if (signal === "executeOneMove") {
            if (this.state.solution != null) {
                await this.makeMove(this.state.solution[0].edge.label);
                this.fetchMaze(this.state.maze_id.toString());
            }
        }
        else if (signal === "executeSolution") {
            if (this.state.solution != null) {
                for (let step of this.state.solution) {
                    let response = kebabToCamel(await this.makeMove(step.edge.label));

                    if (response.state.toLowerCase() !== "active") {
                        break;
                    }
                }

                this.fetchMaze(this.state.maze_id);
            }
        }
        else {
            this.makeMove(signal);
            this.fetchMaze(this.state.maze_id.toString());
        }
    }

    async makeMove(direction) {
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

        let response = await fetch(moveRequest);
        return response.json();
    }

    generateSolution(graph) {
        //Remove solution if any
        graph.nodes.forEach(node => node.properties.filter(x => x.solution !== "solution"));

        let solution = shortestPath(
            graph,
            graph.nodes.find(node => node.properties.some(prop => prop === "pony")),
            graph.nodes.find(node => node.properties.some(prop => prop === "endPoint")),
            node => node.properties.every(prop => prop !== "domokun")
        );

        if (solution != null) {
            solution = solution.reverse();

            solution.forEach(item => {
                if (!item.node.properties.some(prop => prop === "solution")) {
                    item.node.properties.push("solution");
                }
            });
        }

        this.setState({
            solution: solution
        });
    }

    generateGraph(maze) {
        return Graph.fromMaze(maze);
    }

    render() {
        if (this.state.resultImage !== null) {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={"https://ponychallenge.trustpilot.com" + this.state.resultImage} />
                        <input type="button" value="Refresh" onClick={() => this.setState({
                            mazeHeight: null,
                            mazeWidth: null,
                            maze_id: null,
                            labyrinthState: null,
                            showSolution: false,
                            resultImage: null
                        })} />
                    </header>
                </div>
            )
        }

        let currentNode = null;

        if (this.state.labyrinthState != null) {
            currentNode = this.state.labyrinthState.nodes.find(item => item.properties.indexOf("pony") !== -1);
        }

        return (
            <div className="App">
                <header className="App-header">
                    <LabyrinthParameters generateMaze={(maze_id) => this.fetchMaze(maze_id)} />
                    <Labyrinth maze={this.state.labyrinthState} showSolution={this.state.showSolution} width={this.state.mazeWidth} height={this.state.mazeHeight} />
                    <LabyrinthControls currentNode={currentNode} handleControl={(direction) => this.handleControl(direction)} solutionFound={this.state.solution != null} />
                </header>
            </div>
        );
    };
}

export default App;
