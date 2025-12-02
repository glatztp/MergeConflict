import React from "react";
import { PlayerCard } from "./PlayerCard";
import { BattleArena } from "./BattleArena";
import { BattleLog } from "./BattleLog";
import type { Move, PlayerState, BattleLog as BattleLogType } from "../types";

interface BattleViewProps {
  player1: PlayerState;
  player2: PlayerState;
  logs: BattleLogType[];
  currentMove: Move | null;
  attackerId: "p1" | "p2" | null;
  shakingPlayer: "p1" | "p2" | null;
  damageNumbers: Array<{
    id: string;
    amount: number;
    isCrit: boolean;
    position: "left" | "right";
  }>;
}

export const BattleView: React.FC<BattleViewProps> = ({
  player1,
  player2,
  logs,
  currentMove,
  attackerId,
  shakingPlayer,
  damageNumbers,
}) => {
  return (
    <section className="grow flex-col relative h-full min-h-0 flex">
      <div className="grow grid grid-cols-1 md:grid-cols-12 gap-4 h-full min-h-0 overflow-hidden">
        <div className="md:col-span-3 flex flex-col gap-4">
          <PlayerCard player={player1} isShaking={shakingPlayer === "p1"} />
        </div>

        <div className="md:col-span-6 flex flex-col gap-4 min-h-[300px]">
          <BattleArena
            currentMove={currentMove}
            attackerId={attackerId}
            damageNumbers={damageNumbers}
          />
          <BattleLog logs={logs} />
        </div>

        <div className="md:col-span-3 flex flex-col gap-4">
          <PlayerCard player={player2} isShaking={shakingPlayer === "p2"} />
        </div>
      </div>
    </section>
  );
};
