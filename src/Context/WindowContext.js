import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext(null);

export default function WindowContext({ children }) {
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);
  const [width, setWidth] = useState(window.innerWidth);
  return <WindowSize.Provider value={{ width, setWidth }}>{children}</WindowSize.Provider>;
}
