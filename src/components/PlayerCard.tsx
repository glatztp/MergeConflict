import React from "react";
import type { PlayerState } from "../types";

interface PlayerCardProps {
  player: PlayerState;
  isShaking?: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isShaking,
}) => {
  const hpPercentage = Math.max(0, (player.currentHp / player.maxHp) * 100);
  const isPlayer1 = player.id === "p1";

  let hpBarColor = isPlayer1 ? "bg-blue-500" : "bg-red-500";
  let hpShadowColor = isPlayer1
    ? "rgba(59,130,246,0.6)"
    : "rgba(239,68,68,0.6)";

  if (hpPercentage < 30) {
    hpBarColor = "bg-yellow-500";
    hpShadowColor = "rgba(234,179,8,0.6)";
  } else if (hpPercentage < 60) {
    hpBarColor = "bg-orange-500";
    hpShadowColor = "rgba(249,115,22,0.6)";
  }

  return (
    <div
      className={`glass-panel p-2 sm:p-3 md:p-4 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl flex flex-col items-center border-t-2 sm:border-t-3 md:border-t-4 transition-all relative overflow-hidden ${
        isPlayer1 ? "border-blue-500 glow-blue" : "border-red-500 glow-red"
      } ${isShaking ? "hit-shake" : ""}`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-12 sm:h-16 md:h-20 lg:h-24 pointer-events-none ${
          isPlayer1
            ? "bg-linear-to-b from-blue-500/10 to-transparent"
            : "bg-linear-to-b from-red-500/10 to-transparent"
        }`}
      ></div>

      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 group cursor-pointer">
        <img
          src={player.avatar_url}
          alt={player.login}
          className={`w-full h-full rounded-full object-cover border-2 sm:border-2 md:border-3 lg:border-4 bg-gray-800 transition-transform group-hover:scale-105 ${
            isPlayer1 ? "border-blue-500/50" : "border-red-500/50"
          }`}
        />
        <div
          className={`absolute -bottom-1 sm:-bottom-1.5 md:-bottom-2 ${
            isPlayer1
              ? "-right-1 sm:-right-1.5 md:-right-2 bg-blue-600"
              : "-left-1 sm:-left-1.5 md:-left-2 bg-red-600"
          } text-white text-[9px] sm:text-[10px] md:text-xs font-bold px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-0.5 md:py-1 rounded-full shadow-lg border border-black`}
        >
          LVL {player.lvl}
        </div>
      </div>

      <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center leading-tight mb-0.5 sm:mb-0.5 md:mb-1 truncate w-full px-1">
        {player.name || player.login}
      </h2>
      <div
        className={`font-mono text-[9px] sm:text-[10px] md:text-xs mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 ${
          isPlayer1 ? "text-blue-400" : "text-red-400"
        }`}
      >
        @{player.login}
      </div>

      <div className="w-full mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 bg-black/40 p-1 sm:p-1.5 md:p-2 rounded-md sm:rounded-lg">
        <div className="flex justify-between text-[9px] sm:text-[10px] md:text-xs font-bold mb-0.5 sm:mb-1 text-gray-300">
          <span>HP</span>
          <span>
            {player.currentHp}/{player.maxHp}
          </span>
        </div>
        <div className="w-full h-1.5 sm:h-2 md:h-3 bg-gray-900/80 rounded-full overflow-hidden border border-white/10">
          <div
            className={`h-full ${hpBarColor} hp-fill transition-all duration-300`}
            style={{
              width: `${hpPercentage}%`,
              boxShadow: `0 0 12px ${hpShadowColor}, inset 0 1px 2px rgba(255,255,255,0.3)`,
            }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 sm:gap-1.5 md:gap-2 w-full text-[9px] sm:text-[10px] md:text-xs font-mono text-gray-400">
        <div className="bg-white/5 p-1 sm:p-1.5 md:p-2 rounded text-center border border-white/5">
          <div className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider text-gray-500 leading-tight">
            Repos
          </div>
          <div className="text-white font-bold text-[10px] sm:text-xs md:text-sm mt-0.5">
            {player.public_repos}
          </div>
        </div>
        <div className="bg-white/5 p-1 sm:p-1.5 md:p-2 rounded text-center border border-white/5">
          <div className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider text-gray-500 leading-tight">
            Followers
          </div>
          <div className="text-white font-bold text-[10px] sm:text-xs md:text-sm mt-0.5">
            {player.followers}
          </div>
        </div>
      </div>
    </div>
  );
};
