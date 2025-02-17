import Card from "../model/Card";



export function CardItem({ card }: { card: Card }) {
    return (
      <div className="card-item">
        <img src={card.image} alt={card.name} />
      </div>
    );
}