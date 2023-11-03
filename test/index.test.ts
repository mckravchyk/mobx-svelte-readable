import { observable, runInAction } from 'mobx';

import { readableReaction } from 'src';

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
