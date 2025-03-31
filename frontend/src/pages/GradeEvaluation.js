import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const GradeEvaluation = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://siksha.onrender.com";
  const API_URL = `${BASE_URL}/api/assignments`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setAssignments(response.data))
      .catch((error) => console.error("Error fetching assignments:", error));
  }, [API_URL]);

  const handleGradeClick = (id) => {
    navigate(`/grade/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">Grade Assignments</h2>
      <table className="table table-bordered shadow-sm bg-white">
        <thead className="table-dark text-center">
          <tr>
            <th style={{ width: "30%" }}>Title</th>
            <th style={{ width: "50%" }}>Description</th>
            <th style={{ width: "20%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id} className="align-middle text-center">
              <td className="fw-semibold">{assignment.title}</td>
              <td className="text-wrap">{assignment.description}</td>
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

                  {assignment.grade !== null ? (
                    <button
                      className="btn btn-outline-success btn-sm fw-bold"
                      onClick={() => handleGradeClick(assignment.id)}
                    >
                      View Grade
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm fw-bold"
                      onClick={() => handleGradeClick(assignment.id)}
                    >
                      Grade
                    </button>
                  )}
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
