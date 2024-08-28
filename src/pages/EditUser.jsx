import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../features/userDetailSlice";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL params
  const { user, error } = useSelector((state) => state.userDetail);

  // Initialize form state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [addresses, setAddresses] = useState([
    { street: "", city: "", state: "", country: "" },
  ]);

  // Fetch user details by ID when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await dispatch(getUserById(id)).unwrap(); // Fetch user by ID
        setName(fetchedUser.name);
        setAge(fetchedUser.age);
        setAddresses(fetchedUser.addresses);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, [dispatch, id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare updated user data
    const updatedUser = { _id: id, name, age, addresses };

    // Dispatch update action
    dispatch(updateUser(updatedUser))
      .then(() => {
        swal("Good job!", "User updated successfully!", "success");
        navigate("/"); // Redirect to user list after successful update
      })
      .catch((error) => {
        swal("Error!", "There is an error updating the user", "error");
        console.error("There is an error updating the user:", error);
      });
  };

  // Add new address field
  const addAddressField = () => {
    setAddresses([
      ...addresses,
      { street: "", city: "", state: "", country: "" },
    ]);
  };

  // Handle address field changes
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
            type="text"
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
              Update User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
