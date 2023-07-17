import "./home.css";

import { Header } from "../../components/Header/Header";
import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories-context";
import { Footer } from "../../components/Footer/Footer";

export function Home() {
  const {
    categoriesState: { categories },
  } = useContext(CategoriesContext);
  return (
    <>
      <div className="home-container">
        <Header />

        <div className="home-content-container">
            
          <div className="background-image-container">
            <div className="welcome-message-container">
              <p>Welcome to Book Nook,</p>
              <h1>For All Your Reading Needs</h1>
              <button>SHOP NOW</button>
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
            {categories.map(({ id, categoryName, description }) => (
              <div key={id} className="category-container">
                <p className="category-name">{categoryName}</p>
                <p><small>{description}</small></p>
              </div>
            ))}
          </div>
        </div>

        <Footer/>
      </div>
    </>
  );
}
