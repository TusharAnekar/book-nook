import { createContext, useContext, useEffect, useReducer } from "react";

import { categoriesService } from "../services/categories-service/categoriesService";
import { categoriesReducer, initialCategroiesState } from "../reducers/categoriesReducer";
import { categoryByIdService } from "../services/categories-service/categoryByIdService";
import { ProductsContext } from "./products-context";

export const CategoriesContext = createContext()

export function CategoriesProvider ({children}) {

    const [categoriesState, categoriesDispatch] = useReducer(categoriesReducer, initialCategroiesState)

    const {productsDispatch} = useContext(ProductsContext)
    
    async function getCategories () {
        try {
            const response = await categoriesService()
            const {status, data: {categories}} = response
            if(status === 200) {
                categoriesDispatch({type: "DISPLAY_CATEGORIES", payload: categories})
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    async function getCategoryById (categoryId) {
        try {
            const response = await categoryByIdService(categoryId)
            const {status, data: {category}} = response
            if(status === 200) {
                categoriesDispatch({type: "SET_CATEGORY_ID", payload: category})
                productsDispatch({ type: "SET_INPUT_CATEGORY", payload: category.categoryName });

            }
        } catch (error) {
            
        }
    }
    return(
        <CategoriesContext.Provider value={{categoriesState, categoriesDispatch, getCategoryById}}>
            {children}
        </CategoriesContext.Provider>
    )
}