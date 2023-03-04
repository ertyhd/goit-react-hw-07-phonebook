import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

import {
  fetchAllContacts,
  fetchAddContacts,
  fetchDeleteContacts,
} from 'redux/contacts/contacts-operations';
import { setFilter } from 'redux/filter/filter-slice';

import { getFilteredContacts } from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-celectors';

import style from './contacts.module.css';

const Contacts = () => {
  const filter = useSelector(getFilter);
  const filteredContacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const onAddContact = ({ name, number }) => {
    dispatch(fetchAddContacts({ name, number }));
  };

  const onDeleteContact = id => {
    dispatch(fetchDeleteContacts(id));
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
