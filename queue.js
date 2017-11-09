// CPCS 324 Algorithms & Data Structures 2
// Queue data structure starter - Code Plan
// 2017, Dr. Muhammad Al-Hashimi


// -----------------------------------------------------------------------
// Basic design decisions and implementation planning (objects & interfaces)

// Initial requirement: support breadth-first search ops
// Design decisions: 
//   base on (reuse) the 324 linked list implementation
//   enqueue at list bottom  (reuse list's insert method)
//   therefore, dequeue at list top ("first" pointer)


// -----------------------------------------------------------------------
// Queue object constructor

function Queue()
{
	// specify object data and property fields
	
	this.head = new List();               // (fill code) queue head (front)

	// specify (i.e., design) methods (interface names)
	
	this.isEmpty = qEmpty;       // (fill code) return true if queue empty
	this.enqueue = enqueue;    // insert item at tail of queue
	this.dequeue = dequeue;    // remove and return item from head of queue
	

}

// -----------------------------------------------------------------------
// method functions used by Queue() object
//

// specify (i.e., design) interfaces details (arguments and return values)

// --------------------
// implement queue empty condition based on linked list .isEmpty() method

function qEmpty()              // note "q" prefix to distinguish from similar 
                               // function in linked-list package
{
	return this.head.isEmpty();                  // (replace by correct call)
}

// --------------------
function enqueue(item)
{
	this.head.insert(item);
}

// --------------------
function dequeue()
{
	return this.head.delete_first();
}
