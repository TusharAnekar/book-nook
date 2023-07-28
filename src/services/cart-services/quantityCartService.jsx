import axios from "axios";

export const quantityCartService = async (
  encodedToken,
  productId,
  typeOfUpdate
) =>
  await axios.post(
    `/api/user/cart/${productId}`,
    {
      action: {
        type: typeOfUpdate,
      },
    },
    { headers: { authorization: encodedToken } }
  );
