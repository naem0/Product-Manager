import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Category {
  id: string
  name: string
  description: string | null
  image: string
  createdAt: string
}

interface CategoriesState {
  items: Category[]
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
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
  },
})

export const { setCategories, setLoading, setError } = categoriesSlice.actions
export default categoriesSlice.reducer
