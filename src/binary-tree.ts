import { Queue } from './queue';
import { Collection } from './collection';
import { Stack } from './stack';

class Node<T> {
  leftChild?: Node<T>;
  rightChild?: Node<T>;
  constructor(public value: T) {}
}

export class BinaryTree<T> implements Collection<T> {
  private size_: number = 1;
  private root_: Node<T>;
  constructor(value: T) {
    this.root_ = new Node(value);
  }

  get size(): number {
    return this.size_
  }

  add(value: T) {
    const newNode = new Node(value);
    const queue: Queue<Node<T>> = new Queue();
    queue.enqueue(this.root_);
    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue() as Node<T>;
      if (!currentNode.leftChild) {
        currentNode.leftChild = newNode;
        this.size_++;
        return;
      }
      if (!currentNode.rightChild) {
        currentNode.rightChild = newNode;
        this.size_++;
        return;
      }
      queue.enqueue(currentNode.leftChild);
      queue.enqueue(currentNode.rightChild);
    }
  }

  preOrder(callback: (value: T) => void) {
    const stack: Stack<Node<T>> = new Stack();
    stack.push(this.root_);
    while (!stack.isEmpty()) {
      const currentNode: Node<T> = stack.pop() as Node<T>;
      callback(currentNode.value);
      if (currentNode.rightChild) stack.push(currentNode.rightChild);
      if (currentNode.leftChild) stack.push(currentNode.leftChild);
    }
  }

  inOrder(callback: (value: T) => void) {
    let currentNode: Node<T> | undefined = this.root_;
    const stack: Stack<Node<T>> = new Stack();
    while (!stack.isEmpty() || currentNode) {
      if (currentNode) {
        stack.push(currentNode)
        currentNode = currentNode.leftChild
      } else {
        currentNode = stack.pop() as Node<T>
        callback(currentNode.value)
        currentNode = currentNode.rightChild
      }
    }
  }

  postOrder(callback: (value: T) => void) {
    let currentNode: Node<T> | undefined = this.root_;
    const stack: Stack<Node<T>> = new Stack();
    let lastNodeVisited: Node<T> | undefined
    while (!stack.isEmpty() || currentNode) {
      if (currentNode) {
        stack.push(currentNode)
        currentNode = currentNode.leftChild
      } else {
        const peekNode = stack.peek() as Node<T>
        if (peekNode.rightChild && lastNodeVisited !== peekNode.rightChild) {
          currentNode = peekNode.rightChild
        } else {
          callback(peekNode.value)
          lastNodeVisited = stack.pop()
        }
      }
    }
  }

  levelOrder(callback: (value: T) => void) {
    const queue: Queue<Node<T>> = new Queue();
    queue.enqueue(this.root_);

    while (!queue.isEmpty()) {
      const currentNode: Node<T> = queue.dequeue() as Node<T>;
      callback(currentNode.value);

      if (currentNode.leftChild) queue.enqueue(currentNode.leftChild);

      if (currentNode.rightChild) queue.enqueue(currentNode.rightChild);
    }
  }
}

const a = new BinaryTree('a');
a.add('b');
a.add('c');
a.add('d');
a.add('e');
a.add('f');
a.add('g');
a;
a.postOrder(console.log);
