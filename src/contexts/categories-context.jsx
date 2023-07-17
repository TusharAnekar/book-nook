import { createContext, useEffect, useReducer } from "react";

import { categoriesService } from "../services/categories-service/categoriesService";
import { categoriesReducer, initialCategroiesState } from "../reducers/categoriesReducer";

export const CategoriesContext = createContext()

export function CategoriesProvider ({children}) {

    const [categoriesState, categoriesDispatch] = useReducer(categoriesReducer, initialCategroiesState)
    
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
    return(
        <CategoriesContext.Provider value={{categoriesState}}>
            {children}
        </CategoriesContext.Provider>
    )
}