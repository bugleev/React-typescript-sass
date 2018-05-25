import * as React from 'react';
import Card from "./Card";

export function populateColumn() {
  const cards = [];
  // const random = Math.floor(Math.random() * 15);
  for (let i = 0; i < 15; i++) {
    cards.push(<Card key={`${i}`} id={`${Math.floor(Math.random() * 5000)}`} />)
  }
  return cards;
}
