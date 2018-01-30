import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export default function Home({ props }) {
  return (
    <div>
      <div id="home-header">

        <h1 className="home-heading">Welcome</h1><br /><p className="home-heading-subtext">Get closer to your dream home</p>
        <div className={`getstartedbutton`}>
          <Link to={'/dashboard'}>{'Get Started!'}</Link>
        </div>
      </div>
    </div>
  );
}

