import React, { useState } from "react";

import {
  getStudentById,
  updateStudent
} from "../api/studentApi";

export default function UpdateStudent() {

  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [cgpa, setCgpa] = useState("");

  const [studentFound, setStudentFound] = useState(false);

  const findStudent = async () => {

    if (!id) {
      alert("Enter student ID");
      return;
    }

    try {

      const student = await getStudentById(id);

      setName(student.name);
      setEmail(student.email);
      setAge(student.age);
      setDepartment(student.department);
      setYear(student.year);
      setCgpa(student.cgpa);

      setStudentFound(true);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Student not found"
      );

      setStudentFound(false);
    }
  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    const body = {
      name,
      email,
      age: Number(age),
      department,
      year: Number(year),
      cgpa: Number(cgpa)
    };

    try {

      await updateStudent(id, body);

      alert("Student updated successfully");

      setStudentFound(false);
      setId("");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Update failed"
      );
    }
  };

  return (
    <div className="form-card">

      <h2>Update Student</h2>

      {/* Find Student */}
      <div className="find-student">

        <input
          type="number"
          placeholder="Enter Student ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <button onClick={findStudent}>
          Find
        </button>

      </div>

      {/* Update Form */}

      {studentFound && (

        <form
          className="update-form"
          onSubmit={handleUpdate}
        >

          <div className="form-group">
            <label htmlFor="update-name">
              Name:
            </label>

            <input
              type="text"
              id="update-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label htmlFor="update-email">
              Email:
            </label>

            <input
              type="email"
              id="update-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label htmlFor="update-age">
              Age:
            </label>

            <input
              type="number"
              id="update-age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label htmlFor="update-department">
              Department:
            </label>

            <input
              type="text"
              id="update-department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label htmlFor="update-year">
              Year:
            </label>

            <input
              type="number"
              id="update-year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label htmlFor="update-cgpa">
              CGPA:
            </label>

            <input
              type="number"
              step="0.01"
              id="update-cgpa"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
            />
          </div>


          <button type="submit">
            Update Student
          </button>

        </form>

      )}

    </div>
  );
}