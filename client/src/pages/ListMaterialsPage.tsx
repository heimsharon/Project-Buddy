import React from 'react';
import '../assets/styles/materiallist.css';

export default function CreateMaterialsPage() {
    return (
        <div className="material-list-background">
            <div className="material-list">
                <span
                    className="under-construction"
                    role="img"
                    aria-label="construction"
                >
                    🚧
                </span>
                <h2>Materials</h2>
                <p>
                    This page is under construction.
                    <br />
                    Please check back soon for contact information and support!
                </p>
            </div>
        </div>
    );
}
