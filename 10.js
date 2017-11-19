// CPCS 324 Algorithms & Data Structures 2
// Outline - Priority queue data structure
// 2017, Dr. Muhammad Al-Hashimi


// -----------------------------------------------------------------------
/**
 * @author Sahar Ashmawi
 */
// -----------------------------------------------------------------------
// Basic design decisions and implementation planning (objects & interfaces)
// initial requirements: to quickly support Dijkstra and second Prim's algorithms, 
// implement minimum priority functionality

// design decisions:
// based on the 324 linked list implementation
// how will the PQ ops be implemented?
// <student fill here>
// implement priority queue depend on linked list ADT by insert the item with its priority 
// and delete the highest priority (minimum weight) from queue, except the same priority deleted FIFO.
// we choosed choice that allows priority queue methods to directly process the linked list in some cases,
// due to its convenience used with short-term and quickly implementation.

// operation:
// insert(): add an item to the linked list with an associated priority.
// deleteMin(): remove the item from the linked list that has the highest priority.
// isEmpty(): check list is empty.
// decrease(): form of update priority of vertex.

// code plan: start to write your API specifications (JSDOC comments) and think about 
// design consequences (design impact)

// Impact analysis:
// <student fill here>
// encapsulation violation for linked list that became aware of the internal details of the items.
// second Prim’s: 
// - take all incident edge of vertex in queue and take out them by deleteMin() that searches which edge has minimum weight,
//   instead of save the min in each iteration and compare with it.
// - efficiency is O(n^2) rather than O(n^3).
// -----------------------------------------------------------------------

// Priority queue object constructor (document using JSDOC comments)

function PQueue()
{
	this.pq = new List();          // requirement: linked-list implementation

	
	// specify (design) methods
	
	this.isEmpty                   // return true if queue empty
	this.deleteMin;                // remove/return item with minimum priority
	this.insert;                   // insert an item with priority
	                               // (fill) update item priority (decrease as defined in textbook) 
	
}

// -----------------------------------------------------------------------
// Priority queue node constructor (document using JSDOC comments)

function PQNode(item, key)
{
	this.item = item;
	this.prior = key;
	
	// specify (design) methods
	
}

// -----------------------------------------------------------------------
// functions used by PQueue() object methods
// specify interface information (JSDOC comments)
// ....

