"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTerminal = useTerminal;
const react_1 = require("react");
const BUILT_IN_HELP = [
    { text: "  clear     — clear the terminal", color: "text-zinc-400" },
    { text: "  echo      — print text", color: "text-zinc-400" },
    { text: "  date      — current date", color: "text-zinc-400" },
    { text: "  neofetch  — show banner", color: "text-zinc-400" },
];
function useTerminal(banner, commands) {
    const [input, setInput] = (0, react_1.useState)("");
    const [history, setHistory] = (0, react_1.useState)([
        { cmd: "", output: banner },
    ]);
    const [cmdHistory, setCmdHistory] = (0, react_1.useState)([]);
    const [historyIndex, setHistoryIndex] = (0, react_1.useState)(-1);
    function runCommand(cmd) {
        const trimmed = cmd.trim();
        const lower = trimmed.toLowerCase();
        if (lower === "echo") {
            return [{ text: "", color: "text-zinc-400" }];
        }
        if (lower.startsWith("echo ")) {
            return [{ text: trimmed.slice(5), color: "text-zinc-400" }];
        }
        if (lower === "date") {
            return [{ text: new Date().toString(), color: "text-zinc-400" }];
        }
        if (lower === "neofetch") {
            return banner;
        }
        if (lower === "help") {
            const userHelp = Object.keys(commands).map((name) => ({
                text: `  ${name}`,
                color: "text-zinc-400",
            }));
            return [
                { text: "available commands:", color: "text-white" },
                ...userHelp,
                ...BUILT_IN_HELP,
            ];
        }
        if (commands[lower]) {
            return commands[lower]();
        }
        return [{ text: `command not found: ${trimmed}`, color: "text-red-400" }];
    }
    function handleKey(e) {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (cmdHistory.length === 0)
                return;
            const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
            setHistoryIndex(newIndex);
            setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex <= 0) {
                setHistoryIndex(-1);
                setInput("");
                return;
            }
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
            return;
        }
        if (e.key !== "Enter")
            return;
        if (!input.trim())
            return;
        setCmdHistory((prev) => [...prev, input]);
        setHistoryIndex(-1);
        if (input.trim() === "clear") {
            setHistory([{ cmd: "", output: banner }]);
        }
        else {
            setHistory((prev) => [
                ...prev,
                { cmd: input, output: runCommand(input) },
            ]);
        }
        setInput("");
    }
    return { input, setInput, history, handleKey };
}
