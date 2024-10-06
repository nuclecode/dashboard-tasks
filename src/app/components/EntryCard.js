"use client";

import React, { forwardRef } from 'react';

const EntryCard = forwardRef(({ entry, onEdit, onDelete }, ref) => {
  const {
    id,
    task,
    customerConsent,
    completionDate,
    resultDescription,
    approvalDate,
  } = entry;

  return (
    <div ref={ref} className="entry-card">
    <div style={styles.card}>
      <h3 style={styles.title}>Task #{id}: {task}</h3>
      <p><strong>Customer Consent:</strong> {customerConsent ? 'Yes' : 'No' }</p>
      <p><strong>Date of Completion:</strong> {completionDate || 'Not completed'}</p>
      <p><strong>Description of the Result:</strong> {resultDescription || 'Not result yet'}</p>
      <p><strong>Approval Date:</strong> {approvalDate || 'Not approved yet'}</p>
      <div style={styles.actions}>
        <button onClick={() => onEdit(entry)}>Edit</button>
        <button onClick={() => onDelete(entry.id)}>Delete</button>
      </div>
    </div>
    </div>
  );
});

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
