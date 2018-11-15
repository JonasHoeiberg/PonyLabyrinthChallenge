Solution to the pony maze challenge implemented in React.

Live version can be found [here](https://jonashoeiberg.github.io/PonyLabyrinthChallenge/) (Unless I took it down)

# Files of note #
* `util.js` contains:
    * `Graph` which is an generalised graph class used to represent and solve the maze
    * `Queue` a simple queue implementation
    * `shortestPath` which is a function that will find the shortest path between two nodes in a graph, and with the ability to exclude nodes from search based on a function.
* `App.js` is the center piece that does all the main logic and sending parameters around. It also does most of the API communication
* `mazeParameters.js` holds parameters for generation of the maze and also sends the request to get that done.

# Further work #
If I were to  continue on this, these are the items I would probably look into
* Abstract server communication out of the React components and into a dedicated interface of some kind
* Improve the UX
* Split things into more components
* Move logic out of the components to maintain MVC separation and abstract the model layer
* Generalize CSS