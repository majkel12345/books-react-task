import React from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import BookList from "./BookList";

const Cart = () => {
  const booksInCart = useSelector((state) => state);

  return (
    <div className="cart__container">
      <Link to="/" style={{ textDecoration: " none", color: "black" }}>
        <ArrowBackIcon style={{ fontSize: "3rem" }} />
      </Link>
      {booksInCart.length > 0 ? (
        <div>
          <div className="book_list">
            {booksInCart.map((book) => {
              return <BookList key={book.id} book={book} added />;
            })}
          </div>
          <div className="next">
            <Link to="/form">
              <Button variant="contained" color="primary">
                Dalej
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <h2>Nie ma książek w koszyku</h2>
      )}
    </div>
  );
};

export default Cart;
