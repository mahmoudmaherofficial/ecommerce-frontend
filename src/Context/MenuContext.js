import { createContext, useState } from "react";

export const Menu = createContext("");
export default function MenuContext({ children }) {
  const [isOpened, setIsOpened] = useState(false);
  return <Menu.Provider value={{ isOpened, setIsOpened }}>{children}</Menu.Provider>;
}
