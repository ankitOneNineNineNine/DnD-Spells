import styles from "./home.module.css";
import { useGetAllSpells } from "../../services/spells";
import { Chip } from "../../components/Chip/chip.component";
import { useContext, useEffect, useRef, useState } from "react";
import { FavoriteContext } from "../../infrastructure/Provider/Context";
import { NavLink } from "react-router-dom";
import { Favorites } from "../Favorites/favorites.pages";

/**
 * Home Page
 * @export Home
 * @returns JSX.Element
 */

 const Home = () => {
  const { data } = useGetAllSpells();
  const favoriteContext = useContext(FavoriteContext);
  const homePageRef = useRef<HTMLDivElement | null>(null);
  const [showFavoriteModel, setShowFavoriteModel] = useState(false);

  /**
   * Handler to Close Favorites Drawer
   * @param {MouseEvent} event
   */
  const handleCloseDrawer = (event: MouseEvent) => {
    if (
      event?.target &&
      homePageRef &&
      !homePageRef.current?.contains(event?.target as Node)
    ) {
      setShowFavoriteModel(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleCloseDrawer);
    return () => {
      document.removeEventListener("mousedown", handleCloseDrawer);
    };
  }, []);
  return (
    <div>
      <h1>Dungeons & Dragons Spells</h1>
      <button
        aria-label="favorite-btn"
        onClick={(e) => setShowFavoriteModel((show) => !show)}
        className={styles.favoriteButton}
      >
        Favorites
      </button>
      {!!data?.count && (
        <div data-testid="all-spells" className={styles.spellContainer}>
          {data?.results?.map((result) => (
            <NavLink to={`/spells/${result.index}`} key={result.index}>
              <Chip
                favorite={
                  !!favoriteContext?.favoriteSpells.find(
                    (spell) => spell.index === result.index
                  )
                }
                text={result.name}
                index={result.index}
                onHeartClick={favoriteContext?.onChangeWishList}
              />
            </NavLink>
          ))}
        </div>
      )}

      {showFavoriteModel && (
        <div ref={homePageRef}>
          <Favorites closeModal={() => setShowFavoriteModel(false)} />
        </div>
      )}
    </div>
  );
};

export default Home