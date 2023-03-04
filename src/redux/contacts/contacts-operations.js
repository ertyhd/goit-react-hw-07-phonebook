import Notiflix from 'notiflix';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../shared/contacts-api';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetch-all',
  async (_, thunkAPI) => {
    try {
      const data = await api.getAllContacts();
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

export const fetchAddContacts = createAsyncThunk(
  'contacts/add',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.addContacts(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  },
  {
    condition: ({ name, number }, { getState }) => {
      const { contacts } = getState();
      const normName = name.toLowerCase();
      const normNumber = number.toLowerCase();
      const findContact = contacts.items.find(({ name, number }) => {
        return (
          name.toLowerCase() === normName && number.toLowerCase() === normNumber
        );
      });
      if (findContact) {
        Notiflix.Notify.failure(
          `The contact ${name} whith ${number} phone is already exist`
        );
        return false;
      }
    },
  }
);

export const fetchDeleteContacts = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteContacts(id);
      return id;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
);
