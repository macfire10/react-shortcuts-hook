import { DependencyList, useEffect, useCallback } from "react";

const setsEqual = (setA: Set<string>, setB: Set<string>): boolean =>
  setA.size === setB.size && !Array.from(setA).some(v => !setB.has(v));

export const useShortcuts = (keys: ReadonlyArray<string>, callback: () => void, deps: DependencyList) => {
  const memoizedCallback = useCallback(callback, deps || []);
  const targetKeys: Set<string> = new Set(keys.map(key => key.toLowerCase()));
  const pressedKeys: Set<string> = new Set();

  function onKeyPressed(event: KeyboardEvent): void {
    pressedKeys.add(event.key.toLowerCase());

    if (setsEqual(pressedKeys, targetKeys)) {
      memoizedCallback();
    }
  }

  function onKeyUp(event: KeyboardEvent): void {
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
