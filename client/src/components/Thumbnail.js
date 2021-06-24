import React, { useState } from 'react';

import Vacation from './Vacation';
import './Thumbnail.css';

function Thumbnail(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="thumbnail" onClick={() => setOpen(!open)}>
        <img src={props.img} alt={props.destination} />
        <h3 className="thumbnail__title">{props.destination}</h3>
      </div>
      {open ? <Vacation {...props} open={open} setOpen={setOpen} /> : ''}
    </>
  );
}

export default Thumbnail;
