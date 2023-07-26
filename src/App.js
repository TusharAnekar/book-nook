import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Header } from "./components/Header/Header";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { Cart } from "./pages/Cart/Cart";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/products" element={<Products/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/wishlist" element={<Wishlist/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
