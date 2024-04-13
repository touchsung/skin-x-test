import React, { ReactNode, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { CgProfile } from "react-icons/cg";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, handleLogOut, checkAccessToken } = useContext(AuthContext);
  useEffect(() => {
    checkAccessToken();
  }, []);
  return (
    <>
      <header className="bg-white shadow sticky top-0 z-10 w-full">
        <section className="container flex justify-between items-center  h-12">
          <div className="flex items-center gap-2">
            <CgProfile className="w-5 h-5" />
            <span>{user?.email}</span>
          </div>
          <button className="btn-primary" onClick={handleLogOut}>
            Logout
          </button>
        </section>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
