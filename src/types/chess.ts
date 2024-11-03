type Orientation = "whiteOnBottom" | "blackOnBottom";

type ChessPiece =
  | "P"
  | "N"
  | "B"
  | "R"
  | "Q"
  | "K"
  | "p"
  | "n"
  | "b"
  | "r"
  | "q"
  | "k";

type ChessPieceName =
  | "blackPawn"
  | "blackKnight"
  | "blackBishop"
  | "blackRook"
  | "blackQueen"
  | "blackKing"
  | "whitePawn"
  | "whiteKnight"
  | "whiteBishop"
  | "whiteRook"
  | "whiteQueen"
  | "whiteKing";

type Fen = Record<ChessPiece, ChessPieceName>;

export type { ChessPiece, ChessPieceName, Fen, Orientation };
