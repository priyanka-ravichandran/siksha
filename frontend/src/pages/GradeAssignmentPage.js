import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const GradeAssignmentPage = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const toastRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/assignments/${id}`)
      .then((res) => setAssignment(res.data))
      .catch((err) => console.error("Error fetching assignment:", err));
  }, [id]);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const handleSubmit = () => {
    if (grade < 0 || grade > 100) {
      showToast("Grade must be between 0 and 100", "danger");
      return;
    }

    axios
      .put(`http://localhost:5001/api/assignments/${id}/grade`, { grade, feedback })
      .then(() => showToast("✅ Grade submitted successfully!", "success"))
      .catch(() => showToast("❌ Failed to submit grade", "danger"));
  };

  if (!assignment) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div
        className="toast-container position-fixed top-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          ref={toastRef}
          className={`toast align-items-center text-white bg-${toast.type} ${toast.show ? "show" : "hide"}`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body fw-semibold">{toast.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setToast({ show: false, message: "", type: "success" })}
            ></button>
          </div>
        </div>
      </div>

      <div className="row align-items-start">
        <div className="col-md-5">
          <h3 className="fw-bold mb-4">Grade Assignment</h3>
          <p><strong>Title:</strong> {assignment.title}</p>
          <p><strong>Description:</strong> {assignment.description}</p>
          <p><strong>Student ID:</strong> {assignment.student_id}</p>

          <div className="mb-3">
            <label className="form-label">Grade (0–100)</label>
            <input
              type="number"
              className="form-control"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Enter grade"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Feedback</label>
            <textarea
              className="form-control"
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter feedback"
            />
          </div>

          <button className="btn btn-warning fw-bold" onClick={handleSubmit}>
            Submit Grade
          </button>
        </div>

        <div className="col-md-7">
          <iframe
            src={assignment.file_url}
            title="Assignment PDF"
            width="100%"
            height="750px"
            style={{ border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default GradeAssignmentPage;
