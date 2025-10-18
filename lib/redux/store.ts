import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth-slice"
import productsReducer from "./slices/products-slice"
import categoriesReducer from "./slices/categories-slice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      products: productsReducer,
      categories: categoriesReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
