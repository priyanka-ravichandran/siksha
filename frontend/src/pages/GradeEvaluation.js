import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5001/api/assignments/";

const GradeEvaluation = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setAssignments(response.data))
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);

  const handleGradeClick = (id) => {
    navigate(`/grade/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">Grade Assignments</h2>
      <table className="table table-bordered shadow-sm bg-white">
        <thead className="table-dark text-center">
          <tr>
            <th style={{ width: "20%" }}>Title</th>
            <th style={{ width: "45%" }}>Description</th>
            <th style={{ width: "15%" }}>Student ID</th>
            <th style={{ width: "20%" }}>File</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id} className="align-middle text-center">
              <td className="fw-semibold">{assignment.title}</td>
              <td className="text-wrap">{assignment.description}</td>
              <td>{assignment.student_id}</td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <a
                    href={assignment.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    View File
                  </a>
                  <button
                    className="btn btn-warning btn-sm fw-bold"
                    onClick={() => handleGradeClick(assignment.id)}
                  >
                    Grade
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeEvaluation;
