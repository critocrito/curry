import namefn from "@critocrito/namefn";

const ncurry = n => {
  const localCurry = (name, f, ...args) => {
    const g = (...largs) => {
      const rest = args.concat(largs);

      if (rest.length < n) return localCurry(name, f, ...rest);
      return f(...rest.slice(0, n));
    };
    return namefn(`${name}-${n - args.length}`, g);
  };

  return namefn(`curry${n}`, localCurry);
};

const curries = [...Array(11).keys()]
  .slice(2)
  .reduce((memo, i) => Object.assign({}, memo, {[`curry${i}`]: ncurry(i)}), {});

export const curry2 = ncurry(2);
export const curry3 = ncurry(3);
export const curry4 = ncurry(4);
export const curry5 = ncurry(5);
export const curry6 = ncurry(6);
export const curry7 = ncurry(7);
export const curry8 = ncurry(8);
export const curry9 = ncurry(9);
export const curry10 = ncurry(10);

export default curries;
