// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Final Project (NEW)
// 2017, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//


var _v = [], _e = [];   // note naming convention in upload guide


// -----------------------------------------------------------------------
function main_graph()   
{
        
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
	this.insertAdjacent=insertAdjacentImp;
	this.incidentEdge=incidentEdgeImpl;
	// --------------------
	// student methods next; actual functions in student code sections
	this.isLabeled = isLabeledImpl;
}

// -----------------------------------------------------------------------
// similar to starter 11
function Edge(vert_i,weight)
{
// published docs section (ref. assignment page)
	// for this section, strip line comments (leave outline)
	// no JSDOC comments in this section


	// property fields

	this.target_v = vert_i;
	this.weight = weight;
	this.label=label;
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
	this.spt = []; //shortest path treee
	
	// --------------------
	// student methods next (actual functions in student code sections)
	this.prim = primImpl2;
	this.shortestPathTree = dijkstraImpl;
	this.getVertex = getVertexImpl;

	// transitive closure package (requirements in line comments)
	this.hasPath = hasPathImpl;    // boolean, true if path exists between vertices v_i, v_j in digraph
	this.shortestPath = shortestPathImpl;      // return distance of shortest path between v_i, v_j in weighted graph
	this.isDAG = isDAGImpl;                    // boolean, true if acyclic digraph
	this.warshallFloyd = warshallFloydImpl;    // inserts .tc field in adjacency matrix if digraph, and .dist if weighted
	this.dfsTC = dfsTCImpl; 
}


/ -----------------------------------------------------------------------
// functions used by methods of Graph and subsidiary objects


function make_graphImpl(n, m, w) 
{
    // parameter validations and checks: number of edges etc.
	var mmax = n*(n-1);
	if ( ! this.digraph ) mmax /= 2;
	if (m>mmax)
	{
		document.write("<p>ERROR: invalid number of edges for graph type</p>");
		return;
	}
	
	// create n vertex in v[] using id 0 to n-1 as label
	var v=[];
	for (var i=0; i<n; i++)
		v[i] = {label:i.toString()};

	// if graph complete no need to generate random edges, just create mmax edges systematically
	

	// otherwise repreat create m distinct edges (graph loops not allowed)
	
	var e=[], wmin=1, wmax = 50000, wsum=0;
	
	var h = [];   // quick-dirty n x n matrix to check previously generated edges, 
	              // m-entry hash table would be more efficient
	for (i=0; i<n; i++)    
	{
		h[i] = []; h[i][i]=0;    // no graph loops; 0 = blocked pair of vertices
	}
	
	for (i=0; i<m; i++)
	{
		// generate vertices u, v randomly
		do 
		{
			var u_i = random(0,n-1), v_i = random(0,n-1);
		
		} while ( h[u_i][v_i] != undefined );
		
		h[u_i][v_i] = 0; h[v_i][u_i] = 0;     // update matrix: block u,v; block v,u also if undirected
		
		// if (u,v) is distinct insert in e[] (generate random weight if w true)
		// otherwise repeat generate another u,v pair
	
		e[i] = {u:u_i, v:v_i};
		if (w)
		{
			e[i].w = random(wmin,wmax);
			wsum += e[i].w;
		}
	}

	// call graph reader method and set label, graph type depends on value of digraph property
	this.read_graph(v,e);
	this.label = "Generated "+n+" vertices, "+m+" random "+(!this.digraph?"un":"")+"directed edges ("+Math.round(m/mmax*100)+"%)"+(w?", ave weight = "+Math.round(wsum/m):"");
}

function random(low,high)
{
	return Math.floor(Math.random()*(high-low+1))+low;
}


// -----------------------------------------------------------------------
// begin student code section (REMOVE network functions)
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
// implementation 1, transitive closure package + First Prim 


// -----------------------------------------------------------------------
// implementation 2, greedy algorithms package (REMOVE Dijkstra)


// -----------------------------------------------------------------------
// additional functions NOT in published API


// -----------------------------------------------------------------------
// paste your Heap() object, followed by functions implementing its methods

function Heap()
{
     
}

// -----------------------------------------------------------------------
// functions used by Heap() object methods
//

function heapShow()
{

}
//-------------
function insertHeapImpl()
{

}
//-----------
function isEmptyHeapImpl()
{
	
}
//----------------------

// -----------------------------------------------------------------------
// similar to starter 8 and 11
// published docs section (ref. assignment page)
// for this section, strip line comments (leave outline)
// *NO* JSDOC comments in this section
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
//---------------------------------------
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

	var w = v.adjacentByID();

		// filling part for TCmatrix warshall-floyd method (if unweighted)
		for (j = 0; j < w.length; j++)
		{// for each vertex, set 1 for each adjacency
			this.adjMatrix[i][w[j]].tc = 1;
		}
	
		// filling part for distanceMatrix warshall-floyd method (if weighted)
		var adjList = v.adjacent.traverse();
		var k = 0;
		for (j = 0; j < this.nv; j++)
		{// for each vertex, set edge weight for each adjacency
			if(include(j, w))
			{
				this.adjMatrix[i][j].dist = adjList[k++].weight;
			}else if (!include(j, w) && i != j)
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
	switch(this.connectedComp){
		case 0: return "no connectivity info";
		case 1: return "CONNECTED";
		default: return "DISCONNECTED ", this.connectedComp;
	}
}

//---------------------------------------
function adjacentByIdImpl()
{
	var adj =this.adjacent.traverse(), a=[],i;
	for(i=0;i<adj.length;i++)
	{
		a.push(adj[i].target_v);
	}
	return a;
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
function insertAdjacentImp(v_i,weight)
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
	u.insertAdjacent(edg,weight);
	
	
	// insert (v,u) if undirected graph (repeat above but reverse vertex order)
	if (!this.digraph)
	{
		edg = new Edge(u_i);
		v.insertAdjacent(edg,weight);
	}
}

//---------------------------------------
function vertexInfoImpl()
{
    return " {" + this.label + "} - VISIT: " + this.visit + " - ADJACENCY: " + this.adjacentByID();
}

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
