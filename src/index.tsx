import { useEffect, useCallback } from "react";

const setsEqual = (setA: Set<String>, setB: Set<String>): boolean =>
  setA.size === setB.size && !Array.from(setA).some(v => !setB.has(v));

export const useShortcuts = (keys: Array<string>, callback: () => void, deps: Array<any>) => {
  const memoizedCallback = useCallback(callback, deps || []);
  const targetKeys: Set<String> = new Set(keys.map(key => key.toLowerCase()));
  const pressedKeys: Set<String> = new Set();

  function onKeyPressed(event: KeyboardEvent): void {
    if (event.key)
      pressedKeys.add(event.key.toLowerCase());

    if (setsEqual(pressedKeys, targetKeys)) {
      memoizedCallback();
    }
  }

  function onKeyUp(event: KeyboardEvent): void {
    if (event.key)
      pressedKeys.delete(event.key.toLowerCase());
  }

  function onWindowBlur(): void {
    pressedKeys.clear();
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyPressed);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      window.removeEventListener("keydown", onKeyPressed);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [memoizedCallback]);
};
