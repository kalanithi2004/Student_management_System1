import React, { useState } from "react";
import { getStudentById } from "../api/studentApi";

export default function GetById() {
  const [id, setId] = useState("");
  const [student, setStudent] = useState(null);

  const handleSearch = async () => {
    if (!id) {
      alert("Enter student ID");
      return;
    }

    try {
      const data = await getStudentById(id);

      setStudent(data);
    } catch (error) {
      console.log(error);

      setStudent(null);

      alert(error.response?.data?.detail || "Student not found");
    }
  };

  return (
    <div className="form-card">
      <h2>Find Student</h2>
      <div className="find-student">
        <input
          type="number"
          placeholder="Enter Student ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>
      {student && (
        <div className="student-table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Department</th>
                <th>Year</th>
                <th>CGPA</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
                <td>{student.cgpa}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
