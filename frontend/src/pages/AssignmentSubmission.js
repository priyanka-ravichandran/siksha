import React, { useState, useRef } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/api/assignments/";
const SIGNED_URL_API = "http://localhost:5001/api/gcs/upload-url";

const AssignmentSubmission = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studentId, setStudentId] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const toastRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!studentId) newErrors.studentId = "Student ID is required.";
    if (!title) newErrors.title = "Title is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!file) newErrors.file = "File upload is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const { data } = await axios.get(SIGNED_URL_API, {
        params: {
          fileName: file.name,
          contentType: file.type,
        },
      });

      const { uploadUrl, publicUrl } = data;

      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      await axios.post(API_URL, {
        title,
        description,
        student_id: studentId,
        file_url: publicUrl,
      });

      setShowToast(true);

      setTitle("");
      setDescription("");
      setStudentId("");
      setFile(null);
      setErrors({});

      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      console.error("Error uploading assignment:", error);
      alert("Failed to upload assignment.");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="toast-container position-fixed end-0 p-3"
        style={{ zIndex: 1055, top: "70px" }}
      >
        <div
          className={`toast align-items-center text-white bg-success border-0 ${showToast ? "show" : ""}`}
          role="alert"
          ref={toastRef}
        >
          <div className="d-flex">
            <div className="toast-body fw-semibold">
              ✅ Assignment uploaded successfully!
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      </div>

      <h2 className="fw-bold text-dark mb-5 text-center">Assignment Submission</h2>

      <div className="card shadow-sm p-4 bg-light w-50 mx-auto">
        <h3 className="text-dark mb-3 text-start">Upload Assignment</h3>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12">
            <label className="form-label text-dark">Student ID</label>
            <input
              type="text"
              className={`form-control ${errors.studentId ? "is-invalid" : ""}`}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            {errors.studentId && <div className="invalid-feedback">{errors.studentId}</div>}
          </div>

          <div className="col-12">
            <label className="form-label text-dark">Title</label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          <div className="col-12">
            <label className="form-label text-dark">Description</label>
            <textarea
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>

          <div className="col-12">
            <label className="form-label text-dark">Upload File</label>
            <input
              type="file"
              className={`form-control ${errors.file ? "is-invalid" : ""}`}
              onChange={handleFileChange}
            />
            {errors.file && <div className="invalid-feedback">{errors.file}</div>}
          </div>

          <div className="col-12 d-flex justify-content-center">
            <button type="submit" className="btn btn-warning text-dark fw-bold px-4">
              Submit Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentSubmission;
