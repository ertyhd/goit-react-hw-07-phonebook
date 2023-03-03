import { createSlice } from '@reduxjs/toolkit';

import * as actions from './contacts-actions';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [actions.fetchAllContactsLoading]: store => {
      store.loading = true;
    },
    [actions.fetchAllContactsSuccess]: (store, { payload }) => {
      store.loading = false;
      store.items = payload;
    },
    [actions.fetchAllContactsError]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    [actions.fetchAddContactsLoading]: store => {
      store.loading = true;
    },
    [actions.fetchAddContactsSuccess]: (store, { payload }) => {
      store.loading = false;
      store.items.push(payload);
    },
    [actions.fetchAddContactsError]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    [actions.fetchDeleteContactsLoading]: store => {
      store.loading = true;
    },
    [actions.fetchDeleteContactsSuccess]: (store, { payload }) => {
      store.loading = false;
      const index = store.items.findIndex(item => item.id === payload);
      store.items.splice(index, 1);
    },
    [actions.fetchDeleteContactsError]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});

export const { addContacts, deleteContacts } = contactsSlice.actions;
export default contactsSlice.reducer;
