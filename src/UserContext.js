import { createContext, useState } from "react";

export const UserContext = createContext({
  userInfo: null,
  setUserInfo: () => {},
});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  return (
    <div>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
      </UserContext.Provider>
    </div>
  );
}
