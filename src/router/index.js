import {
  createBrowserRouter,
} from "react-router-dom";
import App from '../App';
import NotFoundPage from "../pages/layouts/NotFoundPage";
import Index from "../pages/blogs/Index";
import BlogCreate from "../pages/blogs/BlogCreate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <div>
          <h1 className="text-center">Welcome to the Blog App</h1>
        </div>
      },
      {
        path: "/blogs/",
        element: <Index />
      },
      {
        path: "/blogs/create",
        element: <BlogCreate />
      },
      {
        path: '*',
        element: <NotFoundPage />
      },
    ]
  },

]);

export default router;