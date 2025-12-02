import React, { useState } from "react";

interface SearchViewProps {
  onStartBattle: (player1: string, player2: string) => void;
  isLoading: boolean;
  error: string;
}

export const SearchView: React.FC<SearchViewProps> = ({
  onStartBattle,
  isLoading,
  error,
}) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleSubmit = () => {
    if (player1.trim() && player2.trim()) {
      onStartBattle(player1.trim(), player2.trim());
    }
  };

  const fillInputs = (u1: string, u2: string) => {
    setPlayer1(u1);
    setPlayer2(u2);
  };

  return (
    <section className="grow flex flex-col justify-center items-center relative z-10 pb-20">
      <div className="text-center mb-12 animate-float px-4">
        <h2 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-red-400 drop-shadow-sm">
          MERGE CONFLICT
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto text-lg leading-relaxed">
          Enter two GitHub usernames. Our algorithm simulates a battle based on
          repositories, commit history, and influence.
        </p>
      </div>

      <div className="w-full max-w-4xl glass-panel p-8 rounded-2xl shadow-2xl relative border border-white/10">
        <div className="absolute left-1/2 top-2/5 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black border-2 border-white/10 rounded-full flex items-center justify-center z-20 shadow-xl md:flex">
          <span className="font-black text-yellow-400 italic text-xl mr-1.5">
            VS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col gap-3 group">
            <label className="text-blue-400 font-mono text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                terminal
              </span>{" "}
              PLAYER_01
            </label>
            <div className="relative">
              <input
                type="text"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="torvalds"
                className="w-full bg-gray-900/50 border border-blue-900/30 rounded-xl p-3 pl-12 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-lg text-white group-hover:border-blue-700/50 shadow-inner"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                search
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 group md:text-right">
            <label className="text-red-400 font-mono text-sm font-bold flex items-center md:justify-end gap-2">
              PLAYER_02{" "}
              <span className="material-symbols-outlined text-sm">
                terminal
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="gaearon"
                className="w-full bg-gray-900/50 border border-red-900/30 rounded-xl p-3 pl-12 md:pl-4 md:pr-12 md:text-right focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono text-lg text-white group-hover:border-red-700/50 shadow-inner"
              />
              <span className="material-symbols-outlined absolute left-4 md:left-auto md:right-4 top-1/2 -translate-y-1/2 text-gray-500">
                search
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isLoading || !player1 || !player2}
            className={`bg-white text-black font-black px-10 py-4 rounded-xl transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2 text-lg active:scale-95 ${
              isLoading || !player1 || !player2
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin material-symbols-outlined">
                  sync
                </span>
                FETCHING DATA...
              </>
            ) : (
              "START BATTLE"
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 text-center text-red-400 font-mono text-sm bg-red-900/20 p-2 rounded border border-red-900/50">
            Error: {error}
          </div>
        )}
      </div>

      {/* Presets */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-mono text-gray-500">
        <span>Quick Match:</span>
        <button
          onClick={() => fillInputs("facebook", "google")}
          className="hover:text-white underline decoration-blue-500 decoration-2"
        >
          Meta vs Google
        </button>
        <button
          onClick={() => fillInputs("angular", "reactjs")}
          className="hover:text-white underline decoration-red-500 decoration-2"
        >
          Angular vs React
        </button>
        <button
          onClick={() => fillInputs("rust-lang", "golang")}
          className="hover:text-white underline decoration-yellow-500 decoration-2"
        >
          Rust vs Go
        </button>
      </div>
    </section>
  );
};
