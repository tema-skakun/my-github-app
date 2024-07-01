import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Repository {
  id: string;
  name: string;
  stars: number;
  lastCommitDate: string;
  url: string;
}

interface RepositoriesState {
  repositories: Repository[];
  searchQuery: string;
  currentPage: number;
}

const initialState: RepositoriesState = {
  repositories: [],
  searchQuery: '',
  currentPage: 1,
};

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setRepositories(state, action: PayloadAction<Repository[]>) {
      state.repositories = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setRepositories, setSearchQuery, setCurrentPage } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
