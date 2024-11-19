import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cost, setCost] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !author || !cost) {
      setError("All fields are required!");
      return;
    }

    const book = { title, author, cost };

    try {
      await axios.post("http://localhost:8080/book", book);
      navigate("/");
    } catch (err) {
      console.error("Error adding book:", err);
      setError("Failed to add book");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Book</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Book Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Book name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Author Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cost</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Book cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <button className="btn btn-outline-danger mx-2" onClick={() => navigate("/")}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
