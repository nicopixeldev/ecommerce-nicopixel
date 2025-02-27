import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    // put is a function that takes an action and dispatches it
    // it will dispatch the action to the redux store
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  // takeLatest is a function that takes an action type and a saga
  // it will take the latest action of that type and execute the saga
  // it will cancel any ongoing saga with the same action type
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  // all is a function that takes an array of sagas and returns a saga
  // it will wait for all the sagas to be executed
  // it will execute them in parallel
  // it will return an array of results
  yield all([call(onFetchCategories)]);
}
