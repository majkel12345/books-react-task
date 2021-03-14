import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MaskedInput from "react-text-mask";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import "./Form.css";
import { removeFromCart } from "./reducers/cart";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import BookList from "./BookList";

const Form = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [code, setCode] = useState();

  const booksInCart = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  const order = booksInCart.map((book) => {
    return {
      id: book.id,
      quantity: 1,
    };
  });

  const onNamechange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onSurnamechange = (e) => {
    e.preventDefault();
    setSurname(e.target.value);
  };
  const onCitychange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };
  const onCodechange = (e) => {
    e.preventDefault();
    setCode(e.target.value);
  };

  const clearInputs = () => {
    setName("");
    setSurname("");
    setCity("");
    setCode("");
  };

  const resetCart = () => {
    booksInCart.map((book) => dispatch(removeFromCart(book.id)));
  };

  const valid = () => {
    if (
      name.length > 3 &&
      surname.length > 5 &&
      city !== "" &&
      booksInCart.length > 0 &&
      code.length === 6
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (valid()) {
      fetch("http://localhost:3001/api/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: order,
          first_name: name,
          last_name: surname,
          city: city,
          zip_code: code,
        }),
      })
        .then(() => {
          clearInputs();
          resetCart();
          alert("wysłano");
        })
        .then(() => history.push("/"))
        .catch((error) => console.log(error));
    } else {
      alert("Sprawdź czy koszyk nie jest pusty i wpisz poprawne dane!");
    }
  };

  return (
    <div className="form__container">
      <Link to="/cart" style={{ textDecoration: " none", color: "black" }}>
        <ArrowBackIcon style={{ fontSize: "3rem" }} />
      </Link>
      <div className="book__img">
        {booksInCart.map((book, index) => {
          return <BookList key={index} book={book} toSend />;
        })}
      </div>
      <Container
        style={{
          marginTop: "40px",
          padding: "20px 40px",
          border: "4px solid gray",
        }}
        component="main"
        maxWidth="xs"
      >
        <h3>Wypełnij formularz aby zamówić książki</h3>
        <form onSubmit={handleOnSubmit} noValidate autoComplete="off">
          <TextField
            style={{ marginTop: "20px" }}
            id="outlined-basic"
            label="Imię"
            variant="outlined"
            value={name}
            helperText="Imię musi zawierać przynajmniej 4 znaki"
            onChange={onNamechange}
          />

          <TextField
            style={{ marginTop: "20px" }}
            id="outlined-basic"
            label="Nazwisko"
            variant="outlined"
            onChange={onSurnamechange}
            helperText="Nazwisko musi zawierać przynajmniej 6 znaków"
            value={surname}
          />

          <TextField
            style={{ marginTop: "20px" }}
            id="outlined-basic"
            label="Miejscowość"
            variant="outlined"
            onChange={onCitychange}
            helperText="Nie może być puste"
            value={city}
          />

          <MaskedInput
            style={{
              maxWidth: "100px",
              height: "30px",
              textAlign: "center",
              letterSpacing: "2px",
              margin: "20px 0",
            }}
            mask={[/\d/, /\d/, "-", /\d/, /\d/, /\d/]}
            placeholderChar={"\u2000"}
            showMask
            onChange={onCodechange}
            value={code}
          />
          <Button variant="contained" color="primary" type="submit">
            Wyślij
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Form;
