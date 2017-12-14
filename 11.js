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
	g.label = "Exercise 9.2: 1b (Levitin, 3rd edition)";
	
	// use global input arrays _v and _e to initialize its internal data structures
	g.readGraph(_v, _e);

	// use print_graph() method to check graph
	g.printGraph();

}

// -----------------------------------------------------------------------
// network object initial requirements: support Edmonds-Karp maximum flow algorithm

function FNetwork()   
{

	// --------------------
	// student property fields next
	this.network = new Graph();
	
	// --------------------
	// student methods next; implementing functions in student code sections
	
	// note following are required method names, you are not required to use all of them
	// you are required to use the name if you choose to have the method

	// accessor methods: getters
	this.edgeFlow                  // return (get) flow for argument edge i,j
	this.edgeCap                   // return capacity for argument edge i,j
	this.srcVertex                 // return source vertex (or its id, you decide)
	this.sinkVertex                // return sink vertex (or its id, you decide)
	this.getFlowVal                // return current flow *value* in network
	this.getFlow                   // return current flow as array of {u,v,flow} objects
	this.inFlow                    // return incoming flow for argument vertex
	this.outFlow                   // return outgoing flow for argument vertex
	
	// accessor methods: setters
	this.setEdgeFlow               // set flow on argument edge (i,j)
	this.setFlow                   // set flow to argument (including 0) for all edges 
	this.initFlow = initFlowImpl;                  // reset flow to 0 for all edges
	this.setLabel                  // set network label (hide Graph code)
	
	
	// other possibly useful method names
	this.isSrc                     // true if argument is source vertex of network      
	this.isSink                    // true if argument is sink vertex of network
	this.isEdge                    // true if argument vertices form an edge ALERT belong to Graph() but leave as test to students
	this.isBackwardEdge            // true if argument vertices form a backward edge
	this.readNetwork               // input reader method
	this.printNetwork              // output network including current flow (reference output of final project
	this.edmondsKarp               // implement the Edmonds-Karp algorithm for maximum flow
	

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
/**
 * @constructor 
 * 
 * 
 */
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

}

// -----------------------------------------------------------------------
//		FNetwork Object Methods
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
function edmondsKarpImpl()
{	
	var q = new Queue();

	//assign xij = 0 to every edge (i, j) in the network
	this.initFlow();
}

// -----------------------------------------------------------------------
function initFlowImpl()
{
    for (var i = 0; i < this.network.nv; i++)
    {
        var v = this.network.vert[i];
        var w = v.adjacent.traverse();

        for (var j = 0; j < w.length; j++)
        {
            w[j].weight2 = 0;
        }
    }
} 

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
		{  // for each vertex, set 1 for each adjacency
			this.adjMatrix[i][w[j]].tc = 1;
		}

		// filling part for distanceMatrix warshall-floyd method (if weighted)
		var adjList = v.incidentEdge();
		var k = 0;
		for (j = 0; j < this.nv; j++)
		{   // for each vertex, set edge weight for each adjacency
			if(include(j, w))
			{
				this.adjMatrix[i][j].dist = adjList[k++].edgeWeight;
			}
			else if (!include(j, w) && i != j)
			{
				this.adjMatrix[i][j].dist = Infinity;
			}
			
		}
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
