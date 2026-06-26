// themes.ts — the dot-matrix theme registry. Each theme is a small token set; the
// board/HUD read these as CSS custom properties, so switching themes is a pure
// variable swap. Adding a theme is one entry here (+ its id in THEME_ORDER).
export type ThemeId =
  | "nokia" | "paper" | "ink" | "phosphor"
  | "amber" | "frost" | "bubblegum" | "tangerine";

export interface ThemeTokens {
  frame: string; board: string; ghost: string; lit: string;
  food: string; hud: string; litShadow?: string; foodShadow?: string;
}

export const THEMES: Record<ThemeId, ThemeTokens> = {
  nokia:     { frame: "#aebb8e", board: "#b9c79a", ghost: "#aebb8e", lit: "#2b3318", food: "#2b3318", hud: "#2b3318" },
  paper:     { frame: "#e7e4d8", board: "#dedbcd", ghost: "#d6d3c4", lit: "#17150f", food: "#17150f", hud: "#17150f" },
  ink:       { frame: "#0a0a0a", board: "#121212", ghost: "#1f1f1f", lit: "#f2f2ea", food: "#ffffff", hud: "#e8e8e0" },
  phosphor:  { frame: "#0c0f0a", board: "#0e130c", ghost: "#161d12", lit: "#a9e35c", food: "#e7f3c8", hud: "#9fd45f", litShadow: "0 0 3px #a9e35c88", foodShadow: "0 0 5px #cfee88" },
  amber:     { frame: "#100a02", board: "#150d03", ghost: "#241a0a", lit: "#f5a623", food: "#ffd591", hud: "#f5a623", litShadow: "0 0 3px #f5a62388", foodShadow: "0 0 5px #ffd591" },
  frost:     { frame: "#06101c", board: "#081424", ghost: "#102236", lit: "#5fd0ff", food: "#cdeeff", hud: "#7fd8ff", litShadow: "0 0 3px #5fd0ff88", foodShadow: "0 0 5px #cdeeff" },
  bubblegum: { frame: "#f7d9e6", board: "#f2c9db", ghost: "#ecbcd0", lit: "#b3164f", food: "#b3164f", hud: "#8e0f3e" },
  tangerine: { frame: "#f3c69a", board: "#efbd8a", ghost: "#e8b07a", lit: "#5a2a06", food: "#5a2a06", hud: "#5a2a06" },
};

export const THEME_ORDER: ThemeId[] = [
  "nokia", "paper", "ink", "phosphor", "amber", "frost", "bubblegum", "tangerine",
];

export const DEFAULT_THEME: ThemeId = "nokia";

/** Map a theme's tokens to the CSS custom properties the board/HUD consume. */
export function themeVars(t: ThemeTokens): Record<string, string> {
  return {
    "--frame": t.frame, "--board": t.board, "--ghost": t.ghost,
    "--lit": t.lit, "--food": t.food, "--hud": t.hud,
    "--lit-shadow": t.litShadow ?? "none",
    "--food-shadow": t.foodShadow ?? "inset 0 0 0 1.2px var(--board)",
  };
}
