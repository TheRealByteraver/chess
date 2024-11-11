type Props = {
  text: string;
};

const Header1 = (props: Props): JSX.Element => {
  // PROPS
  const { text } = props;

  return <h1 className="my-4 text-4xl font-bold">{text}</h1>;
};

export default Header1;
