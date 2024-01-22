import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducer/blogSlice'

export const store = configureStore({
  reducer: {
    blog: blogReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
