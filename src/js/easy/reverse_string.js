// Return a new string with the characters of the input in reverse order.
// Try it without the built-in trick too (two-pointer).

//in-built-funtion
function reverseStirng(str) {
    return str.split("").reverse().join("")
}

const result1 = reverseStirng("hello")

console.log(result1);

//without using built-in-function
function reverseStringLoop(str) {
    let reversedStr = ''
    for (let i = str.length - 1; i >= 0; i--) {
        reversedStr += str[i];
    }
    return reversedStr
}
const result2 = reverseStringLoop("hello")
console.log(result2);
