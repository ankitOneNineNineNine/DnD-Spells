import React from "react";
import { render } from "@testing-library/react";
import SpellInfo from "../pages/Spells/spell_info.page";
import { ProviderMock } from "../mocks/provider.mock";

describe("spell info", () => {
  it("should match a snapshot", () => {
    const { container } = render(
      <ProviderMock favorites={[]}>
        <SpellInfo />
      </ProviderMock>
    );
    expect(container).toMatchSnapshot();
  });
});
