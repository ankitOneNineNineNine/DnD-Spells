import React from "react";
import styles from "./chip.module.css";

/**
 * Chip Component
 * @param {IChipProps} props
 * @export Chip
 * @returns JSX.Element
 */
export const Chip: React.FC<IChipProps> = (props) => {
  const { text } = props;

  return (
    <div
      className={styles.chip}
      style={{
        backgroundPosition: "50px 50px",
      }}
    >
      <span>{text}</span>
      <div
        data-testid="wishlistButton"
        className={styles.wishList}
        style={props.favorite ? { color: "rgb(255, 0, 0)" } : {}}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (props?.onHeartClick) props.onHeartClick(props.index);
        }}
      >
        <i className="fa fa-heart" />
      </div>
    </div>
  );
};

/**
 * interface for Chip Props
 */
interface IChipProps {
  text: string;
  favorite: boolean;
  index: string;
  onHeartClick?: (index: string) => void | undefined;
}
