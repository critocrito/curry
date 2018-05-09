import test from "ava";
import jsc from "jsverify";
import {check} from "ava-jsverify";
import {curry} from "lodash/fp";

import curries from "../src";

const trueStringArb = jsc.suchthat(jsc.asciinestring, s => /^[\w]*$/.exec(s));
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

allCurries.forEach((curryFn, i) => {
  const argsLength = i + 2;
  test(`curry function name should be curry${argsLength}`, t => {
    const expected = `curry${argsLength}`;
    // eslint-disable-next-line prefer-destructuring
    const name = curryFn.name;
    t.is(name, expected);
  });
});

allCurries.forEach((curryFn, i) => {
  const argsLength = i + 2;
  const arbs = [...Array(argsLength).keys()].reduce(
    memo => memo.concat("nat"),
    [],
  );
  const f = fixedArityFns[i];
  const f1 = curry(f);
  const f2 = curryFn("f", f);

  test(
    `equivalency of ${curryFn} to lodash's curry`,
    check(...arbs, (t, ...xs) => {
      // Turn the parameters into a list of arrays, e.g. [[1], [2, 3], [4], [5]]
      // This allows for random applications of arguments to the curried
      // functions.
      const args = xs.reduce((memo, j) => {
        if (memo.length === 0) return [[j]];
        const prev = memo.slice(0, -1);
        const [last] = memo.slice(-1);
        return jsc.random(0, 1) === 0
          ? prev.concat([last.concat(j)])
          : prev.concat([last]).concat([[j]]);
      }, []);

      const ret1 = args.reduce((fn, arg) => fn(...arg), f1);
      const ret2 = args.reduce((fn, arg) => fn(...arg), f2);

      t.is(ret1, ret2);
    }),
  );
});

// curry allows to write variadic functions, but to use curry to limit the
// length of the arguments.
allCurries.forEach((curryFn, i) => {
  const argsLength = i + 2;
  const arbs = [...Array(allCurries.length + 1).keys()].reduce(
    memo => memo.concat("nat"),
    [],
  );
  const sum = (...ys) => ys.reduce((memo, j) => memo + j, 0);
  const sumX = curryFn(`sum${argsLength}`, sum);

  test(
    `curry/variadics function pattern with ${curryFn.name}`,
    check(...arbs, (t, ...xs) => {
      const expected = sum(...xs.slice(0, argsLength));
      const result = sumX(...xs);
      t.is(result, expected);
    }),
  );
});

allCurries.forEach((curryFn, i) => {
  const argsLength = i + 2;
  const re = /^(.*)-([\d]*)$/;

  test(
    `function name is set to string-${argsLength}`,
    check(trueStringArb, (t, s) => {
      const f = curryFn(s, fixedArityFns[i]);
      const [, name, count] = re.exec(f.name);

      t.is(name, s);
      t.is(parseInt(count, 10), argsLength);
    }),
  );
});
