function longestWord(str) {
    let strArr = str.split(" ")
    let maxLength = strArr[0].length
    let maxWord = strArr[0]
    for (let i = 1; i < strArr.length; i++) {
        if (strArr[i].length > maxLength) {
            maxLength = strArr[i].length
            maxWord = strArr[i]
        }
    }
    return maxWord
}

function longestWord2(str) {
    return str.split(' ').reduce((acc, curr) => curr.length > acc.length ? curr : acc, '')
}

console.log(longestWord("how r hello uu"));
console.log(longestWord2("the quick brown fox"));
