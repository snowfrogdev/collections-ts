const SortedArrayMap = require('collections/sorted-array-map');
const Collections = require('typescript-collections');


const map1 = SortedArrayMap()
const map2 = new Collections.BSTreeKV()
const map3 = new Map()

const values = []
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const numberOfItems = 1000000
for (let i = 0; i < numberOfItems; i++) {
  values.push([getRandomInt(100000), 'this is the value']);
}

const numberOfUniqueItems = values.filter((item, index, self) => index === self.indexOf(item));

// SET
console.time('map1 set')
for (let i = 0; i < numberOfItems; i++) {
  map1.set(values[i][0], values[i][1]);
}
console.timeEnd('map1 set')


console.time('map2 set');
for (let i = 0; i < numberOfItems; i++) {
  map2.add(values[i][0], values[i][1]);
}
console.timeEnd('map2 set');


console.time('map3 set');
for (let i = 0; i < numberOfItems; i++) {
  map3.set(values[i][0], values[i][1]);
}
console.timeEnd('map3 set');


// GET
console.time('map1 get');
for (let i = 0; i < numberOfItems; i++) {
  map1.get(values[i][0]);
}
console.timeEnd('map1 get');

console.time('map2 get');
for (let i = 0; i < numberOfItems; i++) {
  map2.search(values[i][0]);
}
console.timeEnd('map2 get');

console.time('map3 get');
for (let i = 0; i < numberOfItems; i++) {
  map3.get(values[i][0]);
}
console.timeEnd('map3 get');


