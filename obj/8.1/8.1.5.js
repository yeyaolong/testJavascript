// "===" 符合预期的情况
console.log(true === 1); // false
console.log({} === {}) // false
console.log("2" === 2); // false

// 这些情况在不同的JavaScript引擎中表现不同，但仍然被认为相等
console.log(+0 === -0); // true
console.log(-0 === 0); // true
console.log(+0 === 0); // true

// 要确定NaN的相等性，必须使用极为讨厌的isNaN()
console.log(NaN === NaN); // false
console.log(isNaN(NaN)); // true

