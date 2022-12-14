import React from "react";
import styles from "./chip.module.css";

/**
 * interface for Chip Props
 */
interface IChipProps {
  text: string;
  favorite: boolean;
  index: string;
  onHeartClick?: (index: string) => void | undefined;
}

/**
 * Chip Component
 * @param  props
 * @export Chip
 * @returns JSX.Element
 */
export const Chip: React.FC<IChipProps> = (props) => {
  const { text } = props;

  return (
    <div className={styles.chip}>
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
