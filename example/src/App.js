import React from 'react'

import { useMyHook } from 'react-shortcuts-hook'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
