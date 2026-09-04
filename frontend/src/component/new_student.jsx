import React, { useState } from "react";
import { createStudent } from "../api/studentApi";

export default function NewStudent() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [cgpa, setCgpa] = useState("");

  const handleSubmit = async (e) => {

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

       await createStudent(body);

      alert("Student created successfully");

      setName("");
      setEmail("");
      setAge("");
      setDepartment("");
      setYear("");
      setCgpa("");

    } catch (error) {

      alert(
        error.response?.data?.detail ||
        "Failed to create student"
      );

    }
  };

  return (
    <div className="form-card">

      <h2>Create New Student</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          id="age"
          onChange={(e) => setAge(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label htmlFor="dep">Department:</label>
        <input
          type="text"
          placeholder="Enter Department"
          value={department}
          id="dep"
          onChange={(e) => setDepartment(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          placeholder="Enter Year"
          value={year}
          id="year"
          onChange={(e) => setYear(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label htmlFor="cgpa">CGPA:</label>
        <input
          type="number"
          step="0.01"
          placeholder="Enter CGPA"
          value={cgpa}
          id="cgpa"
          onChange={(e) => setCgpa(e.target.value)}
        />
         </div> 
        <button type="submit">
          Create Student
        </button>

      </form>

    </div>
  );
}