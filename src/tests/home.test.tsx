import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import Home from "../pages/Home/home.page";
import { ProviderMock } from "../mocks/provider.mock";
import { server } from "../mocks/server.mock";
import { rest } from "msw";
import { api } from "../services/api";

describe("home", () => {
  function prepare() {
    const { container } = render(
      <ProviderMock favorites={[]}>
        <Home />
      </ProviderMock>
    );
    return { container };
  }

  it("testing match snapshot", () => {
    const { container } = prepare();
    expect(container).toMatchSnapshot();
  });

  it("open and close favorites component", async () => {
    prepare();
    const favoriteBtn = screen.getByRole("button", { name: /favorite-btn/i });
    fireEvent.click(favoriteBtn);
    await waitFor(() => {
      const fav = screen.getByText("Favorite Spells");
      expect(fav).toBeInTheDocument();
    });
    const closeModal = screen.getByTestId("close-modal");
    fireEvent.click(closeModal);

    await waitFor(() => {
      const fav = screen.queryByText("Favorite Spells");
      expect(fav).toBe(null);
    });
  });

  it("mock query response check", async () => {
    prepare();
    expect(await screen.findByTestId("all-spells")).toBeInTheDocument();
  });

  it("check page change on clicking a chip", async () => {
    prepare();
    const currentLink = window.location.pathname;
    const linkToChip = await screen.findAllByTestId("chip-nav");
    fireEvent.click(linkToChip[0]);
    await waitFor(() => {
      expect(window.location.pathname).not.toBe(currentLink);
    });
  });
  it("check error response", async () => {
    server.use(
      rest.get(api.spells.fetch, async (req, res, ctx) => {
        return res(ctx.json(ctx.status(500)));
      })
    );
    prepare();
    expect(screen.queryByTestId("all-spells")).toBe(null);
  });
});
