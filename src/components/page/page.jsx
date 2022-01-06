import React from 'react';

import './page.css';

export const Page = (props) => {
  const { children } = props;

  return (
    <div className='page'>
      <div className='page__content'>
        {children}
      </div>
    </div>
  );
}
