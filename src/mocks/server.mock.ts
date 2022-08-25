import { setupServer } from "msw/node";
import { rest } from "msw";
import { api } from "../services/api";
/**
 * Mock Spells
 */
const mockSpells = [
  {
    name: "Animal Messenger",
    index: "animal-messenger",
    url: "/api/spells/animal-messenger"
  },
  {
    index: "etherealness",
    name: "Etherealness",
    url: "/api/spells/etherealness"
  }
];

/**
 * Setup Mock Server
 * @export server
 */
export const server = setupServer(
  rest.get(api.spells.fetch, async (req, res, ctx) => {
    return res(
      ctx.json({
        results: mockSpells,
        count: mockSpells.length
      })
    );
  })
);
