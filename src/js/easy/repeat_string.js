// Return a string repeated n times: ('ab', 3) → 'ababab'.

function repeatString(str, n) {
    return str.repeat(n)
}

console.log(repeatString("ab", 4));


function repeatStringRaw(s, n) {
    let out = ''
    for (let i = 0; i < n; i++) out += s
    return out
}

console.log(repeatStringRaw("ab", 4));
