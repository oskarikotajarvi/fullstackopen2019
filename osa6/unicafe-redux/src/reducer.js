const initialState = {
  good: 0,
  ok: 0,
  bad: 0
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'GOOD':
      const currentGood = state.good;
      return { ...state, good: currentGood + 1 };
    case 'OK':
      const currentOk = state.ok;
      return { ...state, ok: currentOk + 1 };
    case 'BAD':
      const currentBad = state.bad;
      return { ...state, bad: currentBad + 1 };
    case 'ZERO':
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;
