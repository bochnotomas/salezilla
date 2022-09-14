import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import itemsService from './itemsService';

const initialState = {
  items: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};

export const createItem = createAsyncThunk(
  'items/create',
  async (itemData, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      return await itemsService.createItem(itemData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getItems = createAsyncThunk(
  'items/getAll',
  async (_, thunkAPI) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      return await itemsService.getItems(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items.push(action.payload.data);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = itemsSlice.actions;
export default itemsSlice.reducer;
