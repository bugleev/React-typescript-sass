import * as React from 'react';


interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string

}
class Card extends React.PureComponent<ICardProps, any> {
  public state = {}
  public render() {
    return (
      <div
        className="draggable card"
        id={`${this.props.id}`}
        draggable={true}
        onDragStart={this.props.onDragStart}
        onDragOver={this.props.onDragOver}
      >
        <div className="card--link">
          <a href="#">Link 1</a>
        </div>
        <div className="card--number">
          <div>
            <span>№&#32;<a href="#">2341</a></span>
            <span>норм</span>
          </div>
        </div>
        <div className="card--status">
          <span>error</span>
        </div>
        <div className="card--body">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero quia, quas ea delectus laborum expedita porro sunt enim, deleniti veniam nam iste earum consectetur, quisquam tenetur accusantium nisi quae dignissimos!</p>
        </div>
        <div className="card--stamp">
          <span>A.B.</span>
        </div>
      </div>)
  }
}

export default Card;