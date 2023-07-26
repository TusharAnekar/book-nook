import "./bookcard.css";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { useContext } from "react";
import { WishlistContext } from "../../contexts/wishlist-context";
import { CartContext } from "../../contexts/cart-context";
import { useNavigate } from "react-router-dom";

export function BookCard({ book }) {
  const { img, name, author, price, originalPrice, rating } = book;

  const navigate = useNavigate()

  const { addProductToWishlist } = useContext(WishlistContext);
  const { cartState: {cart}, addProductToCart } = useContext(CartContext);
  const {wishlistState: {wishlist}, removeProductFromWishlist} = useContext(WishlistContext)
  
  const discountPercentage = Math.trunc(
    ((originalPrice - price) / originalPrice) * 100
  );

  const isBookInCart = cart.some(({_id}) => _id === book._id)
  const isBookInWishlist = wishlist.some(({_id}) => _id === book._id)

  function handleLike() {
    if(!isBookInWishlist) {
      addProductToWishlist(book);
    } else {
      removeProductFromWishlist(book._id)
    }
  }

  function handleAddToCart() {
    if(isBookInCart) {
      navigate("/cart")
    } else {
      addProductToCart(book);
    }
  }

  return (
    <div className="book-card-container">
      <img src={img} alt={name} />
      <div className="book-card-details-container">
        <div className="name-author-rating-container">
          <div className="book-name-rating-container">
            <p className="book-name">{name}</p>
            <p className="rating">
              {rating} <StarIcon />
            </p>
          </div>
          <p>{author}</p>
        </div>

        <div className="price-container">
          <p>₹{price}</p>
          <p className="original-price">₹{originalPrice}</p>
          <p className="discount">{discountPercentage}% OFF</p>
        </div>

        <button onClick={handleAddToCart}>{isBookInCart ? "Go to Cart": "Add to Cart"}</button>
        {isBookInWishlist ? (
          <FavoriteIcon
            className="like-icon heart-icon-fill"
            onClick={handleLike}
          />
        ) : (
          <FavoriteBorderOutlinedIcon
            className="like-icon heart-icon"
            onClick={handleLike}
          />
        )}
      </div>
    </div>
  );
}
