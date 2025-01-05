import getClassName from 'src/utils/general/classNames';
import { ReactNode } from 'react';

type Props = {
  onClick?: () => void;
  children: ReactNode;
  hCenter?: boolean;
  vCenter?: boolean;
};

const Container = (props: Props): JSX.Element => {
  // PROPS
  const { children, onClick } = props;

  const classes = [
    'flex flex-col',
    props.hCenter ? 'items-center' : '',
    props.vCenter ? 'h-full justify-center' : '',
  ];

  return (
    <div className={getClassName(classes)} onClick={onClick}>
      {children}
    </div>
  );
};

export default Container;
