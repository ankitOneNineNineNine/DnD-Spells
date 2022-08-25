import React from "react";
import styles from "./search.module.css";

/**
 * Interface for Search Props
 */

interface ISearchProps {
  text: string;
  onChangeHandler: (value: string) => void;
}

/**
 * Search Component
 * @param  props
 * @export Search
 * @returns JSX.Element
 */
export const Search: React.FC<ISearchProps> = (props) => {
  const { text, onChangeHandler } = props;
  return (
    <div className={styles["search-container"]}>
      <input
        type="search"
        value={text}
        onChange={(e) => onChangeHandler(e.target.value)}
        placeholder="Search Spells Here ..."
      />
    </div>
  );
};
