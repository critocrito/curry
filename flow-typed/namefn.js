// @flow
declare module "@critocrito/namefn" {
  declare export default function namefn(
    name: string,
    fn: mixed | (() => mixed),
  ): mixed | (() => mixed);
}
