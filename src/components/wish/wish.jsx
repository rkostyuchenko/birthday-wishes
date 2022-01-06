import React from 'react';

import './wish.css';

export const Wish = (props) => {
  const { children, onRefresh, addressee } = props;

  return (
    <div className='wish'>
      <p className='wish__paragraph'>
        {addressee}
        , с днем рождения!
        {' '}
        🥳
      </p>
      <p className='wish__paragraph'>
        {children}
      </p>
      <div className='wish__action'>
        <button
          className='wish__button'
          onClick={onRefresh}
        >
          Показать другое поздравление
        </button>
      </div>
    </div>
  );
}
