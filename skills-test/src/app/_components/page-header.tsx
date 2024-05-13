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
    <>
    <div className="flex z-20 fixed w-full items-center gap-2 bg-zinc-800/50 backdrop-blur p-2">
      <button onClick={goBack} className="rounded p-2 hover:bg-zinc-700">
        <ChevronLeftIcon className="h-7" />
      </button>
      <h1 className="font text-2xl">{title}</h1>
    </div>

    <div className="h-20">
        
    </div>

    </>
  );
};
