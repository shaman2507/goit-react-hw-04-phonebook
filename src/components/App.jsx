import React, { useState, useEffect } from 'react';
import ContactsList from './contacts/ContactsList';
import Form from './Form/Form';
import Filter from './filter/Filter';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts) {
      console.log('useEffect works');
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    const LocalData = localStorage.getItem(contacts);
    if (LocalData !== null) {
      return JSON.parse(LocalData);
    } 
  }, [contacts])

  const addContact = contact => {
    const prevContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    const prevContactsNumber = contacts.some(
      ({ number }) => number === contact.number
    );

    if (prevContacts) {
      alert(`${contact.name} is already exists`);
      return;
    }

    if (prevContactsNumber) {
      alert(`${contact.number} is already exists`);
      return;
    }

    setContacts(prevContacts => [
      { id: nanoid(), ...contact },
      ...prevContacts,
    ]);
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const removeContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length === 0 ? (
        <div>Your phonebook is empty. Add first contact!</div>
      ) : (
        <>
          <Filter value={filter} onChangeFilter={changeFilter} />
          <ContactsList
            contacts={getContacts()}
            onRemoveContact={removeContact}
          />
        </>
      )}
    </div>
  );
};
export default App;