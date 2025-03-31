import React, { useEffect, useState } from "react";
import axios from "axios";

const SubmittedAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("No user ID found in localStorage.");
      return;
    }

    const API_URL = `http://localhost:5001/api/assignments/user/${userId}`;

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
            <h5 className="fw-semibold text-dark mb-3 border-bottom pb-2">
              📚 Assignments
            </h5>
            <ul className="list-group">
              {assignments.map((assignment) => (
                <li
                  key={assignment.id}
                  className="list-group-item list-group-item-action"
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedAssignment?.id === assignment.id ? "#ffc107" : "",
                    color:
                      selectedAssignment?.id === assignment.id ? "#000" : "",
                    fontWeight:
                      selectedAssignment?.id === assignment.id ? "bold" : "normal",
                    borderColor:
                      selectedAssignment?.id === assignment.id ? "#ffca2c" : "",
                  }}
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  <strong>{assignment.title}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="px-4">
            {selectedAssignment ? (
              <>
                <h5 className="fw-semibold text-dark mb-2 mt-2">
                  {selectedAssignment.title}
                </h5>
                <p className="text-muted mb-3">
                  {selectedAssignment.description}
                </p>

                {selectedAssignment.grade !== null && (
                  <div
                    className="p-3 rounded mb-4"
                    style={{ backgroundColor: "rgba(255, 241, 174, 0.5)" }}
                  >
                    <h6 className="fw-bold mb-2">📄 Assignment Evaluated</h6>
                    <p className="mb-1 fw-semibold">
                      Grade:{" "}
                      <span className="badge bg-dark ms-2">
                        {selectedAssignment.grade} / 100
                      </span>
                    </p>

                    {selectedAssignment.feedback && (
                      <div className="mt-2">
                        <strong>Feedback:</strong>
                        <p
                          className="mt-1 mb-0"
                          style={{
                            backgroundColor: "transparent",
                            fontStyle: "italic",
                            paddingLeft: "5px",
                          }}
                        >
                          {selectedAssignment.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                )}

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
