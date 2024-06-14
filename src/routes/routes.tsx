import { createBrowserRouter } from "react-router-dom";
import Shopping from "../components/Shopping";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Shopping />,
    errorElement:<NotFound />
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
    errorElement:<NotFound />
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement:<NotFound />
  },
]);

export default routes;
