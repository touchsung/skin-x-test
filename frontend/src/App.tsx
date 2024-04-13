import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PostPage } from "./pages/posts";
import RegisterPage from "./pages/auth/register";
import LoginPage from "./pages/auth/login";
import PostDetailPage from "./pages/posts/post-detail";

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
  {
    path: "/post/:id",
    element: <PostDetailPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
