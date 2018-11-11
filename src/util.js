//React doesn't like kebaab case, and the API uses it, so I made this. Doesn't catch numbers and stuff in variable names, but doesn;t need to for now
export function camelToKebab(object) {
    let newObject = Object.keys(object).reduce((accObject, currentPropertyName) => {
        let words = currentPropertyName.match(/(^[^A-Z]+)|([A-Z][^A-Z]+)/g);

        let newPropertyName = words.reduce((newString, word, index) => {
            if (index !== 0) {
                newString += "-";
            }

            newString += word;

            return newString.toLowerCase();
        }, "");

        accObject[newPropertyName] = object[currentPropertyName];

        return accObject;
    }, {});

    //Return a copy
    return Object.assign({}, newObject);
}

//Do NOT try this at home. Despite appearances, it's much harder to convert a kebab into a camel than the other way around
export function kebabToCamel(object) {
    let newObject = Object.keys(object).reduce((accObject, currentPropertyName) => {
        let words = currentPropertyName.match(/(^[^-]+)|(-[^-]+)/g);

        let newPropertyName = words.reduce((newString, word, index) => {
            if (index !== 0) {
                word = word[1].toUpperCase() + word.slice(2);
            }

            newString += word;

            return newString;
        }, "");

        accObject[newPropertyName] = object[currentPropertyName];

        return accObject;
    }, {});

    //Return a copy
    return Object.assign({}, newObject);
}

//Abstract graph class
export class GraphEdge {
    label = null;
    node = null;
}

export class GraphNode {
    edges = [];
    properties = [];
    color = false;
}

export class Graph {
    nodes = [];

    //Default solver, replace for others
    solver = (startNode, endNode) => {

    };

    static fromMaze(height, width, mazeData) {
        let graph = new Graph();

        graph.nodes = mazeData.map(cell => new GraphNode());

        graph.nodes.forEach((node, index) => {
            //MAze specifies where WE DO NOT have a connection, so start by inserting all connections
            if (graph.nodes[index - 1] != null) {
                let west = {
                    label: "west",
                    node: graph.nodes[index - 1]
                };

                node.edges.push(west);
            }
            if (graph.nodes[index + 1] != null) {
                let east = {
                    label: "east",
                    node: graph.nodes[index + 1]
                };

                node.edges.push(east);
            }
            if (graph.nodes[index + width] != null) {
                let south = {
                    label: "south",
                    node: graph.nodes[index + width]
                };

                node.edges.push(south);
            }
            if (graph.nodes[index - width] != null) {
                let north = {
                    label: "north",
                    node: graph.nodes[index - width]
                };
            }
        });

        //Remove edges where there are walls
        mazeData.forEach((walls, index) => {
            let node = graph.nodes[index];

            walls.forEach(wall => {
                let edgeIdx = node.edges.findIndex(val => val.label === wall);

                if (edgeIdx !== -1) {
                    let otherNode = node.edges[edgeIdx].node;
                    let otherEdgeIdx = otherNode.edges.findIndex(edge => edge.node === node);

                    node.edges.splice(edgeIdx, 1);

                    if (otherEdgeIdx !== -1) {
                        otherNode.edges.splice(otherEdgeIdx, 1);
                    }
                }
            });
        });

        return graph;
    }
}