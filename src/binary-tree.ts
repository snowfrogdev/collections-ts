import { Collection } from './collection';

class Node<T> {
  private left_?: Node<T>;
  private right_?: Node<T>;
  constructor(private data_: T) {}
}

class BinaryTree<T> implements Collection<T> {
  private root_?: Node<T>

  constructor(iterable?: Iterable<T>) {}
}
