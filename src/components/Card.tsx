import * as React from 'react';


interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string

}
class Card extends React.Component<ICardProps, any> {
  public state = {}
  public render() {
    return (
      <div
        className="draggable"
        id={`${this.props.id}`}
        draggable={true}
        onDragStart={this.props.onDragStart}
      />)
  }
}

export default Card;