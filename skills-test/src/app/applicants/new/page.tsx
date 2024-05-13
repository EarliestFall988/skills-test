"use client";

import { CheckIcon } from "@heroicons/react/24/solid";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { PageHeaderComponent } from "~/app/_components/page-header";
import { api } from "~/trpc/react";

const NewApplicant: NextPage = () => {
  const router = useRouter();

  const { mutate, isPending } = api.applicant.createNewApplicant.useMutation({
    onSuccess: () => {
      router.back();
    },
  });

  const [FName, setFName] = useState<string>("");
  const [LName, setLName] = useState<string>("");
  const [DL, setDL] = useState<string>("");

  const createNewApplicant = () => {
    mutate({
      firstName: FName,
      lastName: LName,
      dl: DL,
    });
  };

  return (
    <main className="min-h-[100vh] bg-zinc-900 text-white">
      <PageHeaderComponent title="Create New Applicant" />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="w-full lg:w-1/3 p-5">
          <p className="font-medium">First Name</p>
          <input
            type="text"
            value={FName}
            onChange={(x) => setFName(x.target.value)}
            className="w-full rounded bg-zinc-700 p-2 outline-none ring-1 ring-zinc-600 transition duration-200 hover:ring hover:ring-blue-600 focus:ring-blue-700"
          />
        </div>
        <div className="w-full lg:w-1/3 p-5">
          <p className="font-medium">Last Name</p>
          <input
            type="text"
            value={LName}
            onChange={(x) => setLName(x.target.value)}
            className="w-full rounded bg-zinc-700 p-2 outline-none ring-1 ring-zinc-600 transition duration-200 hover:ring hover:ring-blue-600 focus:ring-blue-700"
          />
        </div>
        <div className="w-full lg:w-1/3 p-5">
          <p className="font-medium">Drivers License</p>
          <input
            type="text"
            value={DL}
            onChange={(x) => setDL(x.target.value)}
            className="w-full rounded bg-zinc-700 p-2 outline-none ring-1 ring-zinc-600 transition duration-200 hover:ring hover:ring-blue-600 focus:ring-blue-700"
          />
        </div>
        <div className="w-full lg:w-1/3 p-5">
          <button
            onClick={createNewApplicant}
            className="flex w-full items-center justify-center gap-2 rounded bg-gradient-to-r from-blue-600 to-purple-600 p-2"
          >
            {isPending ? (
              <div>Saving...</div>
            ) : (
              <>
                <p>Save</p>
                <CheckIcon className="h-5 -translate-y-[1px] " />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
};

export default NewApplicant;
