var foo = {
    a: Math.floor(Math.random() * 10),
    b: Math.floor(Math.random() * 10)
}

console.log("b" in foo);    //  checks if object contains property ('in' operator)
                            //  Output: true

//return sum of a range
function sumRange(low, high, step = 1){ //  set default parameter

    var range = [];


    for(let i = low; (step > 0) ? i <= high : i >= high; i += step){
        range.push(i);
    }

    console.log(range); 

    //  accumulate the array
    return range.reduce((acc, curr) => {
        return acc + curr;
    });
}

console.time(sumRange);
console.log(`sumRange() output: ${sumRange(10, 2, -1)}`);   //Output: [ 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
console.timeEnd(sumRange);

//  custom string reversal
function myReverse(str){

    var reverse = [];

    str.split("").forEach(x => {
        
        reverse.unshift(x);
    });

    return reverse.join("");

}

console.time(myReverse);
console.log(`myReverse() output: ${myReverse("Za Warudo!")}`);  //Output: '!oduraW aZ'
console.timeEnd(myReverse);


var list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: null
        }
    }
}

//  recursively build a list using an array
function arrayToList(arr, list = {value: 0, next: null}){
    if(arr.length > 0){
        var tmp = arr.shift();
        
        return arrayToList(arr, {
            value: tmp,
            next: (arr.length != 0) ? arrayToList(arr, list) : null //while more elements pass current object as 'next'; else 'null'
        });
    } else{
        return list;
    }
}

//  recursively build an array using a list
function listToArray(list, arr = []){

    arr.push(list.value);

    if(list.next != null){
        return listToArray(list.next, arr);
    } else{
        return arr;
    }
    
}

console.time(listToArray);
console.log(listToArray(list)); //Output: [ 1, 2, 3 ]
console.timeEnd(listToArray);

console.time(listToArray);
console.log(arrayToList(listToArray(list)));    //Output: { value: 1, next: { value: 2, next: { value: 3, next: null } } }
console.timeEnd(listToArray);