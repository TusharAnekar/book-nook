

export const initialCategroiesState = {
  categories: [],
  category: {}
};

export const categoriesReducer = (state, { type, payload }) => {
  switch (type) {
    case "DISPLAY_CATEGORIES":
      return { ...state, categories: payload };
      case "SET_CATEGORY_ID":
        return { ...state, category: payload };
    default:
      return state;
  }
};
