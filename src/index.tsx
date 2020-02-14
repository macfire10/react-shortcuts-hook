import { useEffect, useCallback } from "react";

const setsEqual = (setA: Set<String>, setB: Set<String>) : boolean =>
  setA.size === setB.size && !Array.from(setA).some(v => !setB.has(v));

type Hook = (
  keys: Array<String>,
  callback: () => void,
  deps: Array<any>
) => void;

export const useShortcuts: Hook = (keys, callback, deps) => {
  const memoizedCallback = useCallback(callback, deps || []);
  const targetKeys: Set<String> = new Set(keys.map(key => key.toLowerCase()));
  const pressedKeys: Set<String> = new Set();

  function onKeyPressed(event: KeyboardEvent): void {
    pressedKeys.add(event.key.toLowerCase());

    if (setsEqual(pressedKeys, targetKeys)) {
      memoizedCallback();
    }
  }

  function onKeyUp(event: KeyboardEvent): void {
    pressedKeys.delete(event.key.toLowerCase());
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyPressed);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyPressed);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [memoizedCallback]);
};