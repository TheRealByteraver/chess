import { ReactNode } from 'react';

import getClassName from 'src/utils/general/classNames';

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
    'flex flex-col overflow-y-auto',
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
