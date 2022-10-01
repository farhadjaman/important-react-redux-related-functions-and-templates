
//redux Thunk template
// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch (err) {
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     };
// }


//example

import { createSlice } from "@reduxjs/toolkit"

import fetchVideo from "../videosApi"
const initialState = {
  videos: [],
  isLoading: false,
  isError: false,
  error: '',
}

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos(state, { payload }) {
      state.videos = payload
    },
    setStatus(state, action) {
      state.isLoading = action.payload;
    },
    setIsError(state, { payload }) {
      state.isError = payload
    },
    setError(state, { payload }) {
      state.error = payload
    },
  }
})

export const { setVideos, setStatus, setError, setIsError } = videosSlice.actions;
export default videosSlice.reducer;

//async thunk
export function fetchVideos(tags, search) {
  return async function fetchVideoThunk(dispatch, getState) {
    dispatch(setStatus(true));
    dispatch(setIsError(false));
    dispatch(setError(''));
    try {
      const videos = await fetchVideo(tags, search);
      dispatch(setVideos(videos));
      dispatch(setStatus(false));

    } catch (err) {
      if (err) {
        dispatch(setError(err.message));
        dispatch(setStatus(false));
        dispatch(setIsError(true));
      }
    }
  };
}
