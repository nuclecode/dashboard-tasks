"use client";

import React, { useState, useEffect } from 'react';
import JournalList from './JournalList'; // Assuming JournalList is in the same directory
import JournalForm from './JournalForm'; // Make sure to import your form component
// import fs from 'fs';

const DiaryApp = () => {
  const [entries, setEntries] = useState([]); // Initialize entries as an empty array

  const [editEntry, setEditEntry] = useState(null);  // !!!

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch('/api/entries');
      const data = await response.json();
      setEntries(data);
    }
    fetchEntries();
  }, []);

  // useEffect(() => {
  //   const loadEntries = () => {
  //       const data = fs.readFileSync('data.json', 'utf8');
  //       if (data) {
  //           setEntries(JSON.parse(data));
  //       }
  //   };
  //   loadEntries();
  // }, []);

  // useEffect(() => {
  //   const saveEntries = () => {
  //       fs.writeFileSync('data.json', JSON.stringify(entries), 'utf8');
  //   };
  //   saveEntries();
  // }, [entries]);

//   //======
//   const addEntry = async (newEntry) => {
//     const response = await fetch('/api/entries')
//     if (editEntry) {
//         setEntries(entries.map((entry) => 
//             (entry.id === editEntry.id ? {...newEntry, id: editEntry.id } : entry)));
//         setEditEntry(null);
//     } else {
//         setEntries([...entries, { ...newEntry, id: entries.length + 1, recordDate: new Date().toISOString() }]);
//     }
//   };
// //========

  const addEntry = async (newEntry) => {
    const response = await fetch('api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    });

    if (response.ok) {
      const savedEntry = await response.json();

      if (newEntry.id) {
        setEntries(entries.map(entry => entry.id === savedEntry.id ? savedEntry : entry));
      } else {
        setEntries([...entries, savedEntry]);
      }

      setEditEntry(null);
    }

    // if (response.ok) {
    //   const addedEntry = await response.json();
    //   setEntries([...entries, addedEntry]);
    // }
  };

  const handleEdit = (entry) => {
    setEditEntry(entry);
  };

  // const handleDelete = (id) => {
  //   setEntries(entries.filter((entry) => entry.id !== id));
  // };

  const handleDelete = async (id) => {
    const response = await fetch('/api/entries', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, archived: true }),
    });

    if (response.ok) {
      setEntries(entries.map(entry => 
        entry.id === id ? { ...entry, archived: true } : entry
      ));
    }
  };

  return (
    <div>
      <h1>Diary Entries</h1>
      <JournalForm addEntry={addEntry} editEntry={editEntry} setEditEntry={setEditEntry} /> {/* Include your form component here */}
      <JournalList entries={entries} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DiaryApp;
