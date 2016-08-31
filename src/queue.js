const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize ? maxSize : 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if ( this.isEmpty() ){
			this.heap.push(data, priority);
		} else if ( this.size() < this.maxSize ) {
			this.heap.push(data, priority);
		} else {
			throw "Queue has max size";
		}
	}

	shift() {
		if ( !this.isEmpty() ) {
			return this.heap.pop();
		} else {
			throw "The queue is empty";
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;