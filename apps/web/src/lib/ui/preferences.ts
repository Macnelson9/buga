// preferences.ts — player settings (theme, control + sound prefs). Pure parse so
// it is unit-testable; the React provider wraps localStorage I/O around this.
import { DEFAULT_THEME, THEMES, type ThemeId } from "./themes.ts";

export interface Preferences {
  theme: ThemeId;
  showDpad: boolean;
  sound: boolean;
}

export const DEFAULT_PREFERENCES: Preferences = {
  theme: DEFAULT_THEME, showDpad: true, sound: true,
};

/** Tolerant parse: unknown/partial input falls back per-field to the default. */
export function loadPreferences(raw: unknown): Preferences {
  if (typeof raw !== "object" || raw === null) return { ...DEFAULT_PREFERENCES };
  const o = raw as Record<string, unknown>;
  return {
    theme: typeof o.theme === "string" && o.theme in THEMES ? (o.theme as ThemeId) : DEFAULT_PREFERENCES.theme,
    showDpad: typeof o.showDpad === "boolean" ? o.showDpad : DEFAULT_PREFERENCES.showDpad,
    sound: typeof o.sound === "boolean" ? o.sound : DEFAULT_PREFERENCES.sound,
  };
}

export function serializePreferences(p: Preferences): string {
  return JSON.stringify(p);
}
