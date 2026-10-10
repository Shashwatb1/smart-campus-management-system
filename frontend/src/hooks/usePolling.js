import { useEffect, useRef } from "react";

// Calls `callback` once right away, then again every `intervalMs` milliseconds.
// It only refreshes while the browser tab is visible, and refreshes immediately
// when the user comes back to the tab.
const usePolling = (callback, intervalMs = 15000) => {
  const savedCallback = useRef(callback);

  // Always remember the latest version of the callback
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    savedCallback.current();

    const tick = () => {
      if (document.visibilityState === "visible") {
        savedCallback.current();
      }
    };

    const id = setInterval(tick, intervalMs);
    document.addEventListener("visibilitychange", tick);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [intervalMs]);
};

export default usePolling;