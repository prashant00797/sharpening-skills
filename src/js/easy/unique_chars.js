// Return true if no character repeats in the string.

function unique_char_str(str) {
    const unique_set = new Set(str)
    return unique_set.size === str.length

}

console.log(unique_char_str('abcde'));
