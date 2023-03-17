import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/productSlice";
import CatalogData from "./components/CatalogData/CatalogData";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(fetchProducts());
    },
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<CatalogData />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
