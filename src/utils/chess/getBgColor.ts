const getBgColor = (squareNr: number) => {
  const white = 'bg-[#ffcf9f]';
  const black = 'bg-[#d28c45]';
  const rowNr = squareNr >> 3;
  const colNr = squareNr & 7;
  return ((rowNr + colNr) & 1) === 0 ? black : white;
};

export default getBgColor;
