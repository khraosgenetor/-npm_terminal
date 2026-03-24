export interface Line {
  text: string;
  color: string;
}

export type CommandHandler = () => Line[];

export interface Commands {
  [key: string]: CommandHandler;
}

export interface HistoryEntry {
  cmd: string;
  output: Line[];
}
