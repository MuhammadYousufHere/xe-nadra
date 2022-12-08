import React, { FC, HTMLInputTypeAttribute } from "react";
import { IoMdSearch } from "react-icons/io";
import "./searchStyle.scss";
import { SearchProps } from "./types.d";
const SearchBar: FC<SearchProps> = (props) => {
  const { type = "text", value, name, onChange } = props;
  return (
    <div className="search-field">
      <div className="search-input">
        <input type={type} name={name} value={value} onChange={onChange} />
        <div className="search-icon">
          <IoMdSearch />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
