// @flow
import namefn from "@critocrito/namefn";

type CurriedRet = mixed | (() => mixed);

export const ncurry = (n: number) => {
  const localCurry = (
    name: string,
    f: () => mixed,
    ...args: $ReadOnlyArray<mixed>
  ): CurriedRet => {
    const g = (...largs: $ReadOnlyArray<mixed>): CurriedRet => {
      const rest = args.concat(largs);

      if (rest.length < n) return localCurry(name, f, ...rest);
      return f(...rest.slice(0, n));
    };
    return namefn(`${name}-${n - args.length}`, g);
  };

  return namefn(`curry${n}`, localCurry);
};

export const curry2 = ncurry(2);
export const curry3 = ncurry(3);
export const curry4 = ncurry(4);
export const curry5 = ncurry(5);
export const curry6 = ncurry(6);
export const curry7 = ncurry(7);
export const curry8 = ncurry(8);
export const curry9 = ncurry(9);
export const curry10 = ncurry(10);

export default {
  ncurry,
  curry2,
  curry3,
  curry4,
  curry5,
  curry6,
  curry7,
  curry8,
  curry9,
  curry10,
};
