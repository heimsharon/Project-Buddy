import React from 'react';
import '../assets/styles/tasklist.css';

export default function ListTasksPage() {
    return (
        <div className="task-list-background">
            <div className="list-tasks-page">
                <span
                    className="under-construction"
                    role="img"
                    aria-label="construction"
                >
                    🚧
                </span>
                <h2>Tasks</h2>
                <p>
                    This page is under construction.
                    <br />
                    Please check back soon for contact information and support!
                </p>
            </div>
        </div>
    );
}
