'use client'

import React from 'react'

const Backlog = ({ addEntry, entries }) => {
    const standardTasks = [
        "Create landing page",
        "Design homepage",
        "Set up responsive layout",
        "Implement SEO features",
        "Create contact form",
        "Add Google Analitics",
        "Optimize images",
        "Deploy website",
        "Set up SSL certificate",
        "Test website perfomance",
    ];

    const addTaskFromBacklog = (task) => {
        const newId = entries.length ? Math.max(entries.map(e => e.id)) + 1 : 1;
        const newEntry = {
            id: newId,
            task,
            customerConsent: false,
            completionDate: "",
            resultDescription: "",
            clientApproval: false,
            approvalDate: "",
            archived: false,
        };
        addEntry(newEntry);
    };

    return (
        <div>
            <h3>Backlog Tasks</h3>
            {standardTasks.map((task, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    {task} <button onClick={() => addTaskFromBacklog(task)}>Add</button>
                </div>
            ))}
        </div>
    );
};

export default Backlog;