import * as React from 'react';

interface SearchItemParams {
  onSearch: (value: string) => void;
}

export const SearchItem = ({ onSearch }: SearchItemParams) => {
  return (
    <li className="list-item">
      <div className="list-item__center">
        <input type="text" className="text-input" placeholder="Search" onKeyDown={obj => onSearch(obj.currentTarget.value)} />
      </div>
    </li>
  );
}