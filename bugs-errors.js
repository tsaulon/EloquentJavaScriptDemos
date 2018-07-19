"use strict"; //  enabling strict mode

function canYouSpotTheProblem() {
    try {
        for (i = 0; i < 10; i++) {
            console.log("Happy happy.");
        }
    } catch (e) {
        console.log("Error 1: " + e.message);
    }

}

canYouSpotTheProblem();

try {
    function Person(name) { this.name = name; }
    let ainsley = Person("Ainsley");    // error here.
    console.log(name);
} catch (e) {
    console.log("Error 2: " + e.message);
}

//  awkward implementation of writing tests
function test(label, body) {
    if (!body()) console.log(`Error 3 Failed: ${label}`);
}

test("Convert Latin text to uppercase", () => {
    return "hello".toUpperCase() == "HELLO";
})

test("Convert Greek text to uppercase", () => {
    return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
})

test("don't convert case-less characters", () => {
    return "مرحبا".toUpperCase() == "مرحبا";
});