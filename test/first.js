import test from "ava";
import jsc from "jsverify";
import {check} from "ava-jsverify";

import A from "../src/index";

test("has a value property", t => {
  const a = new A(1);
  t.is(a.value, 1);
});

test.skip("will fail", t => {
  const a = new A(23);
  t.is(a.method(), 23);
});

test(
  "generates",
  check(jsc.integer, jsc.string, (t, x, y) => {
    t.is(typeof x, "number");
    t.is(typeof y, "string");
  }),
);
