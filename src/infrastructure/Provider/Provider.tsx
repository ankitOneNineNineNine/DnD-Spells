import React from "react";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { FavoriteContextProvider } from "./Context";

/**
 * Initializing Query Client
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 30 * 1000,
    },
  },
});

/**
 * Provider Component
 * @param  props
 * @export Provider
 * @returns JSX.Element
 */
const Provider: React.FC<IProvider> = (props) => {
  const { children } = props;
  return (
    <React.StrictMode>
      <BrowserRouter>
        <React.Suspense fallback={<p>Loading ...</p>}>
          <Toaster position="bottom-right" />
          <QueryClientProvider client={queryClient}>
            <FavoriteContextProvider>{children}</FavoriteContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </React.Suspense>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default Provider;

/**
 * interface for Provider Props
 */
interface IProvider {
  children: React.ReactNode;
}
