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
// implement priority queue depend on linked list ADT by insert the item by its priority 
// and delete the highest priority from queue, except the same priority deleted FIFO.
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
// second Prim’s 
// -----------------------------------------------------------------------

// Priority queue object constructor (document using JSDOC comments)
/**
 * create an object from priority queue.
 * @author Sahar Ashmawi
 * @constructor 
 */
function PQueue()
{
    this.pq = new List(); // requirement: linked-list implementation

    // specify (design) methods

    this.isEmpty = isEmptyImpl; // return true if queue empty
    this.deleteMin = deleteMinImpl; // remove/return item with minimum priority
    this.insert = insertImpl; // insert an item with priority
    this.decrease = decreaseImpl; // (fill) update item priority (decrease as defined in textbook) 

}

// -----------------------------------------------------------------------
// Priority queue node constructor (document using JSDOC comments)
/**
 * create an object from node of priority queue.
 * @author Sahar Ashmawi
 * @param {Object} item 
 * @param {Integer} key 
 */

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
/**
 * method to check the list is empty.
 * @author Sahar Ashmawi
 * @returns true or false.
 */
function isEmptyImpl()
{
   return this.pq.isEmpty();
}
//-------------------------------------------------------------------------
/**
 * method to delete item has highest priority.
 * @author Sahar Ashmawi
 * @returns item has highest priority.
 */
function deleteMinImpl()
{
    if(!this.isEmpty())
    {
    	var temp = this.pq.first, 
    	minKey = Infinity, 
    	minNode = null, 
    	deleteNode = null;
    	
    	while(temp != null)
    	{
    		if(temp.item.prior < minKey)
    		{
    			minKey = temp.item.prior;
    			minNode = temp.item;
    		}
    		temp = temp.next;
    	}
    	
    	deleteNode = minNode;
    	
    	if(this.pq.first.item == minNode)
    	{
    		deleteNode = this.pq.delete_first().item;
    	}else
    	{
    		temp = this.pq.first;
    		while(temp.next.item != minNode)
    		{
    			temp = temp.next;
    		}
    		temp.next = temp.next.next;
    	}
    return 	deleteNode;
    }
}
//-------------------------------------------------------------------------
/**
 * method to insert item in list.
 * @author Sahar Ashmawi
 * @param {PQNode} item 
 * @param {Integer} key 
 */
function insertImpl(item, key)
{
        this.pq.insert(new PQNode(item, key));
}
//-------------------------------------------------------------------------
/**
 * method for update priority.
 * @author Sahar Ashmawi
 * @param {Object} item // vertex 
 * @param {Integer} key // distance
 */
function decreaseImpl(item, key)
{
	var temp = this.pq.first;
 	while(temp != null)
   	 {
		if(temp.item.item.label == item.label)
    	{
			if(temp.item.prior > key)
    			temp.item.prior = key;
    			break;
		}
		temp = temp.next;
	} 
}
