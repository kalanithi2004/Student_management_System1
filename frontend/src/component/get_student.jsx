import React, { useEffect, useState } from "react";
import { getStudents } from "../api/studentApi";

export default function GetStudent() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadStudents = async () => {

    try {

      setLoading(true);

      const data = await getStudents();

      setStudents(data);

    } catch (error) {

      console.log(error);

      if (error.response?.status === 404) {
        setStudents([]);
      } else {
        alert("Failed to get students");
      }

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <h2>All Students</h2>

      <button onClick={loadStudents}>
        Refresh
      </button>

      {students.length === 0 ? (

        <p>No students found.</p>

      ) : (
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

            {students.map((student) => (

              <tr key={student.id}>

                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
                <td>{student.cgpa}</td>

              </tr>

            ))}

          </tbody>

        </table>
        </div>
      )}

    </div>
  );
}