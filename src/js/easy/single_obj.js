// Turn [{id:'a', value:1}, {id:'b', value:2}] into {a:1, b:2}.

function array_obj_to_single_obj(arr) {
    return arr.reduce((acc, curr) => {
        acc[curr.id] = curr.value
        return acc
    }, {})
}

console.log(array_obj_to_single_obj([{ id: 'a', value: 1 }, { id: 'b', value: 2 }]));

// Key-agnostic variant: no knowledge of field names, takes first property as
// key and second as value (relies on property order; breaks on integer-like keys).
function array_obj_to_single_obj_agnostic(arr) {
    return arr.reduce((acc, curr) => {
        const [key, value] = Object.values(curr)
        acc[key] = value
        return acc
    }, {});
}

console.log(array_obj_to_single_obj_agnostic([{ id: 'a', value: 1 }, { id: 'b', value: 2 }]));
// console.log(array_obj_to_single_obj_agnostic([{ foo: 'x', bar: 9 }]));
