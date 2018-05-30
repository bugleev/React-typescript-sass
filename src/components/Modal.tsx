import * as React from 'react';

interface IModalProps {
  cardData: {
    data: {
      link?: string,
      number?: string,
      status?: string,
      body?: string,
      stamp?: string
    },
    id: string
  }

}

export default class Modal extends React.Component<IModalProps, any> {
  public render() {
    const { data } = this.props.cardData;
    return (
      <div className="modal">
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
      </div>
    );
  }
}
