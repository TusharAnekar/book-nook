import axios from "axios";

export const addToCartService = async (encodedToken, product) =>
  await axios.post(
    "/api/user/cart",
    {
      product,
    },
    { headers: { authorization: encodedToken } }
  );
