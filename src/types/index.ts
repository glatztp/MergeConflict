export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  created_at: string;
  is_simulated?: boolean;
};

export type PlayerState = GitHubUser & {
  maxHp: number;
  currentHp: number;
  attack: number;
  lvl: number;
  id: "p1" | "p2";
};

export type Move = {
  name: string;
  type: "atk" | "def" | "crit";
  dmgMulti: number;
  icon: string;
  msg: string;
};

export type BattleLog = {
  timestamp: string;
  message: string;
  type: "neutral" | "crit";
};
