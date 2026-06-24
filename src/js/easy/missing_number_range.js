function missingNumsInRange(arr) {
    const n = arr.length;
    const sum = (n * (n + 1)) / 2;
    const acctualSum = arr.reduce((acc, curr) => acc + curr, 0)
    return sum - acctualSum
}

console.log(missingNumsInRange([3, 0, 1]));
