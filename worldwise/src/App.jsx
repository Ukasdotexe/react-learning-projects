//
//

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

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

const BASE_URL = "http://localhost:3001";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    const getCities = async function () {
      try {
        setIsLoading(true);

        const response = await fetch(`${BASE_URL}/cities`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setCities(data);

        //
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<Navigate replace to="cities" />}
            // element={<CityList cities={cities} isLoading={isLoading} />}
          />

          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:cityId" element={<City cities={cities} />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />

          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
