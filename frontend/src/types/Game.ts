export interface Game {
  gameID: number;
  developerID: number;
  title: string;
  description: string;
  releaseDate: string; // Note: This is a string, but I might have to change this depending on how MySQL and React handle dates together
}