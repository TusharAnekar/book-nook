import axios from "axios";

export const categoryByIdService = async (categoryId) => await axios(`/api/categories/${categoryId}`)