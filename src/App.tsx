import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./routes/routes";

const App: React.FC = () => {
  return (
    <CartProvider>
      <div>
        <ToastContainer />
        <RouterProvider router={routes} />
      </div>
    </CartProvider>
  );
};

export default App;
