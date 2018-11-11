import React, { Component } from 'react';
import './App.css';
import {LabyrinthParameters} from "./components/labyrinthParameters";
import {Labyrinth} from "./components/labyrinth";
import {LabyrinthControls} from "./components/labyrinthControls";
import {kebabToCamel} from "./util";

//This is sort of acting as the model/synchronizer/central piece. If this grows beyond a fun little experiment, proper MVC separation would be preferable.

class App extends Component {
    state = {
        labyrinthState: null
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

        const mazeData = await mazeResponse.json();

        this.setState({labyrinthState: Object.assign({}, kebabToCamel(mazeData))});
    }

    async makeMove(direction) {
        if (this.state.labyrinthState == null || this.state.labyrinthState.maze_id == null)
            return;

        const moveRequest = new Request(
            "https://ponychallenge.trustpilot.com/pony-challenge/maze/" + this.state.labyrinthState.maze_id.toString(),
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

        this.fetchMaze(this.state.labyrinthState.maze_id.toString());
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <LabyrinthParameters generateMaze={(maze_id) => this.fetchMaze(maze_id)} />
                    <Labyrinth mazeData={this.state.labyrinthState} />
                    <LabyrinthControls makeMove={(direction) => this.makeMove(direction)} />
                </header>
            </div>
        );
    };
}

export default App;
