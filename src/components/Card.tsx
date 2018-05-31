import * as React from 'react';


interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    link?: string,
    number?: string,
    status?: string,
    body?: string,
    stamp?: string
  },
  id: string

}
class Card extends React.PureComponent<ICardProps, any> {
  public render() {
    const { data, id } = this.props;
    return (
      <div
        className="draggable card"
        id={`${id}`}
        draggable={true}
        onDragStart={this.props.onDragStart}
        onClick={this.props.onClick}
      >
        <div className="card--link">
          <a href="#">{data.link}</a>
        </div>
        <div className="card--number">
          <div>
            <span>№&#32;<a href="#">{data.number}</a></span>
            <span>норм</span>
          </div>
        </div>
        <div className="card--status">
          <span>{data.status}</span>
        </div>
        <div className="card--body">
          <p>{data.body}</p>
        </div>
        <div className="card--stamp">
          <span>{data.stamp}</span>
        </div>
      </div>)
  }
}
export default Card;