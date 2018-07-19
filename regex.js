//  both declarations represent same thing
let re1 = new RegExp("abc");
let re2 = /abc/;

//  Testing for matches
//  returns true if abc occurs anywhere in the string.
console.log(/abc/.test("abcde"));   //  true
console.log(/abc/.test("abxde"));   //  false

//  Testing sets of characters
//  '-' inside square brackets indicates a range of characters
console.log(/[0123456789]/.test("in 1992"));    //  true
console.log(/[0-9]/.test("in 1992"));   //  true

//  Testing for valid date and time (Rough example)
//  Indicates 'any digit character'
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-30-2003 15:20"));     //  true
console.log(dateTime.test("30-jan-2003 15:20"));    //  false

//  Testing binary strings
//  caret check if there are values inside the square brackets that aren't 0 or 1.
//  (Inverse expression)
let notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));    //  false
console.log(notBinary.test("1100100010200110"));    //  true


//  Repetitions in a pattern
//  '+' indicates potential for element to be repeated more than once.
//  Matching one or more characters.
//  '*' similar to '+' but allows pattern match of zero or more times. 

console.log(/'\d+'/.test("'123'")); //  true
console.log(/'\d+'/.test("''"));    //  false
console.log(/'\d*'/.test("'123'")); //  true
console.log(/'\d*'/.test("''"));    //  true

//  '?' makes a pattern optional (occurence of 0 or 1 times.)
//  this example checks for the 'u' character but also passes the test
//  if it doesn't exist.

let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));    //  true;
console.log(neighbor.test("neighbor")); //  true;