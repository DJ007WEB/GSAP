import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PagenotFound from "./pages/PagenotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<p>DEFAULT</p>} />
          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<p>Country</p>} />
          <Route path="form" element={<p>form</p>} />
        </Route>
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
