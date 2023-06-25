import { createContext, useState } from "react";

export const UserContext = createContext({
  userInfo: null,
  setUserInfo: () => {},
});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <div>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
      </UserContext.Provider>
    </div>
  );
}
