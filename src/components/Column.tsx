// tslint:disable:no-console

import * as React from 'react';

export interface IColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  endNode?: null | string,
  startNode?: null | string,
  name: string,
  id: string,
  children?: any
}


export default class Column extends React.Component<IColumnProps, any> {
  public state = {
    children: null
  }

  public shouldComponentUpdate(nextProps: any, nextState: any) {
    if (this.props.id === nextProps.endNode || this.props.id === nextProps.startNode) {
      return true;
    }
    else { return false }
  }
  public componentDidUpdate() {
    if (this.state.children !== this.countChildren()) {
      this.setState({ children: this.countChildren() })
    }
  }
  public componentWillMount() {
    this.setState({ children: (this.props.children && this.props.children.length) })
  }
  public countChildren = () => {
    const parent = document.getElementById(this.props.id) as HTMLDivElement;
    return Array.from(parent.childNodes).length - 1;
  }
  public render() {
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child as React.ReactElement<any>, {
        onDragOver: this.props.onDragOver,
        onDragStart: this.props.onDragStart
      })
    })


    return (
      <div className="column" onDragOver={this.props.onDragOver} onDrop={this.props.onDrop} onClick={this.props.onClick} id={this.props.id}>
        <p className="field-text">
          {this.props.name} <span>({
            this.state.children}
            )</span>
        </p>
        {children}
      </div>
    );
  }
}




