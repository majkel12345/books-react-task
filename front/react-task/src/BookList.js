import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "./reducers/cart";

const BookList = ({ book, added }) => {
  const dispatch = useDispatch();
  return (
    <>
      <TableRow>
        <TableCell align="center" component="th" scope="row">
          <img alt="img" width="100" height="150" src={book.cover_url}></img>
        </TableCell>
        <TableCell align="center">{book.title}</TableCell>
        <TableCell align="center">{book.author}</TableCell>
        <TableCell align="center">{book.pages}</TableCell>
        <TableCell align="center">{book.price} zł</TableCell>
        {added ? (
          <TableCell align="center">
            <DeleteIcon onClick={() => dispatch(removeFromCart(book.id))} />
          </TableCell>
        ) : (
          <TableCell align="center">
            <AddShoppingCartIcon
              onClick={() =>
                dispatch(
                  addToCart({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    pages: book.pages,
                    price: book.price,
                    cover_url: book.cover_url,
                  })
                )
              }
            />
          </TableCell>
        )}
      </TableRow>
    </>
  );
};

export default BookList;
