"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import TooltipComponent from "./tooltip";

export const PageHeaderComponent: FC<{ title: string }> = ({ title }) => {
  const router = useRouter();

  const goBack = () => {
    if (history.length > 0) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <div className="fixed animate-appearDown z-20 flex w-full items-center gap-2 border-b border-zinc-700 bg-zinc-800/50 p-2 backdrop-blur">
        <TooltipComponent context="Back" side="bottom">
          <button onClick={goBack} className="rounded p-2 hover:bg-zinc-700">
            <ChevronLeftIcon className="h-7" />
          </button>
        </TooltipComponent>
        <h1 className="font text-2xl">{title}</h1>
      </div>

      <div className="h-20"></div>
    </>
  );
};
