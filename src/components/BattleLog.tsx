import React, { useEffect, useRef } from "react";
import type { BattleLog as BattleLogType } from "../types";

interface BattleLogProps {
  logs: BattleLogType[];
}

export const BattleLog: React.FC<BattleLogProps> = ({ logs }) => {
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="h-28 sm:h-36 md:h-44 lg:h-48 glass-panel rounded-lg sm:rounded-xl md:rounded-2xl p-1.5 sm:p-2 md:p-3 lg:p-4 font-mono text-[9px] sm:text-[10px] md:text-xs overflow-hidden flex flex-col border-t border-white/10">
      <div className="flex items-center justify-between text-gray-500 mb-1 sm:mb-1.5 md:mb-2 border-b border-white/5 pb-0.5 sm:pb-1 md:pb-2">
        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
          <span className="material-symbols-outlined text-[10px] sm:text-xs md:text-sm">
            terminal
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-xs font-bold">
            BATTLE_LOG
          </span>
        </div>
        <div className="text-[8px] sm:text-[9px] md:text-[10px] bg-white/5 px-1 sm:px-1.5 md:px-2 py-0.5 rounded hidden sm:block">
          /var/log/battle.log
        </div>
      </div>
      <div
        ref={consoleRef}
        className="grow overflow-y-auto custom-scroll space-y-0.5 sm:space-y-1 text-gray-300 leading-relaxed"
      >
        {logs.map((log, index) => (
          <div
            key={index}
            className={`text-[9px] sm:text-[10px] md:text-xs border-l-2 pl-1.5 sm:pl-2 md:pl-3 py-0.5 sm:py-1 mb-0.5 transition-all hover:bg-white/5 ${
              log.type === "crit"
                ? "border-yellow-400 bg-yellow-400/10"
                : "border-gray-600"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-1">
              <span className="opacity-40 font-mono text-[8px] sm:text-[9px] md:text-[10px] shrink-0">
                [{log.timestamp}]
              </span>
              <span
                className="flex-1 wrap-break-word"
                dangerouslySetInnerHTML={{ __html: log.message }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
