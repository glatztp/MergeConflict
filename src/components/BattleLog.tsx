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
    <div className="h-48 glass-panel rounded-2xl p-4 font-mono text-xs md:text-sm overflow-hidden flex flex-col border-t border-white/10">
      <div className="flex items-center justify-between text-gray-500 mb-2 border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">terminal</span>{" "}
          BATTLE_LOG
        </div>
        <div className="text-[10px] bg-white/5 px-2 rounded">
          /var/log/battle.log
        </div>
      </div>
      <div
        ref={consoleRef}
        className="grow overflow-y-auto custom-scroll space-y-1.5 text-gray-300"
      >
        {logs.map((log, index) => (
          <div
            key={index}
            className={`text-xs md:text-sm border-l-2 pl-3 py-1 mb-1 transition-all hover:bg-white/5 ${
              log.type === "crit"
                ? "border-yellow-400 bg-yellow-400/10"
                : "border-gray-600"
            }`}
            dangerouslySetInnerHTML={{
              __html: `<span class="opacity-40 font-mono mr-2 text-[10px]">[${log.timestamp}]</span> ${log.message}`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
