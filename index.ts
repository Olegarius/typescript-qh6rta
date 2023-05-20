// Import stylesheets
import './style.css';

// Write TypeScript code!
class Node<T> {
  value: T | null;
  left: Node<T> | null;
  right: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree<T> {
  root: Node<T> | null;

  constructor() {
    this.root = null;
  }

  add(value: T) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;
    while (currentNode) {
      if (newNode.value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  order(node: Node<T>, callback: (node: Node<T>) => unknown): void {
    if (!node) {
      return;
    }
    if (callback) {
      callback(node);
    }
    this.order(node.left, callback);
    this.order(node.right, callback);
  }

  traverseDFS(callback: (node: Node<T>) => unknown) {
    this.order(this.root, callback);
  }

  traverseBFS(callback: (node: Node<T>) => unknown) {
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      callback(node);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
}
const myTree = new BinaryTree();
myTree.add(10);
myTree.add(11);
myTree.add(5);
myTree.add(7);
myTree.add(2);
myTree.add(20);
myTree.add(15);
myTree.add(1);
myTree.add(6);
myTree.add(4);

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>${myTree.traverseBFS((node) => {
  console.log(node.value);
})}</h1>`;
