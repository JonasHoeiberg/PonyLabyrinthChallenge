//React doesn't like kebaab case, and the API uses it, so I made this. Doesn't catch numbers and stuff in variable names, but doesn;t need to for now
//No camels were hurt in the making of this function
export function camelToKebab(object, recursive) {
    if (recursive == null) {
        recursive = false;
    }

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

        if (
            typeof accObject[newPropertyName] === "object"
            && !Array.isArray(accObject[newPropertyName])
            && recursive)
        {
            accObject[newPropertyName] = camelToKebab(accObject[newPropertyName]);
        }

        return accObject;
    }, {});

    //Return a copy
    return Object.assign({}, newObject);
}

//Do NOT try this at home. Despite appearances, it's much harder to convert a kebab into a camel than the other way around
export function kebabToCamel(object, recursive) {
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

        if (
            typeof accObject[newPropertyName] === "object"
            && !Array.isArray(accObject[newPropertyName])
            && recursive)
        {
            accObject[newPropertyName] = kebabToCamel(accObject[newPropertyName]);
        }

        return accObject;
    }, {});

    //Return a copy
    return Object.assign({}, newObject);
}

//Basic queue for BFS
export class Queue {
    static TOP_MAX = 100;

    constructor(initialCollection) {
        if (Array.isArray(initialCollection)) {
            this.values = initialCollection;
        }
    }

    values = [];
    top = 0;
    get length() {return this.values.length - this.top;}
    get empty() {return this.length === 0;}

    dequeue() {
        const val = this.values[this.top];

        if (val == null) {
            return null;
        }

        this.top++;

        //We don't want to do this every time we dequeue, due to performance.
        if (this.top > Queue.TOP_MAX) {
            this.values = this.values.splice(this.top);
            this.top = 0;
        }

        return val;
    }

    enqueue(val) {
        this.values.push(val);
    }

    [Symbol.iterator]() {return this.values;}
}

//Abstract graph class
export class GraphEdge {
    label = null;
    node = null;
}

export class GraphNode {
    edges = [];
    properties = [];
    parentNode = null;
    parentEdge = null;
}

//BFS implementation
export function shortestPath(graph, startNode, endNode, validNode) {
    if (validNode != null && typeof validNode !== "function") {
        throw new Error("validNode must be null or a function");
    }

    startNode.parentNode = -1;
    startNode.parentEdge = -1;

    let nodeQ = new Queue();

    nodeQ.enqueue(startNode);

    while(!nodeQ.empty) {
        let currentNode = nodeQ.dequeue();

        if (currentNode === endNode) {
            break;
        }

        for (let edge of currentNode.edges) {
            if (edge.node.parentNode != null || (validNode != null && !validNode(edge.node))) {
                continue;
            }

            edge.node.parentNode = currentNode;
            edge.node.parentEdge = edge;

            nodeQ.enqueue(edge.node);
        }
    }

    //The graph has the information
    let solution = [];

    if (endNode.parentNode == null) {
        solution = null;
    }
    else {
        let currentNode = endNode;

        while(currentNode.parentNode !== -1) {
            solution.push({
                node: currentNode,
                edge: currentNode.parentEdge
            });

            currentNode = currentNode.parentNode;
        }
    }

    for (let node of graph.nodes) {
        node.parentNode = null;
        node.parentEdge = null;
    }

    return solution;
}

export class Graph {
    nodes = [];

    static fromMaze(maze) {
        const width = maze.size[0];
        const height = maze.size[1];
        const mazeData = maze.data;
        const pony = maze.pony[0];
        const domokun = maze.domokun[0];
        const endPoint = maze.endPoint[0];

        let graph = new Graph();

        graph.nodes = mazeData.map(cell => new GraphNode());

        graph.nodes.forEach((node, index) => {
            node.properties = [];

            //We use properties to show where the pieces are.
            if (index === pony) {
                node.properties.push("pony");
            }
            if (index === domokun) {
                node.properties.push("domokun");
            }
            if (index === endPoint) {
                node.properties.push("endPoint");
            }

            //Maze served specifies where WE DO NOT have a connection, so start by inserting all connections
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

                node.edges.push(north);
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