// import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Notiflix from 'notiflix';

import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

import { addContacts, deleteContacts } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';

import {
  getAllContacts,
  getFilteredContacts,
} from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-celectors';

import style from './contacts.module.css';

const Contacts = () => {
  const allContacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);
  const filteredContacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  const isDublicate = (name, number) => {
    const normName = name.toLowerCase();
    const normNumber = number.toLowerCase();
    const findContact = allContacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normName && number.toLowerCase() === normNumber
      );
    });
    return Boolean(findContact);
  };

  const onAddContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      Notiflix.Notify.failure(
        `The contact ${name} whith ${number} phone is already exist`
      );
      return false;
    }

    dispatch(addContacts({ name, number }));
  };

  const onDeleteContact = id => {
    dispatch(deleteContacts(id));
  };

  const hendleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const isContacts = Boolean(filteredContacts.length);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onAddContact} />
      <h2>Contacts</h2>
      <div className={style.block}>
        <Filter value={filter} handleChange={hendleFilter} />
        {isContacts && (
          <ContactList
            deleteContact={onDeleteContact}
            items={filteredContacts}
          />
        )}
        {!isContacts && <p>No contacts in list</p>}
      </div>
    </>
  );
};

export default Contacts;
