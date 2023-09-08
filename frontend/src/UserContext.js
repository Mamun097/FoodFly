import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [foodCount, setFoodCount] = useState(0);

  const updateFoodCount = (newCount) => {
    setFoodCount(newCount);
  };

  return (
    <UserContext.Provider value={{ foodCount, updateFoodCount }}>
      {children}
    </UserContext.Provider>
  );
}
