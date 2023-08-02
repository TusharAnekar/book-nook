import { AddressModal } from "../../modal/AddressModal/AddressModal";
import { useContext, useState } from "react";
import { AddressContext } from "../../contexts/address-context";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart-context";

import "./checkout.css";
import { toast } from "react-toastify";

export function Checkout() {

  const [isDeliveryAddressSet, setIsDeliveryAddressSet] = useState(false)

  const {
    addressState: { showAddressModal, addresses, deliveryAddress },
    toggleAddressModal,
    setDeliveryAddress,
  } = useContext(AddressContext);

  const navigate = useNavigate();

  const {
    cartState: { cart },
    price,
    totalDiscount,
    totalAmount,
    emptyCart,
  } = useContext(CartContext);

  function handlePlaceOrder() {
    console.log(deliveryAddress.pincode)
    if (isDeliveryAddressSet) {
      toast.success("Order placed successfully.");
      setIsDeliveryAddressSet(false)
      navigate("/products");
      emptyCart();
    } else {
      if(addresses.length) {
        toast.error("Please select address to place order.");
      } else {
        toast.error("Please add address to place order.")
      }
    }
  }

  function handleInput (address) {
    setDeliveryAddress(address)
    setIsDeliveryAddressSet(true)
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="address-order-container">
        <div>
          <button onClick={() => toggleAddressModal(true)}>
            Add New Address
          </button>

          <div>
            <h3>Select Address</h3>
            {addresses.map((address) => {
              const { id, name, area, city, state, pincode, phoneNo } = address;
              return (
                <div key={id} className="address-container">
                  <input
                    type="radio"
                    name="address"
                    onClick={() => handleInput(address)}
                  />
                  <div>
                    <p>
                      <strong>{name}</strong>
                    </p>
                    <p>{area}</p>
                    <p>{city}</p>
                    <p>{state}</p>
                    <p>{pincode}</p>
                    <p>{phoneNo}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="order-summary-container">
          <h3>Order Summary</h3>
          <div className="books-container">
            <div className="book-content-container">
              <p className="bold">Books ({cart.length} items)</p>
              <p className="bold">Quantity</p>
            </div>
            <div className="book-content-container">
              <div>
                {cart.map(({ name }) => (
                  <p>{name}</p>
                ))}
              </div>
              <div>
                {cart.map(({ qty }) => (
                  <p>{qty}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="price-details-container">
            <p className="price-details-header">Price Details</p>
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

            {deliveryAddress.name && (
              <div>
                <p className="delivery-header">Delivery Details</p>
                <div>
                  <p>{deliveryAddress.name}</p>
                  <p>{deliveryAddress.area}</p>
                  <p>{deliveryAddress.city}</p>
                  <p>{deliveryAddress.state}</p>
                  <p>{deliveryAddress.pincode}</p>
                  <p>{deliveryAddress.phoneNo}</p>
                </div>
              </div>
            )}
            <button
              className="checkout-button"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      {showAddressModal && <AddressModal />}
    </div>
  );
}
