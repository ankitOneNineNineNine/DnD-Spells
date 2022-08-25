import React from "react";
import { render, screen } from "@testing-library/react";
import { Favorites } from "../pages/Favorites/favorites.pages";
import { ProviderMock } from "../mocks/provider.mock";
import { ISpell } from "../services/spells";

describe("chip", () => {
  function prepare(favorites: ISpell[]) {
    const { container } = render(
      <ProviderMock favorites={favorites}>
        <Favorites closeModal={() => undefined} />
      </ProviderMock>
    );
    return { container };
  }

  it("should match a snapshot", () => {
    const { container } = prepare([]);
    expect(container).toMatchSnapshot();
  });

  it("empty favorite list", () => {
    prepare([]);
    const favoriteList = screen.getByTestId("favoriteList");
    expect(favoriteList.childNodes.length).toBe(0);
  });

  it("non empty favorite list", () => {
    prepare([
      {
        name: "Animal Messenger",
        index: "animal-messenger",
        url: "/api/spells/animal-messenger"
      }
    ]);
    const favoriteList = screen.getByTestId("favoriteList");
    expect(favoriteList.childNodes.length).toBe(1);
  });
});
