import React from 'react';
import { Link } from 'react-router-dom';

function PageCard ( {title,subtitle,content,id} ) {


return (
  <Link style={{textDecoration: "none" }} to= { { pathname: "/", state: {id : id} } } >
   <div className="card mb-3 border-0 blog-card">
     <div className="card-body">
       <h1 className="card-title"> {title }</h1>
       <h3 className="card-title"> {subtitle}</h3>
      <p className="card-text" dangerouselysetinnerHTML={{__html: content }}></p>
    </div>
   </div>
  </Link>
 );
}

export default PageCard;