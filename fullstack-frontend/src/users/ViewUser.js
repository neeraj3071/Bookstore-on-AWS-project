import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ViewBook() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const result = await axios.get(`http://localhost:8080/book/${id}`);
        setBook(result.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="py-4">
        <div className="card">
          <div className="card-header">Book ID: {book.id}</div>
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text">
              <b>Author:</b> {book.author}
            </p>
            <p className="card-text">
              <b>Cost:</b> {book.cost}
            </p>
            <Link className="btn btn-primary" to="/">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
