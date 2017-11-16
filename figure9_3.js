// graph from figure 9.3 (3rd edition)
// input user property fields for each vertex as defined in the Vertex object below

var _v = [
	{ label: "a" }, // index = 0
	{ label: "b" }, // index = 1
	{ label: "c" }, // index = 2
	{ label: "d" }, // index = 3
	{ label: "e" }, // index = 4
	{ label: "f" } // index = 5	
];

var _e = [
	{ u: 0, v: 1, w: 3 },
	{ u: 0, v: 4, w: 6 },
	{ u: 0, v: 5, w: 5 },
	{ u: 1, v: 2, w: 1 },
	{ u: 1, v: 5, w: 4 },
	{ u: 2, v: 3, w: 6 },
	{ u: 2, v: 5, w: 4 },
	{ u: 3, v: 4, w: 8 },
	{ u: 3, v: 5, w: 5 },
	{ u: 4, v: 5, w: 2 }
];
