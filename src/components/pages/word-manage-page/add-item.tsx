import * as React from 'react';

interface AddItemParams {
  onAdd: (value: string) => void;
}

export const AddItem = ({ onAdd }: AddItemParams) => {
  const onKeyDown = (obj: any) => {
    if (obj.keyCode === 13) {
      onAdd(obj.currentTarget.value);
      obj.currentTarget.value = '';
    }
  }

  return <input onKeyDown={onKeyDown} />;
}