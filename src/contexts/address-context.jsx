import { useReducer } from "react";
import { createContext } from "react";
import {
  addressReducer,
  initialAddressState,
} from "../reducers/addressReducer";

export const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [addressState, addressDispatch] = useReducer(
    addressReducer,
    initialAddressState
  );

  function submitAddress(address) {
    addressDispatch({ type: "SET_ADDRESS", payload: address });
  }

  function toggleAddressModal(isShowModal) {
    addressDispatch({ type: "SET_SHOW_ADDRESS_MODAL", payload: isShowModal });
  }

  function setDeliveryAddress (deliveryAddress) {
    addressDispatch({ type: "SET_DELIVERY_ADDRESS", payload: deliveryAddress });

  }

  return (
    <AddressContext.Provider
      value={{
        addressState,
        addressDispatch,
        submitAddress,
        toggleAddressModal,
        setDeliveryAddress
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
