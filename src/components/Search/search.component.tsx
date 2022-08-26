import React, { useState } from "react";
import styles from "./search.module.css";

/**
 * Search Component
 * @param  props
 * @export Search
 * @returns JSX.Element
 */
export const Search: React.FC<ISearchProps> = (props) => {
  const [text, setText] = useState("");

  /**
   * Local Change Handler
   * Required to make text field controlled input
   * @param e
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onChangeHandler(e.target.value);
  };
  const { onChangeHandler } = props;
  return (
    <div className={styles["search-container"]}>
      <input
        value={text}
        type="search"
        onChange={handleSearchChange}
        placeholder="Search Spells Here ..."
      />
    </div>
  );
};

/**
 * Interface for Search Props
 */
interface ISearchProps {
  onChangeHandler: (value: string) => void;
}
