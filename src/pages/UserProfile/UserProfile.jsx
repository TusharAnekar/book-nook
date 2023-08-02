import { useContext, useState } from "react";
import "./userProfile.css";
import { AuthContext } from "../../contexts/auth-context";
import { AddressContext } from "../../contexts/address-context";
import { AddressModal } from "../../modal/AddressModal/AddressModal";
export function UserProfile() {
  const [isAddressToBeShown, setIsAddressToBeShown] = useState(false);

  const { currentUser, logoutUser } = useContext(AuthContext);

  const {
    addressState: { showAddressModal, addresses },
    toggleAddressModal,
    deleteAddress,
  } = useContext(AddressContext);

  function handleProfileToBeShown(accountDetailsType) {
    if (accountDetailsType === "profile") {
      setIsAddressToBeShown(false);
    } else {
      setIsAddressToBeShown(true);
    }
  }

  function handleLogout() {
    logoutUser();
  }

  function handleRemove(id) {
    deleteAddress(id);
  }

  return (
    <div className="user-profile-container">
      {showAddressModal && <AddressModal />}
      <h2>Account</h2>
      <div className="account-details-container">
        <div className="profile-addresss-tabs">
          <p
            className={!isAddressToBeShown && "active-tab"}
            onClick={() => handleProfileToBeShown("profile")}
          >
            Profile
          </p>
          <p
            className={isAddressToBeShown && "active-tab"}
            onClick={() => handleProfileToBeShown("address")}
          >
            Address
          </p>
        </div>

        {!isAddressToBeShown ? (
          <div className="profile-details-container">
            <p>
              <strong>Profile Details</strong>
            </p>

            <div className="name-email-container">
              <div>
                <p>Name:</p>
                <p>Email:</p>
              </div>
              <div>
                <p>
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <p>{currentUser.email}</p>
              </div>
            </div>

            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="addresses-details-container">
            <p>
              <strong>My Addresses</strong>
            </p>
            <div className="addresses-container">
              {addresses.map((address) => {
                const { id, name, area, city, state, pincode, phoneNo } =
                  address;
                return (
                  <div key={id} className="address-container">
                    <div>
                      <p>
                        <strong>{name}</strong>
                      </p>
                      <p>{area}</p>
                      <p>{city}</p>
                      <p>{state}</p>
                      <p>{pincode}</p>
                      <p>{phoneNo}</p>
                      <div className="edit-remove-button-container">
                        <button
                          className="remove-button"
                          onClick={() => handleRemove(id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className="add-address-button"
              onClick={() => toggleAddressModal(true)}
            >
              Add Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
