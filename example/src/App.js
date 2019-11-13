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
