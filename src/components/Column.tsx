// tslint:disable:no-console

import * as React from 'react';
import Card from './Card';

export interface IColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  cards?: Array<{
    data: {},
    id: string
  }>,
  cardToDrop?: { data: {}, id: string },
  endNode?: null | string,
  startNode?: null | string,
  name: string,
  id: string,
  children?: any
}


export default class Column extends React.Component<IColumnProps, any> {
  public state = {
    cards: this.props.cards || null
  }

  public shouldComponentUpdate(nextProps: any, nextState: any) {
    if (this.props.id === nextProps.endNode || this.props.id === nextProps.startNode) {
      return true;
    }
    else { return false }
  }
  public componentDidUpdate() {
    this.manageCardsChange();

  }

  public manageCardsChange = () => {
    if (this.props.id === this.props.startNode) {
      console.log("HERE_1");

      const cards = [...this.state.cards!];
      const newCards = cards.filter(el => {
        return el.id !== this.props.cardToDrop!.id
      })
      if (cards.length !== newCards.length) {
        this.setState({ cards: newCards })
      }
    }
    if (this.props.id === this.props.endNode) {
      console.log("HERE_2");
      let cards;
      if (this.state.cards) {
        cards = [...this.state.cards];
        cards.push(this.props.cardToDrop!)
      } else {
        cards = [];
        cards.push(this.props.cardToDrop!)
      }
      this.setState({ cards })
    }
  }
  public render() {

    const children = this.state.cards
      ? this.state.cards.map(card =>
        <Card
          key={card.id}
          data={card.data}
          id={card.id}
          onDragOver={this.props.onDragOver}
          onDragStart={this.props.onDragStart}
        />
      )
      : null
    return (
      <div
        className="column"
        onDragOver={this.props.onDragOver}
        onDrop={this.props.onDrop}
        onClick={this.props.onClick}
        id={this.props.id}>
        <p className="field-text">
          {this.props.name}
          <span>({
            this.state.cards
              ? this.state.cards.length
              : 0
          })</span>
        </p>
        {children}
      </div>
    );
  }
}




