import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import "./header.css";

import { ProductsContext } from "../../contexts/products-context";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export function Header() {
  const {productsDispatch} = useContext(ProductsContext)
  const navigate = useNavigate();

  function handleInput (e) {
    productsDispatch({type: "SET_INPUT_SEARCH", payload: e.target.value})
    navigate("/products")
  }

  return (
    <nav className="header-container">
      <h1 className="title" onClick={() => navigate("/")}>
        Book Nook
      </h1>

      <input
        type="text"
        placeholder="Search for products"
        className="input_search"
        onChange={handleInput}
      />

      <div className="icons">
        <LibraryBooksOutlinedIcon
          className="icon"
          onClick={() => navigate("/products")}
        />

        <FavoriteBorderOutlinedIcon
          className="icon"
          onClick={() => navigate("/wishlist")}
        />

        <ShoppingCartOutlinedIcon
          className="icon"
          onClick={() => navigate("/cart")}
        />

        <AccountCircleOutlinedIcon
          className="icon"
          onClick={() => navigate("/account")}
        />
      </div>
    </nav>
  );
}
