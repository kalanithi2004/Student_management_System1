import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const createStudent = async (student) => {
  const response = await axios.post(
    `${API_URL}/createstudent`,
    student
  );

  return response.data;
};

export const getStudents = async () => {
  const response = await axios.get(
    `${API_URL}/student`
  );

  return response.data;
};

export const getStudentById = async (id) => {
  const response = await axios.get(
    `${API_URL}/student/${id}`
  );

  return response.data;
};

export const updateStudent = async (id, student) => {
  const response = await axios.put(
    `${API_URL}/student/${id}`,
    student
  );

  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await axios.delete(
    `${API_URL}/student/${id}`
  );

  return response.data;
};