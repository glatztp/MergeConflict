import React from "react";
import type { Move } from "../types";

interface BattleArenaProps {
  currentMove: Move | null;
  attackerId: "p1" | "p2" | null;
  damageNumbers: Array<{
    id: string;
    amount: number;
    isCrit: boolean;
    position: "left" | "right";
  }>;
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  currentMove,
  attackerId,
  damageNumbers,
}) => {
  const isPlayer1Attacking = attackerId === "p1";
  const attackerColor = isPlayer1Attacking ? "blue" : "red";
  const attackerColorClass = isPlayer1Attacking
    ? "text-blue-400"
    : "text-red-400";
  const attackerGradient = isPlayer1Attacking
    ? "from-blue-400 via-blue-300 to-blue-400"
    : "from-red-400 via-red-300 to-red-400";
  const attackerGlow = isPlayer1Attacking
    ? "rgba(59,130,246,0.6)"
    : "rgba(239,68,68,0.6)";

  return (
    <div className="grow glass-panel rounded-2xl relative overflow-hidden flex items-center justify-center p-8 bg-linear-to-b from-gray-900 via-gray-900/95 to-black border border-white/10 shadow-inner">
      <div
        className="absolute inset-0 opacity-20 animate-pulse"
        style={{
          backgroundImage: "radial-gradient(circle, #555 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      ></div>

      <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-transparent to-red-500/5"></div>

      <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-50">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
        <div className="text-xs font-mono text-gray-600 tracking-wider">
          BATTLE_ARENA.SYS
        </div>
        <div className="flex gap-1">
          <div
            className="w-2 h-2 bg-red-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
          <div
            className="w-2 h-2 bg-red-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 text-center w-full">
        <div className="min-h-40 flex flex-col items-center justify-center transition-all duration-500">
          {currentMove ? (
            <div className="flex flex-col items-center gap-4 animate-bounce">
              <div className="relative">
                <div
                  className={`absolute inset-0 blur-2xl opacity-60 bg-${attackerColor}-500 rounded-full scale-150`}
                ></div>
                <span
                  className={`material-symbols-outlined text-6xl text-white drop-shadow-[0_0_20px_${attackerGlow}] relative z-10 animate-pulse`}
                >
                  {currentMove.icon}
                </span>
              </div>

              <div className="space-y-2">
                <span
                  className={`block text-2xl md:text-3xl font-black uppercase bg-clip-text text-transparent bg-linear-to-r ${attackerGradient} tracking-widest drop-shadow-[0_0_10px_${attackerGlow}]`}
                >
                  {currentMove.name}
                </span>
                <span
                  className={`block text-sm font-mono italic ${attackerColorClass}`}
                >
                  {currentMove.msg}
                </span>
              </div>

              <div className="flex gap-2 mt-2">
                <div
                  className={`w-12 h-1 bg-${attackerColor}-500 rounded-full animate-pulse`}
                ></div>
                <div
                  className={`w-8 h-1 bg-${
                    attackerColor === "blue" ? "purple" : "orange"
                  }-500 rounded-full animate-pulse`}
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className={`w-6 h-1 bg-${attackerColor}-500 rounded-full animate-pulse`}
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 opacity-40">
              <div
                className="w-20 h-20 border-4 border-dashed border-gray-700 rounded-full flex items-center justify-center animate-spin"
                style={{ animationDuration: "8s" }}
              >
                <div
                  className="w-12 h-12 border-4 border-dashed border-gray-600 rounded-full animate-spin"
                  style={{
                    animationDuration: "5s",
                    animationDirection: "reverse",
                  }}
                ></div>
              </div>
              <span className="text-gray-600 font-mono text-sm tracking-wider">
                AWAITING_ACTION
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {damageNumbers.map((dmg) => (
          <div
            key={dmg.id}
            className={`absolute text-center font-black damage-popup ${
              dmg.isCrit
                ? "text-yellow-400 text-6xl z-20 drop-shadow-[0_0_25px_rgba(253,224,71,0.8)] animate-pulse"
                : "text-red-500 text-4xl z-10 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
            }`}
            style={{
              [dmg.position === "left" ? "left" : "right"]: "20%",
              top: "40%",
              textShadow: dmg.isCrit
                ? "0 0 20px rgba(253,224,71,1), 0 0 40px rgba(253,224,71,0.5)"
                : "0 0 10px rgba(239,68,68,0.8)",
            }}
          >
            {dmg.isCrit ? (
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs text-yellow-300 font-bold tracking-widest">
                  ⚡ CRITICAL HIT ⚡
                </span>
                <span>-{dmg.amount}</span>
              </div>
            ) : (
              `-${dmg.amount}`
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
        <div
          className="w-16 h-0.5 bg-linear-to-r from-transparent via-red-500 to-transparent animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>
    </div>
  );
};
