// tslint:disable:no-console
import * as React from 'react';

interface IDragState {
  blank: boolean
  endNode: null | string,
  updateOnDrop: boolean,
  nextSib: null | string,
  prevSib: null | string,
  startNode: null | string
}

function DragndropInterface(WrappedComponent: React.ComponentClass<any>) {

  return class Interface extends React.Component<any, IDragState> {
    public state = {
      blank: false,
      endNode: null,
      nextSib: null,
      prevSib: null,
      startNode: null,
      updateOnDrop: false

    };

    public click = (ev: React.MouseEvent<HTMLDivElement>) => {
      console.log(":TEST")
    };

    public removeBlank = (id: string) => {
      const parent = document.getElementById(id) as HTMLDivElement;
      Array.from(parent.childNodes).forEach((el: HTMLDivElement) => {
        if (el.id === "blank") {
          parent.removeChild(el);
        }
      });
    };
    public checkForBlanks = (id: string) => {
      const parent = document.getElementById(id) as HTMLDivElement;
      let count = 0;
      Array.from(parent.childNodes).forEach((el: HTMLDivElement) => {
        if (el.id === "blank") {
          count++;
        }
      });
      return count;
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
        this.setState({ prevSib, nextSib, startNode, updateOnDrop: false });
      } else {
        this.setState({ updateOnDrop: false });
      }
    };

    public allowDrop = (ev: any) => {
      const currentTarget = ev.target as HTMLDivElement;
      const currentId = currentTarget.id as string;
      if (currentId === "blank") {
        ev.preventDefault();
        return;
      }
      const parent = currentTarget.parentElement as HTMLDivElement;
      if (currentId === this.state.prevSib || currentId === this.state.nextSib) {
        if (this.state.blank && this.checkForBlanks(currentId) >= 1) {
          this.removeBlank(currentId);
          this.setState({ blank: false });
        }
        ev.preventDefault();
        return;
      } else if (
        parent.id === this.state.prevSib ||
        parent.id === this.state.nextSib
      ) {
        if (this.checkForBlanks(parent.id) > 0) {
          ev.preventDefault();
          return;
        }
        const parentNode = document.getElementById(parent.id) as HTMLDivElement;
        const currentNode = document.getElementById(currentTarget.id);
        const blankNode = document.createElement("div") as HTMLDivElement;
        blankNode.classList.add("blank");
        blankNode.id = "blank";
        blankNode.ondragover = this.allowDrop;
        parentNode.insertBefore(blankNode, currentNode);
        this.setState({ blank: true });
        ev.preventDefault();
      } else {
        ev.dataTransfer.dropEffect = "none";
      }
    };

    public drop = (ev: any) => {
      if (ev.target.id === "blank") {
        const parent = document.getElementById(ev.target.parentElement!.id) as HTMLDivElement;
        const targetNode = document.getElementById(ev.target.id) as HTMLDivElement;
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        parent.insertBefore(document.getElementById(data) as HTMLDivElement, targetNode);
        parent.removeChild(targetNode);
        this.setState({ endNode: parent.id, updateOnDrop: true });
      }
      if (
        ev.target.id === this.state.prevSib ||
        ev.target.id === this.state.nextSib
      ) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data) as HTMLDivElement);
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
