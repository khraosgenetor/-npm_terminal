"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = Terminal;
const react_1 = __importStar(require("react"));
const useTerminal_1 = require("./useTerminal");
function Terminal({ banner, commands, prompt = "$ ", className = "", }) {
    const { input, setInput, history, handleKey } = (0, useTerminal_1.useTerminal)(banner, commands);
    const inputRef = (0, react_1.useRef)(null);
    const bottomRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    (0, react_1.useEffect)(() => {
        const el = inputRef.current;
        if (el)
            el.setSelectionRange(el.value.length, el.value.length);
    }, [input]);
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = bottomRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }, [history]);
    return (react_1.default.createElement("div", { tabIndex: 0, className: `min-h-[calc(100vh-57px)] bg-black text-white font-mono text-sm p-6 cursor-text ${className}`, onClick: () => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); } },
        history.map((entry, i) => (react_1.default.createElement("div", { key: i, className: "mb-1" },
            entry.cmd && (react_1.default.createElement("p", null,
                react_1.default.createElement("span", { className: "text-green-400" }, prompt),
                " ",
                entry.cmd)),
            entry.output.map((line, j) => (react_1.default.createElement("pre", { key: j, className: `${line.color} font-mono leading-tight` }, line.text)))))),
        react_1.default.createElement("div", { className: "flex items-center gap-2" },
            react_1.default.createElement("span", { className: "text-green-400" }, prompt),
            react_1.default.createElement("input", { ref: inputRef, value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKey, className: "bg-transparent border-none outline-none ring-0 focus:outline-none focus:ring-0 text-white font-mono text-sm flex-1 caret-white", style: { outline: "none", boxShadow: "none" } })),
        react_1.default.createElement("div", { ref: bottomRef })));
}
