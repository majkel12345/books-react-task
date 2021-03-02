import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { addToCart, removeFromCart } from "./reducers/cart";
import { useDispatch } from "react-redux";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3001/api/book?page=1")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.data);
        setLoading(false);
      });
  }, []);

  console.log(books);

  return (
    <div className="book__container">
      <h1>hello</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Zdjęcie</TableCell>
              <TableCell align="center">Tytuł</TableCell>
              <TableCell align="center">Autor</TableCell>
              <TableCell align="center">Strony</TableCell>
              <TableCell align="center">Cena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => {
              return (
                <TableRow key={book.id}>
                  <TableCell align="center" component="th" scope="row">
                    <img
                      alt="img"
                      width="200"
                      height="300"
                      src={book.cover_url}
                    ></img>
                  </TableCell>
                  <TableCell align="center">{book.title}</TableCell>
                  <TableCell align="center">{book.author}</TableCell>
                  <TableCell align="center">{book.pages}</TableCell>
                  <TableCell align="center">{book.price} zł</TableCell>
                  <TableCell align="center">
                    <AddShoppingCartIcon
                      onClick={() =>
                        dispatch(addToCart({ id: book.id, title: book.title }))
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Books;
