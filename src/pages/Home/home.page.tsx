import styles from "./home.module.css";
import { useGetAllSpells } from "../../services/spells";
import { Chip } from "../../components/Chip/chip.component";
import { useContext, useEffect, useRef, useState } from "react";
import { FavoriteContext } from "../../infrastructure/Provider/Context";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { Favorites } from "../Favorites/favorites.pages";
import { Search } from "../../components/Search/search.component";

/**
 * Home Page
 * @export Home
 * @returns JSX.Element
 */
const Home = () => {
  const { data: spellResults, isLoading, isError } = useGetAllSpells();
  const favoriteContext = useContext(FavoriteContext);
  const homePageRef = useRef<HTMLDivElement | null>(null);
  const [showFavoriteModel, setShowFavoriteModel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * debounced search (1s after user stops typing)
   */
  const debouncedSearch = useRef(
    _.debounce((searchTerm) => {
      setSearchQuery(searchTerm);
    }, 1000)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  /**
   * Close Modal
   */
  const closeModal = () => {
    setShowFavoriteModel(false);
  };

  /**
   * Open Modal
   */
  const openModal = () => {
    setShowFavoriteModel(true);
  };

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

  const filteredSpells = spellResults?.results?.filter((spells) =>
    spells.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Dungeons & Dragons Spells</h1>
      <button
        aria-label="favorite-btn"
        onClick={openModal}
        className={styles.favoriteButton}
      >
        Favorites
      </button>
      <Search text={searchQuery} onChangeHandler={setSearchQuery} />
      {isError ? (
        <p>Something Went Wrong</p>
      ) : isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div data-testid="all-spells" className={styles.spellContainer}>
          {filteredSpells?.map((result) => (
            <NavLink
              data-testid="chip-nav"
              to={`/spells/${result.index}`}
              key={result.index}
            >
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
          <Favorites closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export default Home;
