export const getAllContacts = ({ contacts }) => contacts;
export const getFilteredContacts = ({ contacts, filter }) => {
  if (!filter) {
    return contacts;
  }
  const normalizateFilter = filter.toLowerCase();
  const result = contacts.filter(({ name, number }) => {
    return (
      name.toLowerCase().includes(normalizateFilter) ||
      number.toLowerCase().includes(normalizateFilter)
    );
  });
  return result;
};
