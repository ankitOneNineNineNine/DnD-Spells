import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/Card/card.components";
import { useGetSpellByIndex } from "../../services/spells";

/**
 * Spell Info Component
 * @returns JSX.Element
 */
const SpellInfo = () => {
  const { id } = useParams();
  const { data: spell } = useGetSpellByIndex(id ?? "");
  return (
    <div>
      <Card spell={spell} />
    </div>
  );
};

export default SpellInfo;
