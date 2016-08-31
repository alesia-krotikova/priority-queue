class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			this.left.parent = this;
		} else if (!this.right) {
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
		if (node === this.left) {
			this.left = null;
			node.parent = null;
		} else if (node === this.right) {
			this.right = null;
			node.parent = null;
		} else {
			throw "Passed node is not a child of this node";
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {
			let parent = Object.assign({}, this.parent),
				child = Object.assign({}, this);

			this.parent.parent = this;
			this.parent.left = this.left;
			this.parent.right = this.right;

			if (child.left) {
				this.left.parent = this.parent;
			}

			if (child.right) {
				this.right.parent = this.parent;
			}

			if (parent.left && parent.left.data === child.data && parent.left.priority === child.priority) {
				this.left = this.parent;
				this.right = parent.right;

				if (parent.right) {
					this.right.parent = this;
				}
			} else {
				this.right = this.parent;
				this.left = parent.left;

				if (parent.left) {
					this.left.parent = this;
				}
			}

			this.parent = parent.parent;

			if (parent.parent) {
				if (parent.parent.left && parent.parent.left.data === parent.data && parent.parent.left.priority === parent.priority ) {
					this.parent.left = this;
				} else {
					this.parent.right = this;
				}
			}
		}
	}
}

module.exports = Node;
