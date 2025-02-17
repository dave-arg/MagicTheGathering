import { useState, useEffect } from "react";
import Card from "../model/Card";
import { CardItem } from "./CardItem";
import { useCardsContext } from "../contexts/CardsContext";



export function CardList() {
  const { cardsService } = useCardsContext();
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    cardsService.getCards().then((cards) => {
      setCards(cards);
    });
  }, [cardsService]);

  return (
    <div className="card-list">
      {cards?.map((card) => (
        <CardItem key={card.name} card={card} />
      ))}
    </div>
  );
}

