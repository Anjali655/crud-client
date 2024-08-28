import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, getUserById, deleteUser } from "../features/userDetailSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.userDetail);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleEdit = (id) => {
    if (id) {
      navigate(`/edit-user/${id}`);
    } else {
      console.error("User ID is undefined");
    }
  };

  const handleView = async (id) => {
    if (!id) {
      console.error("User ID is undefined");
      return;
    }
    try {
      const user = await dispatch(getUserById(id)).unwrap();
      setSelectedUser(user);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const handleDelete = async (id) => {
    if (id) {
      try {
        await dispatch(deleteUser(id)).unwrap();
        swal("Good job!", "User has been successfully deleted.!", "success");
        // Refresh the user list after deletion
        dispatch(getUsers());
      } catch (error) {
        swal("Error!", "Error deleting user", "error");
        console.error("Error deleting user:", error);
      }
    } else {
      console.error("User ID is undefined");
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center m-3"></div>

      {users.map((user) => {
        const userId = user.id || user._id;

        return (
          <div
            key={userId}
            className="d-flex justify-content-center align-items-center mb-3"
          >
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title text-center">{user.name}</h5>

                <div className="mb-3 d-flex gap-2 justify-content-center align-items-center">
                  <button
                    className="btn btn-outline-success"
                    onClick={() => handleView(userId)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => handleEdit(userId)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(userId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Age:</strong> {selectedUser.age}
              </p>
              <p>
                <strong>Addresses:</strong>
              </p>
              <ul>
                {selectedUser.addresses.map((address, index) => (
                  <li key={index}>
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
