import React from "react";
import { useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import BookList from "./BookList";

const Cart = () => {
  const booksInCart = useSelector((state) => state);

  console.log(booksInCart);

  return (
    <div>
      <Link to="/">
        <ArrowBackIcon />
      </Link>
      {booksInCart.length > 0 ? (
        <div>
          <Table>
            <TableBody>
              {booksInCart.map((book) => {
                return <BookList key={book.id} book={book} added />;
              })}
            </TableBody>
          </Table>
          <Button variant="contained" color="primary">
            <Link to="/form">Dalej</Link>
          </Button>
        </div>
      ) : (
        <h2>Nie ma książek w koszyku</h2>
      )}
    </div>
  );
};

export default Cart;
