import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import CatalogData from "./components/CatalogData/CatalogData";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";

function App() {
  const [items, setItems] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [count, setCount] = useState([]);
  const fetchData = (setItems) => {
    fetch(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    )
      .then((response) => response.json())
      .then((res) => {
        // console.log(res);
        setItems([...res]);
      });
  };

  useEffect(
    () => {
      fetchData(setItems);
    },
    // eslint-disable-next-line
    []
  );
  useEffect(
    () => {
      let x = items.map(() => { return 0 })
      setCount([...x])
    },
    // eslint-disable-next-line
    [items]
  );

  useEffect(() => {
    let newList = [];
    count.forEach((val, i) => {
      if (val !== 0)
        newList.push(items[i]);

    })
    setCartItem(newList)
  },  // eslint-disable-next-line
    [count])

  // console.log(count)

  const IncreaseCount = (item) => {
    const newList = count.map((val, i) => { if (i !== item.id - 1) return val; else { if (val > item.quantity - 1) { alert("Max Quantity"); return val } else return val + 1 } });
    setCount(newList)
  }

  const DecreaseCount = (item) => {
    const newList = count.map((val, i) => { if (i !== item.id - 1) return val; else { if (val === 0) return 0; else return val - 1 } });
    setCount(newList)
  }
  const removeItem = (item) => {
    const newList = cartItem.filter((val) => val.id !== item.id)
    setCartItem(newList)
    const List = count.map((val, i) => { if (i !== item.id - 1) return val; else return 0; });
    setCount(List)

  }

  return (
    <>
      <NavBar cartItem={cartItem} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <CatalogData
              items={items}
              count={count}
              IncreaseCount={IncreaseCount}
              DecreaseCount={DecreaseCount}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              items={items}
              count={count}
              IncreaseCount={IncreaseCount}
              DecreaseCount={DecreaseCount}
              cartItem={cartItem}
              removeItem={removeItem}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
