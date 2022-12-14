import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { FavoriteContext } from "../infrastructure/Provider/Context";
import { ISpell } from "../services/spells";

/**
 * Provider Mock Component
 * @param props
 * @export ProviderMock
 * @returns JSX.Element
 */

export const mockQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 1,
      retry: 0
    }
  }
});
export const ProviderMock: React.FC<{
  children: React.ReactNode;
  favorites: ISpell[];
}> = (props) => {
  const { children, favorites } = props;
  const contextValues = {
    onChangeWishList: jest.fn(),
    favoriteSpells: favorites
  };

  return (
    <BrowserRouter>
      <QueryClientProvider client={mockQueryClient}>
        <FavoriteContext.Provider value={contextValues}>
          {children}
        </FavoriteContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
