import {
  createBrowserRouter,
} from "react-router-dom";
import App from '../App';
import NotFoundPage from "../pages/layouts/NotFoundPage";
import Index from "../pages/blogs/Index";
import BlogCreate from "../pages/blogs/BlogCreate";
import BlogEdit from "../pages/blogs/BlogEdit";
import BlogDetails from "../pages/blogs/BlogDetails";

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
        path: "/blogs/:id",
        element: <BlogDetails />
      },
      {
        path: "/blogs/create",
        element: <BlogCreate />
      },
      {
        path: "/blogs/:id/edit",
        element: <BlogEdit />
      },
      {
        path: '*',
        element: <NotFoundPage />
      },
    ]
  },

]);

export default router;