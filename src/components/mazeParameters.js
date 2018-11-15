import React, { Component } from 'react';
import './mazeParameters.css';
import {camelToKebab} from "../util";

export class MazeParameters extends Component {
    state = {
        mazePlayerName: "Twilight Sparkle",
        mazeWidth: 15,
        mazeHeight: 15,
        difficulty: 1,
        maze_id: undefined
    };

    async getMazeId() {
        let maze_id = this.state.maze_id;

        if (maze_id == null || maze_id === "") {
            let requestBody = camelToKebab(this.state);
            delete requestBody.maze_id;

            //This is why we need abstractions for remote server requests!
            requestBody["maze-height"] = parseInt(requestBody["maze-height"]);
            requestBody["maze-width"] = parseInt(requestBody["maze-height"]);

            const createRequest = new Request(
                "https://ponychallenge.trustpilot.com/pony-challenge/maze",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(requestBody)
                }
            );

            let response = await fetch(createRequest);

            if (response.status !== 200) {
                throw new Error("Something went wrong with the remote server");
            }

            let responseData = await response.json();

            maze_id = responseData.maze_id;
        }

        this.setState({maze_id: maze_id});
    };

    render() {
        const ponies = [
            "Twilight Sparkle"
        ];

        const ponySelectors = ponies.map(pony => (<option value={pony}>{pony}</option>));

        return (
            <form>
                <label className="LabyrinthOptionRow">
                    Maze ID:
                    <input type="text" value={this.state.maze_id} onChange={e => this.setState({maze_id: e.target.value})}/>
                </label>
                OR<br/>
                <label>
                    Pony:
                    <select value={this.state.ponyName} onChange={e => this.setState({ponyName: e.target.value})}>
                        {ponySelectors}
                    </select>
                </label>
                <label className="LabyrinthOptionRow">
                    Maze width:
                    <input type="number" min="15" max="25" value={this.state.mazeWidth} onChange={e => this.setState({mazeWidth: e.target.value})}/>
                </label>
                <label className="LabyrinthOptionRow">
                    Maze height:
                    <input type="number" min="15" max="25" value={this.state.mazeHeight} onChange={e => this.setState({mazeHeight: e.target.value})}/>
                </label>
                <label className="LabyrinthOptionRow">
                    Difficulty:
                    <input type="number" min="0" max="10" value={this.state.difficulty} onChange={e => this.setState({difficulty: parseInt(e.target.value)})}/>
                </label>
                <input type="button" value={(this.state.maze_id == null || this.state.maze_id === "") ? "Generate maze" : "Get maze"} onClick={async () => {await this.getMazeId(); this.props.generateMaze(this.state.maze_id);}} />
            </form>
        );
    };
}
