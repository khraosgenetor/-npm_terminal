import React from "react";
import { Line, Commands, HistoryEntry } from "./types";
export declare function useTerminal(banner: Line[], commands: Commands): {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    history: HistoryEntry[];
    handleKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
