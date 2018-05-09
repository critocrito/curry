# `curry`

Curry functions with a name.

## Synopsis

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![npm version](https://img.shields.io/npm/v/@critocrito/curry.svg?style=flat)](https://www.npmjs.com/package/@critocrito/curry) [![Build Status](https://travis-ci.org/critocrito/curry.svg?branch=master)](https://travis-ci.org/critocrito/curry) [![Coverage Status](https://coveralls.io/repos/github/critocrito/curry/badge.svg)](https://coveralls.io/github/critocrito/curry)

These are curry functions that also set the name of the curried
functions. This improves the usability of using those curried functions in the
REPL.

## Installation

```sh
npm install @critocrito/curry
```

## Usage

```js
import {curry2} from "@critocrito/curry";

const sum2 = curry2("sum2", (a, b) => a + b);
console.log(sum2); // [Function: sum2-2]
console.log(sum2(1)); // [Function: sum2-1]
console.log(sum2(1, 1)); // 2
console.log(sum2(1)(1)); // 2
```

## API

The module exports curry functions for an arity up to 10.

- `curry2`
- `curry3`
- `curry4`
- `curry5`
- `curry6`
- `curry7`
- `curry8`
- `curry9`
- `curry10`

```js
import {curry5, curry10} from "@critocrito/curry";

const sum = xs => xs.reduce((memo, i) => memo + i, 0);

const sum5 = curry5("sum5", sum);
const sum10 = curry10("sum10", sum);

sum5(1, 2, 3, 4, 5); // 15
sum10(1, 2, 3)(4, 5)(6, 7, 8, 9, 10); // 45
```

## Performance

When applying all arguments to the curried function at once,
e.g. `curriedSum(1, 2, 3, 4, 5)` the implementation of
[Lodash](https://lodash.com/) is faster.

```
lodash full application with 2 arguments x 3,713,955 ops/sec ±2.23% (82 runs sampled)
this curry full application with 2 arguments x 1,246,646 ops/sec ±2.42% (79 runs sampled)
lodash full application with 3 arguments x 2,635,956 ops/sec ±1.84% (81 runs sampled)
this curry full application with 3 arguments x 1,141,811 ops/sec ±2.34% (82 runs sampled)
lodash full application with 4 arguments x 2,290,952 ops/sec ±2.61% (83 runs sampled)
this curry full application with 4 arguments x 1,037,962 ops/sec ±2.84% (84 runs sampled)
lodash full application with 5 arguments x 2,015,086 ops/sec ±1.91% (81 runs sampled)
this curry full application with 5 arguments x 946,800 ops/sec ±2.24% (85 runs sampled)
lodash full application with 6 arguments x 1,800,830 ops/sec ±2.30% (83 runs sampled)
this curry full application with 6 arguments x 896,425 ops/sec ±1.84% (85 runs sampled)
lodash full application with 7 arguments x 1,670,538 ops/sec ±2.36% (83 runs sampled)
this curry full application with 7 arguments x 818,076 ops/sec ±2.06% (84 runs sampled)
lodash full application with 8 arguments x 1,525,016 ops/sec ±3.06% (83 runs sampled)
this curry full application with 8 arguments x 773,187 ops/sec ±1.54% (85 runs sampled)
lodash full application with 9 arguments x 1,390,510 ops/sec ±2.88% (78 runs sampled)
this curry full application with 9 arguments x 731,658 ops/sec ±1.77% (85 runs sampled)
lodash full application with 10 arguments x 1,376,320 ops/sec ±2.33% (84 runs sampled)
this curry full application with 10 arguments x 693,727 ops/sec ±2.54% (83 runs sampled)
```

But when actually applying arguments incrementally (which is the point of a
curried function), e.g. `curriedSum(1)(2)(3)(4)(5)`, this implementation
performs better than Lodash.

```
lodash piecemeal application with 2 arguments x 269,906 ops/sec ±1.22% (84 runs sampled)
this curry piecemeal application with 2 arguments x 293,983 ops/sec ±5.06% (77 runs sampled)
lodash piecemeal application with 3 arguments x 141,272 ops/sec ±1.32% (86 runs sampled)
this curry piecemeal application with 3 arguments x 172,166 ops/sec ±4.27% (80 runs sampled)
lodash piecemeal application with 4 arguments x 93,988 ops/sec ±2.19% (83 runs sampled)
this curry piecemeal application with 4 arguments x 118,644 ops/sec ±4.62% (79 runs sampled)
lodash piecemeal application with 5 arguments x 69,943 ops/sec ±5.81% (88 runs sampled)
this curry piecemeal application with 5 arguments x 89,667 ops/sec ±4.71% (77 runs sampled)
lodash piecemeal application with 6 arguments x 57,978 ops/sec ±0.99% (86 runs sampled)
this curry piecemeal application with 6 arguments x 72,254 ops/sec ±4.49% (77 runs sampled)
lodash piecemeal application with 7 arguments x 47,702 ops/sec ±1.32% (83 runs sampled)
this curry piecemeal application with 7 arguments x 61,147 ops/sec ±4.31% (79 runs sampled)
lodash piecemeal application with 8 arguments x 40,564 ops/sec ±2.14% (90 runs sampled)
this curry piecemeal application with 8 arguments x 52,434 ops/sec ±4.35% (82 runs sampled)
lodash piecemeal application with 9 arguments x 34,938 ops/sec ±3.82% (85 runs sampled)
this curry piecemeal application with 9 arguments x 45,527 ops/sec ±4.91% (80 runs sampled)
lodash piecemeal application with 10 arguments x 30,946 ops/sec ±1.21% (85 runs sampled)
this curry piecemeal application with 10 arguments x 40,001 ops/sec ±4.57% (79 runs sampled)
```

To run the benchmarks locally execute in the project repository:

```sh
npm install
npm run benchmark
```

## License

[GPL 3.0 licensed](LICENSE)
