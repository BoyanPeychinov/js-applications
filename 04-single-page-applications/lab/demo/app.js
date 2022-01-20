import { sumNumber as sum, numberProduct } from "./module";
import { myArr } from './data.js';
import Person, { compareTo } from './Person.js';

console.log(sum(3, 5));
console.log(numberProduct(3, 5));
console.log(myArr);
myArr.push(4);
console.log(myArr);
