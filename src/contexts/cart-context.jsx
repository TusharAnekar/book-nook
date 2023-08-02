import { useEffect } from "react";
import { createContext } from "react";
import { getCartService } from "../services/cart-services/getCartService";
import { useContext } from "react";
import { AuthContext } from "./auth-context";
import { useReducer } from "react";
import { cartReducer, initialCartState } from "../reducers/cartReducer";
import { addToCartService } from "../services/cart-services/addToCartService";
import { deleteCartService } from "../services/cart-services/deleteCartService";
import { quantityCartService } from "../services/cart-services/quantityCartService";
import { toast } from "react-toastify";
import { useState } from "react";


export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
  const [isLoadingCart, setIsLoadingCart] = useState(false)
  const { token } = useContext(AuthContext);

  useEffect(() => {
    
    async function getCart() {
      setIsLoadingCart(true)
      try {
        const response = await getCartService(token);
        const {
          status,
          data: { cart },
        } = response;

        if (status === 200) {
          cartDispatch({ type: "DISPLAY_CART", payload: cart });
          setIsLoadingCart(false)
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
        toast.success("Added to cart")
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromCart(id, isEmptyCart) {
    try {
      const response = await deleteCartService(id, token);
      const {
        status,
        data: { cart },
      } = response;

      if (status === 200) {
        cartDispatch({ type: "REMOVE_FROM_CART", payload: cart });
        !isEmptyCart && toast.error("Removed from cart")
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateQuantityInCart(id, typeOfUpdate) {
    try {
      const response = await quantityCartService(token, id, typeOfUpdate);
      const {
        status,
        data: { cart },
      } = response;

      if (status === 200) {
        cartDispatch({ type: "UPDATE_QUANTITY_IN_CART", payload: cart });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function emptyCart () {
    for (let i=0; i<cartState?.cart?.length ; i++) {
      removeProductFromCart(cartState.cart[i]._id, true)
    }
  }


  const bookInCart = (book) =>
    cartState.cart.some(({ _id }) => _id === book._id);

  const price = cartState.cart.reduce((total,{originalPrice, qty}) => total + (originalPrice * qty),0)

  const totalDiscount = cartState.cart.reduce((total, {originalPrice, qty, price}) => total + ((originalPrice-price)*qty),0)

  const totalAmount = cartState.cart.reduce((total, {price,qty}) => total+(price*qty),0)

  return (
    <CartContext.Provider
      value={{
        cartState,
        cartDispatch,
        addProductToCart,
        removeProductFromCart,
        bookInCart,
        updateQuantityInCart,
        price,
        totalDiscount,
        totalAmount,
        emptyCart,
        isLoadingCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
