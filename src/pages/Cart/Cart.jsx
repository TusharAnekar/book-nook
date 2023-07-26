import { useContext } from "react";

import "./cart.css";
import { CartContext } from "../../contexts/cart-context";

export function Cart() {
  const {
    cartState: { cart },
    removeProductFromCart,
  } = useContext(CartContext);
  return (
    <div className="cart-container">
      {cart.length ? (
        <div>
          <h2>My Cart</h2>
          {cart.map(({ _id, img, author, name, price }) => (
            <div key={_id} className="book-cart-container">
              <img src={img} alt={name} />
              <div>
                <p>
                  <strong>{name}</strong>
                </p>
                <p>{author}</p>
                <p>{price}</p>
                <button onClick={() => removeProductFromCart(_id)}>
                  Remove from cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>No books in cart</h2>
      )}
    </div>
  );
}