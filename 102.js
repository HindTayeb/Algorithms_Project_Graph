// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Transitive Closure Package
// 2017, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//


var _v = [], _e = [];   // note naming convention in upload guide


// -----------------------------------------------------------------------
function main_graph()
{
    // create a graph (default undirected)
	var g = new Graph();

	// set graph properties
	g.label = "Exercise 8.4: 7 (Levitin, 3rd edition)";
	
	// use global input arrays _v and _e to initialize its internal data structures
	g.readGraph(_v, _e);

	// use print_graph() method to check graph
	g.printGraph();

	// perform depth-first search and output stored result
	g.topoSearch("dfs");
	document.write("<br>dfs_push: ", g.dfs_push, "<br><br>");
	// report connectivity status if available
	document.write(g.connectInfo(), "<br><br>");

	// perform depth-first search and output stored result
	g.topoSearch("bfs");
	document.write("bfs_order: ", g.bfs_out, "<br><br>");
	
	
	g.dfsTC();
	document.write("TC matrix by DFS: <br>");
	printMatrix(g.dfsTCMatrix);

	g.makeAdjMatrix();
	g.warshallFloyd();
	document.write("<br>TC matrix by Warshall-Floyd: <br>");
	printMatrix(g.R);

	document.write("<br>DAG: ",g.isDAG(),"<br>");

	document.write("<br>Distance matrix: <br>");
	printMatrix(g.D);
	//if Graph undirected and weighted
	if (g.digraph == false && g.weighted)
	{
		document.writeln("<br>","MST by Prim2 (linear PQ)","<br>");
		print_edges(g);	
	}
}
// -----------------------------------------------------------------------

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
	this.insertAdjacent=insertAdjacentImp;
	this.incidentEdge=incidentEdgeImpl;

	// --------------------
	// student methods next; actual functions in student code sections

}

// -----------------------------------------------------------------------

function Edge(vert_i,weight,label)
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments (leave outline)
	// no JSDOC comments in this section


	// property fields

	this.target_v = vert_i;
	this.weight = weight;
	this.label=label;

	// member methods


	// --------------------
	// student property fields next


	// --------------------
	// student methods next; actual functions in student code sections

}


// -----------------------------------------------------------------------

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


	// --------------------
	// student methods next (actual functions in student code sections)
	this.prim = primImpl2;

	// transitive closure package (requirements in line comments)

	this.hasPath = hasPathImpl;    // boolean, true if path exists between vertices v_i, v_j in digraph
	this.shortestPath = shortestPathImpl;      // return distance of shortest path between v_i, v_j in weighted graph
	this.isDAG = isDAGImpl;                    // boolean, true if acyclic digraph
	this.warshallFloyd = warshallFloydImpl;    // inserts .tc field in adjacency matrix if digraph, and .dist if weighted
	this.dfsTC = dfsTCImpl;                    // return TC matrix for digraph based on a dfs

}


// -----------------------------------------------------------------------
// functions used by methods of Graph and subsidiary objects

// -----------------------------------------------------------------------
// begin student code section
// -----------------------------------------------------------------------

// transitive closure package

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
	return (v_i <= v_j)? v_i: v_j;
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
	for(var i = 0; i < this.nv; i++)
	{
		if(this.R[i][i] == 1)
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

	for(k = 0; k < this.nv; k++)
	{
		for(i = 0; i < this.nv; i++)
		{
			for(j = 0; j < this.nv; j++)
			{
				this.R[i][j] = (this.R[i][j] == 1)? this.R[i][j]:this.hasPath(this.R[i][k],this.R[k][j]);
				this.D[i][j] = this.shortestPath(this.D[i][j],this.D[i][k]+this.D[k][j]);
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
			this.dfsTCMatrix[i][k] = 0;
		}

		var w = [], incEd = v.incidentEdge();
		for(x in incEd) w.push(incEd[x].adjVert);
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



// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// for this section, strip line comments (leave outline)
// no JSDOC comments in this section
// -----------------------------------------------------------------------

function better_input(v,e)
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
function topoSearchImpl(fun)
{

// mark all vertices unvisited
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

	var w = [], incEd = v.incidentEdge();
	for(x in incEd) w.push(incEd[x].adjVert);
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
		var w = [], incEd = u.incidentEdge();
		for(x in incEd) w.push(incEd[x].adjVert);
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
		this.adjMatrix[i][j] = {tc:0, dist:0};
	}

	var w = [], incEd = v.incidentEdge();
	for(x in incEd) w.push(incEd[x].adjVert);

		// filling part for TCmatrix warshall-floyd method (if unweighted)
		for (j = 0; j < w.length; j++)
		{// for each vertex, set 1 for each adjacency
			this.adjMatrix[i][w[j]].tc = 1;
		}

		// filling part for distanceMatrix warshall-floyd method (if weighted)
		var adjList = v.incidentEdge();
		var k = 0;
		for (j = 0; j < this.nv; j++)
		{// for each vertex, set edge weight for each adjacency
			if(include(j, w))
			{
				this.adjMatrix[i][j].dist = adjList[k++].edgeWeight;
			}else if (!include(j, w) && i != j)
			{
				this.adjMatrix[i][j].dist = Infinity;
			}
			
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
	switch(this.connectedComp){
		case 0: return "no connectivity info";
		case 1: return "CONNECTED";
		default: return "DISCONNECTED ", this.connectedComp;
	}
}

//---------------------------------------
function print_graphImpl()
{
    document.write("<p>GRAPH {",this.label, "} ", this.weighted?"WEIGHTED, ":"", this.digraph?"":"UN", "DIRECTED - ",
		this.nv, " VERTICES, ", this.ne, " EDGES:</p><p>",this.connectInfo(),"</p>");

   	// list vertices
    	for (var i=0; i < this.nv; i++)
     	{
     		var v = this.vert[i];
   		document.write( "VERTEX: ", i, v.vertexInfo(), "<br>");
		}


}

//---------------------------------------
function insertAdjacentImp(v_i,weight,label)
{
	var edg = new Edge(); edg.target_v = v_i; edg.label = label;
	if (weight != null)
	{
		edg.weight = weight;
	}
	this.adjacent.insert(edg);
}

//---------------------------------------
function add_edgeImpl2(u_i, v_i, weight)
{
	// fetch vertices using their id, where u: edge source vertex, v: target vertex
	var u = this.vert[u_i];
	var v = this.vert[v_i];

	// insert (u,v), i.e., insert v in adjacency list of u
	u.insertAdjacent(v_i,weight,v.label);


	// insert (v,u) if undirected graph (repeat above but reverse vertex order)
	if (!this.digraph)
	{
		v.insertAdjacent(u_i,weight,u.label);
	}
}

//---------------------------------------
function vertexInfoImpl()
{
	var adjIDs = [], incEd = this.incidentEdge();
	for(i in incEd) adjIDs.push(incEd[i].adjVert);
    return " {" + this.label + "} - VISIT: " + this.visit + " - ADJACENCY: " + adjIDs;
}

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------

//---------------------------------------
/**
 	Output to display matrix given in input.

 	@param {var} matrix any matrix of objects

 */

function printMatrix(matrix)
{
	for(var i = 0; i < matrix.length; i++)
	{
		for(var j = 0; j < matrix.length; j++)
		{
			var ss = matrix[i][j];
			document.write(matrix[i][j], ",");
		}
		document.write("<br>");
	}
}

//---------------------------------------
/**
 	return a copy from the matrix given in input based on it is type, weither tc matrix or distance matrix.

 	@param {var} matrix any matrix of objects
	 @param {string} type tc or distance
	 @return {number} a copy of matrix
 */

function copyMatrix(matrix, type)
{
	var TCMatrix = [], distMatrix = [];

	for (var i = 0; i < matrix[0].length; i++)
	{
		TCMatrix[i] = [];
		distMatrix[i] = [];
	}

	for(var i = 0; i < matrix[0].length; i++)
	{
		for(var j = 0; j < matrix[0].length; j++)
		{
			TCMatrix[i][j] = matrix[i][j].tc;
			distMatrix[i][j] = matrix[i][j].dist;
		}
	}
	if(type == "tc")
		return TCMatrix;
	else (type == "distance")
		return distMatrix

}

//---------------------------------------
/**
 	search if an item exists in array. 
 	@param {var} item the item to search for.
	 @param {var} array array of items to search.
	 @return {boolean} true if item exists in array.
 */

function include(item, array)
{
	for(var i = 0; i < array.length; i++)
	{
		if(item == array[i])
		{
			return true;
		}
	}
	return false;
}

//---------------------------------------
/**
	 Get information about edges incident to vertex. Information is returned in an array of special output objects.

	 @return {object[]} Array of custom objects containing edge information, in input order by default.
 */

function incidentEdgeImpl()
{
   var adj =this.adjacent.traverse(), a=[],i;
   for(i=0;i<adj.length;i++)
   {
	   a.push({adjVert:adj[i].target_v, edgeLabel:this.label+adj[i].label, edgeWeight:adj[i].weight});
   }
   return a;
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
		 	var v = [this.vert[0]];
		 	var e = [];
		 	var w;
		 	var minWeight = Infinity;
		 	var nextVert;  //next vertex to traverse.

			//mark first vertex as visited
			v[0].visit = true;

		//start from second vertex since first one already in v tree.
		//check the edges from pervious vertices
	for(var i = 1; i < this.vert.length; i++)
	{//check the edges from current vertex
		for(var j = 0; j < v.length; j++)
		{
			w = v[j].incidentEdge();
			for(var k = 0; k < w.length; k++)
			{
				if(!this.vert[w[k].adjVert].visit && w[k].edgeWeight <= minWeight)
				{
					minWeight = w[k].edgeWeight; nextVert=w[k];
				}
			}
		}
		minWeight = Infinity;
		v.push(this.vert[nextVert.adjVert]);
		e.push(nextVert);

		//mark next visit vertex as visited
		v[i].visit = true;
	}
	return e;
 }
function primImpl2()
 {
	 var vertexT = []; //vertex tree
	 var EdgeT = []; //edge tree
	 var edge_Min;//edge which has high priority (minimum weight)
	 //mark all verecess are not visited.
	 for (var i = 0; i < this.nv; i++)
	 {
		 this.vert[i].visit = false;
	 }
	    var PQ=new PQueue();//initialize priority queue 
		//initiate vertex tree with the first vertex
		 vertexT[0] = this.vert[0]; //set first vertex in vertex tree 
		 this.vert[0].visit=true;//set first vertex as visited
		  //insert source vertex to edge tree and source vertex does not have source vertex(parent)
		  var edge={vertex_i:0,parent_i:"-"}; 
		  EdgeT[0]={edge};//insert first edge to edge tree
        //get incedent edge for first vertex
	     var inci_Edge = vertexT[0].incidentEdge();
		 var w=inci_Edge.length;//get length of incidentEdge for first vertex 
        //for each incidentEdge for first vertex  insert it to priority queue
	for(var i=0;i<w;i++)
	{
	var edge={vertex_i:inci_Edge[i].adjVert,parent_i:0};//each vertex has 2 fileds 1-vertex id and parent id
		PQ.insert(edge,inci_Edge[i].edgeWeight);//insert edge to priority Queue 
	}
for (var i = 1; i < this.nv; i++)
    {
		do{
		//get and delete edge which has high priority in priority queue
		 edge_Min=PQ.deleteMin();
		}while(this.vert[edge_Min.item.vertex_i].visit);//check if vertex is visited  repeat to delete next edge which has high priority(minimum weight) 
		vertexT[vertexT.length] = edge_Min; //set edge which has minimum weight to vertex tree in last index
		 //update edge tree (insert minimum edge which has vertex id and parent id)
		 var edge={vertex_i: edge_Min.item.vertex_i,parent_i:edge_Min.item.parent_i};
	 	 EdgeT[i]={edge};
		 this.vert[edge_Min.item.vertex_i].visit = true; //update vertex(target vertex) in minimum edge as visited	
			//get all incidentEdge for vertex(target vertex) 		
            var inci_Edge=this.vert[edge_Min.item.vertex_i].incidentEdge();
			for(var j=0;j<inci_Edge.length;j++){
				//if incidentEdge for vertex(target vertex) not visited then insert this edge to the priority queue with information(vertex id,parent id ,weight between parent and vertex).
				if(!inci_Edge[j].visit){
					var edge={vertex_i:inci_Edge[j].adjVert,parent_i:edge_Min.item.vertex_i};//insert edge to priority queue.
				PQ.insert(edge,inci_Edge[j].edgeWeight);//insert edge and weight to priority Queue 
			}
	}
}
return EdgeT;//return edges which has minimum weight 
}
//---------------------------------------
/**
	 Implement Dijkstra's algorithms on graph and evaluate the length of shortest path from source node to end node, 
	 and the next to last vertex in path.
	 
	 @memberOf #Graph
	 @author Hend Tayeb
 */
 
 function dijkstraImpl()
 {
	 //initialize queue
	 var pq = new PQueue();
	 var distance =[], pervVertex, Vt = [];
	//initiate queue nodes  
	 for(vertex in this.vert)
	 {
		 pq.enqueue(Infinity,null);
		 distance.push(Infinity);
	 }
	 //start with source vertex
	 pq.decrease(this.vert[0],0);
	 distance[0] = 0;
	 for(var i = 0; i < this.vert.length-1; i++)
	 {
		 //pick fring vertex with min distance
		 var us = pq.deleteMin();
		 Vt.push(us.item);
		 var adj = us.item.incidentEdge();
		 //update fring set after adding us
		 for(var j = 0; j < adj.length; j++)
		 {
			 if(!include(adj[j].adjVert,Vt))
			 {
				 if((distance[j]+adj[j].edgeWeight) < distance[j+1])
				 {
					distance[j+1] = distance[j]+adj[j].edgeWeight;
					pq.decrease(adj[j],distance[j+1]);
				 }
			 }
		 }

	 }
 }
function print_edges(g){
	for (var i = 0; i < g.prim().length; i++)
	{
		document.writeln("(", g.prim()[i].edge.parent_i,",",g.prim()[i].edge.vertex_i,")");
		
		if(i<g.prim().length-1){
			document.writeln(",");
		}
		else{
			document.writeln(".", "<br>");
		}
	}
}
 
