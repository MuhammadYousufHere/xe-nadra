import { useState, useRef } from 'react';
import { DropdownProps } from './types.d';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import useOnClickOutside from '../../hooks/useClickOutside';
import './DropDown.scss';
import ErrorMessage from './ErrorMessage';

const Dropdown = ({
  id,
  label,
  data,
  errorMessage,
  selectedItem,
  setSelectedItem,
  handleItemClick,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => {
    if (dropdownRef.current) {
      setOpen(false);
    }
  });
  const [isOpen, setOpen] = useState(false);
  const toggleDropdown = () => setOpen(!isOpen);

  return (
    <>
      <div
        className='dropdown-container'
        ref={dropdownRef}
      >
        <label htmlFor={id}>{label}</label>
        <div className='dropdown'>
          <div
            id={id}
            className='dropdown-header'
            onClick={toggleDropdown}
          >
            <p> {selectedItem ? selectedItem : 'Select'}</p>
            <div className='caret'>
              <MdOutlineArrowDropDown className='open' />
            </div>
          </div>
          <div className={`dropdown-body ${isOpen && 'open'}`}>
            <div className='item-container'>
              {data?.map((item) => (
                <div
                  className='dropdown-item'
                  // onClick={handleItemClick.bind(null, item.id)}
                  onClick={() => {
                    setSelectedItem(item.name);
                    handleItemClick(item.name);
                    setOpen(false);
                  }}
                  key={item.id}
                >
                  <span className={`dropdown-item-dot`}>•</span>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </>
  );
};

export default Dropdown;
