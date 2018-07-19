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

function numberToString(n, base = 10) {
    let result = "", sign = "";

    if (n < 0) {
        sign = '-';
        n = -n;
    }

    do {
        result = String(n % base) + result;
        n /= base;
    } while (n > 0);

    return sign + result;
}

console.log(numberToString(13, 10));

/* Exercise 1
 * 
 * Say you have a function primitiveMultiply that in 20 percent of cases multiplies two numbers and 
 * in the other 80 percent of cases raises an exception of type MultiplicatorUnitFailure. Write a function 
 * that wraps this clunky function and just keeps trying until a call succeeds, after which it returns 
 * the result.
 */

class MultiplicatorUnitFailure extends Error { }

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

function reliableMultiply(a, b) {

    let tmp;

    while (true) {

        try {
            //  if evaluated...
            if (tmp = primitiveMultiply(a, b)) {
                return tmp;
            }
        } catch (e) {
            console.log("Attempting calculations... " + e.message);
        }
    }
}

console.log(reliableMultiply(8, 8)); // → 64

/* Exercise 2
 * 
 * Write a function called withBoxUnlocked that takes a function value as argument, 
 * unlocks the box, runs the function, and then ensures that the box is locked again 
 * before returning, regardless of whether the argument function returned normally 
 * or threw an exception.
 */

 // Object literal

const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    try{
        box.unlock();
        let content = box.content;
        console.log(content.length > 0 ? `Taking items: ${content}` : "Box is empty.");
        body();
        box.lock();

        return content;
    } catch(e){
        console.log(e.message);
    }
}

withBoxUnlocked(function () {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function () {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised:", e);
}
console.log(box.locked);
  // → true