//
//

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./pages/Product/Product.jsx";
import Home from "./pages/Home/Home.jsx";
import Pricing from "./pages/Pricing/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login/Login.jsx";

function App() {
  return (
    <>
      {/* <PageNav /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="pricing" element={<Pricing />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="app" element={<AppLayout />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
