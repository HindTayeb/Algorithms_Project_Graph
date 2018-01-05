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

// ...etc

// -----------------------------------------------------------------------
// similar to starter 8 and 11
// published docs section (ref. assignment page)
// for this section, strip line comments (leave outline)
// *NO* JSDOC comments in this section
// -----------------------------------------------------------------------

function better_input(v,e)
{

}
