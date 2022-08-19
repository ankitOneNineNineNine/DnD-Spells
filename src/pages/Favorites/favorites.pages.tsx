import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Chip } from "../../components/Chip/chip.component";
import { FavoriteContext } from "../../infrastructure/Provider/Context";
import styles from "./favorites.module.css";

/**
 *
 * Favorites Component
 * @param  props
 * @export Favorites
 * @return JSX.Element
 */
export const Favorites: React.FC<IFavoritesProps> = ({ closeModal }) => {
  const favoriteContext = useContext(FavoriteContext);
  /**
   * Change Wish List Function
   * @param index
   */
  const changeWishList = (index: string) => () => {
    favoriteContext?.onChangeWishList(index);
  };
  return (
    <div className={styles.favoriteContainer}>
      <h1> Favorite Spells </h1>
      <div
        data-testid="close-modal"
        className={styles.closeModal}
        onClick={closeModal}
      >
        <i className="fa fa-close" />
      </div>
      <div data-testid="favoriteList">
        {favoriteContext?.favoriteSpells?.map((spell) => (
          <NavLink to={`/spells/${spell.index}`} key={spell.index}>
            <Chip
              text={spell?.name}
              favorite={true}
              index={spell?.index}
              onHeartClick={changeWishList(spell.index)}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

/**
 * interface for Favorite Props
 */
interface IFavoritesProps {
  closeModal: () => void;
}
