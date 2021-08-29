import React, { useEffect, useState } from "react";
export interface person{
  name: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role:string;
  id:number;
};
type ContextProps = {
  user: person;
  authenticated: boolean;
  setUser: any;
  loadingAuthState: boolean;
};
export const AuthContext = React.createContext<Partial<ContextProps>>({});
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState({
      name: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      role:"",
      id:-1
    });
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user')));
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};  