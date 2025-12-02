import type { GitHubUser } from "../types";

export async function fetchGithubUser(username: string): Promise<GitHubUser> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("Not found");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback data for", username);
    const colors = ["1e40af", "b91c1c", "15803d", "a16207", "4c1d95"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return {
      login: username,
      name: username.toUpperCase(),
      avatar_url: `https://ui-avatars.com/api/?name=${username}&background=${randomColor}&color=fff&size=256`,
      public_repos: Math.floor(Math.random() * 200) + 10,
      followers: Math.floor(Math.random() * 500) + 10,
      created_at: new Date(2015, 0, 1).toISOString(),
      is_simulated: true,
    };
  }
}

export function calculatePower(user: GitHubUser) {
  const repoPoints = user.public_repos * 5;
  const followerPoints = Math.min(user.followers, 2000);
  const agePoints =
    (new Date().getFullYear() - new Date(user.created_at).getFullYear()) * 50;

  const totalPower = repoPoints + followerPoints + agePoints + 500;

  const maxHp = Math.min(5000, Math.max(1000, totalPower * 2));
  const attack = Math.min(500, Math.max(50, totalPower / 10));

  return {
    maxHp: Math.floor(maxHp),
    currentHp: Math.floor(maxHp),
    attack: Math.floor(attack),
    lvl: Math.floor(totalPower / 200) + 1,
  };
}
