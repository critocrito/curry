/* eslint-disable no-console */
import Benchmark from "benchmark";
import {curry} from "lodash/fp";

import curries from "./src";

const allCurries = Object.keys(curries)
  // Make sure that we sort the array of curry functions by their arity.
  .sort((a, b) => {
    const re = /([\d]*)$/;
    const [, numA] = re.exec(a);
    const [, numB] = re.exec(b);
    return parseInt(numA, 10) < parseInt(numB, 10) ? -1 : 1;
  })
  .map(k => curries[k]);
const fixedArityFns = [
  (a, b) => a + b,
  (a, b, c) => a + b + c,
  (a, b, c, d) => a + b + c + d,
  (a, b, c, d, e) => a + b + c + d + e,
  (a, b, c, d, e, f) => a + b + c + d + e + f,
  (a, b, c, d, e, f, g) => a + b + c + d + e + f + g,
  (a, b, c, d, e, f, g, h) => a + b + c + d + e + f + g + h,
  (a, b, c, d, e, f, g, h, i) => a + b + c + d + e + f + g + h + i,
  (a, b, c, d, e, f, g, h, i, j) => a + b + c + d + e + f + g + h + i + j,
];

const values = [1, 23, 42, 67, 99, 112, 250, 667, 888, 1001];

// Test performance when applying all arguments at once, e.g. sum3(1, 2, 3).
const suite = allCurries.reduce((memo, curryFn, i) => {
  const argsLength = i + 2;
  const sum = fixedArityFns[i];
  const args = values.slice(0, argsLength);
  const loCurry = curry(sum);
  const thisCurry = curryFn("sum", sum);

  return memo
    .add(`lodash full application with ${argsLength} arguments`, () =>
      loCurry(...args),
    )
    .add(`curry full application with ${argsLength} arguments`, () =>
      thisCurry(...args),
    );
}, new Benchmark.Suite());

suite
  .on("cycle", ev => console.log(String(ev.target)))
  .on("error", e => console.error(e.target.error))
  .run();

// Test performance when applying arguments in multiple steps, e.g. sum3(1)(2)(3).
const suite2 = allCurries.reduce((memo, curryFn, i) => {
  const argsLength = i + 2;
  const sum = fixedArityFns[i];
  const args = values.slice(0, argsLength);
  const loCurry = curry(sum);
  const thisCurry = curryFn("sum", sum);

  return memo
    .add(`lodash piecemeal application with ${argsLength} arguments`, () =>
      args.reduce((acc, j) => acc(j), loCurry),
    )
    .add(`curry piecemeal application with ${argsLength} arguments`, () =>
      args.reduce((acc, j) => acc(j), thisCurry),
    );
}, new Benchmark.Suite());

suite2
  .on("cycle", ev => console.log(String(ev.target)))
  .on("error", e => console.error(e.target.error))
  .run();
