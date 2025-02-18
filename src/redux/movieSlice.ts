import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type Movie = { imdbID: string; title: string };

type MovieState = { shortlisted: Movie[] };

const initialState: MovieState = { shortlisted: [] };

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addShortlist: (state, action: PayloadAction<Movie>) => { 
      state.shortlisted.push(action.payload); 
    },
    removeShortlist: (state, action: PayloadAction<string>) => { 
      state.shortlisted = state.shortlisted.filter(movie => movie.imdbID !== action.payload); 
    },
  },
});

export const { addShortlist, removeShortlist } = movieSlice.actions;
export const store = configureStore({ reducer: { movies: movieSlice.reducer } });
