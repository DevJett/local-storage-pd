# local-storage-pd

> A simplified `localStorage` API that just works

# Install

Using `npm`

```shell
npm install local-storage-pd
```

Using `yarn`

```shell
yarn add local-storage-pd
```

# API

The API is a simplified way to interact with all things `localStorage`. Note that when `localStorage` is unsupported in the current browser, a fallback to an in-memory store is used transparently.

For that reason, consider that `local-storage` values _might evaporate_ across page views.



## `ls.enabled`

If `true`, `localStorage` is supported in the current browser. If `false`, `localStorage` is not supported and all operations are no-ops.

##### Example

```js
var ls = require('local-storage');

ls.enabled;
// true
```


## `ls(key, value?)`

If a `value` argument is provided, acts as `ls.set`. When `value` isn't provided, acts as `ls.get`.

##### Example

```js
var ls = require('local-storage');

ls('foo');
// <- null

ls('foo', 'bar');
// <- true

ls('foo');
// <- 'bar'
```

## `ls.get(key)`

Returns value under `key` in local storage. Equivalent to `ls(key)`. Internally parses the value from JSON before returning it.

##### Example

```js
var ls = require('local-storage');

ls('foo', 'bar');
// <- true

ls.get('foo');
// <- 'bar'
```

## `ls.set(key, value)`

Persists `value` under `key` in local storage. Equivalent to `ls(key, value)`. Internally converts the `value` to JSON.

Returns whether the action succeeded; otherwise, an error was thrown by the browser when trying to persist the value. Failure typically means a `QuotaExceededError` was thrown.

##### Example

```js
var ls = require('local-storage');

ls.set('foo', 'bar');
// <- true

ls.get('foo');
// <- 'bar'
```

## `ls.remove(key)`

Removes `key` from local storage. Returns `true` if the property was successfully deleted, and `false` otherwise.

##### Example

```js
var ls = require('local-storage');

ls.set('foo', 'bar');
// <- true

ls.remove('foo');
// <- true
```

## `ls.clear()`

Clears local storage.

##### Example

```js
var ls = require('local-storage');

ls.set('foo', 'bar');
ls.set('baz', 'tar');
ls.clear();
```

## `ls.backend(store?)`

If a `store` argument is provided, it sets the backend storage engine. Otherwise it returns the current backend.

##### Example

```js
var ls = require('local-storage');

ls.backend(sessionStorage);
ls.set('baz', 'tar');
/* close the tab, then reopen */
ls.get('baz');
```

## `ls.on(key, fn)`

Listen for changes persisted against `key` on other tabs. Triggers `fn` when a change occurs, passing the following arguments.

- `value`: the current value for `key` in local storage, parsed from the persisted JSON
- `old`: the old value for `key` in local storage, parsed from the persisted JSON
- `url`: the url for the tab where the modification came from

##### Example

Open a page with the following snippet in multiple tabs. The `storage` event will trigger on all tabs except for the one that persisted the change.

```js
var ls = require('local-storage');

ls.on('foo', storage);
ls.set('foo', 'bar');

function storage (value) {
  console.log('some other tab changed "foo" to ' + value);
}
```

## `ls.off(key, fn)`

Removes a listener previously attached with `ls.on(key, fn)`.

##### Example

```js
var ls = require('local-storage');

ls.on('foo', storage);
ls.off('foo', storage);

function storage (value) {
  console.log('some other tab changed "foo" to ' + value);
}
```
## Typescript

##### Example

```ts
import ls, {get,set} from "local-storage";

set<number>('foo',5);
get<number>('foo');

interface IFoo{
  bar: string;
}

ls<IFoo>('foo');
```

##### Example

```ts
import * as ls from "local-storage";

ls.set<number>('foo',5);
ls.get<number>('foo');

```

# License

MIT
