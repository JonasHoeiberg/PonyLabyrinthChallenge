(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(27)},15:function(e,t,n){},19:function(e,t,n){},21:function(e,t,n){},23:function(e,t,n){},25:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(9),o=n.n(i),s=(n(15),n(2)),u=n.n(s),l=n(7),c=n(1),h=n(3),p=n(5),d=n(4),f=n(6);n(19),n(21);function m(e,t){null==t&&(t=!1);var n=Object.keys(e).reduce(function(n,r){var a=r.match(/(^[^A-Z]+)|([A-Z][^A-Z]+)/g).reduce(function(e,t,n){return 0!==n&&(e+="-"),(e+=t).toLowerCase()},"");return n[a]=e[r],"object"===typeof n[a]&&!Array.isArray(n[a])&&t&&(n[a]=m(n[a])),n},{});return Object.assign({},n)}function v(e,t){var n=Object.keys(e).reduce(function(n,r){var a=r.match(/(^[^-]+)|(-[^-]+)/g).reduce(function(e,t,n){return 0!==n&&(t=t[1].toUpperCase()+t.slice(2)),e+=t},"");return n[a]=e[r],"object"===typeof n[a]&&!Array.isArray(n[a])&&t&&(n[a]=v(n[a])),n},{});return Object.assign({},n)}var g=Symbol.iterator,y=function(){function e(t){Object(c.a)(this,e),this.values=[],this.top=0,Array.isArray(t)&&(this.values=t)}return Object(h.a)(e,[{key:"dequeue",value:function(){var t=this.values[this.top];return null==t?null:(this.top++,this.top>e.TOP_MAX&&(this.values=this.values.splice(this.top),this.top=0),t)}},{key:"enqueue",value:function(e){this.values.push(e)}},{key:g,value:function(){return this.values}},{key:"length",get:function(){return this.values.length-this.top}},{key:"empty",get:function(){return 0===this.length}}]),e}();y.TOP_MAX=100;var b=function e(){Object(c.a)(this,e),this.edges=[],this.properties=[],this.parentNode=null,this.parentEdge=null};var w=function(){function e(){Object(c.a)(this,e),this.nodes=[]}return Object(h.a)(e,null,[{key:"fromMaze",value:function(t){var n=t.size[0],r=(t.size[1],t.data),a=t.pony[0],i=t.domokun[0],o=t.endPoint[0],s=new e;return s.nodes=r.map(function(e){return new b}),s.nodes.forEach(function(e,t){if(e.properties=[],t===a&&e.properties.push("pony"),t===i&&e.properties.push("domokun"),t===o&&e.properties.push("endPoint"),null!=s.nodes[t-1]){var r={label:"west",node:s.nodes[t-1]};e.edges.push(r)}if(null!=s.nodes[t+1]){var u={label:"east",node:s.nodes[t+1]};e.edges.push(u)}if(null!=s.nodes[t+n]){var l={label:"south",node:s.nodes[t+n]};e.edges.push(l)}if(null!=s.nodes[t-n]){var c={label:"north",node:s.nodes[t-n]};e.edges.push(c)}}),r.forEach(function(e,t){var n=s.nodes[t];e.forEach(function(e){var t=n.edges.findIndex(function(t){return t.label===e});if(-1!==t){var r=n.edges[t].node,a=r.edges.findIndex(function(e){return e.node===n});n.edges.splice(t,1),-1!==a&&r.edges.splice(a,1)}})}),s}}]),e}(),k=function(e){function t(){var e,n;Object(c.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).state={mazePlayerName:"Twilight Sparkle",mazeWidth:15,mazeHeight:15,difficulty:1,maze_id:void 0},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"getMazeId",value:function(){var e=Object(l.a)(u.a.mark(function e(){var t,n,r,a,i;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=(t=this.state.maze_id)&&""!==t){e.next=16;break}return delete(n=m(this.state)).maze_id,n["maze-height"]=parseInt(n["maze-height"]),n["maze-width"]=parseInt(n["maze-height"]),r=new Request("https://ponychallenge.trustpilot.com/pony-challenge/maze",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n)}),e.next=9,fetch(r);case 9:if(200===(a=e.sent).status){e.next=12;break}throw new Error("Something went wrong with the remote server");case 12:return e.next=14,a.json();case 14:i=e.sent,t=i.maze_id;case 16:this.setState({maze_id:t});case 17:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=["Twilight Sparkle"].map(function(e){return a.a.createElement("option",{value:e},e)});return a.a.createElement("form",null,a.a.createElement("label",{className:"LabyrinthOptionRow"},"Maze ID:",a.a.createElement("input",{type:"text",value:this.state.maze_id,onChange:function(t){return e.setState({maze_id:t.target.value})}})),"OR",a.a.createElement("br",null),a.a.createElement("select",{value:this.state.ponyName,onChange:function(t){return e.setState({ponyName:t.target.value})}},t),a.a.createElement("label",{className:"LabyrinthOptionRow"},"Maze width:",a.a.createElement("input",{type:"number",min:"15",max:"25",value:this.state.mazeWidth,onChange:function(t){return e.setState({mazeWidth:t.target.value})}})),a.a.createElement("label",{className:"LabyrinthOptionRow"},"Maze height:",a.a.createElement("input",{type:"number",min:"15",max:"25",value:this.state.mazeHeight,onChange:function(t){return e.setState({mazeHeight:t.target.value})}})),a.a.createElement("label",{className:"LabyrinthOptionRow"},"Difficulty:",a.a.createElement("input",{type:"number",min:"0",max:"10",value:this.state.difficulty,onChange:function(t){return e.setState({difficulty:parseInt(t.target.value)})}})),a.a.createElement("input",{type:"button",value:"Do it!",onClick:Object(l.a)(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getMazeId();case 2:e.props.generateMaze(e.state.maze_id);case 3:case"end":return t.stop()}},t,this)}))}))}}]),t}(r.Component),z=(n(23),function(e){function t(){var e,n;Object(c.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).cellWidth=20,n.width=10,n.height=10,n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"renderMazeCells",value:function(){for(var e=[],t=0;t<this.width;t++)for(var n=0;n<this.height;n++){var r=this.props.maze.nodes[n+this.width*t];-1!==r.properties.indexOf("endPoint")?e.push(this.renderEndPointCell(n,t,r)):-1!==r.properties.indexOf("pony")?e.push(this.renderPonyCell(n,t,r)):-1!==r.properties.indexOf("domokun")?e.push(this.renderDomokunCell(n,t,r)):-1!==r.properties.indexOf("solution")&&this.props.showSolution?e.push(this.renderSolutionCell(n,t,r)):e.push(this.renderBasicCell(n,t,r))}return e}},{key:"renderPonyCell",value:function(e,t,n){return this.renderBasicCell(e,t,n,"Pony")}},{key:"renderDomokunCell",value:function(e,t,n){return this.renderBasicCell(e,t,n,"Domokun")}},{key:"renderEndPointCell",value:function(e,t,n){return this.renderBasicCell(e,t,n,"End")}},{key:"renderSolutionCell",value:function(e,t,n){return this.renderBasicCell(e,t,n,"Solution")}},{key:"renderBasicCell",value:function(e,t,n,r){var i=this.cellWidth,o=this.cellWidth,s=e*this.cellWidth,u=t*this.cellWidth,l=[];n.edges.forEach(function(e){switch(e.label){case"north":l.push("N"),o++;break;case"west":l.push("W"),i++;break;case"east":l.push("E"),i++;break;case"south":l.push("S"),o++}});var c=l.reduce(function(e,t,n){return e+" "+t},"MazeCell"),h={width:i.toString()+"px",height:o.toString()+"px",left:s.toString()+"px",top:u.toString()+"px"};return null!=r&&(c+=" "+r),a.a.createElement("div",{className:c,style:h})}},{key:"getContainerStyle",value:function(){return{width:(this.cellWidth*this.width).toString()+"px",height:(this.cellWidth*this.height).toString()+"px"}}},{key:"render",value:function(){return null==this.props.maze?a.a.createElement("div",null):(this.width=this.props.width,this.height=this.props.height,a.a.createElement("div",{className:"MazeVisualization",style:this.getContainerStyle()},this.renderMazeCells()))}}]),t}(r.Component)),S=(n(25),function(e){function t(){return Object(c.a)(this,t),Object(p.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this,t=[];null!=this.props.currentNode&&((t=this.props.currentNode.edges.map(function(e){return e.label})).push("stay"),this.props.solutionFound&&(t.push("toggleSolution"),t.push("executeSolution"),t.push("executeOneMove")));return["north","south","east","west","stay","toggleSolution","executeSolution","executeOneMove"].map(function(n){return a.a.createElement("input",{type:"button",className:n+"Button",value:n,onClick:function(){return e.props.handleControl(n)},disabled:!t.some(function(e){return e===n})})})}}]),t}(r.Component)),x=function(e){function t(){var e,n;Object(c.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(p.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).state={mazeHeight:null,mazeWidth:null,maze_id:null,labyrinthState:null,showSolution:!1,resultImage:null,solution:null},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"fetchMaze",value:function(){var e=Object(l.a)(u.a.mark(function e(t){var n,r,a,i;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Request("https://ponychallenge.trustpilot.com/pony-challenge/maze/"+t.toString(),{method:"GET",headers:{Accept:"application/json"}}),e.next=3,fetch(n);case 3:if(200===(r=e.sent).status){e.next=6;break}throw new Error("Something went wrong when fecthing maze");case 6:return e.t0=v,e.next=9,r.json();case 9:if(e.t1=e.sent,"active"===(a=(0,e.t0)(e.t1,!0)).gameState.state.toLowerCase()){e.next=14;break}return this.setState({resultImage:a.gameState.hiddenUrl}),e.abrupt("return");case 14:i=this.generateGraph(a),this.generateSolution(i),this.setState({mazeWidth:a.size[0],mazeHeight:a.size[1],maze_id:a.maze_id,labyrinthState:i});case 17:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"handleControl",value:function(){var e=Object(l.a)(u.a.mark(function e(t){var n,r,a,i,o,s;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=this.state.labyrinthState&&null!=this.state.maze_id){e.next=2;break}return e.abrupt("return");case 2:if("toggleSolution"!==t){e.next=6;break}this.setState({showSolution:!this.state.showSolution}),e.next=51;break;case 6:if("executeOneMove"!==t){e.next=13;break}if(null==this.state.solution){e.next=11;break}return e.next=10,this.makeMove(this.state.solution[0].edge.label);case 10:this.fetchMaze(this.state.maze_id.toString());case 11:e.next=51;break;case 13:if("executeSolution"!==t){e.next=49;break}if(null==this.state.solution){e.next=47;break}n=!0,r=!1,a=void 0,e.prev=18,i=this.state.solution[Symbol.iterator]();case 20:if(n=(o=i.next()).done){e.next=32;break}return s=o.value,e.t0=v,e.next=25,this.makeMove(s.edge.label);case 25:if(e.t1=e.sent,"active"===(0,e.t0)(e.t1).state.toLowerCase()){e.next=29;break}return e.abrupt("break",32);case 29:n=!0,e.next=20;break;case 32:e.next=38;break;case 34:e.prev=34,e.t2=e.catch(18),r=!0,a=e.t2;case 38:e.prev=38,e.prev=39,n||null==i.return||i.return();case 41:if(e.prev=41,!r){e.next=44;break}throw a;case 44:return e.finish(41);case 45:return e.finish(38);case 46:this.fetchMaze(this.state.maze_id);case 47:e.next=51;break;case 49:this.makeMove(t),this.fetchMaze(this.state.maze_id.toString());case 51:case"end":return e.stop()}},e,this,[[18,34,38,46],[39,,41,45]])}));return function(t){return e.apply(this,arguments)}}()},{key:"makeMove",value:function(){var e=Object(l.a)(u.a.mark(function e(t){var n,r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Request("https://ponychallenge.trustpilot.com/pony-challenge/maze/"+this.state.maze_id.toString(),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({direction:t})}),e.next=3,fetch(n);case 3:return r=e.sent,e.abrupt("return",r.json());case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"generateSolution",value:function(e){e.nodes.forEach(function(e){return e.properties.filter(function(e){return"solution"!==e.solution})});var t=function(e,t,n,r){if(null!=r&&"function"!==typeof r)throw new Error("validNode must be null or a function");t.parentNode=-1,t.parentEdge=-1;var a=new y;for(a.enqueue(t);!a.empty;){var i=a.dequeue();if(i===n)break;var o=!0,s=!1,u=void 0;try{for(var l,c=i.edges[Symbol.iterator]();!(o=(l=c.next()).done);o=!0){var h=l.value;null!=h.node.parentNode||null!=r&&!r(h.node)||(h.node.parentNode=i,h.node.parentEdge=h,a.enqueue(h.node))}}catch(k){s=!0,u=k}finally{try{o||null==c.return||c.return()}finally{if(s)throw u}}}var p=[];if(null==n.parentNode)p=null;else for(var d=n;-1!==d.parentNode;)p.push({node:d,edge:d.parentEdge}),d=d.parentNode;var f=!0,m=!1,v=void 0;try{for(var g,b=e.nodes[Symbol.iterator]();!(f=(g=b.next()).done);f=!0){var w=g.value;w.parentNode=null,w.parentEdge=null}}catch(k){m=!0,v=k}finally{try{f||null==b.return||b.return()}finally{if(m)throw v}}return p}(e,e.nodes.find(function(e){return e.properties.some(function(e){return"pony"===e})}),e.nodes.find(function(e){return e.properties.some(function(e){return"endPoint"===e})}),function(e){return e.properties.every(function(e){return"domokun"!==e})});null!=t&&(t=t.reverse()).forEach(function(e){e.node.properties.some(function(e){return"solution"===e})||e.node.properties.push("solution")}),this.setState({solution:t})}},{key:"generateGraph",value:function(e){return w.fromMaze(e)}},{key:"render",value:function(){var e=this;if(null!==this.state.resultImage)return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement("img",{src:"https://ponychallenge.trustpilot.com"+this.state.resultImage}),a.a.createElement("input",{type:"button",value:"Refresh",onClick:function(){return e.setState({mazeHeight:null,mazeWidth:null,maze_id:null,labyrinthState:null,showSolution:!1,resultImage:null})}})));var t=null;return null!=this.state.labyrinthState&&(t=this.state.labyrinthState.nodes.find(function(e){return-1!==e.properties.indexOf("pony")})),a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement(k,{generateMaze:function(t){return e.fetchMaze(t)}}),a.a.createElement(z,{maze:this.state.labyrinthState,showSolution:this.state.showSolution,width:this.state.mazeWidth,height:this.state.mazeHeight}),a.a.createElement(S,{currentNode:t,handleControl:function(t){return e.handleControl(t)},solutionFound:null!=this.state.solution})))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,2,1]]]);
//# sourceMappingURL=main.bd4d85dc.chunk.js.map