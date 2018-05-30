// tslint:disable:no-console
import * as React from 'react';

interface IDragState {
  cardId: null | string,
  endNode: null | string,
  updateOnDrop: boolean,
  nextSib: null | string,
  prevSib: null | string,
  startNode: null | string
}

function DragndropInterface(WrappedComponent: React.ComponentClass<any>) {

  return class Interface extends React.Component<any, IDragState> {
    public state = {
      cardId: null,
      endNode: null,
      nextSib: null,
      prevSib: null,
      startNode: null,
      updateOnDrop: false

    };

    public click = (ev: React.MouseEvent<HTMLDivElement>) => {
      console.log(":TEST")
    };

    public drag = (ev: React.DragEvent<HTMLDivElement>) => {
      ev.dataTransfer.setData("text", ev.currentTarget.id);
      const parent = ev.currentTarget.parentElement as HTMLDivElement;
      const prevNode = parent.previousSibling as HTMLDivElement;
      const nextNode = parent.nextSibling as HTMLDivElement;
      const startNode = parent.id;
      const prevSib =
        prevNode &&
        prevNode.id;
      const nextSib =
        nextNode &&
        nextNode.id;
      if (prevSib !== this.state.prevSib || nextSib !== this.state.nextSib) {
        this.setState({ cardId: ev.currentTarget.id, prevSib, nextSib, startNode, updateOnDrop: false });
      } else {
        this.setState({ cardId: ev.currentTarget.id, updateOnDrop: false });
      }
    };

    public allowDrop = (ev: any) => {
      const currentTarget = ev.target as HTMLDivElement;

      if (currentTarget.id === this.state.prevSib || currentTarget.id === this.state.nextSib) {
        currentTarget.classList.add("droppable");
        ev.preventDefault();
        return;
      } else {
        ev.dataTransfer.dropEffect = "none";
      }
    };

    public drop = (ev: any) => {
      if (
        ev.target.id === this.state.prevSib ||
        ev.target.id === this.state.nextSib
      ) {
        ev.preventDefault();
        this.setState({ endNode: ev.target.id, updateOnDrop: true });
      }
    };

    public render() {
      return <WrappedComponent
        state={this.state}
        drop={this.drop}
        allowDrop={this.allowDrop}
        drag={this.drag}
        click={this.click}
        {...this.props}
      />;
    }
  }
}

export default DragndropInterface;
