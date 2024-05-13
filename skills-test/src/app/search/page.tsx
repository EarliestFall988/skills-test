"use client";

import type { NextPage } from "next";
import { PageHeaderComponent } from "../_components/page-header";
import { api } from "~/trpc/react";
import { useState } from "react";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import ClockLoader from "react-spinners/ClockLoader";

const SearchPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading } = api.applicant.searchApplicants.useQuery({
    searchTerm,
  });

  const [animParent] = useAutoAnimate();

  return (
    <main className="min-h-[100vh] bg-zinc-900 text-white">
      <PageHeaderComponent title="Search" />

      <div className="flex h-[10vh] items-center justify-center p-2">
        <input
          value={searchTerm}
          onChange={(x) => {
            setSearchTerm(x.target.value);
          }}
          type="text"
          placeholder="Search for applicants by name or dl"
          className="w-1/2 rounded bg-zinc-700 p-2 outline-none ring-1 ring-zinc-600 transition duration-200 hover:ring hover:ring-sky-600 focus:ring-1"
        />
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
          <div className="w-1/2 border-x border-t border-zinc-700">
            {data.map((x) => (
              <div
                key={x.id}
                className="flex items-center gap-2 border-b border-zinc-700  p-2"
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
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
