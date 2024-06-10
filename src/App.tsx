import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShoppingCart from "./components/Shopping";
import ProductDetails from "./components/ProductDetails";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShoppingCart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
