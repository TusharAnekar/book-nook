import { useContext } from "react";
import { useState } from "react";

import "./addressModal.css";
import { AddressContext } from "../../contexts/address-context";

export function AddressModal() {
  const {
    addressState: { addresses },
    submitAddress,
    toggleAddressModal,
  } = useContext(AddressContext);

  const [addressDetails, setAddressDetails] = useState({
    id: null,
    name: "",
    area: "",
    city: "",
    state: "",
    pincode: null,
    phoneNo: null,
  });

  function handleInput(e) {
    setAddressDetails({ ...addressDetails, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitAddress({ ...addressDetails, id: addresses.length + 1 });
    toggleAddressModal(false);
  }

  function fillDummyAddress() {
    setAddressDetails({
      ...addressDetails,
      id: addresses.length + 1,
      name: "Test",
      area: "Bandra",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: 123456,
      phoneNo: 1234567890,
    });
  }

  return (
    <div className="modal-container">
      <div className="address-modal-container">
        <h3>Address</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={addressDetails.name}
            required
            onChange={handleInput}
          />
          <input
            type="text"
            placeholder="Area"
            name="area"
            value={addressDetails.area}
            required
            onChange={handleInput}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={addressDetails.city}
            required
            onChange={handleInput}
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={addressDetails.state}
            required
            onChange={handleInput}
          />
          <input
            type="number"
            placeholder="Pincode"
            name="pincode"
            value={addressDetails.pincode}
            min={100000}
            maxLength={6}
            required
            onChange={handleInput}
          />
          <input
            type="number"
            placeholder="Phone No."
            name="phoneNo"
            value={addressDetails.phoneNo}
            required
            maxLength={10}
            min={1000000000}
            onChange={handleInput}
          />
          <div className="submit-cancel-container">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button
              className="cancel-button"
              onClick={() => toggleAddressModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
        <button onClick={fillDummyAddress} className="submit-button">
          Fill with Dummy Values
        </button>
      </div>
    </div>
  );
}
