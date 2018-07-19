"use strict"; //  enabling strict mode

function canYouSpotTheProblem(){
    try{
        for(i = 0; i < 10; i++){
            console.log("Happy happy.");
        }
    } catch(e){
        console.log("Error 1: " + e.message);
    }
    
}

canYouSpotTheProblem();

try{
    function Person(name) { this.name = name;}
    let ainsley = Person("Ainsley");    // error here.
    console.log(name);
} catch(e){
    console.log("Error 2: " + e.message);
}