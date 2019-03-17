import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation(props) {
  return (
    <div className="rmdb-navigation">
      <div className="rmdb-navigation-content">
        <Link to="/">
          <p>Home</p>
        </Link>
        <p>/</p>
        <p>{props.movie}</p>
      </div>
    </div>
  )
}
