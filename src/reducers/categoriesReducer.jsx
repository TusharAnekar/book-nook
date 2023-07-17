

export const initialCategroiesState = {
  categories: [],
};

export const categoriesReducer = (state, { type, payload }) => {
  switch (type) {
    case "DISPLAY_CATEGORIES":
      return { ...state, categories: payload };

    default:
      return state;
  }
};
