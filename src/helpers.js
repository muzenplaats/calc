/* Helpers */

// Convert operators to functions
const add = (a, b) => a + b
const sub = (a, b) => a - b
const mul = (a, b) => a * b
const div = (a, b) => a / b

export const lcm = (a, b) => {}
export const hcf = (a, b) => {}


// Summation
export function sum() {
  const nums = Array.from(arguments)
  return nums.reduce(add, 0)
}

export function average() {
  const nums = Array.from(arguments)
  return nums.reduce(add, 0) / nums.length
}

// Polyfill
if (![].sum) Array.prototype.sum = function () { return this.reduce(add, 0) }

// (Simplified memoize only for a primitive argrument
// Ref: https://cdn.statically.io/gh/jashkenas/underscore/1.5.2/docs/underscore.html
function memoize(func) {
  const hash = {}
  return function (key) {
    if (!hash.hasOwnProperty(key)) hash[key] = func(key)
    return hash[key]
  }
}


// Factorial: num! = 1 * 2 * 3 * ... * num; 0! = 1
export const fact = memoize(function (num) {
  if (num <= 1) return 1  // base case
  return fact(num - 1) * num  // recursive case
})

// Iterative version of fact(num)
export const fact2 = num => {
  let value = 1
  for (let i = 1; i <= num; i++) value *= i
  return value
}

// Fibonacci number
export const fib = memoize(function (num) {
  if (num <= 1) return num  // base case
  return fib(num - 1) + fib(num - 2)  // recursive case
})

// begin : step : end
// begin : end
export const range = (begin, step, end) => {
  if (typeof end === 'undefined') { end = step; step = 1 }
  const result = []
  if (begin <= end && step > 0) {
    for (let num = begin; num <= end; num += step) result.push(num)
  } else if (begin > end && step < 0) {
    for (let num = begin; num >= end; num += step) result.push(num)
  }
  return result
}
// test
// console.log('range', range(1, 10), range(1, 2, 6), range(5, 5))
// console.log(range(1, -1, 5))
// console.log(range(5, 1), range(5, -1, 1))

// Complex not supported yet.
export const linspace = (x1, x2, n = 100) => {
  const result = []
  const step = (x2 - x1) / (n - 1)
  for (let i = 0; i < n; i++) result.push(x1 + i * step)
  return result
}
// test
// console.log('linspace', linspace(-5, 5), linspace(-5, 5, 7), (-5, 5, 0))



/* Test */

/*
console.log('sum:', sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10))
console.log('[].sum:', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sum())
console.log('fact:', fact(0), fact(1), fact(2), fact(3), fact(4), fact(5), fact(6))
console.log('fib:', fib(0), fib(1), fib(2), fib(3), fib(4), fib(5), fib(6), fib(7))
*/

/* Benchmark test */
/*
function beachmark(func, arg) {
  const tic = new Date().getTime()
  console.log('Result:', func(arg))
  const toc = new Date().getTime()
  console.log('Elapse time:', toc - tic, 'ms')
}

// (mac nodejs)
beachmark(fact, 100)  // 5.3 ms   9.33262154439441e+157
                      //  5.3 ms (memoized)
beachmark(fact, 101)  //  < 0 ms (memoized)
beachmark(fact2, 100)  // < 0 ms

beachmark(fib, 40)  // 1.24 s
beachmark(fib, 40)  // ms (memoized)
beachmark(fib, 5000)  // < 2 ms (memoized)
*/


