import React from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing__prompt">
        <h1>Hello.</h1>
        <hr />
        <div className="landing__subtext">
          <h3>Welcome to your next journey</h3>
          <div className="landing__subtextSign">
            <button>
              <Link to="/register">Sign Up</Link>
            </button>
            <p>
              Already have an account?
              <span>
                <Link to="/login"> Sign in here</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
