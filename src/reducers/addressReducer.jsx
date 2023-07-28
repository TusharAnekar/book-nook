export const initialAddressState = {
  addresses: [],
  showAddressModal: false,
  deliveryAddress: {},
};

export const addressReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_SHOW_ADDRESS_MODAL":
      return { ...state, showAddressModal: payload };
    case "SET_ADDRESS":
      return { ...state, addresses: [...state.addresses, payload] };
    case "SET_DELIVERY_ADDRESS":
      return {
        ...state,
        deliveryAddress: payload,
      };
    default:
      return state;
  }
};
