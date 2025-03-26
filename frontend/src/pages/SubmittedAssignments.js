import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/api/assignments/";

const SubmittedAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setAssignments(res.data);
        if (res.data.length > 0) {
          setSelectedAssignment(res.data[0]);
        }
      })
      .catch((err) => console.error("Error fetching assignments:", err));
  }, []);

  return (
    <div className="container-fluid mt-4">
      <div className="row" style={{ minHeight: "80vh" }}>
        <div className="col-md-6 border-end">
          <div className="px-4">
            <h5 className="fw-semibold text-dark mb-3 border-bottom pb-2">📚 Assignments</h5>
            <ul className="list-group">
              {assignments.map((assignment) => (
                <li
                  key={assignment.id}
                  className="list-group-item list-group-item-action"
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedAssignment?.id === assignment.id ? "#ffc107" : "",
                    color: selectedAssignment?.id === assignment.id ? "#000" : "",
                    fontWeight: selectedAssignment?.id === assignment.id ? "bold" : "normal",
                    borderColor: selectedAssignment?.id === assignment.id ? "#ffca2c" : "",
                  }}
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  <strong>{assignment.title}</strong>
                  <br />
                  <small>{assignment.student_id}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="px-4">
            {selectedAssignment ? (
              <>
                <h5 className="fw-semibold text-dark mb-2 mt-2">{selectedAssignment.title}</h5>
                <p className="text-muted mb-4">{selectedAssignment.description}</p>
                <iframe
                  src={selectedAssignment.file_url}
                  title="Assignment PDF"
                  width="100%"
                  height="600px"
                ></iframe>
              </>
            ) : (
              <p className="text-muted">Select an assignment to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmittedAssignments;
