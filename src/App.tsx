import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Provider from "./infrastructure/Provider/Provider";
const Home = lazy(() => import("./pages/Home/home.page"));
const SpellInfo = lazy(() => import("./pages/Spells/spell_info.page"));

/**
 *
 * App Component
 * @export App
 * @return JSX.Element
 */
export default function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spells/:id" element={<SpellInfo />} />
      </Routes>
    </Provider>
  );
}
