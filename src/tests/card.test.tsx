import React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "../components/Card/card.components";
import { ISpellInfo } from "../services/spells";

/**
 * Mock Spell Details
 */
let mockSpell: ISpellInfo = {
  concentration: false,
  casting_time: "1 action",
  damage: {
    damage_at_character_level: {},
    damage_type: {
      index: "acid",
      name: "Acid",
      url: "/api/damage-types/acid",
    },
  },
  classes: [{ index: "wizard", name: "Wizard", url: "/api/classes/wizard" }],
  components: ["V", "S", "M"],
  desc: [
    "A shimmering green arrow streaks toward a target w…damage and no damage at the end of its next turn.",
  ],
  duration: "Instantaneous",
  higher_level: [
    "When you cast this spell using a spell slot of 3rd…) increases by 1d4 for each slot level above 2nd.",
  ],
  index: "acid-arrow",
  level: 2,
  material: "Powdered rhubarb leaf and an adder's stomach.",
  name: "Acid Arrow",
  range: "90 feet",
  ritual: false,
  subclasses: [],
  school: {
    index: "evocation",
    name: "Evocation",
    url: "/api/magic-schools/evocation",
  },
  url: "/api/spells/acid-arrow",
  _id: "62fd2c57b749a01481874e0e",
};

describe("card", () => {
  it("should match a snapshot", () => {
    const { container } = render(<Card spell={mockSpell} />);
    expect(container).toMatchSnapshot();
  });

  it("should display title", () => {
    render(<Card spell={mockSpell} />);
    expect(screen.getByText(mockSpell.name!)).toBeTruthy();
  });

  it("should display Empty Title", () => {
    render(<Card />);
    expect(screen.getByRole("heading", { level: 1 })).toBeEmptyDOMElement();
  });
});
