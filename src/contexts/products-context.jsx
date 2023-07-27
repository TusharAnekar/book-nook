import { createContext, useEffect, useReducer } from "react";
import {
  initialProductsState,
  productsReducer,
} from "../reducers/productsReducer";
import { productsService } from "../services/products-services/productsService";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [productsState, productsDispatch] = useReducer(
    productsReducer,
    initialProductsState
  );

  async function getProducts() {
    try {
      const response = await productsService();

      const {
        status,
        data: { products },
      } = response;
      if (status === 200) {
        productsDispatch({ type: "DISPLAY_PRODUCTS", payload: products });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);


  const searchedFilteredProducts = productsState?.inputSearch.length
    ? productsState?.products.filter(({ name }) =>
        name.toLowerCase().includes(productsState?.inputSearch.toLowerCase())
      )
    : productsState?.products;

  const sortedFilteredProducts = productsState?.inputSort.length
    ? productsState?.inputSort === "LTH"
      ? [...searchedFilteredProducts]?.sort((a, b) => a?.price - b?.price)
      : [...searchedFilteredProducts]?.sort((a, b) => b?.price - a?.price)
    : searchedFilteredProducts;

  const categoryFilteredProducts = productsState?.inputCategory.length ? sortedFilteredProducts.filter(({category}) => productsState?.inputCategory.includes(category)) : sortedFilteredProducts

  const ratingFilteredProducts = productsState?.inputRating > 1 ? categoryFilteredProducts.filter(({rating}) => productsState?.inputRating > rating) : categoryFilteredProducts

  const getDiscount = (originalPrice, price) =>  Math.trunc(
    ((originalPrice - price) / originalPrice) * 100
  );

  return (
    <ProductsContext.Provider value={{ productsState, productsDispatch, ratingFilteredProducts , getDiscount }}>
      {children}
    </ProductsContext.Provider>
  );
}
