import { AnyAction } from "redux";

// we are going to attach something in our actions creators
// so they can behave as type guards and improve the way reducers can react only
// to specific actions, instead of having the discrimation unions where
// the reducer is assuming that the actions received is going to be one of the actions types
// type predicate -> a function that verifies that a specific parameters it receive is from a specific type

// Matchable is an extension on the action creator (AC,
// we're going to attach into every AC this match property

// this mach property compares AnyAction with the return type value of the action creator
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

// type overloading
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

// type overloading
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

// javascript implementation
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

// nows withMatcher function takes an actionCreator function and
// adds an additional functionality of them, so they can determine
// if a passed action has the same type as the corresponding action that
// they create

// ------
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// function overloading (from ts)
// allow us to define multiple type function definitions from the same name
// for example, we want createAction, depending if receives a payload or not,
// we want to change the return type (ActionWithPayload or just Action)

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

// the overload function you must to have the same number of arguments (this is because we need payload: void)
export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
