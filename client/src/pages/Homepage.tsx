import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
      <div className="home">
        <Link to = "/login"><button>Login</button></Link>
        <Link to = "/signup"><button>Sign Up</button></Link>
        <h2>Plan DIY Projects Like a Pro</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Material Calculator</h3>
            <p>Estimate paint, lumber, and more</p>
          </div>
          {/* Add more feature cards */}
        </div>
      </div>
    );
  }