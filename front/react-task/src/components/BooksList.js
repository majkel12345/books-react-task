import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Book from "./Book";
import "../style/Book.css";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const booksInCart = useSelector((state) => state);

  useEffect(() => {
    fetch("http://localhost:3001/api/book?page=1")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="book__container">
      <Link to="/cart" style={{ textDecoration: " none", color: "black" }}>
        <p>Przejdź do koszyka</p>
        <ShoppingCartIcon style={{ fontSize: "3rem" }} />
        <span>{booksInCart.length}</span>
      </Link>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="book_list">
          {books.map((book) => {
            return <Book key={book.id} book={book} />;
          })}
        </div>
      )}
    </div>
  );
};

export default BooksList;
