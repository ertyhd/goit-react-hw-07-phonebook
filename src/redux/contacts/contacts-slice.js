import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAllContacts,
  fetchAddContacts,
  fetchDeleteContacts,
} from './contacts-operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchAllContacts.pending, store => {
        store.loading = true;
      })
      .addCase(fetchAllContacts.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.items = payload;
      })
      .addCase(fetchAllContacts.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      })
      .addCase(fetchAddContacts.pending, store => {
        store.loading = true;
      })
      .addCase(fetchAddContacts.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.items.push(payload);
      })
      .addCase(fetchAddContacts.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      })
      .addCase(fetchDeleteContacts.pending, store => {
        store.loading = true;
      })
      .addCase(fetchDeleteContacts.fulfilled, (store, { payload }) => {
        store.loading = false;
        const index = store.items.findIndex(item => item.id === payload);
        store.items.splice(index, 1);
      })
      .addCase(fetchDeleteContacts.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      });
  },
});

export default contactsSlice.reducer;
