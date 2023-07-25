import { makeObservable, observable, runInAction } from 'mobx';

import { readableReaction } from '../src';

describe('Readable reaction', () => {
  it('observes an expression', () => {
    const map = observable.map<number, string>();
    const result: number[][] = [];

    const keysR = readableReaction(() => Array.from(map.keys()));

    const unsub = keysR.subscribe((keys) => {
      result.push(keys);
    });

    runInAction(() => { map.set(1, 'test'); });
    runInAction(() => { map.set(2, 'test'); });

    unsub();

    expect(result).toEqual([[], [1], [1, 2]]);
  });

  it('fires immediately', () => {
    const map = observable.map();
    const result: number[][] = [];

    const keysR = readableReaction(() => Array.from(map.keys()));

    const unsub = keysR.subscribe((keys) => {
      result.push(keys);
    });

    unsub();

    expect(result).toEqual([[]]);
  });

  it('transforms the observed value', () => {
    const result: number[][] = [];

    const testObject = {
      arr: [4, 5, 2, 3],
    };
    makeObservable(testObject, { arr: observable });

    const arrSortedR = readableReaction(
      () => testObject.arr,
      (arr) => [...arr].sort(),
    );

    const unsub = arrSortedR.subscribe((arr) => {
      result.push(arr);
    });

    runInAction(() => { testObject.arr = [...testObject.arr, 1]; });
    runInAction(() => { testObject.arr = [...testObject.arr, 9]; });

    unsub();

    expect(result).toEqual([
      [2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 9],
    ]);
  });

  it('destroys the subscription', () => {
    const map = observable.map();
    const result: number[][] = [];

    const keysR = readableReaction(() => Array.from(map.keys()));

    const unsub = keysR.subscribe((keys) => {
      result.push(keys);
    });

    runInAction(() => { map.set(1, 'test'); });
    unsub();
    runInAction(() => { map.set(2, 'test'); });

    expect(result).toEqual([[], [1]]);
  });
});
