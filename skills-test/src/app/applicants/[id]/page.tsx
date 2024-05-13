"use client";

import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import type { NextPage } from "next";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import ClockLoader from "react-spinners/ClockLoader";
import { PageHeaderComponent } from "~/app/_components/page-header";
import { api } from "~/trpc/react";

export const NewApplicant: NextPage = () => {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string | null | undefined;

  const { mutate, isPending } = api.applicant.update.useMutation({
    onSuccess: () => {
      router.back();
    },
  });

  const { mutate: deleteApplicant, isPending: isDeleting } =
    api.applicant.delete.useMutation({
      onSuccess: () => {
        router.back();
      },
    });

  const { data, isLoading } = api.applicant.getApplicant.useQuery({ id });

  const [FName, setFName] = useState<string>("");
  const [LName, setLName] = useState<string>("");
  const [DL, setDL] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    if (FName && FName.trim().length > 1) return;

    setFName(data?.firstName ?? "");
    setLName(data?.lastName ?? "");
    setDL(data?.driversLicense ?? "");
  }, [FName, data, id]);

  const updateApplicant = () => {
    if (id === null || id === undefined) return;

    mutate({
      id,
      firstName: FName,
      lastName: LName,
      dl: DL,
    });
  };

  const deleteTheApplicant = () => {
    if (id === null || id === undefined) return;

    deleteApplicant({
      id,
    });
  };

  return (
    <main className="min-h-[100vh] bg-zinc-900 text-white">
      <PageHeaderComponent title={"Update " + FName + " " + LName} />
      <div className="flex w-full flex-col items-center justify-center">
        {isLoading ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <ClockLoader
              color="#0284c7"
              size={100}
              aria-label="Loading Spinner"
            />
          </div>
        ) : (
          <>
            <div className="w-1/3 p-5">
              <p className="font-medium">First Name</p>
              <input
                type="text"
                value={FName}
                onChange={(x) => setFName(x.target.value)}
                className="w-full rounded bg-zinc-700 p-2 outline-none ring-1 ring-zinc-600 transition duration-200 hover:ring hover:ring-blue-600 focus:ring-blue-700"
              />
            </div>
            <div className="w-1/3 p-5">
              <p className="font-medium">Last Name</p>
              <input
                type="text"
                value={LName}
                onChange={(x) => setLName(x.target.value)}
                className="w-full rounded bg-zinc-700 p-2 outline-none ring-1 ring-zinc-600 transition duration-200 hover:ring hover:ring-blue-600 focus:ring-blue-700"
              />
            </div>
            <div className="w-1/3 p-5">
              <p className="font-medium">Drivers License</p>
              <input
                type="text"
                value={DL}
                onChange={(x) => setDL(x.target.value)}
                className="w-full rounded bg-zinc-700 p-2 outline-none ring-1 ring-zinc-600 transition duration-200 hover:ring hover:ring-blue-600 focus:ring-blue-700"
              />
            </div>
            <div className="w-1/3 p-5">
              <button
                onClick={updateApplicant}
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
            <div className="w-1/3 p-5">
              <button
                onClick={deleteTheApplicant}
                className="flex w-full items-center justify-center gap-2 rounded bg-red-700 p-2 hover:bg-red-600"
              >
                {isDeleting ? (
                  <div>Deleting...</div>
                ) : (
                  <>
                    <p>Delete</p>
                    <TrashIcon className="h-5 -translate-y-[1px] " />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default NewApplicant;
