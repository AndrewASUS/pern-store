import api from "./axios"

// Users API Users API Users API Users API Users API Users API Users API Users API 
export const syncUser = async (userData) => {
  const { data } = await api.post("/users/sync", userData)
  return data
}

// Products API Products API Products API Products API Products API Products API 
export const getAllProducts = async () => {
  const { data } = await api.get("/products")
  return data
}

// Get product by ID Get product by ID Get product by ID Get product by ID Get product by ID 
export const getProductById = async (id) => {
  const {data} = await api.get(`/products/${id}`)
  return data
}

// Get my products Get my products Get my products Get my products Get my products Get my products 
export const getMyProducts = async () => {
  const {data} = await api.get("/products/my")
  return data
}

// Create product Create product Create product Create product Create product Create product 
export const createProduct = async (productData) => {
  const {data} = await api.post("/products", productData)
  return data
}

// Update product Update product Update product Update product Update product Update product 
export const updateProduct = async ({id, ...productData}) => {
  const {data} = await api.put(`/products/${id}`, productData)
  return data
}

// Delete product Delete product Delete product Delete product Delete product Delete product 
export const deleteProduct = async (id) => {
  const {data} = await api.delete(`/products/${id}`)
  return data
}

// Create comment Create comment Create comment Create comment Create comment Create comment 
export const createComment = async ({ productId, content }) => {
  const {data} = await api.post(`/comments/${productId}`, { content })
  return data
}

// Delete comment Delete comment Delete comment Delete comment Delete comment Delete comment 
export const deleteComment = async ({ commentId }) => {
  const {data} = await api.delete(`/comments/${commentId}`)
  return data
}
