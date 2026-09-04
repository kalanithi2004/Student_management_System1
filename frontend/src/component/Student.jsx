import React, { useState } from "react";

import NewStudent from "./new_student";
import GetStudent from "./get_student";
import GetById from "./get_by_id";
import UpdateStudent from "./update_student";
import DeleteStudent from "./delete_student";

import "./Student.css";

export default function Student() {
  const [page, setPage] = useState("get");

  return (
    <div className="student-app">

      <h1>Student Management System</h1>

      <div className="navbar">

        <button onClick={() => setPage("new")}>
          New Student
        </button>

        <button onClick={() => setPage("get")}>
          All Students
        </button>

        <button onClick={() => setPage("getbyid")}>
          Find Student
        </button>

        <button onClick={() => setPage("update")}>
          Update Student
        </button>

        <button onClick={() => setPage("delete")}>
          Delete Student
        </button>

      </div>

      <div className="content">

        {page === "new" && <NewStudent />}

        {page === "get" && <GetStudent />}

        {page === "getbyid" && <GetById />}

        {page === "update" && <UpdateStudent />}

        {page === "delete" && <DeleteStudent />}

      </div>

    </div>
  );
}