// CPCS 324 Algorithms & Data Structures 2
// Outline - heap data structure starter
// 2017, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// Basic design decisions and implementation planning (objects & interfaces)
// ... complete before actual coding



// -----------------------------------------------------------------------
// Heap object constructor

function Heap()
{
	// h[0] not used, heap initially empty
	
	this.h = [null];                   // heap of integer keys
	this.h_item = [null];              // corresponding heap of data-items (any object)
	this.size = 0;                     // 1 smaller than array (also index of last child)
	

	// --------------------
	// min pq-required; many more heap processing methods could be added here
	// the 2 basic shape maintainig operations heapify and reheapify simplify
	// processing functions

	this.isEmpty = isEmptyImpl;        // return true if heap empty
	this.deleteRoot = deleteRootImpl;  // return data-item in root
	this.insert = insertImpl;          // insert data-item with key
	
	this.heapify = heapifyImpl;        // make subtree heap; top-down heapify ("sink") used by .deleteRoot()
	this.reheapify = reheapifyImpl;    // bottom-up reheapify ("swim") used by .insert()
	this.show = heapShow;              // utility: return pretty formatted heap as string 

	// --------------------
	// student methods next; ; actual functions in student code section at end

}

// -----------------------------------------------------------------------
// functions used by methods of Heap() object 
//
/** 
  check if heap is empty 
  @methodof heap#
  @return {boolean} the status of heap
  @author Hend Tayeb
*/
function isEmptyImpl()
{
	return this.size == 0;
}

/** 
  delete the root node of heap tree
  @methodof heap#
  @return {string} the node's data item
  @author Hend Tayeb
*/
function deleteRootImpl()
{
	var data_item = this.h_item[1];
	if(!this.isEmpty())
	{
		this.h[1] = this.h[this.size];
		this.h_item[1] = this.h_item[this.size];
		this.heapify();

	}
}

/** 
  insert item in heap tree
  @methodof heap#
  @author Hend Tayeb
*/
function insertImpl(key, data_item)
{
	this.size++;
	this.h[this.size] = key;
	this.h_item[this.size] = data_item;
	this.reheapify();
}

/**
 * @methodof Heap
 * @author Sahar Ashmawi
 */
function heapifyImpl()
{
	var n= this.size, i;
	for (i= 1; i <= n; i = i % 2 == 0 ? i++ : 2*i)
	{
		var k = i;
		var v = {key: this.h[k], item: this.h_item[k]};
		var heap = false;
		while(!heap && 2*k <= n) 
		{
			var j = 2*k;
			if (j < n)
			{
				if (h[j] > h[j+1])
				{
					j++;
				}
			}
			if (v.key <= h[j])
			{
				heap = true;
			}
			else 
			{
				this.h[k] = this.h[j];
				this.h_item[k] = this.h_item[j];
				k=j;
			}
		}
		this.h[k] = v.key;
		this.h_item[k] = v.key;
	}
}

/** 
  implements Heap Bottom Up algorithm 
  @methodof heap#
  @author Hend Tayeb
*/
function reheapifyImpl()
{
	var n = this.size, i = Math.floor(n/2);
	
		var k = i;
		var v = {key: this.h[k], item:this.h_item[k]};
		var heap = false;
		while(!heap && 2*k <= n)
		{
			var j = 2*k;
			if(j < n)
			{
				if(this.h[j] < this.h[j+1])
					j++;
			}
			if(v.key >= this.h[j]){
				heap = true;
			}else 
			{
				this.h[k] = this.h[j];
				this.h_item[k] = this.h_item[j];
				k = k % 2 == 0 ? k / 2 : (k - 1) / 2;
			}
		}
}

function heapShow()
{
	var n = this.size;
	var m = Math.floor(n/2);       // last parent node
	
	var k = this.h.slice(1,n+1), a = this.h_item.slice(1,n+1);
	
	var out="<h2>Heap (size="+ n+ "):</h2><p>Keys: " + k + "<br>Data: "+ a + "</p>";
	for (var i=1; i<=m; i++)
	{
		out += "<p>"+ i+ ": <b>"+ this.h[i]+ "("+ this.h_item[i]+ ")</b><ul>";
		if ( 2*i <= n )
			out += "<li>"+ this.h[2*i]+ "</li>";
		if ( 2*i+1 <= n )
			out+= "<li>"+ this.h[2*i+1]+ "</li>";
		out+= "</ul></p>";
	}
	
	return out;
}


// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------

