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

The module exports curry functions for up to an arity of 10.

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

## License

[GPL 3.0 licensed](LICENSE)
