// tslint:disable:no-console
import * as React from 'react';
import Column from '../components/Column';

import '../styles.css';
import * as data from './data.json';

interface IAppProps {
  state: {
    cardId: null | string,
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
  cardToDrop?: null | string,
  endNode?: null | string,
  onDragOver?: any,
  startNode?: null | string
}

const Layout: React.SFC<ILayoutProps> = (props) => {
  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child as React.ReactElement<any>, {
      cardToDrop: props.cardToDrop,
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
    cards: data.cards
  }


  public pickCard = (cardId: string) => {
    console.log("picking!");

    return this.state.cards.filter((el: any) => el.id === cardId)
  }
  public render() {
    const { cards } = this.state;
    return (
      <Layout
        cardToDrop={this.pickCard(this.props.state.cardId!)[0]}
        endNode={this.props.state.endNode}
        startNode={this.props.state.startNode}
        onDragStart={this.props.drag}
        onClick={this.props.click}
        onDrop={this.props.drop}
        onDragOver={this.props.allowDrop}>
        <Column name="Согласование" id="1" cards={cards} />
        <Column name="В ожидании" id="2" />
        <Column name="Разработка" id="3" />
        <Column name="Тестирование" id="4" />
        <Column name="Готово" id="5" />
      </Layout>
    );
  }
}

export default App;
