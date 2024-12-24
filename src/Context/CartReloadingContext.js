import { createContext, useState } from 'react';

export const CartReloading = createContext('');
export default function CartReloadingContext({ children }) {
  const [isChange, setIsChange] = useState(false);
  return <CartReloading.Provider value={{ isChange, setIsChange }}>{children}</CartReloading.Provider>;
}
