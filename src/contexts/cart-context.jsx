import { useEffect } from "react";
import { createContext } from "react";
import { getCartService } from "../services/cart-services/getCartService";
import { useContext } from "react";
import { AuthContext } from "./auth-context";
import { useReducer } from "react";
import { cartReducer, initialCartState } from "../reducers/cartReducer";
import { addToCartService } from "../services/cart-services/addToCartService";
import { deleteCartService } from "../services/cart-services/deleteCartService";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function getCart() {
      try {
        const response = await getCartService(token);
        const {
          status,
          data: { cart },
        } = response;

        if (status === 200) {
          cartDispatch({ type: "DISPLAY_CART", payload: cart });
        }
      } catch (error) {
        console.log(error);
      }
    }
    token && getCart();
  }, [token]);

  async function addProductToCart(book) {
    try {
      const response = await addToCartService(token, book);
      const {
        status,
        data: { cart },
      } = response;

      if (status === 201) {
        cartDispatch({ type: "ADD_TO_CART", payload: cart });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromCart(id) {
    try {
      const response = await deleteCartService(id, token);
      const {
        status,
        data: { cart },
      } = response;

      if (status === 200) {
        cartDispatch({ type: "REMOVE_FROM_CART", payload: cart });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const bookInCart = (book) => cartState.cart.some(({_id}) => _id === book._id)

  return (
    <CartContext.Provider
      value={{
        cartState,
        cartDispatch,
        addProductToCart,
        removeProductFromCart,
        bookInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
