'use client'

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import type { FC } from "react";

export const PageHeaderComponent:FC<{title:string}> = ({title}) => {
    const router = useRouter();

    const goBack = () => {
      if (history.length > 0) {
        router.back();
      } else {
        router.push("/");
      }
    };


  return (
    <div className="flex items-center gap-2 bg-zinc-800 p-2">
      <button onClick={goBack} className="rounded p-2 hover:bg-zinc-700">
        <ChevronLeftIcon className="h-7" />
      </button>
      <h1 className="font text-2xl">{title}</h1>
    </div>
  );
};
