import { AbstractCollection } from './collection';

export class Queue<T> extends AbstractCollection<T> {
  /**
   * Removes and returns the object at the beginning of the Queue<T>.
   *
   * @returns {(T | undefined)} The object that is removed from the beginning of the Queue<T> or
   * undefined if this queue is empty.
   * @memberof Queue
   */
  dequeue(): T | undefined {
    return this.elements_.shift();
  }

  /**
   * Adds an object to the end of the Queue<T>.
   *
   * @param {T} item The object to add to the Queue<T>.
   * @memberof Queue
   */
  add(item: T): void {
    this.elements_.push(item);
  }

  /**
   * Adds an object to the end of the Queue<T>. Has the same effect as add(item).
   *
   * @param {T} item The object to add to the Queue<T>.
   * @memberof Queue
   */
  enqueue(item: T): void {
    this.elements_.push(item);
  }

  /**
   * Returns the object at the beginning of the Queue<T> without removing it.
   *
   * @returns {(T | undefined)} The object at the beginning of the Queue<T> or undefined if the
   * Queue<T> is empty.
   * @memberof Queue
   */
  peek(): T | undefined {
    return this.elements_[0];
  }
}
