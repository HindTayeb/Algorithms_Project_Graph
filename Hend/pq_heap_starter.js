// CPCS 324 Algorithms & Data Structures 2
// Outline - Priority queue data structure
// 2017, Dr. Muhammad Al-Hashimi
// -----------------------------------------------------------------------

// Priority queue object constructor (document using JSDOC comments)
/**
 * create an object from priority queue.
 * @author Sahar Ashmawi
 * @constructor 
 */
function HPQueue()
{
    this.pq = new Heap(); // requirement: linked-list implementation

    // specify (design) methods

    this.isEmpty = isEmptyImpl; // return true if queue empty
    this.deleteMin = deleteMinHImpl; // remove/return item with minimum priority
    this.insert = insertHImpl; // insert an item with priority
    this.decrease = decreaseImpl; // (fill) update item priority (decrease as defined in textbook) 
    this.isMinHeap = true;

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
 * @author Hend Tayeb
 * @returns item has highest priority.
 */
function deleteMinHImpl()
{
    if(!this.isEmpty())
    {
    	var deletedItem = this.pq.deleteRoot();
    	if (this.isMinHeap)
    		deletedItem.key = deletedItem.key*-1;
    	return deletedItem;
    }
}
//-------------------------------------------------------------------------
/**
 * method to insert item in list.
 * @author Hend Tayeb
 * @param {PQNode} item 
 * @param {Integer} key 
 */
function insertHImpl(item, key)
{
        this.pq.insert(this.isMinHeap?key*-1 : key, new PQNode(item));
}
