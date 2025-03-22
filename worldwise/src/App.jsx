//
//

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product/Product.jsx";
import Home from "./pages/Home/Home.jsx";
import Pricing from "./pages/Pricing/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout/AppLayout.jsx";
import Login from "./pages/Login/Login.jsx";
import CityList from "./components/City/CityList.jsx";
import CountryList from "./components/Country/CountriesList.jsx";
import City from "./components/City/City.jsx";
import Form from "./components/AddCityForm/Form.jsx";
import { CityProvider } from "./Contexts/CityProvider.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

function App() {
  return (
    <CityProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:cityId" element={<City />} />
              <Route path="countries" element={<CountryList />} />

              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CityProvider>
  );
}

export default App;
