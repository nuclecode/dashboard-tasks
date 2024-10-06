"use client";

import React from 'react';

const EntryCard = ({ entry, onEdit, onDelete }) => {
  const {
    id,
    task,
    customerConsent,
    completionDate,
    resultDescription,
    recordDate,
  } = entry;

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Task #{id}: {task}</h3>
      <p><strong>Customer Consent:</strong> {customerConsent}</p>
      <p><strong>Date of Completion:</strong> {completionDate}</p>
      <p><strong>Description of the Result:</strong> {resultDescription}</p>
      <p><strong>Approval Date:</strong> {recordDate}</p>
      <div style={styles.actions}>
        <button onClick={() => onEdit(entry)}>Edit</button>
        <button onClick={() => onDelete(entry.id)}>Delete</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    margin: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
};

export default EntryCard;
