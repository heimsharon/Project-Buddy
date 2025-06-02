import React from 'react';
import '../assets/styles/taskcreate.css';

export default function CreateTasksPage() {
    return (
        <div className="create-tasks-background">
            <div className="task-page">
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
