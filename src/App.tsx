import { createBrowserRouter } from "react-router-dom";
import { Web3Provider } from "./context/Web3Context";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Thrift from "./pages/Thrift";
import ProductPreview from "./pages/ProductPreview";
import Login from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/admin/AdminRoute";
import Sell from "./pages/Sell";
import About from "./pages/About";
import Contact from "./pages/Contact";

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
    path: "/sell",
    element: <Sell />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/dashboard/add",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
  },
]);

export default router;