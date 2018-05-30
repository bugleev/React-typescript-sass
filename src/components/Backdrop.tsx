import * as React from 'react';

interface IBackdropProps extends React.HTMLAttributes<HTMLDivElement> {

}

export default function Backdrop(props: IBackdropProps) {
  return (
    <div className="backdrop" onClick={props.onClick} />
  );
} 
