import React from 'react';
import './MovieThumb.css';
import { Link } from 'react-router-dom';

export default function MovieThumb(props) {
  return (
    <div className="rmdb-moviethumb">
    {!props.cickable ? 
    <Link to={
      {pathname:`/${props.movieId}`,
       movieName:`${props.movieName}`
      }
       }>
       <img src={props.image}/> 
    </Link>
    : <img src={props.image} />
    }
    </div>
  )

}
