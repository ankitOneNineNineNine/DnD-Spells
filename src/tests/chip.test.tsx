import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Chip } from "../components/Chip/chip.component";
import { ISpell } from "../services/spells";
import { ProviderMock } from "../mocks/provider.mock";

/**
 * Mock Spell From a List
 */
const mockSpellInfo = {
  name: "Animal Messenger",
  index: "animal-messenger",
  url: "/api/spells/animal-messenger"
};

describe("chip", () => {
  function prepare(favorites: ISpell[]) {
    const { container } = render(
      <ProviderMock favorites={favorites}>
        <Chip
          favorite={false}
          text={mockSpellInfo.name}
          index={mockSpellInfo.index}
          onHeartClick={() => undefined}
        />
      </ProviderMock>
    );
    return { container };
  }
  it("should match a snapshot", () => {
    const { container } = prepare([]);
    expect(container).toMatchSnapshot();
  });
  it("button click wishlist", async () => {
    const handleClick = jest.fn();
    render(
      <Chip
        favorite={false}
        text={mockSpellInfo.name}
        index={mockSpellInfo.index}
        onHeartClick={handleClick}
      />
    );
    const heart = screen.getByTestId("wishlistButton");
    fireEvent.click(heart);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
