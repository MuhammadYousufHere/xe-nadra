import { useState, useRef } from "react";
import { DropdownProps } from "./types.d";
import { MdOutlineArrowDropDown } from "react-icons/md";
import useOnClickOutside from "../../hooks/useClickOutside";
import "./DropDown.scss";
import ErrorMessage from "./ErrorMessage";

const Dropdown = ({
  id,
  label,
  data,
  children,
  errorMessage,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => {
    if (dropdownRef.current) {
      setOpen(false);
    }
  });
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | string | null>();

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (idx: number | string) => {
    selectedItem === idx ? setSelectedItem(null) : setSelectedItem(idx);
    setOpen(!isOpen);
  };

  return (
    <>
      <div className="dropdown-container" ref={dropdownRef}>
        <label htmlFor={id}>{label}</label>
        <div className="dropdown">
          <div id={id} className="dropdown-header" onClick={toggleDropdown}>
            {selectedItem ? data?.find((item) => item.id)!.name : "Select"}
            <div className="caret">
              <MdOutlineArrowDropDown className="open" />
            </div>
          </div>
          <div className={`dropdown-body ${isOpen && "open"}`}>
            {children}
            <div className="item-container">
              {data?.map((item) => (
                <div
                  className="dropdown-item"
                  onClick={() => handleItemClick(item.id)}
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
      {errorMessage && <ErrorMessage error={errorMessage} />}
    </>
  );
};

export default Dropdown;
