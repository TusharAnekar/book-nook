import axios from "axios";

export const productsService = async () => await axios("/api/products")