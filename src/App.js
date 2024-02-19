import { useEffect, useState } from "react";
import "./App.css";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/header/header";
import { Route, Routes } from "react-router-dom";
import { ProductList } from "./components/productList/productList";
import { Form } from "./components/form/form";
import { Cart } from "./components/cart/cart";
function App() {
  const { tg } = useTelegram();
  const [addItems, setAddItems] = useState([])
  useEffect(() => {
    tg.ready();
  }, [tg]);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList addItems={addItems} setAddItems={setAddItems} />} />
        <Route path={"form"} element={<Form />} />
        <Route path={"cart"} element={<Cart addItems={addItems} setAddItems={setAddItems} />} />
      </Routes>
    </div>
  );
}

export default App;
