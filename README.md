# react-shortcuts-hook

> A zero-dependencies hook for capturing keyboard shortcuts in components.

[![NPM](https://img.shields.io/npm/v/react-shortcuts-hook.svg)](https://www.npmjs.com/package/react-shortcuts-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-shortcuts-hook
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'react-shortcuts-hook'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [macfire10](https://github.com/macfire10)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
