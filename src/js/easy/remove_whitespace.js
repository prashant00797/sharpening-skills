// Strip every space, tab, and newline from a string.

function strip(str) {
    return str.replace(/\s/g, '')
}

const result = strip(`                       sadas   asdasd 
    asdsasad
    
    
    
    
    sadsadsad--sadsadasd---asdasdas-        asdasd          asdasd        `)


console.log(result);
