import getClassName from '@/src/utils/general/classNames';
import { ReactNode } from 'react';

type Props = {
  onClick?: () => void;
  children: ReactNode;
  style?: 'standard' | 'none';
  className?: string;
};

const Button = (props: Props): JSX.Element => {
  // PROPS
  const { className, style = 'standard', onClick, children } = props;

  const classes = [
    style === 'standard'
      ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      : '',
    className ?? '',
  ];

  return (
    <button className={getClassName(classes)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
