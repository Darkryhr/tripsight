import React from 'react';

import { ReactComponent as NoPage } from './404.svg';

function NotFound() {
  return (
    <div className="notfound">
      <NoPage />
    </div>
  );
}

export default NotFound;
