import { useContext } from "react";

import "./wishlist.css";
import { WishlistContext } from "../../contexts/wishlist-context";
import { CartContext } from "../../contexts/cart-context";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function Wishlist() {
  const navigate = useNavigate();

  const {
    wishlistState: { wishlist },
    removeProductFromWishlist,
    isLoadingWishlist,
  } = useContext(WishlistContext);

  const {
    cartState: { cart },
    addProductToCart,
  } = useContext(CartContext);

  function handleMoveToCart(book) {
    if (!cart.some(({ _id }) => _id === book._id)) {
      addProductToCart(book);
      removeProductFromWishlist(book._id);
    }
  }

  return (
    <>
      {isLoadingWishlist ? (
        <Loader />
      ) : (
        <div className="wishlist-container">
          {wishlist.length ? (
            <div className="wishlist-books-container">
              <h2>My Wishlist</h2>
              {wishlist.map((book) => {
                const { _id, img, author, name, price } = book;
                return (
                  <div key={_id} className="wishlist-book-container">
                    <img
                      src={img}
                      alt={name}
                      onClick={() => navigate(`/products/${_id}`)}
                    />
                    <div className="wishlist-book-details">
                      <p>
                        <strong>{name}</strong>
                      </p>
                      <p>{author}</p>
                      <p>{price}</p>
                      <button onClick={() => handleMoveToCart(book)}>
                        {cart.some(({ _id }) => _id === book._id)
                          ? "Book in cart"
                          : "Move to cart"}
                      </button>
                      <button onClick={() => removeProductFromWishlist(_id)}>
                        Remove from wishlist
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h2>No books in wishlist</h2>
          )}
        </div>
      )}
    </>
  );
}
