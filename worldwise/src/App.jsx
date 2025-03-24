//
//
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CityProvider } from "./Contexts/CityProvider.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

import CityList from "./components/City/CityList.jsx";
import CountryList from "./components/Country/CountriesList.jsx";
import City from "./components/City/City.jsx";
import Form from "./components/AddCityForm/Form.jsx";
import SpinnerFullPage from "./components/FullPageSpinner/SpinnerFullPage.jsx";

// dynamic imports

// import Product from "./pages/Product/Product.jsx";
// import Home from "./pages/Home/Home.jsx";
// import Pricing from "./pages/Pricing/Pricing.jsx";
// import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
// import AppLayout from "./pages/AppLayout/AppLayout.jsx";
// import Login from "./pages/Login/Login.jsx";

const Product = lazy(() => import("./pages/Product/Product.jsx"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing.jsx"));
const PageNotFound = lazy(() =>
  import("./pages/PageNotFound/PageNotFound.jsx")
);
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));

// dist/assets/index-CH9eD6iL.css   46.56 kB │ gzip:  11.44 kB
// dist/assets/index-CrBIWkHY.js   565.59 kB │ gzip: 166.77 kB
function App() {
  return (
    <CityProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CityProvider>
  );
}

export default App;
