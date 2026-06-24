//42.44.45,41

function truncate(str, maxLength) {
    if (str.length < maxLength) return str
    return str.slice(0, maxLength) + "..."
}

console.log(truncate('The quick brown fox', 9));