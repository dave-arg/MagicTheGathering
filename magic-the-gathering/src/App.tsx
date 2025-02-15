import { useEffect, useState } from "react";
import "./App.css";
import Card from "./model/Card";
import axiosCardInstance from "./rest/axiosCardInstance";

function App() {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const storedCards = localStorage.getItem("localCards");

    if (storedCards) {
      setCards(JSON.parse(storedCards));
    } else {
      axiosCardInstance
        .get("/cards")
        .then((response) => {
          localStorage.setItem("localCards", JSON.stringify(response.data));
          setCards(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, []);

  console.log(cards);

  return (
    <>
      {cards.map((item: Card, index: number) => (
        <div key={index}>{item.display()}</div>
      ))}
    </>
  );
}

export default App;
