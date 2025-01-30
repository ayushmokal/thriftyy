import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Thrift from "./pages/Thrift";
import ProductPreview from "./pages/ProductPreview";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/admin/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/thrift",
    element: <Thrift />,
  },
  {
    path: "/product/:id",
    element: <ProductPreview />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;