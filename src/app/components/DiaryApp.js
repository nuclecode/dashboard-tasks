"use client";

import React, { useState, useRef, useEffect } from 'react';
import JournalList from './JournalList'; // Assuming JournalList is in the same directory
import JournalForm from './JournalForm'; // Make sure to import your form component
import Backlog from './Backlog';

const DiaryApp = () => {
  const [entries, setEntries] = useState([]); // Initialize entries as an empty array

  const [editEntry, setEditEntry] = useState(null);  // !!!

  const [showArchived, setShowArchived] = useState(false);
  const lastActiveEntryRef = useRef(null);

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
      setEntries((prevEntries) => [...prevEntries, savedEntry]);
      setEditEntry(null);
    }
  };

    //   if (newEntry.id) {
    //     setEntries(entries.map(entry => entry.id === savedEntry.id ? savedEntry : entry));
    //   } else {
    //     setEntries([...entries, savedEntry]);
    //   }

    //   setEditEntry(null);
    // }

    // if (response.ok) {
    //   const addedEntry = await response.json();
    //   setEntries([...entries, addedEntry]);
    // }
  // };

  const handleEdit = (entry) => {
    setEditEntry(entry);
  };

  // const handleDelete = (id) => {
  //   setEntries(entries.filter((entry) => entry.id !== id));
  // };

  const handleDelete = async (id) => {
    try {
    const response = await fetch('/api/entries', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, archived: true }),
    });

    if (!response.ok) {
      throw new Error('Failed to archive the entry')
    }

    // if (response.ok) {
    //   setEntries(entries.map(entry => 
    //     entry.id === id ? { ...entry, archived: true } : entry
    //   ));
    // }

    setEntries((prevEntries) => 
    prevEntries.map((entry) => 
    entry.id === id ? { ...entry, archived: true } : entry
      )
    );
  } catch (error) {
    console.error('Error archiving the entry: ', error);
  }
  };

  const toggleArchived = () => {
    setShowArchived((prev) => !prev);

    if (!showArchived && lastActiveEntryRef.current) {
      setTimeout(() => {
      lastActiveEntryRef.current.scrollIntoView({ behavior: 'smooth',
        block: 'start',
       });
      }, 100);
    }
  };



  // useEffect(() => {
  //   if (!showArchived && lastActiveEntryRef.current) {
  //     lastActiveEntryRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [showArchived]);

  const activeEntries = entries.filter(entry => !entry.archived);
  const archivedEntries = entries.filter(entry => entry.archived);

  return (
    <div>
      <h1>Diary Entries</h1>
      <button onClick={toggleArchived}>
        { showArchived ? 'Hide Archived Tasks': 'Show Archived Tasks' }
      </button>
      <Backlog addEntry={addEntry} entries={entries} />
      <JournalForm addEntry={addEntry} editEntry={editEntry} setEditEntry={setEditEntry} /> {/* Include your form component here */}
      <JournalList entries={activeEntries} onEdit={handleEdit} onDelete={handleDelete}
      lastActiveEntryRef={lastActiveEntryRef}
      showArchived={false}
      />
{/* 
        <div ref={lastActiveEntryRef} /> */}
        <button onClick={toggleArchived}>
          { showArchived ? 'Hide Archived Tasks' : 'Show Archived Tasks' }
        </button>

        {showArchived && (
          <div style={{ marginTop: '2rem' }}>
            <h2>Archived Tasks</h2>
            <JournalList 
              entries={entries}
              onEdit={handleEdit}
              onDelete={handleDelete}
              showArchived={true}
            />
            
            <button onClick={toggleArchived}>Hide Archived Tasks</button>
            </div>
        )}
    </div>
    
  );
};

export default DiaryApp;
