import { useState, useEffect, useCallback } from "react";
import type { PlayerState, BattleLog as BattleLogType, Move } from "./types";
import { fetchGithubUser, calculatePower } from "./utils/github";
import { initAudio, playSound } from "./utils/audio";
import { MOVES } from "./data/moves";
import { SearchView } from "./components/SearchView";
import { BattleView } from "./components/BattleView";
import { WinnerModal } from "./components/WinnerModal";

type GameView = "search" | "battle";

function App() {
  const [view, setView] = useState<GameView>("search");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [player1, setPlayer1] = useState<PlayerState | null>(null);
  const [player2, setPlayer2] = useState<PlayerState | null>(null);
  const [winner, setWinner] = useState<PlayerState | null>(null);

  const [logs, setLogs] = useState<BattleLogType[]>([]);
  const [currentMove, setCurrentMove] = useState<Move | null>(null);
  const [attackerId, setAttackerId] = useState<"p1" | "p2" | null>(null);
  const [shakingPlayer, setShakingPlayer] = useState<"p1" | "p2" | null>(null);
  const [damageNumbers, setDamageNumbers] = useState<
    Array<{
      id: string;
      amount: number;
      isCrit: boolean;
      position: "left" | "right";
    }>
  >([]);

  const addLog = useCallback(
    (message: string, type: "neutral" | "crit" = "neutral") => {
      const timestamp = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setLogs((prev) => [...prev, { timestamp, message, type }]);
    },
    []
  );

  const showDamageNumber = useCallback(
    (targetId: "p1" | "p2", amount: number, isCrit: boolean) => {
      const id = `${Date.now()}-${Math.random()}`;
      const position = targetId === "p1" ? "left" : "right";

      setDamageNumbers((prev) => [...prev, { id, amount, isCrit, position }]);

      setTimeout(() => {
        setDamageNumbers((prev) => prev.filter((d) => d.id !== id));
      }, 800);
    },
    []
  );

  const executeTurn = useCallback(
    (attacker: PlayerState, defender: PlayerState) => {
      const move = MOVES[Math.floor(Math.random() * MOVES.length)];
      const isCrit = Math.random() < 0.15;

      let damage = Math.floor(
        attacker.attack * move.dmgMulti * (Math.random() * 0.4 + 0.8)
      );
      if (isCrit) damage = Math.floor(damage * 1.5);

      const newDefenderHp = Math.max(0, defender.currentHp - damage);

      if (defender.id === "p1") {
        setPlayer1((prev) =>
          prev ? { ...prev, currentHp: newDefenderHp } : null
        );
      } else {
        setPlayer2((prev) =>
          prev ? { ...prev, currentHp: newDefenderHp } : null
        );
      }

      setCurrentMove(move);
      setAttackerId(attacker.id);
      setShakingPlayer(defender.id);
      setTimeout(() => setShakingPlayer(null), 400);

      showDamageNumber(defender.id, damage, isCrit);

      const attackerColor =
        attacker.id === "p1" ? "text-blue-400" : "text-red-400";
      addLog(
        `<span class="${attackerColor} font-bold">${attacker.login}</span> 
      used ${move.name}... 
      <span class="text-white">${move.msg}</span> 
      <span class="text-red-500 font-bold">-${damage} HP</span>
      ${isCrit ? '<span class="text-yellow-400 font-black">CRIT!</span>' : ""}`,
        isCrit ? "crit" : "neutral"
      );

      playSound(isCrit ? "crit" : "hit");
    },
    [addLog, showDamageNumber]
  );

  const handleStartBattle = async (username1: string, username2: string) => {
    setIsLoading(true);
    setError("");

    try {
      await initAudio();
      playSound("start");

      const [data1, data2] = await Promise.all([
        fetchGithubUser(username1),
        fetchGithubUser(username2),
      ]);

      const p1: PlayerState = { ...data1, ...calculatePower(data1), id: "p1" };
      const p2: PlayerState = { ...data2, ...calculatePower(data2), id: "p2" };

      setPlayer1(p1);
      setPlayer2(p2);
      setLogs([]);
      setWinner(null);

      setTimeout(() => {
        setView("battle");
        setIsLoading(false);
        addLog(
          `System initialized. ${p1.login} vs ${p2.login}. Fight!`,
          "neutral"
        );
      }, 800);
    } catch {
      setError("Failed to fetch user data");
      setIsLoading(false);
    }
  };

  const handleNewBattle = () => {
    setView("search");
    setPlayer1(null);
    setPlayer2(null);
    setWinner(null);
    setLogs([]);
    setCurrentMove(null);
  };

  useEffect(() => {
    if (view !== "battle" || !player1 || !player2 || winner) return;

    const interval = setInterval(() => {
      setPlayer1((p1) => {
        setPlayer2((p2) => {
          if (!p1 || !p2) return p2;

          if (p1.currentHp <= 0) {
            setWinner(p2);
            playSound("win");
            return p2;
          }
          if (p2.currentHp <= 0) {
            setWinner(p1);
            playSound("win");
            return p2;
          }

          const attacker = Math.random() > 0.5 ? p1 : p2;
          const defender = attacker.id === "p1" ? p2 : p1;

          executeTurn(attacker, defender);
          return p2;
        });
        return p1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [view, player1, player2, winner, executeTurn]);

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col items-center selection:bg-blue-500 selection:text-white bg-[#030712] text-white">
      <div className="grid-bg"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-linear-to-b from-blue-900/10 to-red-900/10 pointer-events-none z-[-1]"></div>

      <main className="w-full max-w-7xl px-2 sm:px-4 py-3 sm:py-6 flex flex-col h-screen max-h-[100dvh]">
        {view === "search" && (
          <SearchView
            onStartBattle={handleStartBattle}
            isLoading={isLoading}
            error={error}
          />
        )}

        {view === "battle" && player1 && player2 && (
          <BattleView
            player1={player1}
            player2={player2}
            logs={logs}
            currentMove={currentMove}
            attackerId={attackerId}
            shakingPlayer={shakingPlayer}
            damageNumbers={damageNumbers}
          />
        )}

        {winner && (
          <WinnerModal winner={winner} onNewBattle={handleNewBattle} />
        )}
      </main>
    </div>
  );
}

export default App;
