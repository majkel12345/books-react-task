const initialState = [];

const ADD = "ADD";
const REMOVE = "REMOVE";

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.payload];
    case REMOVE:
      return state.filter((book) => book.id !== action.payload);
    default:
      return state;
  }
};

export const addToCart = (book) => ({ type: ADD, payload: book });
export const removeFromCart = (bookId) => ({ type: REMOVE, payload: bookId });
