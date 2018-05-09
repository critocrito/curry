// @flow

class A<T> {
  value: T;

  constructor(val: T) {
    this.value = val;
  }

  method() {
    if (this.value === 23) {
      throw new Error("Boom!");
    }
    return this.value;
  }
}

export default A;
