import * as React from 'react';

export interface IColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string,
  id: string,
  children?: any
}



const Column: React.SFC<any> = (props) => {

  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child as React.ReactElement<any>, {
      onDragOver: props.onDragOver,
      onDragStart: props.onDragStart
    })
  })

  return (
    <div className="column" onDragOver={props.onDragOver} onDrop={props.onDrop} onClick={props.onClick} id={props.id}>
      <p className="field-text">
        {props.name} <span>({props.children && props.children.length || 0})</span>
      </p>
      {children}
    </div>
  );
};

export default Column;


