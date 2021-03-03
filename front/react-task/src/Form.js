import React from "react";
import TextField from "@material-ui/core/TextField";

const Form = () => {
  return (
    <>
      <form noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Imię" variant="outlined" />
        <TextField id="outlined-basic" label="Nazwisko" variant="outlined" />
        <TextField id="outlined-basic" label="Miejscowość" variant="outlined" />
        <TextField
          id="outlined-basic"
          label="Kod pocztowy"
          variant="outlined"
          type="number"
        />
      </form>
    </>
  );
};

export default Form;
