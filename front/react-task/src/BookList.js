import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart } from "./reducers/cart";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

const BookList = ({ book, added, toSend }) => {
  const dispatch = useDispatch();
  const booksInCart = useSelector((state) => state);

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

  return (
    <Card style={{ maxWidth: "250px", boxShadow: "0 0 1em " }}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        width="100"
        image={book.cover_url}
        title="Contemplative Reptile"
      />
      {!toSend ? (
        <>
          <CardContent>
            <Typography variant="h5" component="h2">
              {book.title}
            </Typography>
            {added ? null : (
              <>
                <Typography color="textSecondary">{book.author}</Typography>
                <Typography color="textSecondary">
                  {book.pages} stron
                </Typography>
                <Typography variant="body2" component="p">
                  {book.price} zł
                </Typography>
              </>
            )}
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
                <AddShoppingCartIcon style={{ color: "green" }} />
              )}
            </IconButton>
          )}
        </>
      ) : null}
    </Card>
  );
};

export default BookList;
