const reducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return action.data.filterText;
    default:
      return state;
  }
};

export const updateFilter = filterText => {
  return {
    type: 'UPDATE_FILTER',
    data: { filterText }
  };
};

export default reducer;
