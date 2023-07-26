import "./bookcard.css";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { useContext, useState } from "react";
import { WishlistContext } from "../../contexts/wishlist-context";
import { CartContext } from "../../contexts/cart-context";

export function BookCard({ book }) {
  const { img, name, author, price, originalPrice, rating } = book;

  const [showLike, setShowLike] = useState(false);
  const { addProductToWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);

  const discountPercentage = Math.trunc(
    ((originalPrice - price) / originalPrice) * 100
  );

  function handleLike() {
    addProductToWishlist(book);
    setShowLike(!showLike);
  }

  function handleAddToCart() {
    addProductToCart(book);
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

        <button onClick={handleAddToCart}>Add to Cart</button>
        {showLike ? (
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
