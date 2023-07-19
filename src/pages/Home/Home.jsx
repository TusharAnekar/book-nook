import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./home.css";

import { CategoriesContext } from "../../contexts/categories-context";
import { Footer } from "../../components/Footer/Footer";

export function Home() {
  const {
    categoriesState: { categories }, getCategoryById
  } = useContext(CategoriesContext);

  const navigate = useNavigate()

  function handleCategory (categoryId) {
    getCategoryById(categoryId)
    navigate("/products")
  }

  return (
    <>
      <div className="home-container">
        <div className="home-content-container">
          <div className="background-image-container">
            <div className="welcome-message-container">
              <p>Welcome to Book Nook,</p>
              <h1>For All Your Reading Needs</h1>
              <Link to={"/products"} className="products-link">
                SHOP NOW
              </Link>
            </div>
          </div>

          <div className="categories-text-container">
            <h2>Book Categories</h2>
            <p>
              There are many categories of books available at Book Nook. Choose
              your favorite one now.
            </p>
          </div>

          <div className="categories-container">
            {categories.map(({_id, categoryName, description }) => (
              <div key={_id} className="category-container" onClick={() => handleCategory(_id)}>
                <p className="category-name">{categoryName}</p>
                <p>
                  <small>{description}</small>
                </p>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
