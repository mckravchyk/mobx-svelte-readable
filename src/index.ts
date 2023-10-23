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
 */
/* eslint-disable no-redeclare */
export function readableReaction<ObservedValue>(
  expression: (r: IReactionPublic) => ObservedValue,
): Readable<ObservedValue> {
  return {
    subscribe: (callback) => subscribe(
      expression,
      callback as ReadableCallback<ObservedValue>,
    ),
  };
}
/* eslint-enable no-redeclare */
