// tslint:disable:no-console
import * as React from 'react';
import Backdrop from '../components/Backdrop';
import Column from '../components/Column';
import Modal from '../components/Modal';
import * as data from '../data.json';
import '../styles.css';

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
  cards: Array<React.ReactElement<any>>,
  modalOpen: boolean,
  modalData: {} | null
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
    cards: data.cards,
    modalData: null,
    modalOpen: false
  }
  public shouldComponentUpdate(nextProps: any, nextState: any) {
    if (nextProps.state.updateOnDrop || this.state.modalOpen !== nextState.modalOpen) {
      return true;
    }
    else { return false }
  }
  public componentDidUpdate() {
    if (this.state.modalOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        document.querySelector(".modal")!.classList.add("open")
      }, 50)
    } else {
      document.body.style.overflow = "auto";
    }
  }

  public handleCardClick = (ev: any) => {
    const modalData = this.pickCard(ev.currentTarget.id)[0]
    this.setState({ modalOpen: !this.state.modalOpen, modalData })
  }
  public removeModal = (ev: any) => {
    console.log("click");
    document.querySelector(".modal")!.classList.remove("open")
    document.querySelector(".modal")!.classList.add("close")
    setTimeout(() => {
      this.setState({ modalOpen: false })
    }, 200)

  }
  public pickCard = (cardId: string) => {
    return this.state.cards.filter((el: any) => el.id === cardId)
  }
  public render() {
    const { cards, modalOpen } = this.state;
    return (
      <>
        {modalOpen && <Modal cardData={this.state.modalData!} />}
        {modalOpen && <Backdrop onClick={this.removeModal} />}
        <Layout
          cardToDrop={this.pickCard(this.props.state.cardId!)[0]}
          endNode={this.props.state.endNode}
          startNode={this.props.state.startNode}
          onDragStart={this.props.drag}
          onClick={this.handleCardClick}
          onDrop={this.props.drop}
          onDragOver={this.props.allowDrop}>
          <Column name="Согласование" id="1" cards={cards} />
          <Column name="В ожидании" id="2" />
          <Column name="Разработка" id="3" />
          <Column name="Тестирование" id="4" />
          <Column name="Готово" id="5" />
        </Layout>
      </>
    );
  }
}

export default App;
