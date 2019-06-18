import { AbstractCollection } from './collection';

export class Stack<T> extends AbstractCollection<T> {
  /**
   * Looks at the object at the top of this Stack<T> without removing it from the Stack<T>.
   *
   * @returns {T} The object at the top of the Stack<T> or undefined if the Stack<T> is empty.
   * @memberof Stack
   */
  peek(): T | undefined {
    return this.elements_[this.elements_.length - 1];
  }

  /**
   * Removes and returns the object at the top of the Stack<T>.
   *
   * @returns {(T | undefined)} The object removed from the top of the Stack<T> or undefined if the
   * Stack<T> is empty.
   * @memberof Stack
   */
  pop(): T | undefined {
    return this.elements_.pop();
  }

  /**
   * Inserts an object at the top of the Stack<T>. Has the same effect as add(item).
   *
   * @param {T} item The object to push onto the Stack<T>.
   * @memberof Stack
   */
  push(item: T): void {
    this.elements_.push(item);
  }
}
