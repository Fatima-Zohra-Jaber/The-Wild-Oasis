import React from "react";

interface StatBoxProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: "blue" | "green" | "indigo" | "yellow";
}

const colorMap = {
  blue:   "text-blue-600   bg-blue-100   dark:text-white dark:bg-blue-600",
  green:  "text-green-600  bg-green-100  dark:text-white dark:bg-green-600",
  indigo: "text-indigo-600 bg-indigo-100 dark:text-white dark:bg-indigo-600",
  yellow: "text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600",
};

function StatBox({ title, value, icon, color }: StatBoxProps) {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm flex-1">
      <div
        className={`flex items-center justify-center rounded-full w-14 h-14 text-2xl shrink-0 ${colorMap[color]}`}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold tracking-widest uppercase text-stone-500 dark:text-stone-400">
          {title}
        </span>
        <span className="text-2xl font-semibold text-stone-900 dark:text-white">
          {value}
        </span>
      </div>
    </div>
  );
}

export default StatBox;