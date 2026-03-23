import React from "react";
import { Line, Commands } from "./types";
interface TerminalProps {
    banner: Line[];
    commands: Commands;
    prompt?: string;
    className?: string;
}
export declare function Terminal({ banner, commands, prompt, className }: TerminalProps): React.JSX.Element;
export {};
