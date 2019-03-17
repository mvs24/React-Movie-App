import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import MovieLogo from './Images/reactMovie_logo.png';

export default function Header() {
  return (
    <div className="rmdb-header">
        <div className="rmdb-header-content">
          <Link to="/">
            <img src={MovieLogo} className="rmdb-logo" alt=""/>        
          </Link>
        </div>
    </div>
  )
}
 