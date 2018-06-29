//check for lowest number comparison
var getMin = (a, b) => {
    return a < b ? a : b;
}

//check for isEven() recursively
var recursive_isEven = (num) => {
    try{
        //prevent values that invoke maximum call stack
        if(num > 0){
            if(num === 0) return true
            else if(num === 1) return false
            else return recursive_isEven(num - 2);
        } else{
            throw new Error("recursive_isEven(...) needs a positive number...");
        }

    } catch(e){
        console.log(e.message);
    }

}

//count characters in string
var countBeans = (str, flag) => {

    let count = 0;

    str.split("").forEach(x => {
        if(x === flag)
            count++;
    })

    return count;
}

console.time(getMin);
console.log(`getMin() output: ${getMin(10, 15)}`);
console.timeEnd(getMin);

console.time(recursive_isEven);
console.log(`recursive_isEven() output: ${recursive_isEven(-1)}`);
console.timeEnd(recursive_isEven);

console.time(countBeans);
console.log(`countBeans() output: ${countBeans("But Babies Babble", "B")}`);
console.timeEnd(countBeans);