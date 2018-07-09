/*
 * Use the reduce method in combination with the concat method to “flatten” an array of arrays 
 * into a single array that has all the elements of the original arrays.
 */

//Flatten the array using reduce and concat
let arrays = [[1, 2, 3], [4, 5], [6]];
//similar to accumulate function in C++
console.log(arrays.reduce((acc, curr) => { return acc.concat(curr) }));

/*
 * Write a higher-order function loop that provides something like a for loop statement. 
 * It takes a value, a test function, an update function, and a body function. Each iteration,
 * it first runs the test function on the current loop value and stops if that returns false. 
 * Then it calls the body function, giving it the current value. Finally, it calls the update 
 * function to create a new value and starts from the beginning.
 */

function loop(start, testFunc, updateFunc, bodyFunc) {

    for (let i = start; testFunc(i); i = updateFunc(i)) {
        bodyFunc(i);
    }
}

loop(3, n => n > 0, n => n - 1, console.log);

/*
 * Analogous to the some method, arrays also have an every method. This one returns true when 
 * the given function returns true for every element in the array. In a way, some is a version 
 * of the || operator that acts on arrays, and every is like the && operator.
 *
 * Implement every as a function that takes an array and a predicate function as parameters. 
 * Write two versions, one using a loop and one using the some method.
 */

function every(array, test) {
    var flag = true;

    try {
        array.forEach(x => {
            if (!test(x)) {
                throw false;
            }
        })
    } catch(e){
        flag = e;
    }
    
    return flag;
}

function everyy(array, test){
    return !array.some(x => !test(x));
}


console.log(everyy([1, 3, 5], n => n < 10));     // → true
console.log(everyy([2, 4, 16], n => n < 10));    // → false
console.log(everyy([], n => n < 10));            // → true