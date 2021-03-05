import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart } from "./reducers/cart";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

const BookList = ({ book, added }) => {
  const dispatch = useDispatch();
  const booksInCart = useSelector((state) => state);
  const [disabledButton, setDisabledButton] = useState();

  const onAdd = () => {
    if (booksInCart.map((obj) => obj.id).includes(book.id)) {
      booksInCart.filter((obj) => obj.id !== book.id);
    } else {
      dispatch(
        addToCart({
          id: book.id,
          title: book.title,
          author: book.author,
          pages: book.pages,
          price: book.price,
          cover_url: book.cover_url,
        })
      );
    }
  };

  console.log(booksInCart);

  return (
    <Card style={{ maxWidth: "250px" }}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        width="100"
        image={book.cover_url}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography color="textSecondary">{book.author}</Typography>
        <Typography variant="h5" component="h2">
          {book.title}
        </Typography>
        <Typography color="textSecondary">{book.pages} stron</Typography>
        <Typography variant="body2" component="p">
          {book.price} zł
        </Typography>
      </CardContent>

      {added ? (
        <IconButton onClick={() => dispatch(removeFromCart(book.id))}>
          <DeleteIcon />
        </IconButton>
      ) : (
        <IconButton onClick={onAdd}>
          {!booksInCart.find((page) => {
            return page.id === book.id;
          }) ? (
            <AddShoppingCartIcon />
          ) : (
            <RemoveShoppingCartIcon />
          )}
        </IconButton>
      )}
    </Card>
  );
};

export default BookList;
