import React from 'react';
import { useDispatch } from 'react-redux';

import { updateFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={e => dispatch(updateFilter(e.target.value))} />
    </div>
  );
};

export default Filter;
