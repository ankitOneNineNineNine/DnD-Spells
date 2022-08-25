import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/Card/card.components";
import { useGetSpellByIndex } from "../../services/spells";
import styles from "./spell_info.module.css";
/**
 * Spell Info Component
 * @returns JSX.Element
 */
const SpellInfo = () => {
  const { id } = useParams();
  const { data: spell } = useGetSpellByIndex(id ?? "");
  return (
    <div className={styles.infoContainer}>
      <Card spell={spell} />
    </div>
  );
};

export default SpellInfo;
