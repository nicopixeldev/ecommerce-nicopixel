import { AnyAction } from "redux";
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import {
  // CategoryAction,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

/*

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  // discrimation union, the action can only accept the CategoryAction type
  // or it throw an error
  // redux is passing all actions into every single reducer
  // in fact, there is no way to prevent this reducer receives only CategoryAction
  // typescript and the reducer is assuming that the actions he will receive will be
  // one of the 3 actions defined in CategoryAction
  action = {} as CategoryAction
) => {
  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, isLoading: false };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, error: action.payload, isLoading: false };
    // there is a lot of actions, like coming from third party libraries, like persist
    // or the init action happening when redux first mounted
    // this is because we need the default case
    default:
      return state;
  }
};

*/

// now, thanks to the type predicate of withMatcher function
// we can write the reducer in a much better way in the following way:

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false };
  }

  if (fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};
