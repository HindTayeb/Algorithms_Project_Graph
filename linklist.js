// CPCS 324 Algorithms & Data Structures 2
// Linked list data structure
// 2013, Dr. Muhammad Al-Hashimi


// -----------------------------------------------------------------------
// Linked list node object constructor (used for graph vertex adjacency node)

function LNode(item)
{
	this.item = item;         // stored data in list can be any object
	this.next = null;
}

// -----------------------------------------------------------------------
// Linked list object constructor

function List()
{
	this.first = null;           // list initially empty

	// --------------------
	// many more list processing methods could be added here

	this.insert = insert;        // insert node at end of list
	this.traverse = traverse;    // return list elements in an array
	this.isEmpty = lEmpty;       // return true if list is empty
	
	
	// --------------------
	// student methods next; ; actual functions in student code section at end
		
	this.delete_first = deleteFirst;
}

// -----------------------------------------------------------------------
// method functions used by List() object
//

function lEmpty()
{
	return (this.first == null);
}

// --------------------
function insert(item)
{
	// if list empty create node and insert, otherwise walk down list and insert at end
	
	if (this.isEmpty())
		this.first = new LNode(item);
	else
	{
		var l = this.first;      // walker variable
		while (l.next != null)
			l = l.next;
		l.next = new LNode(item);
	}
}

// --------------------
function traverse()
{
	var out = [];  // return list elements in array

	for (var i=0, l=this.first; l != null; l = l.next )
		out [i++] = l.item;
	return out;
}



// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------

function deleteFirst()
{	var item = this.first;
	this.first = item.next;          
    return item;
}