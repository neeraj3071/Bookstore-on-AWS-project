import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cost, setCost] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await axios.get(`http://localhost:8080/book/${id}`);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setCost(response.data.cost);
      } catch (error) {
        console.error("Error fetching book data:", error);
        setError("Error fetching book details");
      }
    }

    fetchBook();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !cost) {
      setError("All fields are required!");
      return;
    }

    const updatedBook = { title, author, cost };

    try {
      await axios.put(`http://localhost:8080/book/${id}`, updatedBook);
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
      setError("Failed to update book");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Book</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Book Name</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Author Name</label>
              <input
                type="text"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cost</label>
              <input
                type="text"
                className="form-control"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Update
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
