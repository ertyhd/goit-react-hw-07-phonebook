import React from 'react';
import PropTypes from 'prop-types';

import contactList from './contactList.module.css';

const ContactList = ({ deleteContact, items }) => {
  const elements = items.map(({ id, name, number }) => (
    <li className={contactList.listItem} key={id}>
      <span className={contactList.listItemText}>{name}</span>
      <span className={contactList.listItemText}>{number}</span>
      <button
        onClick={() => deleteContact(id)}
        className={contactList.button}
        type="button"
      >
        Delete
      </button>
    </li>
  ));
  return <ul className={contactList.list}>{elements}</ul>;
};

export default ContactList;

ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
