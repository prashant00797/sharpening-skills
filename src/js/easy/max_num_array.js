// Return the maximum value in an array of numbers. Handle the empty-array case.
// Try it without Math.max too.


function max_num_array(arr) {
    if (arr.length === 0) return null;
    let max = arr[0]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    return max
}

console.log(max_num_array([1, 2, 3, 4, 5, 6]));
