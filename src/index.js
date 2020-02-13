import { useEffect, useCallback } from 'react'

const setsEqual = (setA, setB) =>
  setA.size === setB.size && !Array.from(setA).some(v => !setB.has(v))

export function useShortcuts(keys, callback, deps) {
  const memoizedCallback = useCallback(callback, deps || [])
  const targetKeys = new Set(keys.map(key => key.toLowerCase()))
  const pressedKeys = new Set()

  function onKeyPressed(event) {
    pressedKeys.add(event.key.toLowerCase())

    if (setsEqual(pressedKeys, targetKeys)) {
      memoizedCallback()
    }
  }

  function onKeyUp(event) {
    pressedKeys.delete(event.key.toLowerCase())
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyPressed)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyPressed)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [memoizedCallback])
}
