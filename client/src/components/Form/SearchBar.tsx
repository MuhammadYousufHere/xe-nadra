import { forwardRef } from 'react';
import { IoMdSearch } from 'react-icons/io';
import './searchStyle.scss';
import { SearchProps } from './types.d';
const SearchBar = forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
  const { type = 'text', value, name, onChange, onKeyDown } = props;
  return (
    <div className='search-field'>
      <div className='search-input'>
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoFocus
        />
        <div className='search-icon'>
          <IoMdSearch />
        </div>
      </div>
    </div>
  );
});

export default SearchBar;
