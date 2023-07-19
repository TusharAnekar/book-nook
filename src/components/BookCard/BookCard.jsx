import "./bookcard.css";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

export function BookCard({ book }) {
  const {
    _id,
    img,
    name,
    author,
    price,
    originalPrice,
    isBestSeller,
    category,
    rating,
  } = book;

  const [showLike, setShowLike] = useState(false);

  const discountPercentage = Math.trunc(
    ((originalPrice - price) / originalPrice) * 100
  );

  function handleLike() {
    setShowLike(!showLike);
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

        <button>Add to Cart</button>
        {showLike ? (
          <FavoriteIcon className="like-icon heart-icon-fill" onClick={handleLike} />
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
