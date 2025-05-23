import React from "react";

export default function ProjectCard() {
    return (
      <div className="project-card">
        <h3>Build a Bookshelf</h3>
        <p>Status: Planning</p>
        <div className="progress-bar">
          <div style={{ width: "30%" }}></div> {/* Static progress */}
        </div>
      </div>
    );
  }