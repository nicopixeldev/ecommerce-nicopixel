import { all, call } from "typed-redux-saga/macro";

import { categoriesSaga } from "./categories/category.saga";
import { userSagas } from "./user/user.saga";

// generator function
// generator function stop the execution when it encounters a yield
export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSagas)]);
}

// // example of generator function
// // if we invoke gen(), it will be suspended
// // if we invoke gen.next(), it will resume the execution
// function* gen() {
//   console.log("a");
//   console.log("b");
// }

// const genObj = gen(); // suspended
// genObj.next(); // resume

// function* gen(i) {
//   yield i;
//   yield i + 10;
// }

// const genObj = gen(10);
// console.log(genObj.next()); // { value: 10, done: false }
// console.log(genObj.next()); // { value: 20, done: false }
// console.log(genObj.next()); // { value: undefined, done: true }
