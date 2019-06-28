import * as Collections from 'typescript-collections';
import { BinarySearchTree } from './binary-search-tree';

const compareFunc = (a: number, b: number): number => {
  /*
  let count = 100
  while(count > 0) {
    count--
  }
  */
  return a - b;
}

const basaratbst = new Collections.BSTree(compareFunc);
const mybst = new BinarySearchTree(compareFunc);

const randomInts = [];

const numberOfItems = 1e6;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

for (let i = 0; i < numberOfItems; i++) {
  randomInts.push(getRandomInt(numberOfItems * 2));
}

const sortedInts = [...randomInts].sort();

console.time('basaratbst random add');
for (const item of randomInts) {
  basaratbst.add(item);
}
console.timeEnd('basaratbst random add');

console.time('mybst random add');
for (const item of randomInts) {
  mybst.add(item);
}
console.timeEnd('mybst random add');


/*
console.time('basaratbst random contains');
for (const item of randomInts) {
  basaratbst.contains(item);
}
console.timeEnd('basaratbst random contains');

console.time('mybst random has');
for (const item of randomInts) {
  mybst.has(item);
}
console.timeEnd('mybst random has');


console.time('basaratbst random remove');
for (const item of randomInts) {
  basaratbst.remove(item);
}
console.timeEnd('basaratbst random remove');

console.time('mybst random remove');
for (const item of randomInts) {
  mybst.remove(item);
}
console.timeEnd('mybst random remove');
*/
