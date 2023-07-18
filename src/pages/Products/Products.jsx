import { useContext } from "react";

import "./products.css";
import { CategoriesContext } from "../../contexts/categories-context";
import { ProductsContext } from "../../contexts/products-context";
import { BookCard } from "../../components/BookCard/BookCard";

export function Products() {
  const {
    categoriesState: { categories },
  } = useContext(CategoriesContext);

  const { productsDispatch } = useContext(ProductsContext);

  const {
    productsState: {
      products,
      inputSearch,
      inputSort,
      inputCategory,
      inputRating,
    },
    ratingFilteredProducts,
  } = useContext(ProductsContext);

  function handleRadioInput(e) {
    productsDispatch({ type: "SET_INPUT_SORT", payload: e.target.value });
  }

  function handleCheckboxInput(e) {
    productsDispatch({ type: "SET_INPUT_CATEGORY", payload: e.target.value });
  }

  function handleInputRange(e) {
    productsDispatch({ type: "SET_INPUT_RATING", payload: e.target.value });
  }

  function handleClearButton() {
    console.log(products);
    productsDispatch({ type: "CLEAR_FILTERS", payload: products });
  }

  return (
    <>
      <div className="products-container">
        <div className="filters-container">
          <div className="filters-header-container">
            <p>Filters</p>
            <button onClick={handleClearButton}>Clear</button>
          </div>

          <div className="sort-filter-container">
            <p>Sort by</p>
            <label>
              <input
                type="radio"
                name="sort"
                value={"LTH"}
                checked={inputSort}
                onClick={handleRadioInput}
              />
              Price - Low to High
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value={"HTL"}
                checked={inputSort}
                onClick={handleRadioInput}
              />
              Price - High to Low
            </label>
          </div>

          <div className="categories-filter-container">
            <p>Category</p>
            {categories.map(({ id, categoryName }) => (
              <label key={id}>
                <input
                  type="checkbox"
                  value={categoryName}
                  onClick={handleCheckboxInput}
                />
                {categoryName}
              </label>
            ))}
          </div>

          <div className="ratings-filter-container">
            <p>Rating</p>
            <label>
              <input
                type="range"
                defaultValue={0}
                value={inputRating}
                min={1}
                max={5}
                step={1}
                list="markers"
                onChange={handleInputRange}
              />
            </label>
            <datalist id="markers">
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
              <option value="4"></option>
              <option value="5"></option>
            </datalist>
          </div>
        </div>

        <div className="books-container">
          <h2>Showing Books</h2>
          <div className="books-card-container">
            {ratingFilteredProducts.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
