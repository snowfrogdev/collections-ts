import { BinaryTree, Node } from './binary-tree';
import { Stack } from './stack';

class BSTNode<T> implements Node<T> {
  leftChild?: BSTNode<T>;
  rightChild?: BSTNode<T>;
  constructor(public value: T, public parent?: BSTNode<T>) {}

  replaceNodeInParent(node?: BSTNode<T>) {
    if (!this.parent) return;

    if (node) {
      node.parent = this.parent;
    }

    if (this.parent.leftChild === this) {
      this.parent.leftChild = node;
      return;
    }

    if (this.parent.rightChild === this) {
      this.parent.rightChild = node;
      return;
    }
  }
}

export class BinarySearchTree<T> extends BinaryTree<T> {
  protected root_?: BSTNode<T>;
  constructor(private compareFunction_: (a: T, b: T) => number) {
    super();
  }

  add(value: T): void {
    this.insert_(this.root_, new BSTNode(value));
  }

  has(value: T): boolean {
    return this.search_(this.root_, value) !== undefined;
  }

  remove(value: T): boolean {
    const node = this.search_(this.root_, value);
    if (!node) {
      return false;
    }

    if (!node.leftChild && !node.rightChild) {
      node.replaceNodeInParent();
    } else if (node.leftChild && !node.rightChild) {
      node.replaceNodeInParent(node.leftChild);
    } else if (!node.leftChild && node.rightChild) {
      node.replaceNodeInParent(node.rightChild);
    } else {
      const successor = this.findMinNode_(node.rightChild) as BSTNode<T>;
      node.value = successor.value;
      successor.replaceNodeInParent();
    }
    
    this.size_--;
    return true;
  }

  [Symbol.iterator](): Iterator<T> {
    let currentNode: BSTNode<T> | undefined = this.root_;
    const stack: Stack<BSTNode<T>> = new Stack();
    return {
      next(): IteratorResult<T> {
        while (!stack.isEmpty() || currentNode) {
          if (currentNode) {
            stack.push(currentNode);
            currentNode = currentNode.leftChild;
          } else {
            currentNode = stack.pop() as BSTNode<T>;
            const result = { done: false, value: currentNode.value };
            currentNode = currentNode.rightChild;
            return result;
          }
        }
        return ({ done: true, value: null } as any) as IteratorResult<T>;
      }
    };
  }

  private findMinNode_(rootNode = this.root_): BSTNode<T> | undefined {
    if (!rootNode) return undefined;
    let currentNode = rootNode;
    while (currentNode.leftChild) {
      currentNode = currentNode.leftChild;
    }
    return currentNode;
  }

  private insert_(root: BSTNode<T> | undefined, newNode: BSTNode<T>): void {
    let currentNode: BSTNode<T> | undefined = root;
    let parentNode: BSTNode<T> | undefined;

    while (currentNode !== undefined) {
      parentNode = currentNode;
      const compareValue: number = this.compareFunction_(newNode.value, currentNode.value);
      if (compareValue > 0) {
        currentNode = currentNode.rightChild;
      } else if (compareValue < 0) {
        currentNode = currentNode.leftChild;
      } else {
        return;
      }
    }

    if (parentNode === undefined) this.root_ = newNode;
    else if (this.compareFunction_(newNode.value, parentNode.value) < 0) {
      parentNode.leftChild = newNode;
    } else {
      parentNode.rightChild = newNode;
    }

    newNode.parent = parentNode;
    this.size_++;
  }

  private search_(root: BSTNode<T> | undefined, value: T): BSTNode<T> | undefined {
    let currentNode = root;
    while (currentNode !== undefined) {
      const compareValue = this.compareFunction_(currentNode.value, value);
      if (compareValue === 0) {
        return currentNode;
      }
      if (compareValue > 0) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }
  }
}

/*
const bst = new BinarySearchTree<number>((a: number, b: number) => a - b);

bst.add(13);
bst.add(10);
bst.add(20);
bst.add(6);
bst.add(11);
bst.add(18);
bst.add(21);

bst.size; //?
bst.has(13) //?
bst.remove(13) //?
bst.has(13) //?
bst.size //?
bst
*/
