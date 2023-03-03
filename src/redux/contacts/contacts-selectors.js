export const getAllContacts = ({ contacts }) => contacts.items;
export const getFilteredContacts = ({ contacts, filter }) => {
  if (!filter) {
    return contacts.items;
  }
  const normalizateFilter = filter.toLowerCase();
  const result = contacts.items.filter(({ name, number }) => {
    return (
      name.toLowerCase().includes(normalizateFilter) ||
      number.toLowerCase().includes(normalizateFilter)
    );
  });
  return result;
};
