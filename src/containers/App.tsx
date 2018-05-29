// tslint:disable:no-console
import * as React from 'react';
import Column from '../components/Column';
import { populateColumn } from '../components/helpers';
import '../styles.css';

interface IAppProps {
  state: {
    endNode: null | string,
    startNode: null | string,
    updateOnDrop: boolean
  },
  allowDrop?: any,
  drop?: any,
  drag?: any,
  click?: any
}
interface IAppState {
  cards: Array<React.ReactElement<any>>
}

interface ILayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  endNode?: null | string,
  onDragOver?: any,
  startNode?: null | string
}

const Layout: React.SFC<ILayoutProps> = (props) => {
  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child as React.ReactElement<any>, {
      endNode: props.endNode,
      onClick: props.onClick,
      onDragOver: props.onDragOver,
      onDragStart: props.onDragStart,
      onDrop: props.onDrop,
      startNode: props.startNode
    })
  })
  return (<div className="container">
    {children}
  </div>);
};

class App extends React.Component<IAppProps, IAppState> {
  public state = {
    cards: populateColumn()
  }

  public shouldComponentUpdate(nextProps: any, nextState: any) {
    if (nextProps.state.updateOnDrop) {
      return true;
    }
    else { return false }
  }
  public render() {
    const { cards } = this.state;
    return (
      <Layout
        endNode={this.props.state.endNode}
        startNode={this.props.state.startNode}
        onDragStart={this.props.drag}
        onClick={this.props.click}
        onDrop={this.props.drop}
        onDragOver={this.props.allowDrop}>
        <Column name="Согласование" id="1">
          {cards[0]}
          {cards[1]}
        </Column>
        <Column name="В ожидании" id="2">
          {cards[2]}
          {cards[3]}
        </Column>
        <Column name="Разработка" id="3">
          {cards[5]}
          {cards[6]}
        </Column>
        <Column name="Тестирование" id="4">
          {cards[7]}
          {cards[8]}
        </Column>
        <Column name="Готово" id="5">
          {cards[9]}
          {cards[10]}
        </Column>
      </Layout>
    );
  }
}

export default App;
