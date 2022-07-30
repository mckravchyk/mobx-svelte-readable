import { reaction, type IReactionPublic } from 'mobx';

type UnsubscribeFn = () => void;

type ReadableCallback<Value> = (value: Value) => void;

export interface Readable<Value> {
  /**
   * Registers a callback that runs initially and whenever the value changes.
   */
  subscribe: (callback: ReadableCallback<Value>) => UnsubscribeFn,
}

function subscribe<ObservedValue, OutputValue>(
  expression: (r: IReactionPublic) => ObservedValue,
  callback: ReadableCallback<ObservedValue | OutputValue>,
  transformer?: (newValue: ObservedValue) => OutputValue,
): UnsubscribeFn {
  const unsub = reaction(
    expression,
    (newValue) => {
      callback(transformer ? transformer(newValue) : newValue);
    },
    { fireImmediately: true },
  );

  return unsub;
}

/**
 * Creates a Svelte Readable from a MobX observable that can be used as an auto-subscription in
 * Svelte components ($ syntax).
 *
 * @param expression MobX reaction expression.
 * @param transformer (optional) A function that transforms the observed value to the output value
 * of the readable. It's recommended to use it only for trivial shape transformations, anything else
 * should be its own piece of state that gets updated as a reaction to its dependency.
 */
/* eslint-disable no-redeclare */
export function readableReaction<ObservedValue>(
  expression: (r: IReactionPublic) => ObservedValue,
): Readable<ObservedValue>;
export function readableReaction<ObservedValue, OutputValue>(
  expression: (r: IReactionPublic) => ObservedValue,
  transformer: (newValue: ObservedValue) => OutputValue
): Readable<OutputValue>;
export function readableReaction<ObservedValue, OutputValue>(
  expression: (r: IReactionPublic) => ObservedValue,
  transformer?: (newValue: ObservedValue) => OutputValue,
): Readable<OutputValue> {
  return {
    subscribe: (callback) => subscribe(
      expression,
      callback as ReadableCallback<ObservedValue | OutputValue>,
      transformer,
    ),
  };
}
/* eslint-enable no-redeclare */
