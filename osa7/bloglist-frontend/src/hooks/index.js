import { useState } from 'react';

export const useField = type => {
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    reset
  };
};

export const useExcludeResetField = fields => {
  const { reset, ...rest } = { ...fields };
  return rest;
};
