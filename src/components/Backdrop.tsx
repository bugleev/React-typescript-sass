import * as React from 'react';

interface IBackdropProps extends React.HTMLAttributes<HTMLDivElement> {

}

const Backdrop: React.SFC<IBackdropProps> = (props) => {
  return (
    <div className="backdrop" onClick={props.onClick} />
  );
};

export default Backdrop;

