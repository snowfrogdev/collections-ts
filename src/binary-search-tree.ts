import { BinaryTree, Node } from './binary-tree';

interface Comparable<T> {
  isEqualTo(item: T): boolean;
  isGreaterThan(item: T): boolean;
  isLowerThan(item: T): boolean;
}

class BSTNode<T> implements Node<T>, Comparable<Node<T>> {
  leftChild?: BSTNode<T>;
  rightChild?: BSTNode<T>;
  constructor(
    public value: T,
    private compareFunction_: (a: T, b: T) => number,
    public parent?: BSTNode<T>
  ) {}

  isEqualTo(node: Node<T>): boolean {
    return this.compareFunction_(this.value, node.value) === 0;
  }

  isGreaterThan(node: Node<T>): boolean {
    return this.compareFunction_(this.value, node.value) > 0;
  }

  isLowerThan(node: Node<T>): boolean {
    return this.compareFunction_(this.value, node.value) < 0;
  }

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

  add(value: T) {
    this.root_ = this.insert_(this.root_, new BSTNode(value, this.compareFunction_));
    this.size_++;
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
      this.size_--;
      return true;
    }

    if (node.leftChild && !node.rightChild) {
      node.replaceNodeInParent(node.leftChild);
      this.size_--;
      return true;
    }

    if (!node.leftChild && node.rightChild) {
      node.replaceNodeInParent(node.rightChild);
      this.size_--;
      return true;
    }

    const successor = this.findMinNode_(node.rightChild) as BSTNode<T>;
    node.value = successor.value
    successor.replaceNodeInParent()
    this.size_--;
    return true
  }

  [Symbol.iterator](): Iterator<T> {
    return [].values();
  }

  private findMinNode_(rootNode = this.root_): BSTNode<T> | undefined {
    if (!rootNode) return undefined;
    let currentNode = rootNode;
    while (currentNode.leftChild) {
      currentNode = currentNode.leftChild;
    }
    return currentNode;
  }

  private insert_(root: BSTNode<T> | undefined, newNode: BSTNode<T>): BSTNode<T> {
    /* If the tree is empty, return a new node */
    if (!root) {
      root = newNode;
      return root;
    }

    /* Otherwise, recur down the tree */
    if (newNode.isLowerThan(root)) {
      newNode.parent = root;
      root.leftChild = this.insert_(root.leftChild, newNode);
    } else if (newNode.isGreaterThan(root)) {
      newNode.parent = root;
      root.rightChild = this.insert_(root.rightChild, newNode);
    }

    /* return the (unchanged) node pointer */
    return root;
  }

  private search_(root: BSTNode<T> | undefined, value: T): BSTNode<T> | undefined {
    if (!root) return;

    if (this.compareFunction_(root.value, value) === 0) return root;

    if (this.compareFunction_(root.value, value) > 0) return this.search_(root.leftChild, value);

    return this.search_(root.rightChild, value);
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
bst.remove(13)

bst.size; //?
bst.inOrder(console.log)
*/