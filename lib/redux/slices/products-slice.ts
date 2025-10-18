import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Product {
  id: string
  name: string
  description: string
  images: string[]
  price: number
  slug: string
  createdAt: string
  updatedAt: string
  category: {
    id: string
    name: string
    image: string
    createdAt: string
    updatedAt: string
    description: string | null
  }
}

interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  searchQuery: string
  selectedCategoryId: string | null
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchQuery: "",
  selectedCategoryId: null,
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
      state.items = []
      state.loading = true
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1
      state.items = []
      state.loading = true
    },
    setSelectedCategoryId: (state, action: PayloadAction<string | null>) => {
      state.selectedCategoryId = action.payload
      state.currentPage = 1
      state.items = []
      state.loading = true
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.unshift(action.payload)
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((product) => product.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((product) => product.id !== action.payload)
    },
  },
})

export const {
  setProducts,
  setLoading,
  setError,
  setCurrentPage,
  setTotalPages,
  setSearchQuery,
  setSelectedCategoryId,
  addProduct,
  updateProduct,
  removeProduct,
} = productsSlice.actions

export default productsSlice.reducer
