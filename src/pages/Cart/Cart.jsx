import { useContext } from "react";

import "./cart.css";
import { CartContext } from "../../contexts/cart-context";
import { useNavigate } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export function Cart() {
  const navigate = useNavigate();

  const {
    cartState: { cart },
    removeProductFromCart,
    updateQuantityInCart,
    price,
    totalDiscount,
    totalAmount,
  } = useContext(CartContext);

  function handleBookQuantityUpdate(_id, typeOfUpdate, qty) {
    if (qty) {
      updateQuantityInCart(_id, typeOfUpdate);
    } else {
      removeProductFromCart(_id);
    }
  }

  return (
    <div className="cart-container">
      {cart.length ? (
        <div className="cart-price-container">
          <div>
            <h2>My Cart</h2>
            {cart.map(({ _id, img, author, name, price, qty }) => (
              <div key={_id} className="book-cart-container">
                <img
                  src={img}
                  alt={name}
                  onClick={() => navigate(`/products/${_id}`)}
                />
                <div>
                  <p>
                    <strong>{name}</strong>
                  </p>
                  <p>{author}</p>
                  <p>{price}</p>
                  <RemoveCircleIcon
                    className="icon remove"
                    onClick={() =>
                      handleBookQuantityUpdate(_id, "decrement", qty)
                    }
                  />
                  <span className="qty-number">{qty}</span>
                  <AddCircleIcon
                    className="icon add"
                    onClick={() =>
                      handleBookQuantityUpdate(_id, "increment", qty)
                    }
                  />

                  <button onClick={() => removeProductFromCart(_id)}>
                    Remove from cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="price-details-container">
            <h3 className="price-details-header">Price Details</h3>
            <div className="price-content-container">
              <p>Price ({cart.length} items)</p>
              <p>₹{price}</p>
            </div>
            <div className="price-content-container">
              <p>Discount</p>
              <p>-₹{totalDiscount}</p>
            </div>
            <div className="price-content-container">
              <p>Delivery Charges</p>
              <p>FREE</p>
            </div>
            <div className="price-content-container total-amount-container">
              <p>Total Amount</p>
              <p>₹{totalAmount}</p>
            </div>
            <p className="total-amount-text">
              You will save ₹ {totalDiscount} on this order
            </p>
            <button className="checkout-button">Checkout</button>
          </div>
        </div>
      ) : (
        <h2>No books in cart</h2>
      )}
    </div>
  );
}
