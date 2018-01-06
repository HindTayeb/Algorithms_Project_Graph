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
	this.insert = insertHeapImpl;          // insert data-item with key
	
	this.heapify = heapifyImpl;        // make subtree heap; top-down heapify ("sink") used by .deleteRoot()
	this.reheapify = reheapifyImpl;    // bottom-up reheapify ("swim") used by .insert()
	this.show = heapShow;              // utility: return pretty formatted heap as string 

	// --------------------
	// student methods next; ; actual functions in student code section at end

}

// -----------------------------------------------------------------------
// functions used by methods of Heap() object 
//

function isEmptyImpl()
{
	return this.size == 0;
}

function deleteRootImpl()
{
	var data_item = {key:this.h[1], item:this.h_item[1]};
	if(!this.isEmpty())
	{
		this.h[1] = this.h[this.size];
		this.h_item[1] = this.h_item[this.size];
		this.heapify();

	}
	return data_item;
}

function insertHeapImpl(key, data_item)
{
	this.size++;
	this.h[this.size] = key;
	this.h_item[this.size] = data_item;
	this.reheapify();
}

function heapifyImpl()
{
	var n = this.size, i = 1;
	var j = i*2;
		var v = {key: this.h[1], item:this.h_item[i]};
		var heap = false;
		while(!heap && j <= n)
		{
			if(j < n)
			{
				if(this.h[j] < this.h[j+1])
					j++;
			}
			if(v.key >= this.h[j]){
				heap = true;
			}else 
			{
				this.h[i] = this.h[j];
				this.h_item[i] = this.h_item[j];
				this.h[j] = v.key;
				this.h_item[j] = v.item;
				i = j;
			}
			j = i*2;
		}
}

function reheapifyImpl()
{
	var n = this.size, i = Math.floor(n/2);
	var j = i*2;
	var v = {key: this.h[i], item:this.h_item[i]};
	var heap = false;
		while(i > 0 && !heap)
		{
			
		    if(j < n)
			{
				if(this.h[j] < this.h[j+1])
					j++;
			}
			if(v.key >= this.h[j]){
				heap = true;
			}else 
			{
				this.h[i] = this.h[j];
				this.h_item[i] = this.h_item[j];
				this.h[j] = v.key;
				this.h_item[j] = v.item;
				i = i % 2 == 0 ? i / 2 : (i - 1) / 2;
				v.key = this.h[i];
				v.item = this.h_item[i];
			}
			j = 2*i;
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


