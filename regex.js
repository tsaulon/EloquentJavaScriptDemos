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

//  Indicating number of occurences using {}
//  {4} represents 4 occurences
//  {1, 5} represents 1 to 5 occurences
//  {5, } represents 5 or more occurences
dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("1-30-2003 8:45"));


//  Grouping subexpressions
//  Using '*' or '+' on multiple elements at a time.
//  Parentheses is needed '()'
//  'i' avoid case sensitive evaluations.
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));

//  Matches and Groups
//  Regex.exec() returns null if no match is found
//  else returns an object with details where the match succeeded
let match = /\d+/.exec("one two 100");
console.log(match);         //  [ '100', index: 8, input: 'one two 100' ]
console.log(match.index);   //  8

//  Selecting part of expression surrounded by parentheses
let quotedText = /'([^']*)'/;
console.log(quotedText.exec(`she said 'hello'`));   //  [ '\'hello\'', 'hello', index: 9, input: 'she said \'hello\'' ]

//  When a position is not matched at all, its position 
//  in the output array will be undefined
//  Also, when a group is matched multiple times, only the last element
//  is captured.
console.log(/bad(ly)?/.exec("bad"));    //  [ 'bad', undefined, index: 0, input: 'bad' ]
console.log(/(\d)+/.exec("123"));       //  [ '123', '3', index: 0, input: '123' ]

//  The Date Class
//  Date class months start at 0 (December == 11);
console.log(new Date());    //  print current date
console.log(new Date(1994, 8, 7));  //  print defined date
console.log(new Date(1994, 8, 7, 12, 59, 59, 999)); //  print defined date and time

//  Representing UNIX timestamps
console.log(new Date(2013, 11, 19).getTime());  //  get UNIX timestamp
console.log(new Date(1387407600000));   //  get translated timestamp

//  Using regex with the Date class
function getDate(string){
    let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2018"));  //  2018-01-30T05:00:00.000Z

//  Word and string boundaries
//  Enforcing rules across span of whole string
//  '^' matches start of string (used outside of square brackets)
//  '$' matches end of string
//  Examples:   > /^\d+$/ matches a string consisting of one or more digits
//              > /^!/ matches any string that starts with the '!' symbol
//              > /x^/ does not match anything. There cannot be an x before beginning of string
console.log(/cat/.test("concatenate"));
console.log(/\bcat\b/.test("concatenate"));