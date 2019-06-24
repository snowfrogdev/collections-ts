import { Queue } from './queue';
import { Collection } from './collection';
import { Stack } from './stack';

export class Node<T> {
  leftChild?: Node<T>;
  rightChild?: Node<T>;
  constructor(public value: T) {}
}

export abstract class BinaryTree<T> implements Collection<T> {
  protected size_: number = 0;
  protected root_?: Node<T>;

  get size(): number {
    return this.size_;
  }

  abstract add(value: T): void;

  abstract has(value: T): boolean;

  abstract remove(value: T): boolean;

  abstract [Symbol.iterator](): Iterator<T>;

  clear() {
    this.root_ = undefined;
    this.size_ = 0;
  }

  isEmpty(): boolean {
    return this.size_ === 0;
  }

  preOrder(callback: (value: T) => void) {
    if (!this.root_) return;
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
        stack.push(currentNode);
        currentNode = currentNode.leftChild;
      } else {
        currentNode = stack.pop() as Node<T>;
        callback(currentNode.value);
        currentNode = currentNode.rightChild;
      }
    }
  }

  postOrder(callback: (value: T) => void) {
    let currentNode: Node<T> | undefined = this.root_;
    const stack: Stack<Node<T>> = new Stack();
    let lastNodeVisited: Node<T> | undefined;
    while (!stack.isEmpty() || currentNode) {
      if (currentNode) {
        stack.push(currentNode);
        currentNode = currentNode.leftChild;
      } else {
        const peekNode = stack.peek() as Node<T>;
        if (peekNode.rightChild && lastNodeVisited !== peekNode.rightChild) {
          currentNode = peekNode.rightChild;
        } else {
          callback(peekNode.value);
          lastNodeVisited = stack.pop();
        }
      }
    }
  }

  levelOrder(callback: (value: T) => void) {
    if (!this.root_) return;
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
