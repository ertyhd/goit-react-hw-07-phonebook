import Notiflix from 'notiflix';

import * as api from '../../shared/contacts-api';

import * as actions from './contacts-actions';

export const fetchAllContacts = () => {
  const func = async dispatch => {
    try {
      dispatch(actions.fetchAllContactsLoading());
      const data = await api.getAllContacts();
      dispatch(actions.fetchAllContactsSuccess(data));
    } catch ({ response }) {
      dispatch(actions.fetchAllContactsError(response.data.message));
    }
  };
  return func;
};

const isDublicate = (contacts, { name, number }) => {
  const normName = name.toLowerCase();
  const normNumber = number.toLowerCase();
  const findContact = contacts.find(({ name, number }) => {
    return (
      name.toLowerCase() === normName && number.toLowerCase() === normNumber
    );
  });
  return Boolean(findContact);
};

export const fetchAddContacts = data => {
  const func = async (dispatch, getState) => {
    try {
      const { contacts } = getState();
      if (isDublicate(contacts.items, data)) {
        Notiflix.Notify.failure(
          `The contact ${data.name} whith ${data.number} phone is already exist`
        );
        return false;
      }
      dispatch(actions.fetchAddContactsLoading());
      const result = await api.addContacts(data);
      dispatch(actions.fetchAddContactsSuccess(result));
    } catch ({ response }) {
      dispatch(actions.fetchAddContactsError(response.data.message));
    }
  };
  return func;
};

export const fetchDeleteContacts = id => {
  const func = async dispatch => {
    try {
      dispatch(actions.fetchDeleteContactsLoading());
      await api.deleteContacts(id);
      dispatch(actions.fetchDeleteContactsSuccess(id));
    } catch ({ response }) {
      dispatch(actions.fetchDeleteContactsError(response.data.message));
    }
  };
  return func;
};
