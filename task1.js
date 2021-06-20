function add(a, b) {
    // console.log(b)
    return a + b
}

function defaultArguments(operator, value) {
    var b = value.b // b=3 //a=2
    var a = value.a

    return function (...v) {

        //v == 1 (v1, value.b)
        if (v.length == 1) {

            return operator(v[0], b) // add3(10) ->> call function(10,b) again with default b value
        }

        //v > 1 add(v1,v2)
        if (v.length > 1) {
            if (v[0] == undefined) { // add3(undefined,10)
                return operator(a, v[1])
            }

            return operator(v[0], v[1])
        }

        //v = 0 , add()
        if (v.length == 0) {
            // two condition - 1. add2() call function once : if either default a or b value is undefined , then add() will return undefined 
            //               - 2. add3() call function twice : if empty argument, then the default value (a,b) will be used to call add(a,b) , then add() will return a sum of a+b
            return operator(a, b)
        }
    }
}
const add2 = defaultArguments(add, { b: 9 })

console.assert(add2(10) === 19)
console.assert(add2(10, 7) === 17)
console.assert(isNaN(add2()));

const add3 = defaultArguments(add2, { b: 3, a: 2 });
console.assert(add3(10) === 13);
console.assert(add3() === 5);  // 3 + 2 = 5  - both value zero 
console.assert(add3(undefined, 10) === 12);

const add4 = defaultArguments(add, { c: 3 }); // doesn't do anything, since c isn't an argument
console.assert(isNaN(add4(10)));
console.assert(add4(10, 10) === 20);



