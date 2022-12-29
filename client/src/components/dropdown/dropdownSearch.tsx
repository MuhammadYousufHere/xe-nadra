import * as React from 'react';
import './DropDown.scss';
import { MdOutlineArrowDropDown } from 'react-icons/md';

import { inputKeyDownAction, itemAction } from './dropdownSearchHelpers';
import { SearchBar } from '../Form';
import ErrorMessage from '../Form/ErrorMessage';
export type DropdownData = Array<{ id: number | string; name: string }>;

export interface DropdownProps {
  dropDownItem: string;
  setDropdownItem: React.Dispatch<React.SetStateAction<string>>;
  dropDownData: DropdownData;
  selectedCountryName: (name: string) => void;
  id: string;
  label: string;
  error?: string;
}

interface DropdownSearchProps extends DropdownProps {
  strictSearch?: boolean;
}

const DropdownSearch = ({
  id,
  label,
  dropDownItem,
  setDropdownItem,
  dropDownData,
  selectedCountryName,
  error,
  strictSearch = false,
}: DropdownSearchProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [filteredData, setFilteredData] =
    React.useState<DropdownData>(dropDownData);

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as HTMLDivElement)) {
      setOpen(false);
    }
  };

  function setData(e: React.ChangeEvent<HTMLInputElement>) {
    setFilteredData(
      dropDownData.filter(function (i) {
        if (strictSearch) {
          return i.name.includes(e.target.value);
        } else {
          return i.name.toLowerCase().includes(e.target.value.toLowerCase());
        }
      })
    );
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref]);
  return (
    <>
      <div
        className={`dropdown-container colLayout dropdownBorder ${
          open ? 'priority' : ''
        }`}
        ref={ref}
      >
        <label htmlFor={id}>{label}</label>
        <div
          className='dropdown'
          id={id}
        >
          <div
            className='dropdown-header'
            onClick={() => {
              setOpen(!open);
              setFilteredData(dropDownData);
            }}
          >
            <p> {dropDownItem ? dropDownItem : 'Select'}</p>
            <div className='caret'>
              <MdOutlineArrowDropDown className='open' />
            </div>
          </div>
        </div>

        {open && (
          <div className='dropdown float'>
            <>
              <SearchBar
                type='text'
                onChange={(e) => setData(e)}
                onKeyDown={(e) => inputKeyDownAction(e, filteredData)}
              />
            </>
            <div className='item-container'>
              {filteredData.map((item) => {
                return (
                  <div
                    tabIndex={0}
                    className='dropdown-item'
                    key={item.id}
                    onClick={() => {
                      setDropdownItem(item.name);
                      //  filteredData.filter(function (i) {
                      //    return i.name === item.name;
                      //  })[0].name;

                      selectedCountryName(item.name);
                      setOpen(false);
                    }}
                    onKeyDown={(e) => itemAction(e)}
                  >
                    <span className={`dropdown-item-dot`}>•</span>
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {error && <ErrorMessage message={error} />}
    </>
  );
};

export default DropdownSearch;
