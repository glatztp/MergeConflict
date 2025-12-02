import React from "react";
import type { PlayerState } from "../types";

interface WinnerModalProps {
  winner: PlayerState | null;
  onNewBattle: () => void;
}

export const WinnerModal: React.FC<WinnerModalProps> = ({
  winner,
  onNewBattle,
}) => {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="bg-linear-to-b from-gray-900 via-gray-900 to-black border-2 border-yellow-400/30 rounded-3xl p-10 max-w-lg w-full text-center relative overflow-hidden shadow-[0_0_80px_rgba(253,224,71,0.3)] transform scale-100 animate-bounce-in">
        <div className="absolute top-0 left-0 w-full h-3 bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-400 animate-pulse"></div>

        <div className="absolute top-8 left-8 w-20 h-20 border-4 border-yellow-400/20 rounded-full animate-ping"></div>
        <div
          className="absolute top-8 right-8 w-20 h-20 border-4 border-yellow-400/20 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>

        <div className="relative z-10">
          <div className="mb-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-5xl animate-bounce">🏆</span>
            </div>
            <h2 className="text-6xl font-black italic bg-clip-text text-transparent bg-linear-to-r from-yellow-300 via-yellow-400 to-orange-400 uppercase drop-shadow-[0_0_20px_rgba(253,224,71,0.5)] tracking-wide">
              Victory!
            </h2>
            <div className="flex gap-1 mt-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>

          <div className="my-8 relative inline-block">
            <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-2xl animate-pulse scale-125"></div>
            <div
              className="absolute -inset-4 border-4 border-dashed border-yellow-400/30 rounded-full animate-spin"
              style={{ animationDuration: "10s" }}
            ></div>

            <img
              src={winner.avatar_url}
              alt={winner.login}
              className="w-40 h-40 rounded-full border-4 border-yellow-400 shadow-[0_0_60px_rgba(253,224,71,0.5)] relative z-10 animate-float"
            />

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-yellow-400 to-orange-500 text-black font-black px-6 py-2 rounded-full text-base whitespace-nowrap border-4 border-gray-900 shadow-lg z-20">
              ⭐ WINNER ⭐
            </div>
          </div>

          <div className="mb-8 space-y-3">
            <h3 className="text-3xl font-black text-white drop-shadow-lg">
              {winner.name || winner.login}
            </h3>
            <p className="text-yellow-400 text-sm font-mono tracking-wider">
              @{winner.login}
            </p>

            <div className="flex items-center justify-center gap-4 mt-4 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-yellow-400">
                  code
                </span>
                <span>{winner.public_repos} repos</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-yellow-400">
                  group
                </span>
              </div>
            </div>

            <div className="inline-block bg-yellow-400/10 border border-yellow-400/30 rounded-lg px-4 py-2 mt-4">
              <p className="text-gray-300 text-sm font-mono">
                🎉 Repository successfully merged!
              </p>
            </div>
          </div>

          <button
            onClick={onNewBattle}
            className="bg-linear-to-r from-yellow-400 to-orange-500 text-black font-black px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(253,224,71,0.5)] flex items-center gap-2 text-lg mx-auto active:scale-95 hover:shadow-[0_0_50px_rgba(253,224,71,0.7)]"
          >
            <span className="material-symbols-outlined">refresh</span>
            NEW BATTLE
          </button>
        </div>
      </div>
    </div>
  );
};
