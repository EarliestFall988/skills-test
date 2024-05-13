"use client";

import type { NextPage } from "next";
import { PageHeaderComponent } from "../_components/page-header";
import { api } from "~/trpc/react";
import { type FC, useState } from "react";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import ClockLoader from "react-spinners/ClockLoader";
import type { Applicant } from "@prisma/client";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import TooltipComponent from "../_components/tooltip";

const ApplicantListItem: FC<{ x: Applicant }> = ({ x }) => {
  return (
    <Link
      href={"/applicants/" + x.id + "/"}
      className="flex items-center gap-2 border-b border-zinc-700 hover:bg-zinc-800 duration-200 transition  p-2"
    >
      <Image
        src={x.imageUrl}
        alt={x.firstName + "'s profile picture"}
        width={50}
        height={50}
        className="rounded"
      />
      <div>
        <div className="flex gap-2 text-lg font-semibold">
          <p>{x.firstName}</p>
          <p>{x.lastName}</p>
        </div>
        <p className="font-zinc-300 text-sm">{x.driversLicense}</p>
      </div>
    </Link>
  );
};

const SearchPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading } = api.applicant.searchApplicants.useQuery({
    searchTerm,
  });

  const [animParent] = useAutoAnimate();

  return (
    <main className="min-h-[100vh] bg-zinc-900 text-white">
      <PageHeaderComponent title="Search" />

      <div className="flex h-[10vh] items-center justify-center gap-2 p-2">
        <input
          value={searchTerm}
          onChange={(x) => {
            setSearchTerm(x.target.value);
          }}
          type="text"
          placeholder="Search for applicants by name or dl"
          className="w-full rounded bg-zinc-700 p-2 outline-none ring-1 ring-zinc-600 transition duration-200 hover:ring hover:ring-blue-600 focus:ring-blue-700 md:w-1/2"
        />
        <TooltipComponent context="Create new Applicant" side="bottom">
        <Link
          href="/applicants/new"
          className="rounded bg-zinc-700 p-1 transition duration-200 hover:bg-blue-700 "
        >
          <PlusIcon className="w-8" />
        </Link>
        </TooltipComponent>
      </div>
      <div ref={animParent} className="flex items-center justify-center">
        {isLoading && (
          <div className="flex h-[40vh] items-center justify-center">
            <ClockLoader
              color="#0284c7"
              size={100}
              aria-label="Loading Spinner"
            />
          </div>
        )}
        {!isLoading && data && data.length > 0 && (
          <div className="w-full border-x border-t border-zinc-700 md:w-1/2">
            {data.map((x) => (
              <ApplicantListItem key={x.id} x={x} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
