import { useEffect, useRef } from "react";

function useDebounce(value, delay, callback) {
  const handler = useRef();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (handler.current) {
      clearTimeout(handler.current);
    }

    handler.current = setTimeout(() => {
      savedCallback.current(value);
    }, delay);

    return () => {
      clearTimeout(handler.current);
    };
  }, [value, delay]);

  return savedCallback.current;
}

export default useDebounce;
