const SortedArrayMap = require('collections/sorted-array-map');
const SortedMap = require('collections/sorted-map');
const Collections = require('typescript-collections');


const map1 = SortedArrayMap()
const map5 = SortedMap()
const map2 = new Collections.BSTreeKV()
const map3 = new Map()

const values = []
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const numberOfItems = 1e5
for (let i = 0; i < numberOfItems; i++) {
  const random = getRandomInt(numberOfItems * 10);
  values.push([random, random]);
}


// SET
console.log('SET');

console.time('SortedArrayMap set')
for (let i = 0; i < numberOfItems; i++) {
  map1.set(values[i][0], values[i][1]);
}
console.timeEnd('SortedArrayMap set');

console.time('SortedMap set');
for (let i = 0; i < numberOfItems; i++) {
  map5.set(values[i][0], values[i][1]);
}
console.timeEnd('SortedMap set');

console.time('BSTreeKV set');
for (let i = 0; i < numberOfItems; i++) {
  map2.add(values[i][0], values[i][1]);
}
console.timeEnd('BSTreeKV set');

console.time('built-in Map set');
for (let i = 0; i < numberOfItems; i++) {
  map3.set(values[i][0], values[i][1]);
}
console.timeEnd('built-in Map set');


// GET
console.log('\nGET');

console.time('SortedArrayMap get');
for (let i = 0; i < numberOfItems; i++) {
  map1.get(values[i][0]);
}
console.timeEnd('SortedArrayMap get');

console.time('SortedMap get');
for (let i = 0; i < numberOfItems; i++) {
  map5.get(values[i][0]);
}
console.timeEnd('SortedMap get');

console.time('BSTreeKV get');
for (let i = 0; i < numberOfItems; i++) {
  map2.search(values[i][0]);
}
console.timeEnd('BSTreeKV get');

console.time('built-in Map get');
for (let i = 0; i < numberOfItems; i++) {
  map3.get(values[i][0]);
}
console.timeEnd('built-in Map get');


// MIN MAX
console.log('\nMIN MAX');

console.time('BSTreeKV min max')
map2.minimum() //?
map2.maximum() //?
console.timeEnd('BSTreeKV min max');

console.time('built-in Map min max')
let min = Infinity
for (const key of map3.keys()) {
  if (key < min) min = key
}

let max = -Infinity;
for (const key of map3.keys()) {
  if (key > max) max = key
}
console.timeEnd('built-in Map min max');


// Inorder traversal
console.log('\nINORDER TRAVERSAL');
console.time('BSTreeKV inorder')
map2.inorderTraversal((v) => {}) 
console.timeEnd('BSTreeKV inorder');

console.time('built-in Map inorder');
[...map3].sort().forEach(x => {})
console.timeEnd('built-in Map inorder');

