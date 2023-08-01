import { useEffect } from "react";
import { createContext } from "react";
import { getWishlistService } from "../services/wishlist-services/getWishlistService";
import { useContext } from "react";
import { AuthContext } from "./auth-context";
import { useReducer } from "react";
import {
  initialWishlistState,
  wishlistReducer,
} from "../reducers/wishlistReducer";
import { addToWishlistService } from "../services/wishlist-services/addToWishlistService";
import { deleteWishlistService } from "../services/wishlist-services/deleteWishlistService";
import { toast } from "react-toastify";
import { useState } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { token } = useContext(AuthContext);
  
  const [wishlistState, wishlistDispatch] = useReducer(
    wishlistReducer,
    initialWishlistState
  );

  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false)

  useEffect(() => {
    async function getWishlist() {
      setIsLoadingWishlist(true)
      try {
        const response = await getWishlistService(token);
        const {
          status,
          data: { wishlist },
        } = response;

        if (status === 200) {
          wishlistDispatch({ type: "DISPLAY_WISHLIST", payload: wishlist });
          setIsLoadingWishlist(false)
        }
      } catch (error) {
        console.log(error);
      }
    }

    token && getWishlist();
  }, [token]);

  async function addProductToWishlist(book) {
    try {
      const response = await addToWishlistService(book, token);
      const {
        status,
        data: { wishlist },
      } = response;

      if (status === 201) {
        wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: wishlist });
        toast.success("Added to wishlist")
      }
    } catch (error) {
      console.error(error)
      toast.error("Unable to add to wishlist.")
    }
  }

  async function removeProductFromWishlist(id) {
    try {
      const response = await deleteWishlistService(token, id);
      const {
        status,
        data: { wishlist },
      } = response;

      if (status === 200) {
        wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: wishlist });
        toast.error("Removed from wishlist")
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to remove from wishlist.")
    }
  }

  const bookInWishlist = (book) => wishlistState.wishlist.some(({_id}) => _id === book._id)

  return (
    <WishlistContext.Provider
      value={{
        wishlistState,
        wishlistDispatch,
        addProductToWishlist,
        removeProductFromWishlist,
        bookInWishlist, isLoadingWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
