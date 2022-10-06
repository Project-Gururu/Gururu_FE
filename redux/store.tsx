import { configureStore } from '@reduxjs/toolkit'
import reg from './modules/reg'
import user from './modules/user'

export const store = configureStore({
  reducer: {
    user,
    reg: reg
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {post: PostsState, comments: CommentsState, uses: UsersState}
export type AppDispatch = typeof store.dispatch
