import React, { useState } from "react";
import AddUserImage from "../assets/images/AddUser.jpg";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../features/userDetailSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [addresses, setAddresses] = useState([
    { street: "", city: "", state: "", country: "" },
  ]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validations can be added here if necessary
    if (
      !name ||
      !age ||
      addresses.some(
        (addr) => !addr.street || !addr.city || !addr.state || !addr.country
      )
    ) {
      setError("Please fill out all fields.");
      return;
    }

    let user = { name, age, addresses };

    try {
      await dispatch(createUser(user)).unwrap();
      swal("Good job!", "User added successfully!", "success");
      setName("");
      setAge("");
      setAddresses([{ street: "", city: "", state: "", country: "" }]);
      setError("");
      navigate("/"); // Redirect after successful creation
    } catch (error) {
      swal("Error!", "There is an error adding the user", "error");
      console.warn("There is an error adding the user :", error);
      setError("Failed to add user. Please try again.");
    }
  };

  const addAddressField = () => {
    setAddresses([
      ...addresses,
      { street: "", city: "", state: "", country: "" },
    ]);
  };

  const handleAddressChange = (index, event) => {
    const newAddresses = addresses.map((address, i) => {
      if (i === index) {
        return { ...address, [event.target.name]: event.target.value };
      }
      return address;
    });
    setAddresses(newAddresses);
  };

  return (
    <div>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <label className="form-label">Addresses</label>
        <div className="mb-3">
          {addresses.map((address, index) => (
            <div className="mb-3 d-flex gap-1" key={index}>
              <input
                type="text"
                name="street"
                value={address.street}
                placeholder="Street"
                className="form-control"
                onChange={(e) => handleAddressChange(index, e)}
              />
              <input
                type="text"
                name="city"
                value={address.city}
                placeholder="City"
                className="form-control"
                onChange={(e) => handleAddressChange(index, e)}
              />
              <input
                type="text"
                name="state"
                value={address.state}
                placeholder="State"
                className="form-control"
                onChange={(e) => handleAddressChange(index, e)}
              />
              <input
                type="text"
                name="country"
                value={address.country}
                placeholder="Country"
                className="form-control"
                onChange={(e) => handleAddressChange(index, e)}
              />
            </div>
          ))}

          <div className="form-group d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={addAddressField}
            >
              Add Address
            </button>
            <button type="submit" className="btn btn-outline-success">
              Add User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
