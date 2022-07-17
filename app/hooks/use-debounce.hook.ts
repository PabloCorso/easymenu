import { useMemo } from "react";

const DEFAULT_TIMEOUT = 500;

function debounceFn(fn: Function, timeout = DEFAULT_TIMEOUT) {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, args);
    }, timeout);
  };
}

function useDebounce(fn: Function, timeout = DEFAULT_TIMEOUT) {
  return useMemo(() => debounceFn(fn, timeout), [fn, timeout]);
}

export { useDebounce };
