import React, { createContext, useState } from "react";
import { ISpell, useGetAllSpells } from "../../../services/spells";

/**
 * interface for Favorite Context
 */
interface IFavoriteContext {
  favoriteSpells: ISpell[];
  onChangeWishList: (index: string) => void;
}

/**
 * Context for Favorites
 * @export FavoriteContext
 */
export const FavoriteContext = createContext<IFavoriteContext | null>(null);

/**
 * FavoriteContextProvider Component
 * @param  props
 * @export FavoriteContextProvider
 * @returns JSX.Element
 */
export const FavoriteContextProvider: React.FC<
  IFavoriteContextProviderProps
> = (props) => {
  const { children } = props;
  const [favoriteSpells, setFavoriteSpells] = useState<ISpell[]>([]);
  const { data } = useGetAllSpells();

  /**
   * Add/Remove in FavoriteLists
   * @param {string} index
   */
  const onChangeWishList = (index: string) => {
    const spell = data?.results?.find((spell) => spell.index === index);
    if (spell) {
      if (favoriteSpells.find((spell) => spell.index === index)) {
        setFavoriteSpells((spells) =>
          favoriteSpells.filter((favorite) => favorite.index !== spell.index)
        );
      } else {
        setFavoriteSpells((spells) => [...spells, spell]);
      }
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        onChangeWishList,
        favoriteSpells,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

/**
 * interface for FavoriteContextProvider Props
 */
interface IFavoriteContextProviderProps {
  children: React.ReactNode;
}
