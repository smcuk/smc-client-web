import React from 'react';
import { Link } from 'react-router-dom';

export default function Home({ props }) {
  return (
    <div>
      <div className="homecontent">
        <img style={{ width: '100vw', height: '100vh' }} src="/home.svg" alt="" />
        <div className={`getstartedbutton`}>
          <Link to={'/dashboard'}>{'Get Started!'}</Link>
        </div>
      </div>
    </div>
  );
}
