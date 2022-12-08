import { useState, useEffect } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import "./DropDown.scss";
import SearchBar from "./SearchBar";

const data = [
  { id: 0, label: "Istanbul, TR (AHL)" },
  { id: 1, label: "Paris, FR (CDG)" },
  { id: 3, label: "Istanbul, TR (AHL)" },
  { id: 14, label: "Paris, FR (CDG)" },
  { id: 6, label: "Istanbul, TR (AHL)" },
  { id: 19, label: "Paris, FR (CDG)" },
  { id: 9, label: "Istanbul, TR (AHL)" },
  { id: 144, label: "Paris, FR (CDG)" },
  { id: 5, label: "Istanbul, TR (AHL)" },
  { id: 11, label: "Paris, FR (CDG)" },
  { id: 32, label: "Istanbul, TR (AHL)" },
  { id: 142, label: "Paris, FR (CDG)" },
];

const Dropdown = ({ id = "c", label }) => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (idx) => {
    selectedItem == idx ? setSelectedItem(null) : setSelectedItem(idx);
  };

  return (
    <div className="dropdown-container">
      <label htmlFor={id}>{label}</label>
      <div className="dropdown">
        <div id={id} className="dropdown-header" onClick={toggleDropdown}>
          {selectedItem
            ? items.find((item) => item.id === selectedItem).label
            : "Select"}
          <div className="caret">
            <MdOutlineArrowDropDown className={isOpen && "open"} />
          </div>
        </div>
        <div className={`dropdown-body ${isOpen && "open"}`}>
          <SearchBar />
          <div className="item-container">
            {items.map((item, i) => (
              <div
                className="dropdown-item"
                onClick={(e) => handleItemClick(e.target.id)}
                key={item.id}
              >
                <span
                  className={`dropdown-item-dot ${
                    item.id === selectedItem && "selected"
                  }`}
                >
                  •{" "}
                </span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
