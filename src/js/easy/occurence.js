// Given an array, return an object mapping each element to how many times it appears.


function occurence(arr) {
    return arr.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1
        return acc
    }, {})
}

console.log(occurence(['a', 'b', 'a', 'c', 'b', 'a']))