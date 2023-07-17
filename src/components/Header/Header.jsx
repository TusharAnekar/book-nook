import "./header.css";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate()
  return (
    <nav className="header-container">
      <h1 className="title" onClick={()=> navigate("/")}>Book Nook</h1>

      <input
        type="text"
        placeholder="Search for products"
        className="input_search"
      />

      <div className="icons">
        <LibraryBooksOutlinedIcon className="icon" onClick={() => navigate("/products")}/>

        <FavoriteBorderOutlinedIcon className="icon" onClick={() => navigate("/wishlist")}/>

        <ShoppingCartOutlinedIcon className="icon" onClick={() => navigate("/cart")}/>

        <AccountCircleOutlinedIcon className="icon" onClick={() => navigate("/account")}/>
      </div>
    </nav>
  );
}
