import { useEffect, useCallback } from 'react'

function setsEqual(setA, setB) {
  const a = Array.from(setA)
  const b = Array.from(setB)
  if (a.length != b.length) return false

  for (let i of a) {
    if (b.indexOf(i) == -1) return false
  }

  return true
}

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
