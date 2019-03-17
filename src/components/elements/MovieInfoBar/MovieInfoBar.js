import React from 'react';
import { calcTime } from '../../../helpers.js';
import './MovieInfoBar.css';

export default function MovieInfoBar(props) {
  return (
    <div className="rmdb-movieinfobar">
      <div className="rmdb-movieinfobar-content">
        <div className="rmdb-movieinfobar-content-col">
          <span className="rmdb-movieinfobar-info">Running Time: {calcTime(props.time)}</span>
        </div>

        </div>
    </div>
  )
}
