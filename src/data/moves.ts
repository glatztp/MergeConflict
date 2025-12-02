import type { Move } from "../types";

export const MOVES: Move[] = [
  {
    name: "Git Push -f",
    type: "atk",
    dmgMulti: 1.4,
    icon: "publish",
    msg: "force pushed to main!",
  },
  {
    name: "Merge Conflict",
    type: "atk",
    dmgMulti: 1.2,
    icon: "call_merge",
    msg: "caused a heavy conflict!",
  },
  {
    name: "Code Review",
    type: "def",
    dmgMulti: 0.8,
    icon: "rate_review",
    msg: "requested changes!",
  },
  {
    name: "DDOS",
    type: "atk",
    dmgMulti: 1.5,
    icon: "cloud_off",
    msg: "flooded the production server!",
  },
  {
    name: "Hotfix",
    type: "atk",
    dmgMulti: 1.0,
    icon: "healing",
    msg: "patched in production!",
  },
  {
    name: "Refactor",
    type: "atk",
    dmgMulti: 1.1,
    icon: "build",
    msg: "optimized the codebase!",
  },
  {
    name: "Pull Request",
    type: "atk",
    dmgMulti: 0.9,
    icon: "move_to_inbox",
    msg: "submitted a new feature!",
  },
  {
    name: "Kernel Panic",
    type: "crit",
    dmgMulti: 2.0,
    icon: "warning",
    msg: "CRITICAL SYSTEM FAILURE!",
  },
];
