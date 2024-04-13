import { ReactElement, createContext, useEffect, useState } from "react";
import { userData, userDataInput, userDataJTW } from "../types/auth";
import { postLogIn, postRegister } from "../api/auth";
import { isAxiosError } from "axios";
import { getUserToken } from "../utils/helper";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: userDataJTW | undefined;
  handleRegister: (userData: userDataInput) => Promise<userData | undefined>;
  handleLogIn: (userData: userDataInput) => Promise<userData | undefined>;
  errorMsg: string | undefined;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  handleRegister: async () => undefined,
  handleLogIn: async () => undefined,
  errorMsg: undefined,
});

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<userDataJTW>();
  const [accessToken, setAccessToken] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>();

  const handleErrorMsg = (error: unknown) => {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      setErrorMsg(error.response.data.message);
    } else {
      setErrorMsg("Internal server error.");
    }
    setTimeout(() => setErrorMsg(""), 2000);
  };

  const handleRegister = async (userData: userDataInput) => {
    try {
      const result = await postRegister(userData);
      setAccessToken(result.data.accessToken);

      // const decoded: userDataJTW = jwtDecode(result.data.accessToken);
      // setUser(decoded);
      return result.data;
    } catch (error) {
      handleErrorMsg(error);
    }
  };

  const handleLogIn = async (userData: userDataInput) => {
    try {
      const result = await postLogIn(userData);
      setAccessToken(result.data.accessToken);

      return result.data;
    } catch (error) {
      handleErrorMsg(error);
    }
  };

  const handleLogOut = async () => {
    localStorage.removeItem("accessToken");
    setUser(undefined);
  };

  const contextValue = {
    user,
    handleRegister,
    handleLogIn,
    errorMsg,
  };

  useEffect(() => {
    if (accessToken) {
      const decoded: userDataJTW = jwtDecode(accessToken);
      localStorage.setItem("accessToken", accessToken);
      setUser(decoded);
    }
  }, [accessToken]);

  useEffect(() => {
    const token = getUserToken();
    if (token) {
      const decoded = jwtDecode(token);
      const currentDate = new Date().getTime();
      const currentTimestamp = Math.floor(currentDate / 1000);

      if (decoded.exp && currentTimestamp > decoded.exp) {
        handleLogOut();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
