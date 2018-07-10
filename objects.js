//  ENCAPSULATION

//  JavaScript classes are constructor functions with a prototype property.
class Rabbit{

    constructor(type = "basic"){    //  add default values for cases where user does not define a value.
        this.type = type;   //  'this' points to instance object property and builds attributes.
    }

    speak(line){
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
}

let whiteRabbit = new Rabbit("white");
let blackRabbit = new Rabbit ("black");

//  Classes can be used in statements and expressions. It doesn't define a binding but just produces the constructor as a value.
let object = new class{ getWord(){return "hello"} };
console.log(object.getWord());
console.log();

//  Overriding derived properties...
Rabbit.prototype.teeth = "small";
console.log(blackRabbit.teeth);
blackRabbit.teeth = "long, sharp, and bloody";
console.log(blackRabbit.teeth);
console.log(whiteRabbit.teeth);
console.log(Rabbit.prototype.teeth);
console.log();

//  instantiating a new object with no arguments (Utilizing default parameters in constructor);
let defaultRabbit = new Rabbit();
defaultRabbit.speak("I'm basic.");
console.log();

//  Maps - A data structure that associates keys with other values.

let ages = {
    Tyrone: 23,
    Ainsley: 22,
    Atlas: 0.33
}

console.log(`Tyrone is ${ages["Tyrone"]}`);
console.log("Is Ainsley's name known?", "Ainsley" in ages);    //  check for property inside object
console.log("Is toString's age known?", "toString" in ages);    //  returns true but 'toString()' not explicitly defined in object.
console.log();

//  Risky when mapping plain objects as maps.
//  Solution create objects with no prototype.

console.log("toString" in Object.create(null)); //  safely used as a map

//  If you need a map whose keys can't easily be converted to strings; you cannot use an object as your map.

let newAges = new Map();

newAges.set("Boris", 39);
newAges.set("Liang", 22);
newAges.set("Julia", 62);

console.log(`Julia is ${newAges.get("Julia")}`);
console.log("Is Jack's age known?", newAges.has("Jack"));
console.log(newAges.has("toString"));
console.log();

//  If we absolutely need to use an object to map then we can use:
//      > Object.keys which returns only an object's own keys and not it's prototypes.
//      > Object.hasOwnProperty (like 'in' operator) check property and ignores prototype.

console.log({x: 1}.hasOwnProperty("x"));    //  checking instance of object
console.log({x: 1}.hasOwnProperty("toString")); //  attempting to check object prototype

//POLYMORPHISM

Rabbit.prototype.toString = function(){ //  overriding toString prototype property
    return `a ${this.type} rabbit`;
}

console.log(String(blackRabbit));

//SYMBOLS
//  similar to C++ enums

let sym = Symbol("name");
console.log(sym == Symbol("name"));

Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);

const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
    return `${this.length} cm of blue yarn.`;
}

console.log([1, 2].toString());
console.log([1, 2][toStringSymbol]());

let stringObject = {
    [toStringSymbol]() { return "a jute rope"; }
}

console.log(stringObject[toStringSymbol]());

//  Iterator Interface

let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}
console.log();


let myIterator = ["abc", 1, 2, "1234ab", false, true][Symbol.iterator]();
let flag = false;

while(!flag){
    let tmp = myIterator.next();
    console.log(tmp);
    if(tmp.done == true) { flag = true }
}

//  Iterating through a data structure

class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
      this.width = width;
      this.height = height;
      this.content = [];
  
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          this.content[y * width + x] = element(x, y);
        }
      }
    }
  
    get(x, y) {
      return this.content[y * this.width + x];
    }
    set(x, y, value) {
      this.content[y * this.width + x] = value;
    }
  }

  class MatrixIterator {
    constructor(matrix) {
      this.x = 0;
      this.y = 0;
      this.matrix = matrix;
    }
  
    next() {
      if (this.y == this.matrix.height) return {done: true};
  
      let value = {x: this.x,
                   y: this.y,
                   value: this.matrix.get(this.x, this.y)};
      this.x++;
      if (this.x == this.matrix.width) {
        this.x = 0;
        this.y++;
      }
      return {value, done: false};
    }
  }
  
  //    set the iterator to use our custom MatrixIterator
  Matrix.prototype[Symbol.iterator] = function() {
    return new MatrixIterator(this);
  };
  