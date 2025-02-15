export class Card {
  constructor(public name: string, public image: string) {}

  display() {
    return `el nombre de la carta es ${this.name}`;
  }
}

export default Card;
