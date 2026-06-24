// Given an array of numbers and a target,
// return the indices of the two numbers that add up to the target.

function twoSum(arr, target) {
    const seen = new Map();
    for (let i = 0; i < arr.length; i++) {
        const need = target - arr[i];
        if (seen.has(need)) return [seen.get(need), i]
        seen.set(arr[i], i)
    }
}


console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]