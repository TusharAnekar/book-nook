import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./bookDetails.css";
import { ProductsContext } from "../../contexts/products-context";
import StarIcon from "@mui/icons-material/Star";
import { CartContext } from "../../contexts/cart-context";
import { WishlistContext } from "../../contexts/wishlist-context";

export function BookDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    productsState: { products },
    getDiscount,
  } = useContext(ProductsContext);

  const { bookInCart, addProductToCart } = useContext(CartContext);
  const { bookInWishlist, addProductToWishlist } = useContext(WishlistContext);

  const book = products.find(({ _id }) => _id === productId);

  const {
    img,
    name,
    author,
    price,
    originalPrice,
    isBestSeller,
    category,
    rating,
  } = book;

  const discountPercentage = getDiscount(originalPrice, price);
  const isBookInCart = bookInCart(book);
  const isBookInWishlist = bookInWishlist(book);

  function handleAddToCart() {
    if (isBookInCart) {
      navigate("/cart");
    } else {
      addProductToCart(book);
    }
  }

  function handleAddToWishlist() {
    if (!isBookInWishlist) {
      addProductToWishlist(book);
    } else {
      navigate("/wishlist");
    }
  }

  return (
    <div className="book-details-container">
      <div className="book-container">
        <img src={img} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="rating">
            {rating} <StarIcon className="star-icon" />
          </p>
          <div className="prices-container">
            <p>₹{price}</p>
            <p className="original-price">₹{originalPrice}</p>
            <p className="discount-percentage">{discountPercentage}% OFF</p>
          </div>
          <p className="red-text">Hurry , Only Few Left !</p>

          <div className="extra-details-container">
            <p>Fastest Delivery</p>
            <p>Inclusive of All Taxes</p>
            <p>Cash On Delivery Available</p>
          </div>

          <p>
            Author: <span className="primary-color-text">{author}</span>
          </p>
          <p>
            Category: <span className="primary-color-text">{category}</span>
          </p>
          <p>
            Language: <span className="primary-color-text">English</span>
          </p>
          {isBestSeller && <p className="best-seller-container">Best Seller</p>}

          <div className="buttons-container">
            <button className="cart-button" onClick={handleAddToCart}>
              {isBookInCart ? "Go to Cart" : "Add to Cart"}
            </button>
            <button className="wishlist-button" onClick={handleAddToWishlist}>
              {isBookInWishlist ? "Go to Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
