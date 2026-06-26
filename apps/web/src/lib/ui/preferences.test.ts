import { test } from "node:test";
import assert from "node:assert/strict";
import { loadPreferences, serializePreferences, DEFAULT_PREFERENCES } from "./preferences.ts";

test("defaults are nokia / dpad on / sound on", () => {
  assert.deepEqual(DEFAULT_PREFERENCES, { theme: "nokia", showDpad: true, sound: true });
});

test("loadPreferences returns defaults for junk", () => {
  assert.deepEqual(loadPreferences(null), DEFAULT_PREFERENCES);
  assert.deepEqual(loadPreferences("nope"), DEFAULT_PREFERENCES);
  assert.deepEqual(loadPreferences({}), DEFAULT_PREFERENCES);
});

test("loadPreferences keeps valid fields and clamps unknown theme to default", () => {
  assert.deepEqual(loadPreferences({ theme: "frost", showDpad: false, sound: false }),
    { theme: "frost", showDpad: false, sound: false });
  assert.equal(loadPreferences({ theme: "rainbow" }).theme, "nokia");
  assert.equal(loadPreferences({ showDpad: "yes" }).showDpad, true); // non-bool -> default
});

test("serialize round-trips through load", () => {
  const p = { theme: "amber", showDpad: false, sound: true } as const;
  assert.deepEqual(loadPreferences(JSON.parse(serializePreferences(p))), p);
});
