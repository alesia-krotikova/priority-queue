const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.countNodes = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.countNodes++;
	}

	pop() {
		if ( !this.isEmpty() ) {
			let detachedRoot = this.detachRoot();

			if (this.parentNodes[0]) {
				this.restoreRootFromLastInsertedNode(detachedRoot);
				this.shiftNodeDown(this.root);
			}

			this.countNodes--;
			return detachedRoot.data;
		}
	}

	detachRoot() {
		let detachedRoot = this.root;
		this.root = null;

		if ( this.parentNodes[0] === detachedRoot ) {
			this.parentNodes.shift();
		}

		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		let countParentNodes = this.parentNodes.length,
			lastNode = this.parentNodes.pop(),
			minCountNodesWithoutRoot = 3;

		this.root = lastNode;

		if ( lastNode.parent !== detached && this.parentNodes.indexOf(lastNode.parent) < 0 ) {
			this.parentNodes.unshift(lastNode.parent);
		}

		if ( this.root === detached.left ) {
			this.root.left = null;
		} else {
			this.root.left = detached.left;
		}

		if ( this.root === detached.right ) {
			this.root.right = null;
		} else {
			this.root.right = detached.right;
		}

		if (this.root.left) {
			this.root.left.parent = this.root;
		}

		if (this.root.right) {
			this.root.right.parent = this.root;
		}

		if (this.root.parent) {
			this.root.parent.left === lastNode ? this.root.parent.left = null : this.root.parent.right = null;
		}

		this.root.parent = null;

		if ( countParentNodes < minCountNodesWithoutRoot ) {
			this.parentNodes.unshift(lastNode);
		}
	}

	size() {
		return this.countNodes;
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.countNodes = 0;
	}

	insertNode(node) {
		if ( this.isEmpty() ) {
			this.root = node;
			this.parentNodes.push(this.root);
		} else {
			let currentParentNode = this.parentNodes[0];
			currentParentNode.appendChild(node);
			this.parentNodes.push(node);

			if(currentParentNode.right) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent){
			if (node.priority > node.parent.priority) {
				let indexNode = this.parentNodes.indexOf(node),
					indexParent = this.parentNodes.indexOf(node.parent);

				if (indexParent >= 0) {
					this.parentNodes[indexParent] = node;
					this.parentNodes[indexNode] = node.parent;
				} else {
					this.parentNodes[indexNode] = node.parent;
				}

				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		} else {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		if (node.left) {
			let child,
				rootNode = node;

			if (node.priority < node.left.priority) {
				child = node.left;

				if(node.right && node.priority < node.right.priority && node.left.priority < node.right.priority) {
					child = node.right;
				}
			}

			if (child) {
				let indexNode = this.parentNodes.indexOf(node),
					indexChild = this.parentNodes.indexOf(child);

				if (indexNode >= 0) {
					this.parentNodes[indexChild] = node;
					this.parentNodes[indexNode] = child;
				} else if(indexChild >= 0) {
					this.parentNodes[indexChild] = node;
				}

				child.swapWithParent();

				if (this.root === rootNode) {
					this.root = child;
				}

				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;