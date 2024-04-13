import React from "react";
import "./index.css";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PostPage } from "./pages/posts";
import RegisterPage from "./pages/auth/register";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/auth/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PostPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
