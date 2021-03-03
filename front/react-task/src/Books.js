import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import BookList from "./BookList";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <Link to="/cart">
        <ShoppingCartIcon />
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableBody>
            {books.map((book) => {
              return <BookList key={book.id} book={book} />;
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Books;
