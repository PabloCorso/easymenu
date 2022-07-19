import { useEffect, useRef, useState } from "react";

function useIsFocused(defaultState: boolean) {
  const [state, setState] = useState(defaultState);

  const ref = useRef<any>();

  useEffect(() => {
    const current = ref.current;

    const onFocus = () => setState(true);
    const onBlur = () => setState(false);

    if (current) {
      current.addEventListener("focus", onFocus);
      current.addEventListener("blur", onBlur);
    }

    return () => {
      current.removeEventListener("focus", onFocus);
      current.removeEventListener("blur", onBlur);
    };
  }, []);

  return [state, ref];
}

export { useIsFocused };
