export const initialProductsState = {
  products: [],
  inputSearch: "",
  inputSort: "",
  inputCategory: [],
  inputRating: 1,
};

export const productsReducer = (state, { type, payload }) => {
  switch (type) {
    case "DISPLAY_PRODUCTS":
      return { ...state, products: payload };
    case "SET_INPUT_SEARCH":
      return { ...state, inputSearch: payload };
    case "SET_INPUT_SORT":
      return { ...state, inputSort: payload };
    case "SET_INPUT_CATEGORY":
      return state.inputCategory.includes(payload)
        ? {
            ...state,
            inputCategory: state.inputCategory.filter(
              (category) => category !== payload
            ),
          }
        : {
            ...state,
            inputCategory: [...state.inputCategory, payload],
          };

    case "SET_INPUT_RATING":
      return { ...state, inputRating: payload };

    case "CLEAR_FILTERS":
      return {
        ...state,
        products: payload,
        inputSearch: "",
        inputSort: "",
        inputCategory: [],
        inputRating: 1,
      };
    default:
      return state;
  }
};
