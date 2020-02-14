# ⌨️ react-shortcuts-hook ⌨️
A *zero-dependencies*, *lightweight* hook for capturing keyboard shortcuts in components.
**5 times lighter** than [react-hotkeys-hook](https://github.com/JohannesKlauss/react-hotkeys-hook "react-hotkeys-hook"), **4 times** lighter than [use-hotkeys](https://github.com/sandiiarov/use-hotkeys "use-hotkeys").

![npm](https://img.shields.io/npm/v/react-shortcuts-hook?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-shortcuts-hook?style=flat-square)
![David](https://img.shields.io/david/macfire10/react-shortcuts-hook?style=flat-square)
![Travis (.org)](https://img.shields.io/travis/macfire10/react-shortcuts-hook?style=flat-square)

## Install

NPM

```bash
npm install --save react-shortcuts-hook
```

Or with Yarn:

```bash
yarn add react-shortcuts-hook
```

## Usage

```jsx
import React, { useState } from 'react'
import { useShortcuts } from 'react-shortcuts-hook'

const App = () => {
  const [count, setCounter] = useState(0)
  useShortcuts(['control', 'k'], () => setCounter(count + 1), [count])

  return (
    <div>
      {`You've pressed Control+K ${count} times.`}
    </div>
  )
}

export default App
```

## Parameters

- `keys: string[]`: Here you can set a single key, or a combination of keys, that you want hook to listen to. Every entry of this array should be a string with a proper `KeyboardEvent.key` value. [Here](https://keycode.info/) you can find a nice cheatsheet.
- `callback: () => void`: This is a callback that fires when all of the keys specified in the first argument are pressed at the same time. Note that is gets memoized under the hood, so you don't have to do that by yourself.
- `deps: any[] = []`: This is the dependency array that gets appended to memoisation of your callback. If you depend on values that change over time, you should put them here.

## Thanks

- [react-hotkeys-hook](https://github.com/JohannesKlauss/react-hotkeys-hook "react-hotkeys-hook") for inspiring this library
- [create-react-hook](https://github.com/hermanya/create-react-hook) for a project template.
- [Size-Limit](https://github.com/hermanya/create-react-hook) for size сontrol.

## License

MIT © [Nikita Volkov](https://github.com/macfire10)

---

This hook was bootstrapped using [create-react-hook](https://github.com/hermanya/create-react-hook).
