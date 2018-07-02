//CLI Input: node triangleLooping.js "#" 3

const arg = process.argv.slice(2);


var symbol = arg[0];
var loops = arg[1];
var str = "";

function forLoop(iter, sym){
    for(let i = 0; i < loops; i++){
        str += symbol;
        console.log(str);
    }

    str = "";   //Reset str
}

function recursive(iter, sym){
    if(iter != 0){
        str += sym;
        console.log(str);
        return recursive((iter - 1), sym);
    }

    str = "";   //Reset str
}

console.time(recursive);
recursive(loops, symbol);
console.timeEnd(recursive);

console.time(forLoop);
forLoop(loops, symbol);
console.timeEnd(forLoop);