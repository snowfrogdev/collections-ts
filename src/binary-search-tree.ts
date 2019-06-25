import { BinaryTree, Node } from "./binary-tree";

interface Comparable<T> {
  isEqualTo(item: T): boolean;
  isGreaterThan(item: T): boolean;
  isLowerThan(item: T): boolean;
}

class BSTNode<T> extends Node<T> implements Comparable<Node<T>> {
  constructor(value: T, private compareFunction_: (a: T, b: T) => number) {
    super(value)
  }

  isEqualTo(node: Node<T>): boolean {
    return this.compareFunction_(this.value, node.value) === 0
  }

  isGreaterThan(node: Node<T>): boolean {
    return this.compareFunction_(this.value, node.value) > 0
  }

  isLowerThan(node: Node<T>): boolean {
    return this.compareFunction_(this.value, node.value) < 0
  }
}

export class BinarySearchTree<T> extends BinaryTree<T> {
  constructor(private compareFunction_: (a: T, b: T) => number) {
    super()
  }
  add(value: T) {
    this.root_ = this.insert_(this.root_ as BSTNode<T> | undefined, new BSTNode(value, this.compareFunction_))
  }

  private insert_(root: BSTNode<T> | undefined, newNode: BSTNode<T>): Node<T> {
    /* If the tree is empty, return a new node */
    if (!root) {
      root = newNode;
      return root;
    }

    /* Otherwise, recur down the tree */
    if (newNode.isLowerThan(root))
      root.leftChild = this.insert_(root.leftChild as BSTNode<T>, newNode);
    else if (newNode.isGreaterThan(root))
      root.rightChild = this.insert_(root.rightChild as BSTNode<T>, newNode);

    /* return the (unchanged) node pointer */
    return root;
  }
}