import "./bookcard.css";

import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { useContext } from "react";
import { WishlistContext } from "../../contexts/wishlist-context";
import { CartContext } from "../../contexts/cart-context";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../../contexts/products-context";



export function BookCard({ book }) {
  const { _id, img, name, author, price, originalPrice, rating } = book;

  const navigate = useNavigate()

  const {getDiscount} = useContext(ProductsContext)
  const { addProductToCart, bookInCart } = useContext(CartContext);
  const {bookInWishlist, addProductToWishlist, removeProductFromWishlist} = useContext(WishlistContext)
  
  const discountPercentage = getDiscount(originalPrice, price)

  const isBookInCart = bookInCart(book)
  const isBookInWishlist = bookInWishlist(book)

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
      <img src={img} alt={name} onClick={() => navigate(`/products/${_id}`)}/>
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
          <FavoriteIcon
            className= {isBookInWishlist ? "like-icon heart-icon-fill" : "like-icon"}
            onClick={handleLike}
          />
        
      </div>
    </div>
  );
}
