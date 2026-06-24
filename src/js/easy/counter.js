// Write a function that returns another function.
//  Each call to the returned function should return the next number: 1, 2, 3…

function createCounter() {
    let count = 0;
    return function () {
        count++;
        return count
    }
}
const next = createCounter()
console.log(next())
console.log(next())
console.log(next())