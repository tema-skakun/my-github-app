import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from './slices/repositoriesSlice';

const store = configureStore({
  reducer: {
    repositories: repositoriesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
