import axios from "axios";

export const deleteWishlistService = async (encodedToken, productId) =>
  await axios.delete(`/api/user/wishlist/${productId}`, {
    headers: { authorization: encodedToken },
  });
