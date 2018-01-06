// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Final Project (NEW)
// 2017, Dr. Muhammad Al-Hashimi
// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//
var _v = [],
_e = []; // note naming convention in upload guide


// -----------------------------------------------------------------------
function main_graph()
{
	// create Heap object
	var heap = new Heap();
	heap.insert(2,"a");
	heap.insert(9,"b");
	heap.insert(7,"c");
	heap.insert(6,"d");
	heap.insert(5,"e");
	heap.insert(8,"f");
	document.write(heap.show()); 


	heap.insert(10, "g");
	document.write(heap.show());


	heap.insert(15, "h");
	document.write(heap.show());

	// create a graph (default undirected)
	var g = new Graph();
	g.label = "Exercise 9.2: 1b (Levitin, 3rd edition)";
	g.readGraph(_v, _e);
	g.printGraph();
	
	document.write("<p>MST by Prim2 (PQ)<br>");
	g.prim2();
	for (var i = 0; i < g.this.Vt.length; i++)
	{
		document.writeln("(", g.this.Vt[i].parent, ",", g.this.Vt[i].vtree, ")");
		if(i<graph.Vt.length-1)
		{
			document.writeln(",");
		}
		else
		{
			document.writeln(".", "<br>");
		}
	}

	document.write("<br>MST by first Prim (PQ)<br>");
	g.prim1();
	for (var i = 0; i < g.this.Vt.length; i++)
	{
		document.writeln("(", g.this.Vt[i].parent, ",", g.this.Vt[i].vtree, ")");
		if(i<graph.Vt.length-1)
		{
			document.writeln(",");
		}
		else
		{
			document.writeln(".", "<br>");
		}
	}

}


// -----------------------------------------------------------------------
// similar to starters 11 (REMOVE network object)

function Vertex(v)
{
// published docs section (ref. assignment page)
// for this section, strip line comments (leave outline)
// no JSDOC comments in this section

// property fields

this.label = v.label;
this.visit = false;
this.adjacent = new List();

// member methods


// --------------------
// student property fields next
this.vertexInfo = vertexInfoImpl;
this.insertAdjacent = insertAdjacentImp;
this.incidentEdge = incidentEdgeImpl;
// --------------------
// student methods next; actual functions in student code sections
this.isLabeled = isLabeledImpl;
}

// -----------------------------------------------------------------------
// similar to starter 11
function Edge(vert_i, weight)
{
// published docs section (ref. assignment page)
// for this section, strip line comments (leave outline)
// no JSDOC comments in this section


// property fields

this.target_v = vert_i;
this.weight = weight;
//this.label = label;
}


// -----------------------------------------------------------------------
// similar to starter 11
function Graph()
{
// published docs section (ref. assignment page)
// for this section, strip line comments (leave outline)
// no JSDOC comments in this section


// property fields

this.vert = [];
this.nv = 0;
this.ne = 0;
this.digraph = false;
this.weighted = null;
this.dfs_push = [];
this.bfs_out = [];
this.label = "";
this.connectedComp = 0;
this.adjMatrix = [];

// member methods

this.readGraph = better_input;
this.printGraph = print_graphImpl;
this.addEdge = add_edgeImpl2;
this.dfs = dfsImpl;
this.bfs = bfsImpl;
this.makeAdjMatrix = makeAdjMatrixImpl2;
this.isConnected = isConnectedImpl;
this.connectInfo = reportConnectivity;
this.topoSearch = topoSearchImpl;

// --------------------
// student property fields next
this.R = []; // TC matrix by warshall
this.D = []; // distance matrix by floyed
this.dfsTCMatrix = [];
this.Vt = [];

// --------------------
// student methods next (actual functions in student code sections)
this.prim1 = primImpl;
this.prim2 = primImpl2;
this.shortestPathTree = //dijkstraImpl;
	this.getVertex = //getVertexImpl;

	// transitive closure package (requirements in line comments)
	this.hasPath = hasPathImpl; // boolean, true if path exists between vertices v_i, v_j in digraph
this.shortestPath = shortestPathImpl; // return distance of shortest path between v_i, v_j in weighted graph
this.isDAG = isDAGImpl; // boolean, true if acyclic digraph
this.warshallFloyd = warshallFloydImpl; // inserts .tc field in adjacency matrix if digraph, and .dist if weighted
this.dfsTC = dfsTCImpl;
}


// -----------------------------------------------------------------------
// functions used by methods of Graph and subsidiary objects


function make_graphImpl(n, m, w)
{
// parameter validations and checks: number of edges etc.
var mmax = n * (n - 1);
if (!this.digraph) mmax /= 2;
if (m > mmax)
{
	document.write("<p>ERROR: invalid number of edges for graph type</p>");
	return;
}

// create n vertex in v[] using id 0 to n-1 as label
var v = [];
for (var i = 0; i < n; i++)
	v[i] = {
		label: i.toString()
	};

// if graph complete no need to generate random edges, just create mmax edges systematically


// otherwise repreat create m distinct edges (graph loops not allowed)

var e = [],
	wmin = 1,
	wmax = 50000,
	wsum = 0;

var h = []; // quick-dirty n x n matrix to check previously generated edges, 
// m-entry hash table would be more efficient
for (i = 0; i < n; i++)
{
	h[i] = [];
	h[i][i] = 0; // no graph loops; 0 = blocked pair of vertices
}

for (i = 0; i < m; i++)
{
	// generate vertices u, v randomly
	do {
		var u_i = random(0, n - 1),
			v_i = random(0, n - 1);

	} while (h[u_i][v_i] != undefined);

	h[u_i][v_i] = 0;
	h[v_i][u_i] = 0; // update matrix: block u,v; block v,u also if undirected

	// if (u,v) is distinct insert in e[] (generate random weight if w true)
	// otherwise repeat generate another u,v pair

	e[i] = {
		u: u_i,
		v: v_i
	};
	if (w)
	{
		e[i].w = random(wmin, wmax);
		wsum += e[i].w;
	}
}

// call graph reader method and set label, graph type depends on value of digraph property
this.read_graph(v, e);
this.label = "Generated " + n + " vertices, " + m + " random " + (!this.digraph ? "un" : "") + "directed edges (" + Math.round(m / mmax * 100) + "%)" + (w ? ", ave weight = " + Math.round(wsum / m) : "");
}

function random(low, high)
{
return Math.floor(Math.random() * (high - low + 1)) + low;
}


// -----------------------------------------------------------------------
// begin student code section (REMOVE network functions)
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
// implementation 1, transitive closure package + First Prim 

/**
check if path exists between vertices v_i, v_j in digraph. return true if exists and false if not.

@methodOf Graph# 
@param {number} v_i source vertex id
@param {number} v_j target vertex id
@return {boolean} true if path exists
*/

function hasPathImpl(v_i, v_j)
{
return v_i && v_j;
}

// --------------------

/**
compare between v_i, v_j distances in weighted graph and returns the shortest path among them.

@methodOf Graph# 
@param {number} v_i source vertex id
@param {number} v_j target vertex id
@return {number} distance of shortest path
*/

function shortestPathImpl(v_i, v_j)
{
return (v_i <= v_j) ? v_i : v_j;
}

// --------------------

/**
Check if graph is directed acyclic graph.

@methodOf Graph# 
@return {boolean} true if acyclic digraph
*/

function isDAGImpl()
{
var dag = true;
for (var i = 0; i < this.nv; i++)
{
	if (this.R[i][i] == 1)
		dag = false;
}
return dag;
}

// --------------------

/**
Generate TC matrix and distance matrix representation of graph based on warshall's and floyd's algorithms.
 TC matrix if unweighted graph, and distance matrix if weighted graph.

@methodOf Graph# 
*/

function warshallFloydImpl()
{
this.R = copyMatrix(this.adjMatrix, "tc");
this.D = copyMatrix(this.adjMatrix, "distance");
var k, i, j;

for (k = 0; k < this.nv; k++)
{
	for (i = 0; i < this.nv; i++)
	{
		for (j = 0; j < this.nv; j++)
		{
			this.R[i][j] = (this.R[i][j] == 1) ? this.R[i][j] : this.hasPath(this.R[i][k], this.R[k][j]);
			this.D[i][j] = this.shortestPath(this.D[i][j], this.D[i][k] + this.D[k][j]);
		}
	}
}

}

// --------------------

/**
Generate TC matrix representation of graph based on DFS algorithm
.
@methodOf Graph# 
*/

function dfsTCImpl()
{
for (i = 0; i < this.nv; i++)
{
	var v = this.vert[i];

	for (j = 0; j < this.nv; j++)
	{
		this.vert[j].visit = false;
	}

	this.dfsTCMatrix[i] = [];
	for (k = 0; k < this.nv; k++)
	{
		this.dfsTCMatrix[i][j] = 0;
	}

	var w = v.adjacentByID();
	for (k = 0; k < w.length; k++)
	{
		this.dfs(w[k]);
	}

	for (k = 0; k < this.nv; k++)
	{
		if (this.vert[k].visit)
		{
			this.dfsTCMatrix[i][k] = 1;
		}
	}
}
}

//---------------------------------------
/**
 Implement first version of prims algorithms on graph and return the minimum spanning tree for it.

 @return {object[]} Array of custom objects containing minimum spanning tree of graph, in input order by default.
*/

function primImpl()
{
// mark all vertices unvisited
for (var i = 0; i < this.nv; i++)
	this.vert[i].visit = false;

// v for vertices, e for edges, and w for adjacent vertices.
// initialize v with first vertex, w with first vertex's adjacent, and minWeight with first vertex weight.
var w;
var minWeight = Infinity;
var nextVert; //next vertex to traverse.
this.Vt = [];
//mark first vertex as visited
v[0].visit = true;
this.Vt.push(
{
	parent: "-",
	vtree: 0
});

//start from second vertex since first one already in v tree.
//check the edges from pervious vertices
for (var i = 1; i < this.vert.length; i++)
{ //check the edges from current vertex
	for (var j = 0; j < this.Vt.length; j++)
	{
		w = this.vert[this.Vt[j].vtree].incidentEdge();
		for (var k = 0; k < w.length; k++)
		{
			if (!this.vert[w[k].adjVert].visit && w[k].edgeWeight <= minWeight)
			{
				minWeight = w[k].edgeWeight;
				nextVert = w[k];
				parent = this.Vt[j].vtree;;
			}
		}
	}
	minWeight = Infinity;
	this.Vt.push(
	{
		parent: parent,
		vtree: nextVert.adjVert
	});

	//mark next visit vertex as visited
	v[nextVert.adjVert].visit = true;
}
}


// -----------------------------------------------------------------------
// implementation 2, greedy algorithms package (REMOVE Dijkstra)

//---------------------------------------
/** 
@author Wejdan Aljedani
@method #Graph
in a prim method, we uses vertices of graph and incidents edges for vertex to find minimum edges(which has high priority).
uses {@link #incidentEdge}method of vertex :uses to get incident edge for vertex.
uses {@link #insert} method of priority queue:uses to insert edge with it's weight in priority queue
uses {@link #deleteMin} method of priority queue:uses to delete edge from priority queue
@returns {object[]} return edge tree in order which has high priority(minimum weight).
*/
function primImpl2()
{
var vertexT = []; //vertex tree
var edge_Min; //edge which has high priority (minimum weight)
//mark all verecess are not visited.
for (var i = 0; i < this.nv; i++)
{
	this.vert[i].visit = false;
}
var PQ = new PQueue(); //initialize priority queue 
//initiate vertex tree with the first vertex
vertexT[0] = this.vert[0]; //set first vertex in vertex tree 
this.vert[0].visit = true; //set first vertex as visited
//insert source vertex to edge tree and source vertex does not have source vertex(parent)
this.Vt.push(
{
	parent: "-",
	vtree: 0
});
//get incedent edge for first vertex
var inci_Edge = vertexT[0].incidentEdge();
var w = inci_Edge.length; //get length of incidentEdge for first vertex 
//for each incidentEdge for first vertex  insert it to priority queue
for (var i = 0; i < w; i++)
{
	var edge = {
		vertex_i: inci_Edge[i].adjVert,
		parent_i: 0
	}; //each vertex has 2 fileds 1-vertex id and parent id
	PQ.insert(edge, inci_Edge[i].edgeWeight); //insert edge to priority Queue 
}

for (var i = 1; i < this.nv; i++)
{
	do {
		//get and delete edge which has high priority in priority queue
		edge_Min = PQ.deleteMin();
	} while (this.vert[edge_Min.item.vertex_i].visit); //check if vertex is visited  repeat to delete next edge which has high priority(minimum weight) 
	vertexT[vertexT.length] = edge_Min.item.vertex_i; //set target vertex to vertex tree in last index
	//update edge tree (insert minimum edge which has vertex id and parent id)
	this.Vt.push(
	{
		parent: edge_Min.item.parent_i,
		vtree: edge_Min.item.vertex_i
	});
	this.vert[edge_Min.item.vertex_i].visit = true; //update vertex(target vertex) in minimum edge as visited	
	//get all incidentEdge for vertex(target vertex) 		
	var inci_Edge = this.vert[edge_Min.item.vertex_i].incidentEdge();
	for (var j = 0; j < inci_Edge.length; j++)
	{
		//if incidentEdge for vertex(target vertex) not visited then insert this edge to the priority queue with information(vertex id,parent id ,weight between parent and vertex).
		if (!inci_Edge[j].visit)
		{
			var edge = {
				vertex_i: inci_Edge[j].adjVert,
				parent_i: edge_Min.item.vertex_i
			}; //insert edge to priority queue.
			PQ.insert(edge, inci_Edge[j].edgeWeight); //insert edge and weight to priority Queue 

		}
	}
}
}


// -----------------------------------------------------------------------
// additional functions NOT in published API

//---------------------------------------
function topoSearchImpl(fun)
{

// mark all vertices unvisite
for (var i = 0; i < this.nv; i++)
{
	this.vert[i].visit = false;
}

// traverse unvisited connected component
for (i = 0; i < this.nv; i++)
{
	if (!this.vert[i].visit)
	{
		this.connectedComp++;
		if (fun == "dfs")
		{
			this.dfs(i);
		}
		else if (fun == "bfs")
		{
			this.bfs(i);
		}

	}
}
}
//---------------------------------------
function dfsImpl(v_i)
{
// process vertex

var v = this.vert[v_i];
v.visit = true;
this.dfs_push.push(v_i);

// recursively traverse unvisited adjacent vertices

var w = [],
	incEd = v.incidentEdge();
for (x in incEd) w.push(incEd[x].adjVert);
for (var i = 0; i < w.length; i++)
{
	if (!this.vert[w[i]].visit)
	{
		this.dfs(w[i]);
	}
}
}
//---------------------------------------
function bfsImpl(v_i)
{
// get vertex v by its id
var v = this.vert[v_i];

// process v
v.visit = true;
this.bfs_out.push(v_i);

// initialize queue with v
var bfs_q = new Queue();
bfs_q.enqueue(v);

// while queue not empty
while (!bfs_q.isEmpty())
{
	// dequeue and process a vertex, u
	var u = bfs_q.dequeue().item;
	var w = [],
		incEd = u.incidentEdge();
	for (x in incEd) w.push(incEd[x].adjVert);
	for (var i = 0; i < w.length; i++)
	{
		// queue all unvisited vertices adjacent to u
		if (!this.vert[w[i]].visit)
		{
			this.bfs_out.push(w[i]);
			this.vert[w[i]].visit = true;
			bfs_q.enqueue(this.vert[w[i]]);
		}
	}
}
}


// -----------------------------------------------------------------------
// paste your Heap() object, followed by functions implementing its methods

function Heap()
{
// h[0] not used, heap initially empty

this.h = [null]; // heap of integer keys
this.h_item = [null]; // corresponding heap of data-items (any object)
this.size = 0; // 1 smaller than array (also index of last child)


// --------------------
// min pq-required; many more heap processing methods could be added here
// the 2 basic shape maintainig operations heapify and reheapify simplify
// processing functions

this.isEmpty = isEmptyImpl; // return true if heap empty
this.deleteRoot = deleteRootImpl; // return data-item in root
this.insert = insertHeapImpl; // insert data-item with key

this.heapify = heapifyImpl; // make subtree heap; top-down heapify ("sink") used by .deleteRoot()
this.reheapify = reheapifyImpl; // bottom-up reheapify ("swim") used by .insert()
this.show = heapShow; // utility: return pretty formatted heap as string 

// --------------------
// student methods next; ; actual functions in student code section at end

}

// -----------------------------------------------------------------------
// functions used by Heap() object methods
//
/** 
check if heap is empty 
@methodof heap#
@return {boolean} the status of heap
@author Hend Tayeb
*/
function isEmptyImpl()
{
return this.size == 0;
}
// -----------------------------------------------------------------------

/** 
delete the root node of heap tree
@methodof heap#
@return {integer, string} the node's key and data item
@author Hend Tayeb
*/
function deleteRootImpl()
{
var data_item = {
	key: this.h[i],
	item: this.h_item[1]
};
if (!this.isEmpty())
{
	this.h[1] = this.h[this.size];
	this.h_item[1] = this.h_item[this.size];
	this.heapify();

}
return data_item;
}
// -----------------------------------------------------------------------

/** 
insert item in heap tree
@methodof heap#
@author Hend Tayeb
*/
function insertHeapImpl(key, data_item)
{
this.size++;
this.h[this.size] = key;
this.h_item[this.size] = data_item;
this.reheapify();
}

/**
* @methodof Heap
* @author Sahar Ashmawi
*/
function heapifyImpl()
{
	var n = this.size,
		i = 1;
	var v = {
		key: this.h[i],
		item: this.h_item[i]
	};
	var j = 2 * i;
	var heap = false;
	while (!heap && j <= n)
	{
		if (j < n)
		{
			if (this.h[j] < this.h[j + 1])
			{
				j++;
			}
		}
		if (v.key >= this.h[j])
		{
			heap = true;
		}
		else
		{
			this.h[i] = this.h[j];
			this.h_item[i] = this.h_item[j];
			this.h[j] = v.key;
			this.h_item[j] = v.item;
			i = j;
		}
		j = 2 * i;
}
}
// -----------------------------------------------------------------------

/** 
implements Heap Bottom Up algorithm 
@methodof heap#
@author Hend Tayeb
*/
function reheapifyImpl()
{
	var n = this.size,
		i = Math.floor(n / 2);
	var v = {
		key: this.h[i],
		item: this.h_item[i]
		};
	var j = 2 * i;
	var heap = false;
	while (i > 0 && !heap)
	{
		if (j < n)
		{
			if (this.h[j] < this.h[j + 1])
				j++;
		}
		if (v.key >= this.h[j])
		{
			heap = true;
		}
		else
		{
			this.h[i] = this.h[j];
			this.h_item[i] = this.h_item[j];
			this.h[j] = v.key;
			this.h_item[j] = v.item;
			i = i % 2 == 0 ? i / 2 : (i - 1) / 2;
			v.key = this.h[i];
			v.item = this.h_item[i];
		}
		j = 2 * i;
}
}
// -----------------------------------------------------------------------

function heapShow()
{
	var n = this.size;
	var m = Math.floor(n / 2); // last parent node

	var k = this.h.slice(1, n + 1),
	a = this.h_item.slice(1, n + 1);

	var out = "<h2>Heap (size=" + n + "):</h2><p>Keys: " + k + "<br>Data: " + a + "</p>";
	for (var i = 1; i <= m; i++)
	{
		out += "<p>" + i + ": <b>" + this.h[i] + "(" + this.h_item[i] + ")</b><ul>";
		if (2 * i <= n)
			out += "<li>" + this.h[2 * i] + "</li>";
		if (2 * i + 1 <= n)
			out += "<li>" + this.h[2 * i + 1] + "</li>";
		out += "</ul></p>";
	}

	return out;
}

//----------------------

// -----------------------------------------------------------------------
// similar to starter 8 and 11
// published docs section (ref. assignment page)
// for this section, strip line comments (leave outline)
// *NO* JSDOC comments in this section
// -----------------------------------------------------------------------

function better_input(v, e)
{
	// set number of vertices and edges fields
	this.nv = v.length;
	this.ne = e.length;

// input vertices into internal vertex array
var i, ver;
for (i = 0; i < this.nv; i++)
{
	ver = new Vertex(v[i]);
	this.vert.push(ver);
}

// input vertex pairs from edge list input array
// remember to pass vertex ids to addEdge()
var j;
if (e[0].w != null)
{
	this.weighted = true;
	for (j = 0; j < this.ne; j++)
	{
		this.addEdge(e[j].u, e[j].v, e[j].w);
	}
}
else
{
	for (j = 0; j < this.ne; j++)
	{
		this.addEdge(e[j].u, e[j].v);
	}
}

// double edge count if graph undirected

if (!this.digraph)
{
	this.ne = this.ne * 2;
}
}

//---------------------------------------
function makeAdjMatrixImpl2()
{
// initially create row elements and zero the adjacncy matrix
for (var i = 0; i < this.nv; i++)
{
	var v = this.vert[i];
	this.adjMatrix[i] = [];

	for (var j = 0; j < this.nv; j++)
	{
		this.adjMatrix[i][j] = {
			tc: 0,
			dist: 0
		};
	}

	var w = v.adjacentByID();

	// filling part for TCmatrix warshall-floyd method (if unweighted)
	for (j = 0; j < w.length; j++)
	{ // for each vertex, set 1 for each adjacency
		this.adjMatrix[i][w[j]].tc = 1;
	}

	// filling part for distanceMatrix warshall-floyd method (if weighted)
	var adjList = v.adjacent.traverse();
	var k = 0;
	for (j = 0; j < this.nv; j++)
	{ // for each vertex, set edge weight for each adjacency
		if (include(j, w))
		{
			this.adjMatrix[i][j].dist = adjList[k++].weight;
		}
		else if (!include(j, w) && i != j)
		{
			this.adjMatrix[i][j].dist = Infinity;
		}
		//this.adjMatrix[i][w[j]] = adjList[j].weight;
	}
}
}
//---------------------------------------
function isConnectedImpl()
{
return this.connectedComp == 1;
}

//---------------------------------------
function reportConnectivity()
{
switch (this.connectedComp)
{
	case 0:
		return "no connectivity info";
	case 1:
		return "CONNECTED";
	default:
		return "DISCONNECTED ", this.connectedComp;
}
}

//---------------------------------------
function adjacentByIdImpl()
{
var adj = this.adjacent.traverse(),
	a = [],
	i;
for (i = 0; i < adj.length; i++)
{
	a.push(adj[i].target_v);
}
return a;
}

//---------------------------------------
function print_graphImpl()
{
document.write("<p>GRAPH {", this.label, "} ", this.weighted ? "WEIGHTED, " : "", this.digraph ? "" : "UN", "DIRECTED - ",
	this.nv, " VERTICES, ", this.ne, " EDGES:</p><p>", this.connectInfo(), "</p>");

// list vertices	
for (var i = 0; i < this.nv; i++)
{
	var v = this.vert[i];
	document.write("VERTEX: ", i, v.vertexInfo(), "<br>");
}
}

//---------------------------------------
function insertAdjacentImp(v_i, weight)
{
if (weight != null)
{
	v_i.weight = weight;
}
this.adjacent.insert(v_i);
}

//---------------------------------------
function add_edgeImpl2(u_i, v_i, weight)
{
// fetch vertices using their id, where u: edge source vertex, v: target vertex
var u = this.vert[u_i];
var v = this.vert[v_i];

// insert (u,v), i.e., insert v in adjacency list of u
// (first create edge object using v_i as target, then pass edge object)
var edg = new Edge(v_i);

if (weight != null)
{
	edg.weight = weight;
}
u.insertAdjacent(edg, weight);


// insert (v,u) if undirected graph (repeat above but reverse vertex order)
if (!this.digraph)
{
	edg = new Edge(u_i);
	v.insertAdjacent(edg, weight);
}
}

//---------------------------------------
function vertexInfoImpl()
{
	var adjIDs = [], incEd = this.incidentEdge();
	for(i in incEd) adjIDs.push(incEd[i].adjVert);
    return " {" + this.label + "} - VISIT: " + this.visit + " - ADJACENCY: " + adjIDs;
}

function printMatrix(matrix)
{
for (var i = 0; i < matrix.length; i++)
{
	for (var j = 0; j < matrix.length; j++)
	{
		var ss = matrix[i][j];
		document.write(matrix[i][j], ",");
	}
	document.write("<br>");
}
}

//---------------------------------------
function copyMatrix(matrix, type)
{
var TCMatrix = [],
	distMatrix = [];

for (var i = 0; i < matrix[0].length; i++)
{
	TCMatrix[i] = [];
	distMatrix[i] = [];
}

for (var i = 0; i < matrix[0].length; i++)
{
	for (var j = 0; j < matrix[0].length; j++)
	{
		TCMatrix[i][j] = matrix[i][j].tc;
		distMatrix[i][j] = matrix[i][j].dist;
	}
}
if (type == "tc")
	return TCMatrix;
else(type == "distance")
return distMatrix

}

//---------------------------------------
function include(item, array)
{
for (var i = 0; i < array.length; i++)
{
	if (item == array[i])
	{
		return true;
	}
}
return false;
}

/**
	 Get information about edges incident to vertex. Information is returned in an array of special output objects.
	 @return {object[]} Array of custom objects containing edge information, in input order by default.
 */

function incidentEdgeImpl()
{
   var adj =this.adjacent.traverse(), a=[],i;
   for(i=0;i<adj.length;i++)
   {
	   a.push({adjVert:adj[i].target_v, edgeLabel:this.label+adj[i].label, edgeWeight:adj[i].weight, edgeFlow: adj[i].flow});
   }
   return a;
}
//---------------------------------------
/**
 * 
 * @param {integer} vertex 
 * @returns {boolean} true if vertex is labeled
 */
function isLabeledImpl()
{
	return this.netLabel != 0 && this.netParent != 0;
}
