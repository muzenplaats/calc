import Calculator from './Calculator'


const src = '1.2 + 2 * 3'  // 7.2
console.log(new Calculator(src).env)

console.log(new Calculator('2^3').env)  // 8
console.log(new Calculator('(1 + 2) * 3').env)  // 9
console.log(new Calculator(' 2 ^ 2 ^ (2 + 3)').env)  // 1024

console.log(new Calculator(`
  // Assignment test
  a = 1
  b = a + 2  // 3
  c = -b  // -3
  d = +b  // 3
  e = -(a + 1)  // -2
  f = a + b * 3  // 10
  2 * ans  // 20
`).env)

console.log(new Calculator(`
  a = i1 + i-2  // i-1
  b = r2/3 + r-3/4  // 8/12 - 9/12 = -1/12
  c = r2/3 * r-3/4  // r-1/2
  d = c1+2i + c2+5i
  e = c1+2i * c1-2i  // c5+0i
`).env)

console.log(new Calculator(`
  aa = sin(PI / i2) * 3
  bb = -random()
  cc = pow(r2/1, d3.0)
  avg  = average(1, 2, 3, 4, 5, 6)  // 21/6 = 7/2 = 3.5
  sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
`).env)

console.log('2022-10-20', new Calculator(`
  id = 'A123'
  id = id + '-456' + "-789"
  a = 1 cm + 2 m
  b = 1 m + 2 cm
  t1 = 5 sec + 1 min
  tex = $test \\$ latex$
`).env)

console.log('test blockquote', new Calculator('```test-1\n\something\n```').env)

console.log('vector creation', new Calculator(`
  // The content of the vector type is not defined yet.
  v1 = 1 : 10
  v2 = 1 + 2 : 3 : 7 * 9
  v3 = 0 : -2 : -10
  v4 = linspace(-5, 5)
  v5 = linspace(-5, 5, 7)
`).env)

console.log('test mixed type', new Calculator(`
  a = r1/3 + i2  // r7/3
  b = i2 + r1/3
  c = i2 + c1+2i
`).env)
