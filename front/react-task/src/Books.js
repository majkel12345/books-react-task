import React, { useEffect, useState } from "react";

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

  console.log(books);

  return (
    <div>
      <h1>hello</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        books.map((book) => {
          return (
            <div key={book.id}>
              <img src={book.cover_url}></img>
              <p>{book.title}</p>
              <p>{book.id}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Books;
