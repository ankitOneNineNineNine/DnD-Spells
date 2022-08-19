import React from "react";
import { Componentsenum, ISpellInfo } from "../../services/spells";
import styles from "./card.module.css";

/**
 * Card Component
 * @param  props
 * @export Card
 * @returns JSX.Element
 */

export const Card: React.FC<ICardProps> = (props) => {
  const { spell } = props;
  return (
    <div className={styles.cardContainer}>
      <h1>{spell?.name}</h1>
      <h3>{spell?.material}</h3>
      <p>
        <span>Casting Time: </span>
        {spell?.casting_time}
      </p>
      <p>
        <span>Components: </span>
        {spell?.components
          ?.reduce(
            (acc: string[], component) => [...acc, Componentsenum[component]],
            []
          )
          .join(", ")}
      </p>
      <p>
        <span>Attack Type: </span>
        {spell?.attack_type || "Not Mentioned"}
      </p>
      <p>
        <span>Classes That Can Learn Spell : </span>
        {spell?.classes?.map((c) => c.name).join(",")}
      </p>
      <p>
        <span>Level: </span> {spell?.level}
      </p>
      <p>
        <span> Range of Spell: </span>
        {spell?.range}
      </p>
      <p>
        <span>Magic School: </span>
        {spell?.school?.name}
      </p>
      <p>
        <span>Higher Level Spell: </span>
        {spell?.higher_level?.join(",") || "None"}
      </p>
      <h3>Description</h3>
      <ul style={{ listStylePosition: "inside" }}>
        {spell?.desc?.map((description, index) => (
          <li key={index}>{description}</li>
        ))}
      </ul>
    </div>
  );
};

/**
 * interface for Card Props
 */
type ICardProps = {
  spell?: ISpellInfo | undefined;
};
