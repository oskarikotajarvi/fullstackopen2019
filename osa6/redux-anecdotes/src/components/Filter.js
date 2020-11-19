import React from 'react';
import { connect } from 'react-redux';

import { updateFilter } from '../reducers/filterReducer';

const Filter = props => {
  //const dispatch = useDispatch();

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={e => props.updateFilter(e.target.value)} />
    </div>
  );
};

//export default Filter;
export default connect(null, { updateFilter })(Filter);
