import { Route, Routes } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Header } from "./components/Header/Header";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { Cart } from "./pages/Cart/Cart";
import { BookDetails } from "./components/BookDetails/BookDetails";
import { Checkout } from "./pages/Checkout/Checkout";
import { ToastContainer } from "react-toastify";
import { RequiresAuth } from "./components/RequiresAuth";
import { UserProfile } from "./pages/UserProfile/UserProfile";

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:productId" element={<BookDetails />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/user-profile"
          element={
            <RequiresAuth>
              <UserProfile />
            </RequiresAuth>
          }
        ></Route>

        <Route
          path="/wishlist"
          element={
            <RequiresAuth>
              <Wishlist />
            </RequiresAuth>
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <RequiresAuth>
              <Checkout />
            </RequiresAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
