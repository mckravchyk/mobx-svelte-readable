# mobx-svelte-readable

A very simple, yet complete, integration between Svelte and MobX that connects MobX reaction with Svelte's readable auto-subscription.

## Installation

```bash
npm install mobx-svelte-readable --save
```

## Example

```svelte
<script lang="ts">

import { readableReaction } from 'mobx-svelte-readable';

const store = getContext('store');

// That's all there is to it...
const isVisible = readableReaction(() => store.menu.isOpen);

$: visibilityStyle = $isVisible ? '' : 'display: none;';

</script>

<div id="Menu" style={visibilityStyle}></div>
```

For example's sake, a simple MobX store can be created like this:

```ts
import { makeObservable, observable } from 'mobx';

const menuSlice = {
  isOpen: false,
};

makeObservable(menuSlice, {
  isOpen: observable
});

const store = {
  menu: menuSlice,
};

```

The subscription will fire whenever `menuSlice.isOpen` changes its value - no custom objects, no update functions - just updating the value.

MobX is a standalone state management library and has more features than Svelte's built-in stores. MobX documentation can be found [here](https://mobx.js.org).
