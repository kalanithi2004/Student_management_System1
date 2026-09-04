import React, { useState } from "react";
import { deleteStudent } from "../api/studentApi";
import "./Student.css";
export default function DeleteStudent() {

  const [id, setId] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Open popup
  const handleDeleteClick = () => {

    if (!id) {
      alert("Enter student ID");
      return;
    }

    setShowPopup(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {

    try {

      await deleteStudent(id);

      alert("Student deleted successfully");

      setId("");
      setShowPopup(false);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Delete failed"
      );

      setShowPopup(false);
    }
  };

  // Cancel popup
  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="form-card">

      <h2>Delete Student</h2>

      <div className="delete-form">

        <input
          type="number"
          placeholder="Enter Student ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <button
          className="delete-button"
          onClick={handleDeleteClick}
        >
          Delete Student
        </button>

      </div>


      {/* DELETE POPUP */}

      {showPopup && (

        <div className="popup-overlay">

          <div className="delete-popup">

            <div className="warning-icon">
              ⚠️
            </div>

            <h2>Delete Student</h2>

            <p>
              Are you sure you want to delete student <strong>{id}</strong>?
            </p>

            <div className="popup-buttons">

              <button
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-button"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}