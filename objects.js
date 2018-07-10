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

  //    EXERCISES

  /*
   * Write a class Vec that represents a vector in two-dimensional space. It takes x and y parameters (numbers), which it 
   * should save to properties of the same name.
   *
   * Give the Vec prototype two methods, plus and minus, that take another vector as a parameter and return a new vector that 
   * has the sum or difference of the two vectors’ (this and the parameter) x and y values.
   *
   * Add a getter property length to the prototype that computes the length of the vector—that is, the distance of the point (x, y)
   * from the origin (0, 0).
   */

class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    plus(vectorObj){
        return new Vector((this.x + vectorObj.x), (this.y + vectorObj.y));
    }

    minus(vectorObj){
        return new Vector((this.x + vectorObj.x), (this.y + vectorObj.y));
    }

    toString(){
        return `Vector { x: ${this.x}, y: ${this.y}}`;
    }

    length(){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}

let tyrone = new Vector(1, 2);
let ainsley = new Vector(3, 4);

console.log(tyrone.plus(ainsley).toString());
console.log(ainsley.length());

/*
 * The standard JavaScript environment provides another data structure called Set. Like an instance of Map, 
 * a set holds a collection of values. Unlike Map, it does not associate other values with those—it just tracks 
 * which values are part of the set. A value can be part of a set only once—adding it again doesn’t have any effect.
 *
 * Write a class called Group (since Set is already taken). Like Set, it has add, delete, and has methods. Its 
 * constructor creates an empty group, add adds a value to the group (but only if it isn’t already a member), 
 * delete removes its argument from the group (if it was a member), and has returns a Boolean value indicating 
 * whether its argument is a member of the group.
 *
 * Use the === operator, or something equivalent such as indexOf, to determine whether two values are the same.
 * 
 * Give the class a static from method that takes an iterable object as argument and creates a group that contains 
 * all the values produced by iterating over it.
 */

 class Group{
     constructor(group = []){
        this.group = group;         
     }

     [Symbol.iterator](){   //  Use the GroupIterator class to iterate through the Group class (Association relationship between classes)
         return new GroupIterator(this);
     }

     static from(iterObj){
         return new Group(iterObj);
     }

     add(x){
         try{

            let flag = this.has(x);

            if(flag !== false && !isNaN(flag)){
                throw new Error(`'${x}' already exists in the group!`);
            }
            else{
                this.group.push(x);
                console.log(`New member '${x}' has been added!`);
            }
         } catch(e){
             console.log(`Error: ${e.message}`);
         }
     }

     delete(x){
        try{

            let index = this.has(x);

            if(index === false){
                throw new Error(`'${x}' does not exist in the group!`);
            } else if(!isNaN(index)){
                this.group.splice(index, 1);
                console.log(`'${x}' has been deleted from the group!`);
            }

        } catch(e){
            console.log(`Error: ${e.message}`)
        }
     }

     // Checks for existence of parameter passed and returns the index if found or false if not.
     has(x){

        let flag = false;

        this.group.some((member, index) => {
            if(member === x){
                flag = index;
            }
        })

        return flag;
     }

     get members(){
         return this.group;
     }
 }

 let group = Group.from([1, 2, 3, 4]);

 console.log(group.members);    // → 1,2,3,4
 group.add(5);
 console.log(group.members);    // → 1,2,3,4,5
 group.delete(2);
 console.log(group.members);    // → 1,3,4,5
 console.log(group.has(2));     // → false
 console.log(group.has(3));     // → 1

 /*
  * Make the Group class from the previous exercise iterable. Refer to the section about the iterator interface 
  * earlier in the chapter if you aren’t clear on the exact form of the interface anymore.
  * 
  * If you used an array to represent the group’s members, don’t just return the iterator created by calling 
  * the Symbol.iterator method on the array. That would work, but it defeats the purpose of this exercise.
  * 
  * It is okay if your iterator behaves strangely when the group is modified during iteration.
  */

 class GroupIterator{
     constructor(group){
         this.index = 0;
         this.group = group.members;
     }

     next(){
         if(this.index === this.group.length - 1){
            return {done: true}
         }

         let value = this.group[this.index++];  //  can pass value as an object and iterate through each property

         return {value, done: false }
     }
 }

 for(let value of group){
    console.log(value);
 }
 
 /*
  * Earlier in the chapter I mentioned that an object’s hasOwnProperty can be used as a more robust alternative 
  * to the in operator when you want to ignore the prototype’s properties. But what if your map needs to include 
  * the word "hasOwnProperty"? You won’t be able to call that method anymore because the object’s own property 
  * hides the method value.
  * 
  * Can you think of a way to call hasOwnProperty on an object that has its own property by that name?
  */

  let map = {one: true, two: true, hasOwnProperty: true};

  console.log(Object.prototype.hasOwnProperty.call(map, "one"));

  