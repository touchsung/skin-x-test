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
  handleLogOut: () => void;
  checkAccessToken: () => void;
  errorMsg: string | undefined;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  handleRegister: async () => undefined,
  handleLogIn: async () => undefined,
  handleLogOut: async () => undefined,
  checkAccessToken: async () => undefined,
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

  const checkAccessToken = () => {
    const token = getUserToken();

    if (token) {
      const decoded = jwtDecode(token);
      const currentDate = new Date().getTime();
      const currentTimestamp = Math.floor(currentDate / 1000);

      if (decoded.exp && currentTimestamp > decoded.exp) {
        alert("Your session has expired. please log in.");
        handleLogOut();
      }
    }
  };

  const contextValue = {
    user,
    handleRegister,
    handleLogIn,
    handleLogOut,
    errorMsg,
    checkAccessToken,
  };

  useEffect(() => {
    const token = accessToken || localStorage.getItem("accessToken");
    if (token) {
      const decoded: userDataJTW = jwtDecode(token);
      localStorage.setItem("accessToken", token);
      setUser(decoded);
    }
  }, [accessToken]);

  useEffect(() => {
    checkAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
