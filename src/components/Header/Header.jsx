import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import "./header.css";

import { ProductsContext } from "../../contexts/products-context";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { AuthContext } from "../../contexts/auth-context";
import { WishlistContext } from "../../contexts/wishlist-context";
import { CartContext } from "../../contexts/cart-context";

export function Header() {
  const {
    productsState: { inputSearch },
    productsDispatch,
  } = useContext(ProductsContext);
  const { currentUser, token, isUserLoggedIn } = useContext(AuthContext);
  const {
    wishlistState: { wishlist },
  } = useContext(WishlistContext);
  const {
    cartState: { cart },
  } = useContext(CartContext);
  const navigate = useNavigate();

  function handleInput(e) {
    productsDispatch({
      type: "SET_INPUT_SEARCH",
      payload: e.target.value,
    });
    navigate("/products");
  }

  return (
    <nav className="header-container">
      <h1 className="title" onClick={() => navigate("/")}>
        Book Nook
      </h1>

      <input
        type="text"
        placeholder="Search for books"
        className="input_search"
        value={inputSearch}
        onChange={(e) => handleInput(e)}
      />

      <div className="icons">
        <LibraryBooksOutlinedIcon
          className="icon"
          onClick={() => navigate("/products")}
        />

        <div className="icon-container">
          <FavoriteBorderOutlinedIcon
            className="icon"
            onClick={() => navigate("/wishlist")}
          />
          {isUserLoggedIn?.isLoggedIn && !!wishlist.length && (
            <p className="wishlist-length">{wishlist.length}</p>
          )}
        </div>

        <div className="icon-container">
          <ShoppingCartOutlinedIcon
            className="icon"
            onClick={() => navigate("/cart")}
          />
          {isUserLoggedIn?.isLoggedIn && !!cart.length && (
            <p className="cart-length">{cart.length}</p>
          )}
        </div>

        <AccountCircleOutlinedIcon
          className="icon"
          onClick={() =>
            token || currentUser
              ? navigate("/user-profile")
              : navigate("/login")
          }
        />
      </div>
    </nav>
  );
}
